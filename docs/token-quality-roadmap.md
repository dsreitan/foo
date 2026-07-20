# Kvalitets- og arkitekturplan for Kobber-tokens

Dette dokumentet er et issue-klart handoff til det ekte
`@gyldendal/kobber-tokens`-repoet. Referanse-PoC-en i dette repoet skal
ikke flyttes til produksjon; det er funnene, akseptansekriteriene og
testmetoden under som skal overføres.

## Evidenspolicy

### Bekreftet pakkeevidens

Funn merket **bekreftet** er reprodusert fra
`@gyldendal/kobber-tokens@13.0.0`, hentet fra npm 2026-07-20:

- npm rapporterte 13.0.0 som nyeste versjon;
- tarball SHA-1 er `919ef1f8047a1cca2dfc8bc283770ce74dd59e68`;
- begge CSS-byggene har 1 883 deklarasjoner, men bare 1 882 unike navn;
- JavaScript har 1 876 bladverdier; `tokens.d.ts` speiler utelatelsene.

Pakkeevidens viser hva som faktisk er publisert. Den avgjør ikke om et
navn eller en verdi er designintensjonen når de motsier hverandre.

### Datert Figma-evidens

Følgende ble lest via Figma-API 2026-07-04 og må verifiseres på nytt før
en verdi endres:

- Button-node `1321:2319` og Filter-node `3601:10313` brukte
  `text-label/…/brand/tone-b = #fdf9f9` på `#dc134f`;
- npm 13.0.0 publiserer samme teksttoken som `#f9eaed`;
- kontrasten er 4,24:1 med npm-verdien og 4,73:1 med den observerte
  Figma-verdien;
- en manuelt kuratert matrise på 41 kandidatpar hadde 39 pass og to
  brudd, begge med dette paret.

Dette er verifikasjonsinput, ikke bevis på dagens Figma-tilstand.

---

## 1. P0 — hindre kollisjon mellom signerte CSS-tokennavn

**Problem (bekreftet):** Navnetransformen er ikke entydig. Kildestiene
for z-index `1` og `-1` blir begge til samme CSS-egenskap:

```css
--kobber-primitives-elevation-z-index-1: 1;
--kobber-primitives-elevation-z-index-1: -1;
```

Den siste deklarasjonen vinner, så den offentlige `+1`-egenskapen gir
`-1`. Feilen finnes med både `--kobber-`- og `--k-`-prefiks.

**Akseptansekriterier:**

- positive og negative nøkler får unike navn, for eksempel `1` og
  `negative-1`;
- ingen generert CSS-fil har dupliserte custom properties;
- begge prefiksbygg har identiske stier og verdier;
- navneendringen og den tvetydige gamle egenskapen dokumenteres med
  riktig semver- og migreringsbehandling.

**Test i upstream:**

- assert at kildevei → CSS-navn er én-til-én før serialisering;
- parse deklarasjoner som liste, slik at duplikater ikke forsvinner i
  et map;
- test eksplisitt `-1`, `0` og `1` i en liten generator-fixture.

## 2. P0 — bevar nullverdier i JavaScript og TypeScript

**Problem (bekreftet):** En truthiness-sjekk ser ut til å forkaste
gyldig numerisk `0`. Disse syv tokenene finnes i begge CSS-bygg, men
mangler i JavaScript og `tokens.d.ts`:

| Logisk sti                                 | Publisert CSS-egenskap                           |
| ------------------------------------------ | ------------------------------------------------ |
| `primitives.size["0"]`                     | `--kobber-primitives-size-0`                     |
| `primitives.elevation.zIndex["0"]`         | `--kobber-primitives-elevation-z-index-0`        |
| `primitives.opacity["0"]`                  | `--kobber-primitives-opacity-0`                  |
| `semantics.effect.gradient.stops["0%"]`    | `--kobber-semantics-effect-gradient-stops-0`     |
| `groups.collapsibles.gradient.stops["0%"]` | `--kobber-groups-collapsibles-gradient-stops-0`  |
| `components.collapsible.gradient.start`    | `--kobber-components-collapsible-gradient-start` |
| `layouts.page.gap`                         | `--kobber-layouts-page-gap`                      |

