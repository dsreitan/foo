# CLAUDE.md — kobber component library

React implementation of Gyldendal's Kobber design system
([kobber.gyldendal.no](https://kobber.gyldendal.no/)). This is a PoC; ship
small, verified increments.

## Layout

- `packages/kobber` — the library. Components in `src/components/<Name>/`
  (`<Name>.tsx` + `<Name>.css.ts` + `index.ts`), shared styles in
  `src/styles/`, tests in `tests/`.
- `apps/demo` — gallery (`#/`) + composed example page (`#/eksempel`).
  Imports from `"kobber"` like a real consumer.
- `TODO.md` — the roadmap. Work top-down within its "Suggested order",
  tick items off (`- [x]`) in the same commit as the implementation.

## Commands (Vite+ / `vp`)

```bash
npm install
npm run test        # vitest via vp — must pass before every commit
npm run lint        # oxlint
npm run fmt         # oxfmt — run before committing
npm run build       # builds the demo app
npm run typecheck
npm run dev         # demo dev server
```

## Git rules

- Everything happens on **main**. Commit directly to it, push after every
  finished component or fix: `git push origin main`. Never create branches.
- One component (or one tight cluster) per commit, with a descriptive
  message. Every push deploys the demo to GitHub Pages.
- If a push fails with "repository not found", the remote may have been
  reset by the environment: `git remote set-url origin <proxy-url>/git/dsreitan/foo`.

## HARD GUARDRAILS

1. **No theme or product colors.** Implement `brand` and `neutral` (plus the
   semantic `success`/`warning`/`informative` where the component's tokens
   define them) — and nothing else. Skip `nostalgia`, `fantasy`, `nature`,
   `thriller`, `romance`, `vacation`, and `rettsdata` variants even though
   they exist in the tokens. Don't remove existing ones, just never add more.
2. **Never nest the `<Text>` component (or any component) inside another
   component for typography.** Compose the _style_ instead:
   `style([label.medium, { ... }])` from `styles/typography.css.ts`. Text
   color is never set in typography styles — the consuming component sets
   `color` and lets it cascade.
3. **No raw values in component files.** Every color/size/space comes from
   `styles/tokens.ts` (the ONLY file importing `@gyldendal/kobber-tokens`).
   Breakpoints from `styles/breakpoints.ts`, z-index from `styles/layers.ts`,
   shadows from `styles/elevation.ts`. If you think you need a new hex, you
   are looking at the wrong token — search the token dump again.
4. **Don't restructure.** No new dependencies, no Tailwind/styled-components/
   CSS modules, no new build tooling, no renaming shared files. If a change
   spans more than the component folder + barrel + gallery + TODO, stop and
   ask the user.
5. **Figma is read-only.** Never create/edit/comment on anything in Figma.
6. **The kobber package mirrors Figma — nothing else goes in it.** If a
   component doesn't exist in the Kobber Figma library/tokens, it doesn't
   belong in `packages/kobber` (no Stack/Grid/Center utility components,
   no demo helpers). Layout and presentation code for the demo lives in
   `apps/demo` (`App.css.ts`, page-level `.css.ts` files). App-level
   concerns like @font-face loading also live in the app.

## The component recipe

Every `.css.ts` composes the shared layers and adds only what is unique:

```ts
export const root = style([
  label.medium, // typography    (styles/typography.css.ts)
  focusRing, // interaction   (styles/interaction.css.ts: focusRing,
  disabledState, //                focusOutline, disabledState, hoverOverlay)
  {
    gap: val(filter.gap), // component tokens only, via val() (number -> px)
  },
]);
```

- Variant maps are flat `styleVariants`, one line per combination that
  exists in the tokens, named like the Figma properties
  (`"brand-primary-a"`). Prop types derive from them:
  `type ButtonVariant = keyof typeof styles.variant` — never hand-write
  variant unions.
- Hover in Kobber = translucent overlay painted over the current
  background: `backgroundImage: hoverOverlay(color)`.
- `className` is always merged with `cx(...)`, never dropped.
- Props propagate by composition: children slots for parts the consumer
  brings; ONE purpose-named callback per part the component owns
  (`onSearchClick`, `onDismiss`) — never a `xxxProps` grab-bag; native
  passthrough for wrapped elements (`<input>` components spread `...props`
  onto the input).
- Form controls wrap a real native input (visually hidden if styled),
  label-wrapped, so checked/onChange/disabled just work.
- Icons come from `src/components/icons/index.tsx` (16px placeholders,
  currentColor). Add missing icons there; do NOT add an icon library.

## Workflow for a new component

1. Pick the next unticked item in TODO.md (follow "Suggested order").
2. Dump its tokens:
   `node -e "import('@gyldendal/kobber-tokens').then(m => console.log(JSON.stringify(m.components.<name>, null, 1)))"`
   Token groups prefixed `_` are work-in-progress in Kobber — implement,
   but say so in the component's JSDoc.
3. Look for a reference implementation in the official package:
   `npm pack @gyldendal/kobber-components`, extract, and read
   `dist/css/index.css` for `.kobber-<name>` — when it exists it is the
   ground truth for states/anatomy. Also look at how
   **[gyldendal.no](https://www.gyldendal.no)** uses the component in
   production — it implements Kobber and is good inspiration for behavior
   and composition details.
4. If the anatomy is still unclear, ask the user for a Figma node link
   (they can paste `figma.com/design/...?node-id=...`) and read it with the
   Figma tools (read-only).
5. Implement the folder, export from `src/components/index.ts`
   (alphabetical), add a demo section in `apps/demo/src/pages/Gallery.tsx`
   with a one-line Norwegian description.
6. Add tests in `packages/kobber/tests/` — testing-library, behavior-first
   (roles, labels, keyboard), 2–4 per component.
7. `npm run fmt && npm run lint && npm run test && npm run build` — all
   must be clean.
8. Tick the TODO.md item, commit everything together, push to main.

## Accessibility defaults

- Toggles: `aria-pressed` (Filter) / `role="switch"` (Switch).
- Expandables: `aria-expanded` + `aria-controls` (Dropdown) or native
  `<details>` (AlertAccordion).
- Alerts: `role="alert"` for warning, `role="status"` otherwise.
- Labels: real `<label htmlFor>` via `useId`, or label-wrapped inputs.
- Icon-only buttons require `aria-label`.

## Known quirks

- `vp test` config lives in the ROOT `vitest.config.ts` (vanilla-extract
  plugin + jsdom + `globals: true` for testing-library cleanup). Per-package
  vitest configs are ignored.
- Don't set `fontFamily` as an array in vanilla-extract — arrays mean
  fallback _declarations_, not font stacks. Use the string from
  `` `${fontFamily.ppMori}, system-ui, sans-serif` ``.
- `devEngines` in root package.json is relaxed to npm >=10.9 on purpose;
  don't tighten it.
- The Figma file (`zMcbm8ujSMldgS1VB70IMP`) hides most pages from the API;
  component sets are reachable only via node links or library search.
