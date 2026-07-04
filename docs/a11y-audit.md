# Accessibility & usefulness audit

Date: 2026-07-04. Scope: every component in `packages/kobber` and
`packages/kobber-lab`, exercised through all 12 demo routes plus the
prerendered `statisk.html`.

## Method

- **Automated**: axe-core 4.12 via Playwright against every route, at
  desktop (1280px) and mobile (390px, hamburger menus open), plus
  interactive states (dialog open). Re-run until clean.
- **Behavioral**: the vitest suite (105 tests) locks the keyboard and
  ARIA contracts per component — roles, names, `aria-expanded/controls`,
  arrow-key patterns, focus return, SSR + hydration.
- **Manual spot-checks**: keyboard traversal of menus, tabs, dialog and
  pagination in Chromium.

## Findings and status

| #   | Finding                                                                                                                                                                                                     | Severity             | Status                                                                                                                                                                                                                                                 |
| --- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1   | `heading-order`: ContentCard/InfoCard/ProfileCard hardcoded `<h3>`, skipping levels on pages without an h2                                                                                                  | moderate             | **Fixed** — cards take `headingLevel` (2/3/4, default 3); demo pages set it to match their outline                                                                                                                                                     |
| 2   | `heading-order`: dashboard stat titles defaulted to h3 under an h1                                                                                                                                          | moderate             | **Fixed** — `<Text as="h2">` in the app                                                                                                                                                                                                                |
| 3   | Nav bar menus were unreachable on mobile (`display: none`)                                                                                                                                                  | serious (functional) | **Fixed** — hamburger/disclosure toggles with `aria-expanded` + `aria-controls` on both bars                                                                                                                                                           |
| 4   | `color-contrast`: primary button text on brand background is **4.24:1** (needs 4.5:1). `text-label/brand/toneB` `#f9eaed` on `button/background/brand/primary/toneA` `#dc134f` — the official token pairing | serious              | **Upstream** — report to the Kobber team; we do not deviate from tokens. Even `#ffffff` only reaches 4.94:1; the existing `aubergine-25` `#fdf9f9` would pass at 4.73:1. Until fixed in tokens, prefer secondary buttons for long labels of small text |

Everything else is clean: landmarks, labels, roles, focus management,
name computation, `aria-current`, list semantics, image alt handling.

## Per-component status

Legend: pattern = the APG/ARIA contract implemented and test-locked.
"Usefulness" flags overlap or open questions, not quality.

### packages/kobber

| Component                            | Pattern / a11y contract                                                                     | Usefulness verdict                                               |
| ------------------------------------ | ------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| Accordion                            | native `<details>/<summary>`                                                                | Keep — zero-JS disclosure                                        |
| Alert (Label/Banner/Accordion)       | `role="alert"` for warning, `role="status"` otherwise; banner dismiss is a labelled button  | Keep — three variants map to real use                            |
| Badge                                | text in a `<span>`, color never sole meaning                                                | Keep; document "pair with text, not color-only" stays in gallery |
| Breadcrumb                           | `<nav aria-label>` + `<ol>`, `aria-current="page"` on the last item                         | Keep — also drives drill-down (see `#/innhold`)                  |
| Button                               | native button; `iconOnly` requires `aria-label`; contrast finding #4                        | Keep                                                             |
| ButtonGroup                          | `role="group"` semantics via layout only                                                    | Keep, small                                                      |
| Checkbox / Radiobutton / Switch      | real native inputs, label-wrapped; Switch has `role="switch"`                               | Keep                                                             |
| Collapsible                          | button with `aria-expanded` + measured region                                               | Keep                                                             |
| ContentCard / InfoCard / ProfileCard | `<article>` + configurable `headingLevel` (finding #1)                                      | Keep; image-slot alt duties documented per component             |
| Counter                              | presentational `<span>`; meaning must come from adjacent text                               | Keep, but never standalone                                       |
| Divider                              | `<hr>`                                                                                      | Keep                                                             |
| Dropdown                             | APG menu-button: arrows/Home/End, Escape + focus return                                     | Keep — menus only; forms use lab Select                          |
| Filter                               | `aria-pressed` toggle with counter                                                          | Keep                                                             |
| List                                 | `<ul>/<ol>` with styled markers                                                             | Keep                                                             |
| Logo                                 | `role="img"` + alt prop                                                                     | Keep (placeholder until DAM)                                     |
| MenuItem                             | link with `aria-current="page"` when active                                                 | Keep                                                             |
| NavLink(Group)                       | `<nav aria-label>` landmark                                                                 | Keep                                                             |
| NavigationBar                        | landmarked menu; mobile hamburger disclosure (finding #3); labelled search/profile triggers | Keep                                                             |
| ContextualNavigationBar              | separately labelled `<nav>`; mobile disclosure toggle                                       | Keep                                                             |
| NavigationCard                       | one link named by its title; image slot `aria-hidden`                                       | Keep                                                             |
| Popover                              | `aria-expanded/controls`, outside-click + Escape with focus return                          | Keep — Dropdown builds on it                                     |
| ProductCard                          | whole card one link; price/subtitle inside the name                                         | Keep                                                             |
| QuoteModule                          | `<figure>/<blockquote>/<figcaption>`                                                        | Keep                                                             |
| Search                               | native `type="search"` input with `aria-label` default "Søk"                                | Keep                                                             |
| Text                                 | typography veneer; per-variant default elements, `as` override                              | Keep — the only text nesting allowed                             |
| TextArea / TextInput                 | real `<label htmlFor>` via `useId`                                                          | Keep (WIP tokens)                                                |
| TextLink                             | native anchor, underline not color-only                                                     | Keep                                                             |
| TextModule                           | `<section aria-label>` colored surface; text color cascades                                 | Keep                                                             |

### packages/kobber-lab (proposals)

| Component   | Pattern / a11y contract                                                              | Usefulness verdict                                    |
| ----------- | ------------------------------------------------------------------------------------ | ----------------------------------------------------- |
| Avatar      | `role="img"` + name when initials; alt duties documented                             | Keep — lists/comments need it                         |
| Dialog      | native `<dialog>` + `showModal`: platform focus trap, Escape                         | Keep                                                  |
| EmptyState  | `<h2>` title so the state appears in heading navigation; illustration `aria-hidden`  | Keep                                                  |
| Pagination  | `<nav aria-label>`, `aria-current="page"`, full button names, `aria-hidden` ellipsis | Keep                                                  |
| ProgressBar | `role="progressbar"` with clamped `aria-valuenow`                                    | Keep                                                  |
| Select      | native `<select>` + real label — platform semantics                                  | Keep — fills the Dropdown-vs-form gap                 |
| Skeleton    | `aria-hidden`; app must pair with a `role="status"` announcement                     | Keep, with the documented duty                        |
| StatCard    | plain text pairs, no fake semantics                                                  | Keep                                                  |
| Tabs        | APG tabs, automatic activation, roving tabindex                                      | Keep                                                  |
| Toast       | `role="status"`/`alert`; stacking & timing owned by the app                          | Keep                                                  |
| Tooltip     | `aria-describedby`, hover _and_ focus, Escape dismiss (WCAG 1.4.13)                  | Keep — but never for content that exists nowhere else |

## Re-audit checklist for new components

1. Add the component to a demo page (axe covers it on the next sweep).
2. Lock its keyboard/ARIA contract in a test.
3. Add it to the SSR matrix.
4. Re-run the sweep: `apps/demo/scripts/axe-audit.mjs` (usage in its
   header). The known-upstream finding #4 is the only accepted failure.
