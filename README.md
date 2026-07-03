# Kobber komponenter – monorepo

React component library for Gyldendal's [Kobber design system](https://kobber.gyldendal.no/),
implementing the components from the
[Kobber Komponentbibliotek Figma file](https://www.figma.com/design/zMcbm8ujSMldgS1VB70IMP/Kobber-Komponentbibliotek).

## Layout

```
packages/
  kobber/          # the component library — components, styles, tests. Nothing else.
apps/
  demo/            # demo app: gallery (#/) + composed example page (#/eksempel)
```

`kobber` is consumed as a source package (its `exports` point at `src/`), so
the demo app and tests always run against the latest code with no build step.

- `kobber` — components (`import { Button } from "kobber"`)
- `kobber/styles` — tokens, typography, interaction states, breakpoints,
  z-index, elevation (`import { tokens, typography } from "kobber/styles"`)

## Toolchain: Vite+ (alpha)

Everything runs through the [`vite-plus`](https://www.npmjs.com/package/vite-plus) `vp` CLI:

```bash
npm install
npm run dev         # vp run --filter demo dev
npm run build       # vp run --filter demo build
npm run test        # vp test (Vitest, jsdom + testing-library)
npm run lint        # vp lint (oxlint)
npm run fmt         # vp fmt  (oxfmt)
npm run typecheck   # vp run --recursive typecheck
```

Tests live in `packages/kobber/tests/`; the root `vitest.config.ts` wires up
the vanilla-extract plugin and jsdom.

## The component pattern

Every component is a folder with a `.tsx` (behavior) and a `.css.ts` (visual
spec). The `.css.ts` composes shared layers and adds only what is unique to
the component:

```ts
export const root = style([
  label.medium,     // typography     (styles/typography.css.ts)
  focusRing,        // interaction    (styles/interaction.css.ts)
  disabledState,
  {
    gap: val(filter.gap),   // component tokens only, via val()
    ...
  },
])
```

Rules:

- **No raw values in components.** Colors/sizes come from `styles/tokens.ts`
  (the only module importing `@gyldendal/kobber-tokens`). Breakpoints from
  `styles/breakpoints.ts`, z-index from `styles/layers.ts`, shadows from
  `styles/elevation.ts` (until Kobber gets elevation tokens).
- **Shared states live in `styles/interaction.css.ts`** (focusRing,
  focusOutline, disabledState, hoverOverlay). Anything two components share
  belongs in `src/styles/`.
- **Typography without color** — color belongs to the consuming component and
  cascades (tones flip with state, e.g. active Filter).
- **className is always merged** via `cx`, never dropped.
- **Props propagate by composition**: slots (children) for parts the consumer
  brings, one purpose-named callback per part the component owns
  (`onSearchClick`), native passthrough for wrapped elements (TextInput).
- **Variant maps are flat and token-driven**; prop types derive from them
  (`ButtonVariant = keyof typeof variant`), so invalid combos don't compile.

## Implemented components

- **Navigation Bar** — logo | menu slot | search trigger + profile button,
  matching the Figma set; menu collapses on mobile
- **Dropdown** — trigger + menu; items are children with their own `onClick`,
  closes on select/outside/Escape
- **Button** — Figma Button + UI Button; variants `brand-primary-a` …
  `informative-b`, `iconOnly` for square icon buttons
- **Filter** — toggle chip with counter
- **Badge** — status/category label with tones, sizes, status circle
- **TextInput** — underlined field from the WIP `_text-input` tokens
- **Text** — polymorphic content typography (`<Text variant="heading" as="h1">`)

## Deploy

Pushes to `main` lint, test, build and deploy the demo app to GitHub Pages
via `.github/workflows/deploy.yml` (enable once under Settings → Pages →
Source: **GitHub Actions**).

## Theming (later)

Token values are inlined at build time. When theming becomes real, flip
`packages/kobber/src/styles/tokens.ts` to the CSS-variables build of the token
package and let `val()` wrap names in `var()` — components won't change
because everything already goes through that one file.
