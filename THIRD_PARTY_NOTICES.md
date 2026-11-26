# Third-party notices

This portfolio includes source-owned component implementations adapted from
open registries, and third-party packages installed from npm.

## React Bits

Files in `src/components/vendor/reactbits/` are adapted from
[React Bits](https://reactbits.dev/) by David Haz
([source repository](https://github.com/DavidHDev/react-bits)).

Components used: `BlurText`, `ClickSpark`, `Magnet`, and `SpotlightCard`.

License: **MIT + Commons Clause License Condition v1.0**

> Copyright (c) 2026 David Haz
>
> Permission is hereby granted, free of charge, to any person obtaining a copy
> of this software and associated documentation files (the "Software"), to deal
> in the Software without restriction, including without limitation the rights
> to use, copy, modify, merge, publish, and distribute the Software **as part of
> an application, website, or product**, subject to the following conditions:
>
> The above copyright notice and this permission notice shall be included in all
> copies or substantial portions of the Software.
>
> ## Commons Clause Restriction
>
> You may use this Software, including for any commercial purpose, **so long as
> you do not sell, sublicense, or redistribute the components themselves—whether
> alone, in a bundle, or as a ported version.**
>
> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
> IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
> FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
> AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
> LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
> OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
> SOFTWARE.

## OriginKit

The [OriginKit](https://www.originkit.dev/) registry and docs were unreachable
from the build environment, so **no OriginKit code is bundled** in this site.

One interaction pattern — a periodic sheen sweep across a dark pill — was
recreated by hand in `src/components/SheenPill.tsx` and
`.sheen-pill::after` in `src/styles/global.css`, based solely on the public
description of OriginKit's "shiny-pill" text component. No source was copied.
Credit: OriginKit (MIT CLI) — https://www.originkit.dev/

If OriginKit is added later, install it through the official CLI per its
documentation and update this file with the exact components used.

## Solar Icons

Icons are rendered with [`@solar-icons/react`](https://www.npmjs.com/package/@solar-icons/react)
2.x (MIT), icons designed by **480 Design** and licensed
[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).

Package: https://github.com/saoudi-h/solar-icons
Icon family documentation: https://www.solariconset.com/

The single style used across the site is **Linear** (`@solar-icons/react/linear/*`).
GitHub and Instagram marks are inline SVGs in `src/components/icons.tsx`
(brand marks are not part of the Solar set).

## npm dependencies

Runtime dependencies — React, ReactDOM, Motion, Lenis, `tslib`, and
`@solar-icons/react` — remain under their respective package licenses, which
are distributed with the installed packages in `node_modules`.

## Assets

- `me.jpg` — Ace Yash's personal mark (white flame emblem), used as portrait/OG image.
- `bg.jpg` — abstract orange accretion-disk artwork, used behind the
  "The Ace Base" leadership panel.
