# Documentation handoff to the real Kobber repository

The earlier plan to transplant this React source into a consumer
monorepo is retired. **No code from this repository will be adopted or
maintained in production.** The reference PoC exists only to provide
evidence, usage experiments and documentation for the real Kobber
repositories.

## Transfer

| Artifact | Use in the real repository |
| --- | --- |
| `docs/token-quality-roadmap.md` | Issue-ready token build, data-quality and architecture backlog |
| `docs/upstream-findings.md` | Concise verified defects and dated Figma observations |
| `docs/design-system-review.md` | Architecture feedback and prioritization |
| `docs/token-modes.md` | Figma/CSS mode design, constraints and test matrix |
| `docs/responsive-tokens.md` | Fluid layout endpoint and generation specification |
| `docs/a11y-audit.md` | Audit method, patterns and cautions to reproduce upstream |
| `docs/proposals/*.md` | Product needs not represented in Kobber Figma at audit time |
| `docs/components/*.md` | Usage and accessibility responsibilities worth folding into official docs |
| `docs/dam.md` | Assumptions that must be verified against the real DAM contract |

## Do not transfer

- `packages/kobber` or `packages/kobber-lab`;
- `apps/demo`;
- package manifests, build configuration or source-package exports;
- this repository's GitHub Pages workflow;
- `CLAUDE.md` implementation workflow;
- component tests as-is.

Code and tests may be read to understand how a finding was discovered.
Any useful test must be rewritten against the real repository's public
API and tooling.

## Handoff procedure

1. **Record the evidence baseline.** Attach token package version,
   tarball integrity, audit date and any Figma node IDs to every issue.
2. **Re-verify mutable sources.** npm 13.0.0 package defects are
   reproducible; Figma values and API visibility are observations from
   2026-07-04 and must be checked again.
3. **Create issues in dependency order.** Start with artifact
   correctness, then data integrity and documentation, followed by
   contrast metadata, semantic migration, modes and responsive output.
   The exact order and acceptance criteria are in
   `docs/token-quality-roadmap.md`.
4. **Port acceptance criteria, not solutions.** The real repository may
   use a different generator, component API or test runner. Preserve
   the observable contract.
5. **Close with packed-artifact evidence.** Validate the result of
   `npm pack`, not only source files or a local build directory.
6. **Update official documentation.** Fold accepted component and
   accessibility guidance into the real documentation site so this
   repository is not a permanent second source of truth.
7. **Archive this repository.** Once issues and relevant docs have been
   transferred, leave a pointer to the official locations and stop
   updating the PoC.

## Definition of done for the handoff

- Every P0/P1 item in `docs/token-quality-roadmap.md` has an upstream
  issue URL, owner and disposition.
- Current Figma evidence is attached where a design decision is needed.
- Accepted recommendations have tests in the real repository.
- Rejected recommendations record the technical reason, so dated
  findings are not repeatedly rediscovered.
- Official Kobber docs contain the guidance that consumers need.
- No production package or application imports code from this
  repository.

## Historical evidence limitations

- The PoC had 112 passing tests when audited, but its CI only installed
  React 19. React 18.3 was a dated local verification, not a permanent
  matrix.
- The axe run covered 12 hash routes plus `statisk.html` on desktop and
  only `#/` on mobile. It was not a full browser/AT certification.
- The contrast script contains 41 curated pairs, not an exhaustive
  machine-derived inventory.
- The reference implementation contains known API and semantic gaps
  listed in `docs/a11y-audit.md`; this reinforces why code must not be
  transplanted.
