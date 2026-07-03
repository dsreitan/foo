# Kobber komponenter – React component library

React component library for Gyldendal's [Kobber design system](https://kobber.gyldendal.no/),
implementing the components from the **Kobber komponenter** Figma file.

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

1. Pick a component from the Kobber komponenter Figma file.
2. Create `src/components/<Name>/` with a `.tsx` implementation and a `.css.ts`
   stylesheet using the tokens from `src/styles/theme.css.ts`.
3. Export it from `src/components/index.ts` and add a demo section in `App.tsx`.

The token values in `theme.css.ts` are placeholders until they are replaced with
the real Kobber design tokens (Figma variables) from the Figma file.