**Akseptansekriterier:**

- alle syv stier finnes ved runtime og i `tokens.d.ts`, med verdi `0`;
- validering skiller nullish/manglende verdi fra `0`;
- kilde, JS og deklarasjoner har samme bladstier, bortsett fra
  eksplisitte og dokumenterte unntak.

**Test i upstream:** Direkte regresjonstester for stiene over, pluss en
fixture med numerisk `0` og en flerstegs aliaskjede som resolver til
`0`. Test `null` og `undefined` separat etter den kildekontrakten som
velges; de må aldri forveksles med tallet `0`.

## 3. P0 — gjør alle publiserte formater til én kontrakt

Kollisjonen og nulltapet er symptomer på at CSS, JS og TypeScript testes
hver for seg. Bygget bør lage et kanonisk manifest per kildeblad med:

- logisk sti og type;
- rå verdi eller aliaskilde;
- resolvert verdi;
- forventet CSS-navn for begge prefiks;
- om tokenet er offentlig eller eksplisitt utelatt.

**Akseptansekriterier:**

1. Hvert offentlig kildeblad finnes nøyaktig én gang i hvert CSS-bygg.
2. CSS-navn er unike og byggene avviker kun i prefikset.
3. CSS bevarer forventet alias og resolver til forventet plattformverdi.
4. JS har nøyaktig én tilsvarende sti og riktig resolvert verdi.
5. `tokens.d.ts` har samme sti og kompatibel literal/type som JS.
6. Ingen output har uforklarte ekstrastier.
7. Alle eksportene testes fra resultatet av `npm pack`, ikke bare fra
   arbeidskopien.

Testene må dekke `0`, negative nøkler, prosentnøkler, alfafarger og
flerstegs aliaser. Parse `tokens.d.ts` med TypeScript-API i stedet for
tekst-snapshots.

## 4. P1 — avklar aliasnavn som motsier målverdien

Pakken beviser motsigelsene under, men en designer må avgjøre om navnet
eller målet er riktig:

| Lokalt alias                                           | Nåværende mål                 |
| ------------------------------------------------------ | ----------------------------- |
| `groups.inputs.color.aubergine-525`                    | `wine-525`                    |
| `groups.badges.color.carmine-25`                       | `carmine-50`                  |
| `groups.cardsAndModules.color.nostalgia-600`           | `nostalgia-850`               |
| `groups.cardsAndModules.color.aubergine-150`           | `aubergine-250`               |
| `groups.popovers.effects.shadow.color.neutral-1000-10` | ugjennomsiktig `concrete-325` |

Det finnes også en publisert stavefeil: `augbergine-1000-10`.

**Akseptansekriterier:**

- designansvarlig velger om hvert alias skal omdøpes eller ompekes;
- palettformede navn matcher resolvert familie, trinn og eventuell alfa;
- stavefeilen får deprecated alias og migreringskart;
- changelog lister alle berørte komponentstier;
- rene navneendringer endrer ikke visuell verdi utilsiktet.

Legg til lint for terminalnavn på formen
`{familie}-{trinn}-{alfa?}`. Semantiske mappinger som
`neutral → concrete` må være eksplisitte.

## 5. P1 — la alfasuffiks og faktisk alfa være enige

**Problem (bekreftet):**

- `thriller.900-50%`, `nature.750-50%`, `purple.700-50%` og
  `green.700-50%` ender alle i alfabyten `1a`, omtrent 10 %;
- semantiske og gruppealiaser har flere lignende avvik, blant annet et
  `aubergine-25-10`-alias som peker på en 20 %-verdi.

**Akseptansekriterier:**

