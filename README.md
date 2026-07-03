# Kobber komponenter – React component library

React component library for Gyldendal's [Kobber design system](https://kobber.gyldendal.no/),
implementing the components from the
[Kobber Komponentbibliotek Figma file](https://www.figma.com/design/zMcbm8ujSMldgS1VB70IMP/Kobber-Komponentbibliotek).

Components currently defined in the Figma file:

- **Text** (page "Text"): text components with size/font variants, plus List and Modell sections
- **Filter** (page "Filter"): states idle, hover, focus, active, active + hover, disabled
- **Counter** (page "Filter"): type number/letter × color neutral, brand-a, brand-b, success, fail

## Stack

- [Vite](https://vite.dev/) + [React](https://react.dev/) + TypeScript
- [vanilla-extract](https://vanilla-extract.style/) for zero-runtime, type-safe styling

## Getting started

```bash
npm install
npm run dev      # start the dev server / component gallery
npm run build    # type-check and build
npm run lint     # lint with oxlint
```

## Design tokens

Component tokens come from
[`@gyldendal/kobber-tokens`](https://www.npmjs.com/package/@gyldendal/kobber-tokens),
imported as a typed JS object in the `.css.ts` files (values are inlined at
build time by vanilla-extract). See `src/styles/tokens.ts` for the shared
helpers (`px()`, font family fallback).

## Implemented components

- **Filter** — toggle chip with counter (states: idle, hover, focus, active, disabled)
- **Badge** — status/category label (brand/rettsdata/neutral × tone a/b, small/medium, status circle)
- **Button** — early example component, not yet token-driven

## Project structure

```
src/
  components/          # one folder per component (Component.tsx + Component.css.ts)
    Button/
    index.ts           # public exports of the library
  styles/
    theme.css.ts       # design tokens (to be synced with Kobber Figma variables)
    global.css.ts      # global reset/base styles
  App.tsx              # component gallery used during development
```

## Workflow

1. Pick a component from the Kobber Komponentbibliotek Figma file.
2. Create `src/components/<Name>/` with a `.tsx` implementation and a `.css.ts`
   stylesheet using the tokens from `src/styles/theme.css.ts`.
3. Export it from `src/components/index.ts` and add a demo section in `App.tsx`.

The core token values in `theme.css.ts` (brand color, focus color, font family)
are seeded from the Figma file's variables; the rest are placeholders until the
full Kobber token set (Figma variables) is synced.
