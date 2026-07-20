# Kobber design system — reference coverage matrix

Inventory sources: the [Kobber Komponentbibliotek Figma library](https://www.figma.com/design/zMcbm8ujSMldgS1VB70IMP/Kobber-Komponentbibliotek),
the token groups in `@gyldendal/kobber-tokens` v13 (`components.*`), and the
official `@gyldendal/kobber-components` package. Names prefixed with `_` in
the tokens are work-in-progress in Kobber's own taxonomy — expect churn.

This is a historical coverage matrix for the disposable reference PoC,
not an implementation backlog for this repository or the real Kobber
repository. Checked means “exercised in the PoC”, not “ready for
production”. Unchecked items are upstream design-system gaps or
unvalidated inventory. Transfer them as issues only when a real product
need and current Figma evidence exist.

## Validated in the reference PoC

- [x] **Text** — label/body/lead/title/heading/display (+ core typography styles)
- [x] **Button** — brand/neutral × primary/secondary/tertiary + UI Button (success/warning/informative), iconOnly
- [x] **Filter** — toggle chip with counter
- [x] **Badge** — brand/rettsdata/neutral × tone, statusCircle
- [x] **Dropdown** — trigger + menu (plain/filled)
- [x] **Text Input** — from WIP `_text-input` tokens; revisit when finalized
- [x] **Navigation Bar** — logo | menu | search trigger + profile

## Foundations

The unchecked items below were not completed in the PoC. They are
inputs to upstream prioritization, not tasks to implement here.

- [ ] **Icons from DAM** — replace placeholder SVGs when the DAM CDN has the icon set (npm icon packages are deprecated); URLs via src/assets/dam.ts
- [ ] **PP Mori webfont from DAM** — @font-face in apps/demo once the DAM CDN serves the font files; URLs via src/assets/dam.ts
- [ ] **Theming** — flip `styles/tokens.ts` to the CSS-variables token build; theme = redefining the semantic layer (`brand`, `rettsdata`, themes nature/fantasy/thriller/romance/vacation/nostalgia)
- [ ] **Reading vs brand typography** — body/title/lead have `reading` (Inter) variants for long-form content
- [ ] **Elevation tokens** — missing in Kobber; `styles/elevation.ts` carries a placeholder
- [ ] **Code Connect** — map the code components to their Figma counterparts
- [x] **Logo component** — placeholder wordmark; swap to DAM image when asset IDs exist

## Actions

- [ ] **Theme Button** — mood variants for larger modules (nature/fantasy/thriller/…)
- [x] **Button Group**
- [x] **Text Link** (`textLink` tokens, `.kobber-text-link`)
- [x] **Nav Link / Nav Link Group** (`navLink`, `navLinkGroup`)

## Forms

- [x] **Checkbox** (atomic native input)
- [ ] **Checkbox Group** — PoC never implemented the advertised
  `<fieldset>/<legend>` grouping contract
- [x] **Radiobutton** (atomic native input)
- [ ] **Radio Group** — PoC grouped only by shared `name`, without a
  named `<fieldset>/<legend>`
- [x] **Switch**
- [x] **Text Area** (Figma component set `text-area`)
- [x] **Search** — full search field with active/typing states (only the navbar trigger exists here)
- [ ] **Multiple Choice / Multiple Choice Item**
- [ ] **Slider** (`_slider`, `_sliderController` — WIP tokens)

## Navigation

- [x] **Breadcrumb / Breadcrumb Item**
- [x] **Menu Item / Menu Item Groups**
- [x] **Contextual Navigation Bar** (`_contextualNavigationBar` — WIP, own Figma section)

## Feedback

- [x] **Alert Label** — inline field/section alerts
- [x] **Alert Banner** — page-top alerts (success/informative/warning)
- [x] **Alert Accordion** — expandable secondary alerts
- [x] **Counter** — standalone (number/letter × neutral/brand/success/warning); Filter's counter is a starting point
- [x] **Popover**

## Cards & modules

- [x] **Content Card** — article entry with title, ingress, badge, tags
- [x] **Product Card** — books/digital products
- [x] **Navigation Card** — entry point to a content area
- [ ] **Feature Card** — image with text overlay (overlay-light/dark)
- [x] **Info Card** — person/entity presentation
- [x] **Profile Card**
- [ ] **Event Item**
- [ ] **Corner Box**
- [ ] **Media Box / Media / Media Brand**
- [ ] **Content Island**
- [x] **Quote Module**
- [x] **Text Module**
- [ ] **Review**
- [ ] **Feature Item Prominent**

## Content & layout

- [x] **List / list elements** (`list`, `_listElements`, LIST section on the Text page)
- [x] **Collapsible**
- [x] **Accordion Item / Accordion Group**
- [x] **Divider**
- [ ] **Content Controls** (Figma set exists)
- [ ] **Content Wrapper / Content Top Block** — layout primitives on the `layouts` tokens
- [ ] **Media Player / Media Player Item** — video/audio playback (subtitles, speed, fullscreen)

## Suggested upstream order

1. **Token artifact correctness:** CSS-name uniqueness, zero-value
   parity and packed-output contract tests
   (`docs/token-quality-roadmap.md` 1–3).
2. **Data and documentation integrity:** alias/alpha mismatches and
   executable package README examples (roadmap 4–6).
3. **Accessibility contract data:** re-verify the Figma contrast pair,
   publish prescribed foreground/background pairs, and define official
   mobile navigation and form-group patterns.
4. **Incremental architecture:** semantic roles, explicit state
   applicability, then modes and responsive output (roadmap 7–10).
5. **Component coverage:** prioritize remaining Figma components from
   real product demand. Do not continue the PoC implementation.

The former Forms → Feedback → Links → Cards build order is obsolete;
those clusters were only milestones for generating the reference
evidence.
