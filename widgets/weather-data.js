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
function renderState(title, message, retry = false) {
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
  renderState("Current weather", `Finding live conditions for ${requestedLocation}…`);
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), WEATHER_CONFIG.timeoutMs);
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
    const title = node("h1", "widget__title", `${place.name}${place.admin1 ? `, ${place.admin1}` : ""}`);
    const temperature = node("p", "widget__value", `${Math.round(current.temperature_2m)}°C`);
    const condition = node("p", "widget__meta", weatherLabels.get(current.weather_code) || "Current conditions");
    const details = node("p", "widget__meta", `Feels like ${Math.round(current.apparent_temperature)}°C · Humidity ${current.relative_humidity_2m}% · Wind ${Math.round(current.wind_speed_10m)} km/h`);
    const updated = node("p", "widget__meta", `Updated ${new Date(current.time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`);
    root.replaceChildren(title, temperature, condition, details, updated);
    root.setAttribute("aria-busy", "false");
  } catch (error) {
    const message = error.name === "AbortError" ? "The weather request timed out." : "Live weather is temporarily unavailable.";
    renderState("Weather unavailable", message, true);
  } finally {
    clearTimeout(timeout);
  }
}
loadWeather();
setInterval(loadWeather, WEATHER_CONFIG.refreshMs);
