# Kobber design system – component roadmap

Inventory sources: the [Kobber Komponentbibliotek Figma library](https://www.figma.com/design/zMcbm8ujSMldgS1VB70IMP/Kobber-Komponentbibliotek),
the token groups in `@gyldendal/kobber-tokens` v13 (`components.*`), and the
official `@gyldendal/kobber-components` package. Names prefixed with `_` in
the tokens are work-in-progress in Kobber's own taxonomy — expect churn.

Status legend follows Kobber's component lifecycle (from the Figma
"Introduksjon" page): design → tokens → development → review/QA → live.

## Done in this repo

- [x] **Text** — label/body/lead/title/heading/display (+ core typography styles)
- [x] **Button** — brand/neutral × primary/secondary/tertiary + UI Button (success/warning/informative), iconOnly
- [x] **Filter** — toggle chip with counter
- [x] **Badge** — brand/rettsdata/neutral × tone, statusCircle
- [x] **Dropdown** — trigger + menu (plain/filled)
- [x] **Text Input** — from WIP `_text-input` tokens; revisit when finalized
- [x] **Navigation Bar** — logo | menu | search trigger + profile

## Foundations

- [ ] **Icon package** — replace placeholder SVGs with the "Kobber Ikoner, grafikk og logoer" library / icon tokens (`universal.iconPackage`)
- [ ] **PP Mori webfont** — load the brand font (system-font fallback today); also Lyon Display (`textDisplay` alt) and Inter ("reading" text flavor)
- [ ] **Theming** — flip `styles/tokens.ts` to the CSS-variables token build; theme = redefining the semantic layer (`brand`, `rettsdata`, themes nature/fantasy/thriller/romance/vacation/nostalgia)
- [ ] **Reading vs brand typography** — body/title/lead have `reading` (Inter) variants for long-form content
- [ ] **Elevation tokens** — missing in Kobber; `styles/elevation.ts` carries a placeholder
- [ ] **Code Connect** — map the code components to their Figma counterparts
- [ ] **Logo component** — Gyldendal/product logos (used by Navigation Bar; Rettsdata variant exists in Figma)

## Actions

- [ ] **Theme Button** — mood variants for larger modules (nature/fantasy/thriller/…)
- [ ] **Button Group**
- [x] **Text Link** (`textLink` tokens, `.kobber-text-link`)
- [ ] **Nav Link / Nav Link Group** (`navLink`, `navLinkGroup`)

## Forms

- [x] **Checkbox / Checkbox Group** (official CSS exists — good reference)
- [x] **Radiobutton / Radio Group**
- [x] **Switch**
- [x] **Text Area** (Figma component set `text-area`)
- [x] **Search** — full search field with active/typing states (only the navbar trigger exists here)
- [ ] **Multiple Choice / Multiple Choice Item**
- [ ] **Slider** (`_slider`, `_sliderController` — WIP tokens)

## Navigation

- [x] **Breadcrumb / Breadcrumb Item**
- [ ] **Menu Item / Menu Item Groups**
- [ ] **Contextual Navigation Bar** (`_contextualNavigationBar` — WIP, own Figma section)

## Feedback

- [x] **Alert Label** — inline field/section alerts
- [x] **Alert Banner** — page-top alerts (success/informative/warning)
- [x] **Alert Accordion** — expandable secondary alerts
- [x] **Counter** — standalone (number/letter × neutral/brand/success/warning); Filter's counter is a starting point
- [ ] **Popover**

## Cards & modules

- [x] **Content Card** — article entry with title, ingress, badge, tags
- [x] **Product Card** — books/digital products
- [ ] **Navigation Card** — entry point to a content area
- [ ] **Feature Card** — image with text overlay (overlay-light/dark)
- [ ] **Info Card** — person/entity presentation
- [ ] **Profile Card**
- [ ] **Event Item**
- [ ] **Corner Box**
- [ ] **Media Box / Media / Media Brand**
- [ ] **Content Island**
- [ ] **Quote Module**
- [ ] **Text Module**
- [ ] **Review**
- [ ] **Feature Item Prominent**

## Content & layout

- [x] **List / list elements** (`list`, `_listElements`, LIST section on the Text page)
- [ ] **Collapsible**
- [ ] **Accordion Item / Accordion Group**
- [ ] **Divider**
- [ ] **Content Controls** (Figma set exists)
- [ ] **Content Wrapper / Content Top Block** — layout primitives on the `layouts` tokens
- [ ] **Media Player / Media Player Item** — video/audio playback (subtitles, speed, fullscreen)

## Suggested order

1. Forms cluster (Checkbox, Radio, Switch, Text Area, Search) — shared field
   patterns, official CSS to verify against
2. Feedback cluster (Alert Label/Banner/Accordion, Counter) — small, token-complete
3. Text Link + Breadcrumb + List — finishes typographic navigation
4. Content Card + Product Card — highest-value modules, exercise badge/text composition
5. Foundations: icon package + webfont early (they upgrade everything already built);
   theming when a second product (e.g. Rettsdata) needs it
