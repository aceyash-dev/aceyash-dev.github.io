# Ace Yash — Portfolio

The personal portfolio of **Ace Yash**, developer and founder/CEO of
[The Ace Base](https://ace-base.cc/) — an editorial, milk-and-orange single-page
site built with React, TypeScript, and Vite, prerendered to static HTML and
hosted on GitHub Pages.

Canonical URL: <https://aceyash-dev.github.io/>

## Design system

- **Palette — milk & orange.** Milk canvas (`#F7F4EC`), pure-white cards, an
  intentional orange system (`#F07836` brand, `#C95720` deep/hover, `#A8490F`
  text-safe accent), ink `#24221F`, warm neutral borders. No gradients of
  purple, no neon — one accent, used deliberately.
- **Typography.** [Instrument Serif](https://fonts.google.com/specimen/Instrument+Serif)
  for display headlines (roman + italic accents), [Figtree](https://fonts.google.com/specimen/Figtree)
  for interface and body text.
- **Icons.** [Solar Icons](https://www.solariconset.com/) via the official
  [`@solar-icons/react`](https://www.npmjs.com/package/@solar-icons/react)
  package (MIT; icons by 480 Design, CC BY 4.0) — Linear style throughout,
  with inline stroke paths only for the two GitHub/Instagram brand marks that
  Solar does not cover.
- **Motion.** Motion (framer-motion) reveals and hover physics, Lenis smooth
  scrolling, a click-spark interaction, a marquee skills rail, and a sheen
  sweep on the hero badge. Everything degrades under
  `prefers-reduced-motion` and `MotionConfig reducedMotion="user"`.

## Sections

1. Hero — positioning, dual identity (developer + CEO of The Ace Base), portrait
2. Selected work — asymmetric editorial grid (The Ace Base, Typace, AceMail, browser widgets)
3. The Ace Base — leadership panel (dark, full-bleed)
4. Activity — latest public GitHub commits (same-origin `/api/commits` on Vercel; public GitHub search API fallback on Pages)
5. About — bio, fast facts, and a question-first FAQ (mirrored in JSON-LD/FAQPage)
6. Skills — Web / Native / Tools & craft, Solar icons, no fabricated percentages
7. Contact — email-first with GitHub / Instagram / The Ace Base alternates

## Stack

- **React 18 + TypeScript + Vite**
- **Motion** for scroll-linked reveals and reduced-motion-aware transitions
- **Lenis** for inertial scrolling on capable pointers
- **React Bits** source-owned components: `BlurText`, `ClickSpark`, `Magnet`,
  `ShinyText` (hero accent), `SpotlightCard` (light theme, orange spotlight)
- **Solar Icons** — Linear icons via `@solar-icons/react`
- A single hand-written stylesheet (`src/styles/global.css`) — no CSS framework

No Tailwind, no component-library runtime, no icon-font dependencies.

React Bits is a registry, not a runtime package; the small pieces this site
uses live in `src/components/vendor/reactbits/` with notices in
[`THIRD_PARTY_NOTICES.md`](./THIRD_PARTY_NOTICES.md). The OriginKit registry
(www.originkit.dev) was unreachable from the build environment, so no
OriginKit code is bundled — see *OriginKit* in the notices for what was
recreated from their documented patterns instead.

## Run locally

```bash
npm ci
npm run dev
```

Other commands:

```bash
npm run typecheck   # strict TypeScript check
npm run build       # typecheck + client build + SSR prerender into dist/
npm run preview     # serve the production build
npm run prerender   # re-inject static markup into dist/index.html
```

## Project layout

```text
index.html                  Vite entry — SEO/meta/JSON-LD, <noscript> fallback
src/main.tsx                hydration (falls back to client render in dev)
src/entry-server.tsx        SSR entry for the prerender step
src/App.tsx                 page composition
src/components/             sections and interaction components
src/components/vendor/      source-owned React Bits components
src/styles/global.css       the entire design system
src/data/site.ts            content model (projects, skills, FAQ, footer)
src/lib/commits.ts          commit feed (same-origin API + public fallback)
scripts/prerender.mjs       bakes static markup into dist/index.html
public/                     favicon.svg (+ me.jpg, bg.jpg at repo root)
widgets/                    standalone dependency-free browser widgets
api/commits.js              optional Vercel serverless commit endpoint
```

## SEO / GEO / AEO

- Unique title, meta description, canonical, Open Graph, Twitter cards,
  `theme-color #F7F4EC`, `lang="en"`, `robots` with `max-snippet:-1`.
- JSON-LD graph: `Person` (worksFor → `Organization`: The Ace Base),
  `WebSite`, `ProfilePage`, `SoftwareSourceCode`, `FAQPage` —
  all visible-content-matched.
- `llms.txt` and `llms-full.txt` for AI answer engines; question-first FAQ
  ("Who is Ace Yash?", "Who is the CEO of The Ace Base?", …) repeated verbatim
  in llms-full.txt and JSON-LD.
- `robots.txt` welcomes AI crawlers explicitly; `sitemap.xml` lists `/`,
  `/widgets/`, `llms.txt`, `llms-full.txt`.
- **Prerendered static HTML**: `<div id="root">` ships with full markup, so
  non-JS crawlers and answer engines see the complete page; React hydrates it
  in the browser. A rich `<noscript>` fallback covers the rest.
- Semantic landmarks, one `h1`, logical heading order, labelled sections,
  descriptive `alt` text, skip link, visible focus rings, keyboard-operable
  navigation/menu/FAQ, Escape/focus-restore/trap in the mobile menu,
  scroll-spy with `aria-current`, and `prefers-reduced-motion` support.

## Deployment

### GitHub Pages (canonical)

`.github/workflows/deploy-pages.yml` builds the app and deploys `dist/` with
the official Pages actions on pushes to `main` (or `workflow_dispatch`).
In repository settings, set **Pages → Build and deployment → Source → GitHub Actions**.

The canonical URL remains:

- <https://aceyash-dev.github.io/>

### Vercel (optional API host)

Vercel auto-detects the Vite framework and also runs `api/commits.js`, the
authenticated commit feed declared in `vercel.json`. It is deliberately not
canonical, so it is not indexed. On that host the app uses `/api/commits`; on
GitHub Pages a 404 is expected and the app falls back to GitHub's public
commit-search API. No credentials are exposed to the browser.

## Contact

- GitHub: [@aceyash-dev](https://github.com/aceyash-dev)
- Portfolio: [aceyash-dev.github.io](https://aceyash-dev.github.io)
- Email: <hello@ace-base.cc>
