# aceyash-dev Portfolio

Welcome to my GitHub portfolio! This repository showcases my projects, skills, and widgets.

## Quick Links
- [Projects](#projects)
- [Skills](#skills)
- [Widgets](#widgets)
- [Contact](#contact)

---

## Projects

| Project | Description | Tech Stack | Link |
|---------|-------------|------------|------|
| Portfolio Site | Personal portfolio built with Vanilla HTML | HTML, CSS, JavaScript | [View](https://aceyash-dev.github.io) |
| AceMail | SMTP/IMAP email client | Kotlin, Java | [View](https://github.com/tab-gl/AceMail) |
| Typace | Typography organizer | TypeScript, React | [View](https://github.com/aceyash-dev/Typace) |

---

## Skills

| Category | Skills |
|----------|--------|
| Web Development | HTML, CSS, JavaScript, TypeScript |
| Mobile Development | Kotlin, Android SDK |
| Tools | Git, GitHub, VS Code |

---

## Widgets

This section contains various widgets and interactive components used in my projects.

### Clock Widget
```html
<div class="clock-widget" id="clock"></div>
```

### Weather Widget
```html
<div class="weather-widget" id="weather"></div>
```

### Calendar Widget
```html
<div class="calendar-widget" id="calendar"></div>
</div>
```

---

## Contact

- GitHub: [@aceyash-dev](https://github.com/aceyash-dev)
- Portfolio: [aceyash-dev.github.io](https://aceyash-dev.github.io)

---

## Hosts

Two hosts serve this repository, and only one of them is canonical.

- **https://aceyash-dev.github.io/** is the canonical site. It is what
  `index.html`'s `rel="canonical"`, `robots.txt` and `sitemap.xml` all name, and
  it is served by GitHub Pages — static files only, no serverless runtime.
- **Vercel** is an optional deployment that additionally runs `api/commits.js`,
  the authenticated commit feed declared in `vercel.json`. It is deliberately not
  canonical, so it is not indexed; its only job is to serve that endpoint.

The homepage therefore asks the same origin for `/api/commits` and, on a host
that has no such endpoint (GitHub Pages answers 404), silently falls back to the
public GitHub search API. Nothing breaks on the canonical host, and no console
warning is raised for a 404 that is expected there.

If the Vercel deployment is ever retired, delete `vercel.json` and `api/` and
leave the fallback in place — that is the only change needed.
