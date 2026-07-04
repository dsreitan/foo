# CLAUDE.md — kobber component library

React implementation of Gyldendal's Kobber design system
([kobber.gyldendal.no](https://kobber.gyldendal.no/)). This is a PoC; ship
small, verified increments.

## Layout

- `packages/kobber` — the library. Components in `src/components/<Name>/`
  (`<Name>.tsx` + `<Name>.css.ts` + `index.ts`), shared styles in
  `src/styles/`, tests in `tests/`.
- `apps/demo` — gallery (`#/komponenter`) + composed example pages
  (shop, dashboard, homework, workspace...). Imports from `"kobber"`
  like a real consumer. The build also prerenders the components page
  to static HTML (`statisk.html`, see `scripts/prerender.mjs`) — both
  scenarios (SPA and SSG) must keep working.
- `packages/kobber-lab` — component PROPOSALS for the Kobber team:
  things our products need that aren't in the Kobber Figma yet. Built on
  `kobber/styles` tokens, same recipe, plus proposed motion tokens
  (`src/styles/motion.ts`). Every component has a pitch in
  `docs/proposals/<name>.md` (motivation, tokens, a11y, animation spec)
  and a demo on the Lab page. When Kobber adopts one, implement it in
  `packages/kobber` and delete it here.
- `docs/` — per-component usage & a11y docs (`docs/components/<name>.md`),
  proposals (`docs/proposals/`), `docs/dam.md` for the asset CDN,
  `docs/a11y-audit.md` (audit + upstream findings), and
  `docs/adoption.md` (the plan for moving this into a consumer monorepo
  and the usability backlog).
- `TODO.md` — the roadmap. Work top-down within its "Suggested order",
  tick items off (`- [x]`) in the same commit as the implementation.

## Commands (pnpm + Vite+ / `vp`)

```bash
pnpm install
pnpm exec vp test   # vitest — must pass before every commit
pnpm exec vp lint   # oxlint
pnpm exec vp fmt    # oxfmt — run before committing
pnpm run build      # builds the demo app
pnpm run typecheck  # tsgo (TypeScript 7 native preview)
pnpm run dev        # demo dev server
```

pnpm is strict: every package declares what it imports (no hoisting).
Test-infra deps (vitest, jsdom, testing-library, vanilla-extract plugin)
live in the ROOT package.json because vitest.config.ts is at the root.

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
   no demo helpers). Components we NEED but Kobber lacks go in
   `packages/kobber-lab` as documented proposals. Layout and presentation code for the demo lives in
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
- **Every component must work with prerendered static HTML** (SSR/SSG):
  no `window`/`document`/browser APIs at module scope or during render —
  only inside effects and event handlers, with feature detection when the
  API can be missing (see kobber-lab `Dialog`'s `showModal` fallback).
  The initial client render must equal the server render (no `useId`
  hacks, no `Math.random`, no `typeof window` branching in JSX).
  Enforced by `tests/ssr.test.tsx` in each package: renderToString +
  hydrateRoot with zero console errors — add every new component to its
  case matrix.
- Icons come from `src/components/icons/index.tsx` (16px placeholders,
  currentColor). Add missing icons there; do NOT add an icon library.
  Logos/fonts/icons will eventually come from the DAM CDN — ALL asset
  URLs go through `src/assets/dam.ts` (`createDam`); never hand-build
  CDN URLs. The old @gyldendal kobber-components/icons/base packages are
  DEPRECATED — use them only as read-only references, never as deps.

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
   (roles, labels, keyboard), 2–4 per component — and add the component
   to the SSR matrix in `tests/ssr.test.tsx`.
   6b. Write `docs/components/<name>.md`: built-in behavior + "Usage
   responsibilities" (a11y duties the consumer keeps). Exemplify correct
   usage in the gallery demo.
7. `pnpm exec vp fmt && pnpm exec vp lint && pnpm exec vp test && pnpm run typecheck && pnpm run build` — all
   must be clean.
8. Tick the TODO.md item, commit everything together, push to main.

## Accessibility defaults

- Toggles: `aria-pressed` (Filter) / `role="switch"` (Switch).
- Expandables: `aria-expanded` + `aria-controls` (Dropdown) or native
  `<details>` (AlertAccordion).
- Alerts: `role="alert"` for warning, `role="status"` otherwise.
- Labels: real `<label htmlFor>` via `useId`, or label-wrapped inputs.
- Icon-only buttons require `aria-label`.
- Every visible or aria string a component owns is an overridable prop
  with a Norwegian default (`dismissLabel = "Lukk"`, `searchLabel`,
  `profileLabel`, Breadcrumb `label`...). `lang` passes through
  everywhere via native attributes; image slots must document alt-text
  expectations (meaningful alt for content images, alt="" decorative).
- For each new component, check the matching WAI-ARIA APG pattern
  (https://www.w3.org/WAI/ARIA/apg/patterns/) and implement its keyboard
  behavior (see Dropdown: menu-button pattern). Behavior the component
  can't own goes in its doc under "Usage responsibilities".

## Known quirks

- `vp test` config lives in the ROOT `vitest.config.ts` (vanilla-extract
  plugin + jsdom + `globals: true` for testing-library cleanup). Per-package
  vitest configs are ignored.
- Don't set `fontFamily` as an array in vanilla-extract — arrays mean
  fallback _declarations_, not font stacks. Use the string from
  `` `${fontFamily.ppMori}, system-ui, sans-serif` ``.
- typecheck uses tsgo (TS 7 native preview) — stricter than tsc 6 on
  attribute collisions (e.g. a `title: ReactNode` prop needs
  `Omit<..., "title">`).
- The Figma file (`zMcbm8ujSMldgS1VB70IMP`) hides most pages from the API;
  component sets are reachable only via node links or library search.
