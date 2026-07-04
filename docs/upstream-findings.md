# Funn til Kobber-teamet

Funn fra implementasjonen av Kobber som React-bibliotek, klare til å
sendes/limes inn i en issue. Målt 2026-07-04 mot
`@gyldendal/kobber-tokens` **13.0.0** (nyeste publiserte) og
Figma-filen `Kobber Komponentbibliotek` (variable defs lest via
Figma-API, kun lesing). Metode: WCAG 2.x relativ luminans; skriptet
ligger i `packages/kobber/scripts/contrast-report.mjs` og kan kjøres på
nytt etter en token-bump.

## 1. Publiserte tokens er ute av synk med Figma — og driften bryter WCAG AA

Den viktigste oppdagelsen er ikke en designfeil, men **drift mellom
Figma-variablene og den publiserte npm-pakken**:

| Variabel                             | Figma (nå) | npm 13.0.0 |
| ------------------------------------ | ---------- | ---------- |
| `text-label/text/color/brand/tone-b` | `#fdf9f9`  | `#f9eaed`  |

Konsekvensen treffer de to stedene fargen brukes som tekst på
primærfargen `#dc134f` (aubergine-primary):

| Par                                                    | Med npm-verdi       | Med Figma-verdi | Krav (AA, normal tekst) |
| ------------------------------------------------------ | ------------------- | --------------- | ----------------------- |
| Primærknapp (`button/background/brand/primary/tone-a`) | **4,24:1 — bryter** | 4,73:1 — OK     | 4,5:1                   |
| Valgt Filter (`filter/background/color/active`)        | **4,24:1 — bryter** | 4,73:1 — OK     | 4,5:1                   |

Verifisert direkte i Figma-nodene Button (`1321:2319`) og Filter
(`3601:10313`): begge parer teksten med `text-label/…/tone-b` =
`#fdf9f9`.

**Anbefaling:**

1. Republiser tokens-pakken fra gjeldende Figma-variabler — det retter
   WCAG-bruddet i alle produkter som bruker pakken (inkl. gyldendal.no)
   uten kodeendringer.
2. Vurder automatisk synk eller en CI-diff mellom Figma variables og
   npm-pakken, slik at drift oppdages ved publisering.
3. Merk at marginen fortsatt er liten: `#fdf9f9` gir 4,73:1 og ren hvit
   gir 4,94:1 på `#dc134f`. Ved neste fargerevisjon er det verdt å gi
   primærparet mer luft.

## 2. Kontrastfeiing av alle fargepar (41 par)

Alle tekst/bakgrunn-par komponentene definerer (paringene speiler
Figma) er målt. **39 av 41 passerer, de fleste med god margin** — de to
bruddene over er de eneste, og begge skyldes samme fargepar.
Highlights fra feiingen (fullstendig tabell genereres av skriptet):

| Komponent                       | Variant                                   | Kontrast    |
| ------------------------------- | ----------------------------------------- | ----------- |
| Button                          | brand-secondary-a                         | 13,03:1     |
| UI Button                       | success/warning/informative (begge toner) | 8,2–8,5:1   |
| Badge                           | brand-a / brand-b / neutral               | 7,5–14,7:1  |
| Alert                           | alle severities, tekst og ikon            | 8,2–8,5:1   |
| Text Module                     | alle fire flater                          | 11,3–16,4:1 |
| Sekundærtekst (`subtle/tone-a`) | på hvit og aubergine-25                   | 6,2–6,4:1   |

Godt jobbet — paletten er gjennomgående solid.

## 3. Observasjon: fokusfargen mot primærfargen

`focus/border/color` `#7155f0` måler **1,0:1** mot primærfargen
`#dc134f` — fokusringen er i praksis usynlig der den ligger helt inntil
en primærknapp eller valgt Filter. Mot hvit side-bakgrunn er den fin
(4,9:1).

Tokenet `focus/container/padding: 4` antyder at ringen er ment å ligge
med luft rundt elementet (da måles den mot sidebakgrunnen, ikke
fyllfargen). **Anbefaling:** dokumenter offset som et krav i
retningslinjene, eller definer en tofarget ring (mørk + lys) slik flere
designsystemer gjør for å være uavhengig av underlaget.

## 4. Mindre token-funn fra implementasjonen

Ikke feil, men hull vi har måttet jobbe rundt — nyttige å kjenne til:

- **Badge har ingen tekstfarge-tokens** — bare bakgrunner. Vi utleder
  teksten fra `text-label` i motsatt tone (mørk flate → lys tekst).
  Dokumenter gjerne paringen som tokens, så den ikke må gjettes.
- **`cards-and-modules/radius`** har `small` og `large`, men ingen
  `medium` — skalaen har hull.
- **WIP-grupper med underscore** (`_text-input`,
  `_contextual-navigation-bar`, `_slider`, `_dropdown-menu`,
  `_dropdown-item`, `_list-elements`) er i produksjon hos oss —
  ferdigstilling av disse er det som hjelper konsumentene mest.
- **Navigation Bar på mobil**: size=mobile-varianten skjuler menyen
  uten å vise en vei inn. Vi har implementert hamburger/disclosure
  (demo: øverste meny på mobil) — si ifra hvis dere vil designe et
  offisielt mønster, så bytter vi til det.
- **Ingen motion-tokens** (varighet/easing). Vi har foreslått et sett i
  `kobber-lab` (`motion.ts`: 120/240/400 ms + enter/exit-easing) som
  alle lab-komponentene bruker, med `prefers-reduced-motion`-støtte.
- **Komponenter produktene trenger uten tokens i dag**: tabs, avatar,
  tooltip, select, pagination, empty state, dialog, toast, skeleton,
  progress bar, stat card — alle ligger som kjørbare forslag med
  motivasjon/anatomi/UU/animasjonsspek i `docs/proposals/` og demoer
  under «Lab» i demo-appen.

## Slik ble det målt

- Kontrast: WCAG 2.x-formelen, 8-sifrede hexer komposittert over hvit.
- Kilder: `@gyldendal/kobber-tokens` 13.0.0 (npm) og Figma variable
  defs per komponent-node (kun lesing).
- Kjør på nytt: `cd packages/kobber && node scripts/contrast-report.mjs`.
- Automatisk side-feiing (axe-core over alle demosider):
  `apps/demo/scripts/axe-audit.mjs`. Se også `docs/a11y-audit.md`.
