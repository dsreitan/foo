# Adoption: moving kobber into a product monorepo

The agreed first step: **one consumer team transplants the library
source into their monorepo, keeps developing it there, and adopts it
gradually in their own product.** Until that move happens, development
continues in this repo. After the move, this repo is archived with a
pointer — one source of truth, no sync problem.

Source transplant (not npm publish) is the right first move because the
consumer's stack matches this repo exactly: **Vite, vanilla-extract and
React 18**. Their bundler already compiles `.css.ts`, so the packages
can be consumed as source with zero packaging work. A publish pipeline
becomes worth building when a _second_ consumer appears (see Later).

**React 18 is verified**: the full test suite (105 tests, including
renderToString + hydration with zero console errors) passes on React
18.3.1. Peer deps are `^18.3.0 || ^19.0.0`. Button is `forwardRef` so it
works as a Popover/Dropdown trigger on 18; other components don't
expose refs yet — add `forwardRef` per component when a real need
appears.

## What moves

| Piece                          | Where                             | Note                                                                                                |
| ------------------------------ | --------------------------------- | --------------------------------------------------------------------------------------------------- |
| `packages/kobber`              | their `packages/`                 | keep the package name `kobber` so imports never change                                              |
| `packages/kobber-lab`          | their `packages/`                 | the proposals channel to the Kobber team                                                            |
| `apps/demo`                    | their `apps/`                     | not optional in spirit: it is the living documentation, the a11y/SSR test bed and the deploy target |
| `docs/`                        | repo root or next to the packages | components, proposals, a11y-audit, dam, this file                                                   |
| `CLAUDE.md`, `TODO.md`         | next to the packages              | the guardrails must travel with the code                                                            |
| `.github/workflows/deploy.yml` | adapt                             | demo deploy (Pages or internal hosting)                                                             |

## Runbook

1. **Copy with history**: `git remote add kobber-poc <this repo>` +
   `git fetch` + `git subtree add --prefix=libs/kobber kobber-poc main`
   (or a plain file copy if history doesn't matter).
2. **Workspace**: add the folders to their `pnpm-workspace.yaml`;
   `kobber-lab` and the demo depend on `kobber` via `workspace:*`.
3. **Test infra lives at the monorepo ROOT** (pnpm strict resolution +
   vitest pick this up from the root only):
   - `vitest.config.ts` with the vanilla-extract plugin, `jsdom` and
     `globals: true` (needed for testing-library auto-cleanup). If they
     already have a root vitest workspace, register these packages as
     projects with those settings instead.
   - Root devDependencies: `vitest`, `jsdom`, `@testing-library/react`,
     `@vanilla-extract/vite-plugin`.
4. **Scripts**: this repo uses Vite+ (`vp`) — alpha tooling the consumer
   should NOT be forced onto. The library code has no dependency on it;
   swap `vp test` → `vitest run`, `vp lint` → their linter (oxlint
   config-free works), `vp fmt` → their formatter, `tsgo` → `tsc` if
   they prefer (tsgo is stricter and has caught real bugs; keep it if
   the alpha is acceptable).
5. **TypeScript**: source compiles with `moduleResolution: "bundler"`,
   `verbatimModuleSyntax`, strict. Any TS ≥ 5.6 works.
6. **Deploy the demo** from their repo — every push deploying the
   gallery is the library's documentation site.
7. **Prerender stays**: `apps/demo` builds `statisk.html` via
   `vite build --ssr` (see `scripts/prerender.mjs`); both SPA and SSG
   consumption must keep working. The SSR tests enforce this per
   component.
8. **Archive this repo** with a README pointing at the new home.

## Working agreement after the move

- The guardrails in CLAUDE.md still apply, most importantly:
  `packages/kobber` mirrors the Kobber Figma — product-specific needs go
  to `packages/kobber-lab` as documented proposals, app concerns stay in
  the app.
- Adopt gradually: start with leaf components (Button, Badge, Text,
  inputs) on new surfaces; don't rewrite existing pages. The demo pages
  (butikk/dashbord/lekser/arbeidsflate...) show the intended
  composition patterns.
- New components follow the workflow in CLAUDE.md (tokens dump →
  official CSS reference → implement → tests + SSR matrix + axe sweep →
  docs → demo).

## Later — the backlog for broad, multi-team usability

In priority order; none of it blocks the first consumer:

1. **Publish build** (trigger: a second consumer, or a consumer without
   vanilla-extract): compile to ESM + `.d.ts` + one static CSS file so
   `npm install` + one CSS import works with zero special tooling.
   Publish under the `@gyldendal` scope; semver + changelog
   (e.g. Changesets) from the first release.
2. **Gallery "vis kode" snippets** — copy-paste usage per component is
   the adoption engine — plus a consumer-facing README (install, fonts,
   SSR notes, a11y duties).
3. **Complete per-component docs** (`docs/components/` covers 8 of 33).
4. **DAM assets**: PP Mori webfont (system fallback today), real icons
   (16px placeholders today), real Logo — all through `createDam`.
5. **Theming**: flip `styles/tokens.ts` to a CSS-variables build to
   unlock the kobber-base dark theme without touching components.
6. **Report upstream**: docs/upstream-findings.md is a ready-to-send
   report (token drift breaking WCAG on the primary button, focus-ring
   observation, token gaps).
7. **Contribution guide**: when something goes in kobber vs kobber-lab
   vs app code, definition of done, who reviews.
8. **CI hardening**: run the axe sweep (apps/demo/scripts/axe-audit.mjs)
   in CI; add visual regression screenshots when the look stabilizes.
9. **Ref story**: `forwardRef` across all components (or drop when the
   monorepo moves to React 19, where ref-as-prop makes it moot).
