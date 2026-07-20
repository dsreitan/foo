# Accessibility and usefulness audit — reference evidence

Date: 2026-07-04. Scope: every component in `packages/kobber` and
`packages/kobber-lab`, exercised through all 12 demo routes plus the
prerendered `statisk.html`.

This is an audit of a disposable reference PoC, not of the real Kobber
repository or production products. Code fixes marked “Fixed” happened
only in the PoC. Treat the written findings as requirements; write
independent upstream implementations and tests without copying or
adapting PoC artifacts.

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

| #   | Finding                                                                                                                                                                                                      | Severity             | Status                                                                                                                                                                                                                                                                                                                                |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | `heading-order`: ContentCard/InfoCard/ProfileCard hardcoded `<h3>`, skipping levels on pages without an h2                                                                                                   | moderate             | **Fixed in PoC** — cards take `headingLevel` (2/3/4, default 3); upstream should adopt an equivalent outline contract independently                                                                                                                                                                                                   |
| 2   | `heading-order`: dashboard stat titles defaulted to h3 under an h1                                                                                                                                           | moderate             | **Fixed in PoC** — `<Text as="h2">` in the app                                                                                                                                                                                                                                                                                        |
| 3   | Nav bar menus were unreachable on mobile (`display: none`)                                                                                                                                                   | serious (functional) | **Fixed in PoC** — hamburger/disclosure toggles with `aria-expanded` + `aria-controls`; Kobber should define the official mobile pattern                                                                                                                                                                                              |
| 4   | `color-contrast`: primary button text on brand background is **4.24:1** (needs 4.5:1). `text-label/brand/toneB` `#f9eaed` on `button/background/brand/primary/toneA` `#dc134f` — the published token pairing | serious              | **Upstream candidate** — Figma-API-observasjonen 2026-07-04 hadde `#fdf9f9` (4,73:1), mens npm 13.0.0 har `#f9eaed`. Re-verifiser dagens Figma-kilde; publiser en rettelse hvis avviket består. Produkter må oppgradere og deploye. Den separate, kuraterte matrisen hadde 2/41 brudd, begge dette paret: `docs/upstream-findings.md` |

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
The last column evaluates whether the need or pattern is relevant to
upstream. It never recommends retaining or copying a PoC component.

### packages/kobber

| Component                            | Pattern / a11y contract                                                                     | Upstream interpretation                                |
| ------------------------------------ | ------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| Accordion                            | native `<details>/<summary>`                                                                | Relevant zero-JS disclosure pattern                    |
| Alert (Label/Banner/Accordion)       | `role="alert"` for warning, `role="status"` otherwise; banner dismiss is a labelled button  | Three distinct needs; validate urgency rules           |
| Badge                                | text in a `<span>`, color never sole meaning                                                | Relevant; require non-colour meaning                   |
| Breadcrumb                           | `<nav aria-label>` + `<ol>`, `aria-current="page"` on the last item                         | Relevant navigation pattern                            |
| Button                               | native button; `iconOnly` requires `aria-label`; contrast finding #4                        | Core pattern; enforce accessible names                 |
| ButtonGroup                          | `role="group"` semantics via layout only                                                    | Re-evaluate whether a named group is required          |
| Checkbox / Radiobutton / Switch      | real native inputs, label-wrapped; Switch has `role="switch"`                               | Core native-control pattern; add named groups          |
| Collapsible                          | button with `aria-expanded` + measured region                                               | Relevant with clipped-focus caution                    |
| ContentCard / InfoCard / ProfileCard | `<article>` + configurable `headingLevel` (finding #1)                                      | Relevant; preserve contextual heading and image duties |
| Counter                              | presentational `<span>`; meaning must come from adjacent text                               | Relevant only with surrounding meaning                 |
| Divider                              | `<hr>`                                                                                      | Relevant native semantic                               |
| Dropdown                             | Menu-like keyboard behavior; APG roles are incomplete (see handoff cautions)                | Upstream must choose and complete one semantic pattern |
| Filter                               | `aria-pressed` toggle with counter                                                          | Relevant toggle pattern; clarify counter name          |
| List                                 | `<ul>/<ol>` with styled markers                                                             | Relevant native semantic                               |
| Logo                                 | `role="img"` + alt prop                                                                     | Relevant after DAM contract exists                     |
| MenuItem                             | link with `aria-current="page"` when active                                                 | Relevant navigation pattern                            |
| NavLink(Group)                       | `<nav aria-label>` landmark                                                                 | Relevant; avoid redundant unnamed landmarks            |
| NavigationBar                        | landmarked menu; mobile hamburger disclosure (finding #3); labelled search/profile triggers | Needs an official responsive pattern                   |
| ContextualNavigationBar              | separately labelled `<nav>`; mobile disclosure toggle                                       | Relevant when distinctly named                         |
| NavigationCard                       | one link named by its title; image slot `aria-hidden`                                       | Relevant single-link-card pattern                      |
| Popover                              | `aria-expanded/controls`, outside-click + Escape with focus return                          | Relevant after trigger composition is fixed            |
| ProductCard                          | whole card one link; price/subtitle inside the name                                         | Re-evaluate accessible-name verbosity                  |
| QuoteModule                          | `<figure>/<blockquote>/<figcaption>`                                                        | Relevant native semantic                               |
| Search                               | native `type="search"` input with `aria-label` default "Søk"                                | Relevant native-control pattern                        |
| Text                                 | typography veneer; per-variant default elements, `as` override                              | Relevant if semantic element remains selectable        |
| TextArea / TextInput                 | real `<label htmlFor>` via `useId`                                                          | Core pattern; add hint/error relationship              |
| TextLink                             | native anchor, underline not color-only                                                     | Core link pattern                                      |
| TextModule                           | `<section aria-label>` colored surface; text color cascades                                 | Re-evaluate whether every surface needs a landmark     |

### packages/kobber-lab (proposals)

| Component   | Pattern / a11y contract                                                                                                   | Upstream interpretation                                |
| ----------- | ------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| Avatar      | `role="img"` + name when initials; alt duties documented                                                                  | Relevant list/comment need                             |
| Dialog      | native `<dialog>` + `showModal`: platform focus trap, Escape; context-selectable heading                                  | High-value proposal; browser/AT validation required    |
| EmptyState  | context-selectable heading so the state appears in heading navigation; illustration `aria-hidden`                         | Relevant product pattern                               |
| Pagination  | `<nav aria-label>`, `aria-current="page"`, full button names, `aria-hidden` ellipsis                                      | Relevant navigation pattern                            |
| Pane(Group) | APG window splitter: `role="separator"`, `aria-value*`, arrows/Home/End; handles gone when panes stack on compact windows | Complex proposal; validate with AT                     |
| ProgressBar | `role="progressbar"` with clamped `aria-valuenow`                                                                         | Relevant status pattern                                |
| Select      | native `<select>` + real label — platform semantics                                                                       | Prefer native control                                  |
| Skeleton    | `aria-hidden`; app must pair with a `role="status"` announcement                                                          | Relevant with documented announcement duty             |
| StatCard    | plain text pairs, no fake semantics                                                                                       | Relevant composition pattern                           |
| Tabs        | APG tabs, automatic activation, roving tabindex                                                                           | High-value APG pattern; browser/AT validation required |
| Toast       | `role="status"`/`alert`; stacking & timing owned by the app                                                               | Relevant with urgency/timing policy                    |
| Tooltip     | `aria-describedby`, hover _and_ focus, Escape dismiss (WCAG 1.4.13)                                                       | Supplementary text only; validate with AT              |

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
