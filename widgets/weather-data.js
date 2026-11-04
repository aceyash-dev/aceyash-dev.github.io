import { WEATHER_CONFIG } from "./widget-config.js";

const root = document.querySelector("#weather");
const params = new URLSearchParams(location.search);
const requestedLocation = (params.get("location") || WEATHER_CONFIG.defaultLocation).trim().slice(0, 80);
const weatherLabels = new Map([
  [0, "Clear sky"], [1, "Mainly clear"], [2, "Partly cloudy"], [3, "Overcast"],
  [45, "Fog"], [48, "Depositing rime fog"], [51, "Light drizzle"], [53, "Drizzle"],
  [55, "Dense drizzle"], [61, "Slight rain"], [63, "Rain"], [65, "Heavy rain"],
  [71, "Slight snow"], [73, "Snow"], [75, "Heavy snow"], [80, "Rain showers"],
  [81, "Rain showers"], [82, "Heavy rain showers"], [95, "Thunderstorm"],
  [96, "Thunderstorm with hail"], [99, "Severe thunderstorm"]
]);

function node(tag, className, value) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (value !== undefined) el.textContent = value;
  return el;
}
// The newest run owns the DOM. An older response that lands late is dropped
// instead of overwriting a fresher one.
let activeController = null;
let run = 0;

function renderState(title, message, retry = false, mine = run) {
  if (mine !== run) return;
  root.setAttribute("aria-busy", retry ? "false" : "true");
  const content = [node("h1", "widget__title", title), node("p", "widget__meta", message)];
  if (retry) {
    const button = node("button", "widget__retry", "Try again");
    button.type = "button";
    button.addEventListener("click", loadWeather, { once: true });
    content.push(button);
  }
  root.replaceChildren(...content);
}
async function request(url, signal) {
  const response = await fetch(url, { signal, headers: { Accept: "application/json" }, cache: "no-store" });
  if (!response.ok) throw new Error(`Weather service returned ${response.status}`);
  return response.json();
}
async function loadWeather() {
  // Cancel the previous request before starting this one: the interval and the
  // "Try again" button can both fire while a slow request is still open.
  activeController?.abort();
  const controller = new AbortController();
  activeController = controller;
  const mine = ++run;
  renderState("Current weather", `Finding live conditions for ${requestedLocation}…`, false, mine);
  let timedOut = false;
  const timeout = setTimeout(() => {
    timedOut = true;
    controller.abort();
  }, WEATHER_CONFIG.timeoutMs);
  try {
    const geo = new URL("https://geocoding-api.open-meteo.com/v1/search");
    geo.search = new URLSearchParams({ name: requestedLocation, count: "1", language: "en", format: "json" });
    const places = await request(geo, controller.signal);
    const place = places.results?.[0];
    if (!place || !Number.isFinite(place.latitude) || !Number.isFinite(place.longitude)) throw new Error("Location not found");
    const forecast = new URL("https://api.open-meteo.com/v1/forecast");
    forecast.search = new URLSearchParams({ latitude: String(place.latitude), longitude: String(place.longitude), current: "temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,weather_code", timezone: "auto", temperature_unit: WEATHER_CONFIG.units });
    const data = await request(forecast, controller.signal);
    const current = data.current;
    if (!current || !Number.isFinite(current.temperature_2m)) throw new Error("Current conditions are unavailable");
    const temperatureUnit = data.current_units?.temperature_2m || (WEATHER_CONFIG.units === "fahrenheit" ? "°F" : "°C");
    const windUnit = data.current_units?.wind_speed_10m || "km/h";
    const title = node("h1", "widget__title", `${place.name}${place.admin1 ? `, ${place.admin1}` : ""}`);
    const temperature = node("p", "widget__value", `${Math.round(current.temperature_2m)}${temperatureUnit}`);
    const condition = node("p", "widget__meta", weatherLabels.get(current.weather_code) || "Current conditions");
    const details = node("p", "widget__meta", `Feels like ${Math.round(current.apparent_temperature)}${temperatureUnit} · Humidity ${current.relative_humidity_2m}% · Wind ${Math.round(current.wind_speed_10m)} ${windUnit}`);
    const updated = node("p", "widget__meta", `Updated ${new Date(current.time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`);
    if (mine !== run) return;
    root.replaceChildren(title, temperature, condition, details, updated);
    root.setAttribute("aria-busy", "false");
  } catch (error) {
    // A superseded run stays silent; our own timeout still reports.
    if (mine !== run) return;
    if (error.name === "AbortError") {
      if (timedOut) renderState("Weather unavailable", "The weather request timed out.", true, mine);
      return;
    }
    renderState("Weather unavailable", "Live weather is temporarily unavailable.", true, mine);
  } finally {
    clearTimeout(timeout);
    if (activeController === controller) activeController = null;
  }
}
loadWeather();
setInterval(loadWeather, WEATHER_CONFIG.refreshMs);
