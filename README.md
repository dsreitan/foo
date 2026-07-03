# Kobber komponenter – React component library

React component library for Gyldendal's [Kobber design system](https://kobber.gyldendal.no/),
implementing the components from the
[Kobber Komponentbibliotek Figma file](https://www.figma.com/design/zMcbm8ujSMldgS1VB70IMP/Kobber-Komponentbibliotek).

## Stack

- [Vite](https://vite.dev/) + [React](https://react.dev/) + TypeScript
- [vanilla-extract](https://vanilla-extract.style/) for zero-runtime, type-safe styling
- [`@gyldendal/kobber-tokens`](https://www.npmjs.com/package/@gyldendal/kobber-tokens) for all design values

## Viewing

Two views, hash-routed:

- `#/` — gallery with every component and its variants
- `#/eksempel` — a composed example page using all components together

```bash
npm install
npm run dev      # local dev server
npm run build    # type-check and build
npm run lint     # lint with oxlint
```

Pushes to `main` deploy to GitHub Pages via `.github/workflows/deploy.yml`
(enable once under Settings → Pages → Source: **GitHub Actions**).

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
- **className is always merged** via `utils/cx.ts`, never dropped.
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

## Project structure

```
src/
  components/            # one folder per component (X.tsx + X.css.ts + index.ts)
    icons/               # placeholder icons until the Kobber icon package lands
    index.ts             # public exports of the library
  styles/
    tokens.ts            # THE token entry point (only kobber-tokens importer)
    typography.css.ts    # text styles per Figma text component
    interaction.css.ts   # focus/disabled/hover states
    breakpoints.ts       # media queries
    layers.ts            # z-index scale
    elevation.ts         # shadows (no Kobber tokens yet)
  pages/
    Gallery.tsx          # component gallery (#/)
    Example.tsx          # composed example page (#/eksempel)
```

## Theming (later)

Token values are inlined at build time. When theming becomes real, flip
`styles/tokens.ts` to the CSS-variables build of the token package and let
`val()` wrap names in `var()` — components won't change because everything
already goes through that one file.
