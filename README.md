# aceyash-dev Portfolio

A motion-led React rebuild of the personal portfolio for **Ace Yash**, developer
and founder/CEO of [The Ace Base](https://ace-base.cc/).

The site keeps the original warm, orbital visual language and canonical GitHub
Pages URLs, but the homepage is now a typed React application with reusable
components, accessible interaction states, and production animation patterns.

## Stack

- **React 18 + TypeScript + Vite**
- **Motion** for scroll-linked choreography, reveals, and reduced-motion-aware transitions
- **Lenis** for smooth inertial scrolling on capable devices
- **React Bits** source-owned components: `BlurText`, `ClickSpark`, `Magnet`, `SpotlightCard`
- **Transitions.dev** copy-in CSS recipes: text swaps, dropdowns, icon swaps, skeleton reveals, sliding tabs, side-by-side page swaps, accordions, shimmer text, and learn-more hovers
- **Tailwind CSS 3** for utility-first layout and styling, with a small CSS layer for branded motion and the existing editorial components
- **Hugeicons** for interface icons
- Instrument Serif + Figtree typography; a lightweight custom WebGL shader responds to pointer movement

React Bits and Transitions.dev are registries, not runtime packages. The small
pieces this site uses live in the repository, along with their notices in
[`THIRD_PARTY_NOTICES.md`](./THIRD_PARTY_NOTICES.md).

## Run locally

```bash
npm ci
npm run dev
```

Other commands:

```bash
npm run typecheck   # strict TypeScript check
npm run build       # typecheck + production build to dist/
npm run preview     # serve the production build
```

The Vite dev server binds to `0.0.0.0`, so it works in remote preview
environments as well as locally.

## Project layout

```text
index.html                 Vite entry, SEO, JSON-LD, noscript fallback
src/main.tsx               React root and global styles
src/App.tsx                Page composition, Motion config, Lenis setup
src/components/            Portfolio sections and interaction components
src/components/vendor/     Source-owned React Bits components
src/styles/transitions.css Adapted Transitions.dev CSS recipes
src/styles/global.css      Design system, layout, responsive styles
src/data/site.ts            Content and project/skills data
src/lib/commits.ts          Same-origin API + public GitHub fallback
public/                    Vite-served static assets (favicon)
widgets/                   Preserved standalone browser widgets
api/commits.js              Optional Vercel serverless commit endpoint
```

Root-level `bg.jpg`, `me.jpg`, `robots.txt`, `sitemap.xml`, `llms.txt`,
`skills.md`, and `widgets/` are copied into `dist/` by a small Vite build
plugin. Their existing URLs therefore continue to work after the React build.

## Content and live data

- Project and skills content is centralized in `src/data/site.ts`, based on the
  repository's README, `llms.txt`, and `skills.md`.
- The activity section calls the same-origin `/api/commits` endpoint first. On
  GitHub Pages, where that endpoint is intentionally absent, a 404 is treated
  as expected and the component falls back to GitHub's public commit-search
  API. No credentials are exposed to the browser.
- A skeleton-to-content cross-fade, retry state, and graceful error state keep
  the section usable when GitHub is rate-limited or offline.
- The footer clock only ticks while the footer is visible.

## Accessibility and performance

- `MotionConfig reducedMotion="user"` plus component-level reduced-motion checks
  keep the site usable for people who prefer less animation.
- Every interactive effect has a non-animated state; hover-only effects are not
  required on touch devices.
- Canvas spark effects are scoped to the hero, and the footer clock uses
  `IntersectionObserver`.
- Semantic landmarks, labelled sections, a skip link, focus-visible rings,
  keyboard-operable tabs/accordions/menu, and descriptive link labels are kept
  throughout.
- Static widget pages remain lightweight, standalone HTML/CSS/JS.

## Deployment

### GitHub Pages (canonical)

`.github/workflows/deploy-pages.yml` builds the Vite app and deploys `dist/`
with the official Pages actions. In repository settings, set **Pages → Build
and deployment → Source** to **GitHub Actions**.

The canonical URL remains:

- <https://aceyash-dev.github.io/>

Only `main` triggers automatic deployment; `workflow_dispatch` can be used for
manual runs.

### Vercel (optional API host)

Vercel auto-detects the Vite framework and additionally runs `api/commits.js`,
the authenticated commit feed declared in `vercel.json`. It is deliberately not
canonical, so it is not indexed. On that host the React app uses
`/api/commits`; on GitHub Pages it uses the public fallback.

If the Vercel deployment is ever retired, delete `vercel.json` and `api/` and
leave the fallback in place — that is the only change needed.

## Contact

- GitHub: [@aceyash-dev](https://github.com/aceyash-dev)
- Portfolio: [aceyash-dev.github.io](https://aceyash-dev.github.io)
- Email: <hello@ace-base.cc>
