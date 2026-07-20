# Accessibility and usefulness audit — reference evidence

Date: 2026-07-04. Scope: every component in `packages/kobber` and
`packages/kobber-lab`, exercised through all 12 demo routes plus the
prerendered `statisk.html`.

This is an audit of a disposable reference PoC, not of the real Kobber
repository or production products. Code fixes marked “Fixed” happened
only in the PoC. Transfer the patterns and test cases, not the
implementation.

## Method

- **Automated**: axe-core 4.12 via Playwright. Desktop (1280px) covered
  all 12 hash routes plus `statisk.html`. Mobile (390px) covered only
  `#/`, with hamburger menus opened. The script did not open Dialog or
  run a full mobile route matrix.
- **Behavioral**: the vitest suite (112 tests as of the Pane addition) locks the keyboard and
  ARIA contracts per component — roles, names, `aria-expanded/controls`,
  arrow-key patterns, focus return, SSR + hydration.
- **Manual spot-checks**: keyboard traversal of menus, tabs, dialog and
  pagination in Chromium. No repeatable NVDA, VoiceOver or JAWS pass was
  recorded.

## Findings and status

| #   | Finding                                                                                                                                                                                                      | Severity             | Status                                                                                                                                                                                                                                                                                                          |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | `heading-order`: ContentCard/InfoCard/ProfileCard hardcoded `<h3>`, skipping levels on pages without an h2                                                                                                   | moderate             | **Fixed in PoC** — cards take `headingLevel` (2/3/4, default 3); upstream should adopt an equivalent outline contract independently                                                                                                                                                                               |
| 2   | `heading-order`: dashboard stat titles defaulted to h3 under an h1                                                                                                                                           | moderate             | **Fixed in PoC** — `<Text as="h2">` in the app                                                                                                                                                                                                                                                                  |
| 3   | Nav bar menus were unreachable on mobile (`display: none`)                                                                                                                                                   | serious (functional) | **Fixed in PoC** — hamburger/disclosure toggles with `aria-expanded` + `aria-controls`; Kobber should define the official mobile pattern                                                                                                                                                                         |
| 4   | `color-contrast`: primary button text on brand background is **4.24:1** (needs 4.5:1). `text-label/brand/toneB` `#f9eaed` on `button/background/brand/primary/toneA` `#dc134f` — the published token pairing | serious              | **Upstream** — root-caused to token DRIFT: current Figma has `#fdf9f9` for this variable (4.73:1, passes); npm 13.0.0 ships the stale `#f9eaed`. Republishing the tokens package fixes it everywhere. Full report + token-wide contrast sweep (41 pairs, 2 failures, both this pair): docs/upstream-findings.md |

Within the automated scope above, axe reported no other violations.
That is not evidence that every ARIA contract or assistive-technology
combination is correct. The separate contrast script found 2 failures
among 41 curated pairs on npm 13.0.0.

## Handoff cautions discovered after the audit

Do not copy these PoC patterns into the real repository without
resolving them:

- **Dropdown is not yet the APG menu-button it claims to be.** It has
  arrow-key behavior, but lacks `aria-haspopup="menu"`, `role="menu"`
  and `role="menuitem"`. Upstream must choose either a complete menu
  pattern or a simpler disclosure of native controls and test that
  contract.
- **Checkbox Group and Radio Group were not implemented**, despite
  `TODO.md` previously marking them done. Real groups need
  `<fieldset>/<legend>` or an equivalent named grouping contract.
- **Clipped Collapsible content can contain hidden focus targets.**
  Do not solve this by applying `aria-hidden` to the whole visible
  excerpt. Restrict the pattern to non-interactive text, or design a
  summary/details split where only the actually hidden remainder is
  inert.
- An always-associated Tooltip `aria-describedby` is not by itself a
  proven defect; it is a conventional pattern. Validate announcement,
  hover/focus persistence and Escape behavior with real assistive
  technology before changing it.

## Per-component status

Legend: pattern = the contract attempted and test-locked in the PoC.
It is reference input for upstream, not a production certification.

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
| Dropdown                             | Menu-like keyboard behavior; APG roles are incomplete (see handoff cautions)                 | Upstream must choose and complete one semantic pattern           |
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

| Component   | Pattern / a11y contract                                                                                                   | Usefulness verdict                                    |
| ----------- | ------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| Avatar      | `role="img"` + name when initials; alt duties documented                                                                  | Keep — lists/comments need it                         |
| Dialog      | native `<dialog>` + `showModal`: platform focus trap, Escape                                                              | Keep                                                  |
| EmptyState  | `<h2>` title so the state appears in heading navigation; illustration `aria-hidden`                                       | Keep                                                  |
| Pagination  | `<nav aria-label>`, `aria-current="page"`, full button names, `aria-hidden` ellipsis                                      | Keep                                                  |
| Pane(Group) | APG window splitter: `role="separator"`, `aria-value*`, arrows/Home/End; handles gone when panes stack on compact windows | Keep — workspaces need it                             |
| ProgressBar | `role="progressbar"` with clamped `aria-valuenow`                                                                         | Keep                                                  |
| Select      | native `<select>` + real label — platform semantics                                                                       | Keep — fills the Dropdown-vs-form gap                 |
| Skeleton    | `aria-hidden`; app must pair with a `role="status"` announcement                                                          | Keep, with the documented duty                        |
| StatCard    | plain text pairs, no fake semantics                                                                                       | Keep                                                  |
| Tabs        | APG tabs, automatic activation, roving tabindex                                                                           | Keep                                                  |
| Toast       | `role="status"`/`alert`; stacking & timing owned by the app                                                               | Keep                                                  |
| Tooltip     | `aria-describedby`, hover _and_ focus, Escape dismiss (WCAG 1.4.13)                                                       | Keep — but never for content that exists nowhere else |

## Re-audit checklist for the real repository

1. Put every component and relevant state on an upstream audit page.
2. Lock its keyboard/ARIA contract in browser-level tests where jsdom
   is insufficient.
3. Test server rendering/hydration if the real implementation supports
   SSR.
4. Run axe across the full desktop/mobile route-state matrix; keep
   Playwright and axe pinned in that repository.
5. Run the token contrast-pair manifest separately from axe.
6. Record repeatable NVDA and VoiceOver spot-checks for Dialog,
   Dropdown/menu, Tabs, Toast/live regions and Tooltip.
7. Accept no permanent failure solely because this PoC once classified
   it as upstream; re-evaluate against the current token and component
   version.
