# Verifiserte funn til Kobber-teamet

> Se også `docs/design-system-review.md` — arkitekturnivået: hvordan
> tokens og Figma er strukturert sammenlignet med Material 3, Carbon,
> Polaris, Spectrum, Primer og Atlassian, og hvordan en KI-agent helst
> konsumerer designsystemet. `docs/token-quality-roadmap.md` gjør
> funnene under om til prioriterte issues med akseptansekriterier og
> testforslag.

Funn fra en referanse-PoC som konsumerte Kobber-tokens og Figma. Ingen
kode fra PoC-en skal flyttes til produksjon; dokumentasjonen er
leveransen. Pakkeanalysen er verifisert på nytt 2026-07-20 mot
`@gyldendal/kobber-tokens` **13.0.0** (fortsatt nyeste på npm).
Figma-evidensen ble lest via API 2026-07-04 og må re-verifiseres før
verdier endres.

## 1. Publiserte tokens er ute av synk med Figma — og driften bryter WCAG AA

Den viktigste oppdagelsen er ikke en designfeil, men **drift mellom
Figma-variablene og den publiserte npm-pakken**:

| Variabel                             | Figma-API 2026-07-04 | npm 13.0.0 |
| ------------------------------------ | -------------------- | ---------- |
| `text-label/text/color/brand/tone-b` | `#fdf9f9`            | `#f9eaed`  |

Konsekvensen treffer de to stedene fargen brukes som tekst på
primærfargen `#dc134f` (aubergine-primary):

| Par                                                    | Med npm-verdi       | Med Figma-verdi | Krav (AA, normal tekst) |
| ------------------------------------------------------ | ------------------- | --------------- | ----------------------- |
| Primærknapp (`button/background/brand/primary/tone-a`) | **4,24:1 — bryter** | 4,73:1 — OK     | 4,5:1                   |
| Valgt Filter (`filter/background/color/active`)        | **4,24:1 — bryter** | 4,73:1 — OK     | 4,5:1                   |

Verdien ble observert direkte i Figma-nodene Button (`1321:2319`) og
Filter (`3601:10313`) 2026-07-04. Begge paret da teksten med
`text-label/…/tone-b = #fdf9f9`. Inspiser gjeldende variabel og noder
før issue-et lukkes; pakkeanalysen alene beviser npm-verdien og
kontrastbruddet, ikke dagens Figma-verdi.

**Anbefaling:**

1. Re-verifiser dagens Figma-kilde. Hvis verdien fortsatt er
   `#fdf9f9`, republiser tokens-pakken — det retter WCAG-bruddet i
   produkter som oppgraderer til den nye versjonen.
2. Vurder automatisk synk eller en CI-diff mellom Figma variables og
   npm-pakken, slik at drift oppdages ved publisering.
3. Merk at marginen fortsatt er liten: `#fdf9f9` gir 4,73:1 og ren hvit
   gir 4,94:1 på `#dc134f`. Ved neste fargerevisjon er det verdt å gi
   primærparet mer luft.

## 2. Kontrastfeiing av kuraterte fargepar (41 par)

41 manuelt kuraterte tekst/bakgrunn-par fra komponentene er målt.
**39 av 41 passerer, de fleste med god margin** — de to bruddene i
denne matrisen skyldes samme fargepar. Dette er ikke en uttømmende
inventering av alle pakkevarianter: tema- og produktgrener er blant
annet ikke fullt dekket. Det er nettopp derfor foreskrevne par bør
publiseres som data i tokens-pakken.
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
`#dc134f`. Mot hvit sidebakgrunn er den 4,9:1. Dette er en observasjon
fra PoC-tolkningen, ikke et dokumentert WCAG-brudd i alle
implementasjoner: en ytre ring kan være synlig mot sidebakgrunnen selv
om den har lav kontrast mot kontrollen.

Tokenet `focus/container/padding: 4` antyder at ringen er ment å ligge
med luft rundt elementet (da måles den mot sidebakgrunnen, ikke
fyllfargen), men beviser ikke at alle komponenter skal bruke offset.
**Anbefaling:** dokumenter geometrien eksplisitt og test den på alle
foreskrevne flater. En tofarget ring (mørk + lys) er mer robust mot
ukjent underlag.

## 4. Mindre token-funn fra implementasjonen

Ikke feil, men hull vi har måttet jobbe rundt — nyttige å kjenne til:

- **Tilstandsmodellen («fallback»)**: navnet beskriver oppslagsmekanikk,
  ikke design (`default`/`rest` er konvensjonen); sparsomme
  tilstandsmatriser gjør fravær tvetydig (button mangler pressed,
  menu-item mangler hvile, vokabularet veksler active/pressed); og
  samme slot blander overleggsfarger (`filter/…/hover = #1d00011a`)
  med erstatningsfarger (`…/active = #dc134f`). Full analyse og
  anbefaling (eksplisitte aliaser + typet «state layer»):
  `docs/design-system-review.md` funn 3, samt funn 8 (groups-laget) og
  9 (132 hexer med innbakt alfa).

- **Badge har ingen tekstfarge-tokens** — bare bakgrunner. Vi utleder
  teksten fra `text-label` i motsatt tone (mørk flate → lys tekst).
  Dokumenter gjerne paringen som tokens, så den ikke må gjettes.
- **`cards-and-modules/radius`** har `small` og `large`, men ingen
  `medium` — skalaen har hull.
- **WIP-grupper med underscore** (`_textInput`, `_listElements`,
  `_dropdownMenu`, `_contextualNavigationBar`, `_dropdownItem`,
  `_slider`, `_sliderController`) ble brukt i referanse-PoC-en —
  ferdigstilling og stabilitetsmerking hjelper alle konsumenter.
- **Navigation Bar på mobil**: size=mobile-varianten skjuler menyen
  uten å vise en vei inn. Vi har implementert hamburger/disclosure
  (demo: øverste meny på mobil) — si ifra hvis dere vil designe et
  offisielt mønster, så bytter vi til det.
- **Ingen motion-tokens** (varighet/easing). Referanse-PoC-en foreslo
  et sett i `kobber-lab` (`motion.ts`: 120/240/400 ms +
  enter/exit-easing). Seks av tolv Lab-forslag brukte disse direkte;
  forslaget er derfor et utgangspunkt, ikke en ferdig systemkontrakt.
- **Komponenter produktene trenger uten tokens i dag**: tabs, avatar,
  tooltip, select, pagination, empty state, dialog, toast, skeleton,
  progress bar, stat card — alle ligger som kjørbare forslag med
  motivasjon/anatomi/UU/animasjonsspek i `docs/proposals/` og demoer
  under «Lab» i referansedemoen. De er forslag, ikke eksisterende
  Figma-komponenter.

## 5. Kritiske feil i genererte pakkeformater

Disse funnene ble reprodusert direkte fra npm-tarballen 2026-07-20 og
krever ikke Figma-tilgang:

1. **CSS-navnekollisjon:** z-index `1` og `-1` genereres begge som
   `--kobber-primitives-elevation-z-index-1`; den siste verdien `-1`
   overskriver `1`. Samme feil finnes i `--k-`-bygget.
2. **Syv nullverdier mangler i JS og TypeScript:** blant annet
   `primitives.size["0"]`, `primitives.opacity["0"]`,
   `primitives.elevation.zIndex["0"]`, Collapsible-gradientens start og
   `layouts.page.gap`. De finnes i CSS, men ikke i `tokens.js` eller
   `tokens.d.ts`.
3. **Aliasnavn motsier målet:** eksempler er
   `groups.inputs.color.aubergine-525 → wine-525`,
   `groups.badges.color.carmine-25 → carmine-50` og
   `groups.cardsAndModules.color.nostalgia-600 → nostalgia-850`.
4. **Alfanavn motsier verdien:** fire primitives med suffiks `-50%`
   inneholder alfabyte `1a`, omtrent 10 %.
5. **Publisert README har ugyldige eksempler:** den dokumenterer
   eksportene `component` og `spacing`, selv om pakken eksporterer
   `components` og ingen `spacing`, og den forklarer ikke at CSS-vars
   krever `.kobber-theme-default`.

Disse er høyere prioritert enn en større tokenarkitektur-migrering,
fordi de bryter tilliten til de publiserte artefaktene. Fullstendige
akseptansekriterier og testopplegg står i
`docs/token-quality-roadmap.md` punkt 1–6.

## Slik ble det målt

- Kontrast: WCAG 2.x-formelen, 8-sifrede hexer komposittert over den
  eksplisitte bakgrunnen eller hvit der matrisen bruker hvit.
- Pakke: `@gyldendal/kobber-tokens` 13.0.0 fra npm, verifisert
  2026-07-20. Tarball SHA-1:
  `919ef1f8047a1cca2dfc8bc283770ce74dd59e68`.
- Figma: variable defs per komponent-node, kun lest 2026-07-04; ikke
  re-verifisert 2026-07-20.
- Kjør på nytt: `cd packages/kobber && node scripts/contrast-report.mjs`.
- Automatisk side-feiing (axe-core over alle demosider):
  `apps/demo/scripts/axe-audit.mjs`. Se også `docs/a11y-audit.md`.