- designintensjon avgjøres før navn eller verdi endres;
- hvert alfabærende navn matcher resolvert alfa gjennom hele kjeden;
- omdøping og visuell verdiendring er separate changelog-poster.

Test primitive og resolverte aliaser ved å sammenligne suffikset `N`
med forventet alfabyte `round(N × 255 / 100)`.

## 6. P1 — gjør README-eksemplene kjørbare

Publisert README kan ikke følges ordrett:

- den importerer `component` og `spacing`; pakken eksporterer
  `components` og ingen `spacing`;
- eksemplet bruker `backgroundColor`, mens stien er
  `background.color`;
- CSS-eksemplet bruker entall `component` og mangler state-suffikset;
- variablene er scoped under `.kobber-theme-default`, uten at README
  ber konsumenten aktivere klassen;
- default-import av `CHANGELOG.txt` virker ikke i standard Node ESM
  uten egen loader.

Gyldige 13.0.0-eksempler er blant annet:

```ts
import { components } from "@gyldendal/kobber-tokens";

const color = components.button.background.color.brand.primary.toneA.fallback;
```

```css
html {
  /* add class="kobber-theme-default" in markup */
  color: var(--kobber-components-text-label-text-color-brand-tone-a);
}
```

**Akseptansekriterier:**

- alle import-, TS- og CSS-eksempler bruker reelle eksporter og stier;
- default theme-aktivering er eksplisitt;
- changelog-lesing beskrives portabelt eller merkes bundler-spesifikk;
- dokumentasjonen sier at JS-verdiene er resolverte literaler;
- fenced examples ekstraheres og kjøres mot en pakket tarball i CI.

Vurder også om runtime-kravet `>=22.20.0 <23` er nødvendig for statisk
ESM-data. Et build-krav bør ikke blokkere konsumenter på andre
støttede Node-versjoner.

## 7. P1 — publiser foreskrevne kontrastpar som data

On-token-navn gjør intensjonen lesbar, men gjør ikke et par testbart
alene. Publiser en kontraktmanifest med stabile ID-er og
tokenreferanser:

```json
{
  "id": "button.brand.primary.tone-a",
  "foreground": "{components.textLabel.text.color.brand.toneB}",
  "background": "{components.button.background.color.brand.primary.toneA.fallback}",
  "criterion": "WCAG2-AA-normal-text",
  "minimum": 4.5,
  "modes": "all"
}
```

Transparente farger trenger også en eksplisitt `backdrop`-referanse.

**Akseptansekriterier:**

- hvert systemforeskrevne par har unik ID, referanser, bruk/terskel og
  relevante modes;
- alle designforeskrevne forgrunn/bakgrunn-kombinasjoner er listet
  eller eksplisitt unntatt, også når forgrunn og bakgrunn kommer fra
  forskjellige områder som `textLabel` og `button`;
- referanser, duplikater, mode-dekning og kontrast valideres i pipeline;
- dagens Figma-paringer eies og godkjennes av designteamet før
  41-par-listen importeres.

## 8. P2 — innfør roller og eksplisitte states gradvis

Ikke gjør dette til en total ombygging. Start med Button, Filter og Menu
Item, og behold gamle offentlige stier som aliaser i et
deprecation-løp.

**Mål:**

- roller som `surface/brand`, `text/on-brand`, `text/subtle` og
  `border/default`;
- separate midlertidige interaksjoner (`rest`, `hovered`, `pressed`,
  `focused`, `disabled`) og varige states (`selected`, `checked`,
  `expanded`);
- state-layer-overlegg som eget typet konsept, ikke som søsken til
  erstatningsfarger;
- eksplisitt state-applicability per komponent/slot; fravær skal ikke
  kunne bety både «samme som rest» og «ikke designet».

Behold `groups`-aliaser som har reell gjenbruk. Fjern ubrukte og
én-til-én passthrough-aliaser; ikke pensjoner hele laget uten
bruksmåling.

**Akseptansekriterier for første komplette vertikale snitt:**

- Button, Filter og Menu Item har en godkjent state-tabell per slot med
  hvilke states som gjelder, hvilke som aliaser `rest`, og hvilke som
  ikke gjelder;
- midlertidige og varige states bruker forskjellig, dokumentert
  vokabular, og ugyldige kombinasjoner feiler lint;
- state-layer-tokens har egen type/metadata og kan ikke brukes som
  ugjennomsiktig replacement uten eksplisitt transform;
- tillatt referansegraf er dokumentert, for eksempel
  components → groups/semantics/universal, groups/universal →
  semantics/primitives etter eksplisitte regler, og semantics →
  primitives/foundations;
- sykluser, komponent→primitive-hopp uten allowlist, ukjent state og
  manglende applicability feiler bygget;
- migreringen har null resolverte verdiendringer med mindre en separat
  designendring er godkjent;
- gammel→ny-sti publiseres maskinlesbart, gamle stier er aliaser i en
  navngitt deprecation-periode, og fjerning skjer først i varslet major.

## 9. P2 — design modes etter semantisk eierskap

Farge, tetthet og produkttema er uavhengige beslutningsakser, men de kan
ikke alle redefinere samme CSS-variabel uten en eksplisitt
komposisjonsmodell.

**Akseptansekriterier:**

- primitives er stabile; komponenter peker på roller og trenger ikke
  egne mode-kopier;
- hver CSS-rolle eies av én dimensjon, eller kombinasjonsregelen er
  eksplisitt og testet;
- det er avgjort om nature/fantasy-lignende uttrykk er globale modes
  eller lokale innholdsvarianter som kan sameksistere på én side;
- alle støttede kombinasjoner testes for aliasoppløsning og kontrast;
- JS leverer CSS-var-referanser eller et mode-aware manifest, ikke én
  flat fil per kryssprodukt;
- SSR-kontrakten for eksplisitt mode dokumenteres og testes.

Se `docs/token-modes.md` for Figma- og CSS-anbefalingen. Inspiser
dagens Figma-oppsett før kolleksjonsstrukturen bestemmes.

## 10. P2 — generer flytende layout fra eksakte endepunkter

For 24 px ved 360 px viewport og 56 px ved 1440 px er korrekt lineær
interpolasjon omtrent:

```css
clamp(24px, 13.333333px + 2.962963vw, 56px)
```

Endepunktene bør være to vanlige dimension-tokens i en gruppe, ikke en
egendefinert DTCG composite-type. Pipeline genererer `clamp()`; Figma
kan eventuelt vise endepunktene som kompakt/bred forhåndsvisning.

**Akseptansekriterier:**

- kilde lagrer min, maks og viewportankere for hver flytende
  layoutrolle;
- begge ankere gir eksakt forventet verdi, og mellomverdier er monotone
  og innenfor intervallet;
- komponentanatomi forblir statisk; strukturelle skifter bruker
  breakpoints/container queries;
- flytende typografi beholder en rem-avhengig komponent og verifiseres
  ved 200 % tekstzoom.

Se `docs/responsive-tokens.md` for avgrensning og formel.

## Leveringsrekkefølge

1. Løs 1–3 som release-blokkerende byggekvalitet.
2. Avklar 4–5 med designansvarlig etter at paritetstestene finnes.
3. Rett 6 uavhengig, men bruk pakket-artifakt-testen fra 3.
4. Verifiser dagens Figma/source, og innfør 7.
5. Migrer roller/states i 8 med kontrastmanifestet som guardrail.
6. Innfør modes i 9 etter at semantisk eierskap er etablert.
7. Responsive tokens i 10 kan gå parallelt med arkitekturarbeidet når
   artifact contract-testene finnes.

Et issue er først ferdig når kilde, genererte artefakter, changelog,
migreringsnoter og kontraktstester er enige.
