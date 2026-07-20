# Kobber sett fra en konsument — og fra en KI-agent

Vennlig og konstruktiv tilbakemelding til Kobber-teamet, basert på en
React-referanse-PoC fra juli 2026: **33 Kobber-komponentfamilier og 12
komponentforslag**, strukturanalyse av alle publiserte tokenverdier og
datert lesing av Figma-filen. Ingen kode fra PoC-en skal flyttes til
produksjon; denne rapporten, funnene og testmetoden er leveransen til
det ekte upstream-repoet.

Konkrete bugs/funn ligger i `docs/upstream-findings.md`
(formatkollisjon, tapte nullverdier, token-drift som bryter WCAG,
fokusfargen og hull i skalaene). Issue-klare akseptansekriterier ligger
i `docs/token-quality-roadmap.md`. Anbefalingene for
variabel-modes (mørk modus, barnemodus, temaer) er utdypet i
`docs/token-modes.md`, og for flytende clamp()-verdier i sidelayout i
`docs/responsive-tokens.md`. Dette dokumentet er
arkitektur- og strukturnivået. Tall og målinger er fra
`@gyldendal/kobber-tokens` 13.0.0 og Figma-filen per 2026-07-04;
analysene kan kjøres på nytt (se «Metode» nederst).

---

## Fugleperspektivet: dere har bygget mer enn de fleste

Først det som fortjener honnør, fordi det er reelt og uvanlig:

- **Komponent-tokens finnes, per komponent.** `button`, `filter`,
  `navigation-bar` … 64 grupper med ferdig utmålte verdier. Mange
  mellomstore designsystemer har bare globale tokens og overlater
  komponentene til gjetting. Vi bygde en hel komponentbibliotek-PoC
  nesten uten å spørre en designer — det er tokens-arbeidets fortjeneste.
- **Pakken eksporterer seks nyttige områder**: `primitives`,
  `semantics`, `universal`, `groups`, `components` og `layouts`.
  Referansegrafen er ikke en helt lineær sekslagskjede: `layouts` er en
  søskenkonsument, og enkelte lag refererer flere retninger nedover.
  Fundamentet for et førsteklasses system er likevel støpt.
- **Tokens publiseres på npm med semver.** Selvfølgelig for de store,
  sjeldent i praksis ellers.
- **Figma-variablene har god navnehygiene** (`button/background/color/
brand/primary/tone-a/fallback`) og komponent-props i Figma
  (color × level × tone) mapper 1:1 til kode-varianter. Vår Button-API
  er bokstavelig talt Figma-propene — det beste enkelttrekket ved å
  konsumere Kobber.
- **De målte parene er stort sett solide.** Av 41 manuelt kuraterte
  tekst/flate-par passerer 39 WCAG AA, de fleste med god margin
  (8:1–16:1). De to bruddene er samme fargepar. Matrisen er ikke en
  uttømmende sweep av alle tema- og produktvarianter.
- **Norske beskrivelser på komponentene** («Brukes når man endrer hva
  som vises innenfor samme grensesnitt») — vi siterer dem i JSDoc.
  Fortsett med det; det er dokumentasjon som følger med gratis.

---

## Slik strukturerer de store systemene seg

Referansepunkter: Material 3 (Google), Carbon (IBM), Polaris (Shopify),
Spectrum (Adobe), Primer (GitHub), Atlassian Design System. Ulike
selskaper, påfallende likt fasit på fem punkter:

| Prinsipp                              | Hvordan det ser ut hos de store                                                                                           | Kobber i dag                                                                                                               |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| **Rollebaserte semantiske tokens**    | M3: `md.sys.color.on-primary`; Carbon: `text-primary`, `layer-01`; Polaris: `color-bg-surface`; Primer: `fgColor.default` | Semantikklaget navngir _opphav_: `identity/base/aubergine-25`                                                              |
| **Par-tokens («on-farger»)**          | M3s `primary` + `on-primary` gjør tekst-på-flate til ett oppslag og kontrast verifiserbar                                 | Paringen er konvensjon («motsatt tone») som hver konsument må gjette                                                       |
| **Én tilstandsgrammatikk**            | Atlassian: alt har `.hovered`/`.pressed`-suffiks; Carbon: `-hover`-suffiks overalt                                        | Tre mekanismer om hverandre (se funn 3)                                                                                    |
| **Temaer som modes**                  | Carbon: white/g10/g90/g100 som token-sett; Primer/Atlassian: Figma variable modes → CSS-vars                              | Temaer (nature, fantasy…) er parallelle fargegrener i hvert komponent-token                                                |
| **Maskinformat med bevart intensjon** | Spectrum/Primer: DTCG-aktig JSON der aliaser står som `{color.text.primary}`; Style Dictionary-pipeline                   | Style Dictionary-pipeline finnes; CSS-buildene bevarer referansene, men JS-builden er flatet og kilde-JSON publiseres ikke |

På tvers av de seks referansesystemene finnes flere av de samme
modenhetstrekkene: offentlig maskinlesbar dokumentasjon, navigerbare
designressurser og planlagte deprecation-løp. Implementasjonen varierer
mellom systemene; poenget er den eksplisitte konsumentkontrakten, ikke
at alle seks løser hvert punkt likt.

---

## Funnene, med tall

### 1. Semantikklaget navngir opphav, ikke rolle

`semantics/color` er organisert som `identity/{brand,base,extended}/
aubergine-25` — altså _hvor fargen kommer fra_, ikke _hva den er til_.
En konsument kan ikke spørre systemet «hva er standard tekstfarge på en
brand-flate?»; man må kunne paletten utenat eller reverse-engineere
komponent-tokens.

Konsekvensen er målbar i hele pakken: **1 024 hex-forekomster, men bare
123 unike farger**. Komponentområdet alene har 526 hex-blader og 84
unike farger. Gjentakelser som `#691837` og `#f9eaed` viser at samme
semantiske beslutning («mørk brand-tekst», «lys brand-flate») ofte
mangler et rollenavn. Tallene beskriver publiserte, resolverte verdier;
de sier ikke alene hvor mange kildedefinisjoner som er duplisert.

**Anbefaling:** Gi semantikklaget rollenavn — `text/primary`,
`text/on-brand`, `surface/default`, `surface/brand`, `border/subtle` —
og la komponent-tokens peke på dem. De offentlige aliasdeklarasjonene
består, men mange dupliserte verdiavgjørelser kan bli én kildeverdi med
referanser. Tema-arbeid blir å bytte hva rollene peker på.

### 2. Tekst-på-flate-par er ikke tokens

Badge har bakgrunnsfarger men ingen tekstfarger. Button-teksten er
«text-label i motsatt tone» — en muntlig regel vi måtte utlede. Det er
nettopp her det eneste unike kontrastparet under kravet oppsto; samme
par ga to failures, i Button og valgt Filter. Det ble ikke fanget
upstream fordi **paringen ikke finnes som data og derfor ikke kan
oppdages og testes automatisk**.
M3 løser dette med `on-primary`/`on-surface`; Atlassian med
`color.text.inverse`. Med par-tokens kunne en pipeline-test målt alle
par ved hver publisering. PoC-en målte 41 manuelt kuraterte kandidatpar;
upstream bør eie et uttømmende pair-manifest.

### 3. Tilstandsmodellen: «fallback», sparsomme matriser og to hover-mekanismer

Dette er funnet med flest lag, så vi tar det grundig.

**a) Navnet `fallback`.** Hviletilstanden heter `fallback` — et navn som
beskriver _oppslagsmekanikken_ («bruk denne hvis tilstanden mangler»),
ikke designintensjonen. Industrikonvensjonen er `default`/`rest` eller
intet suffiks (Atlassian: `color.background.brand.bold` +
`…bold.hovered`; Carbon: `background` + `background-hover`). For en
leser signaliserer «fallback» feilhåndtering; vi har målt at det også
smitter («search/background/color/fallback» er i praksis feltets
_eneste_ normalfarge). Ren omdøping — behold gjerne `fallback` som
deprecated alias én major.

**b) Sparsom tilstandsmatrise gjør fravær tvetydig.** Regelen «en
tilstand får bare token når den avviker» høres økonomisk ut, men fravær
betyr i dag tre ulike ting:

- `button/…/toneA = { fallback, hover }` — pressed mangler = «samme som
  fallback»?
- `menu-item/background/color = { hover, pressed }` — _hvile_ mangler =
  «transparent» (implisitt!).
- Andre grupper mangler hover helt = «ikke designet ennå»?

En konsument (menneske eller maskin) kan ikke skille intensjon fra
glemsel. Løsningen er ikke å duplisere verdier — det er **eksplisitte
aliaser**: full matrise `default/hovered/pressed/disabled` der
identiske tilstander _refererer_ default. Samme vedlikeholdskostnad
(én verdi), men komplett og lintbar: manglende tilstand blir byggefeil,
og maskiner kan generere komponentkode mekanisk. Det er nøyaktig det
referansegrafen deres allerede kan uttrykke.

**c) Samme slot, to komposisjonsmodeller.** I
`filter/background/color` er `hover = #1d00011a` — en _gjennomsiktig
overleggsfarge_ som skal males oppå flaten — mens `active = #dc134f` er
en _erstatningsfarge_. Søskenverdier i samme gruppe krever altså to
ulike renderingsteknikker, og ingenting i tokenet sier hvilken.
Overleggs-ideen er i seg selv smart (én hover som virker over alle
temafarger — M3 kaller det _state layers_), men den bør være et eget,
navngitt konsept (`state-layer/hover`, jf. `universal/hover` som
allerede halvveis finnes) — ikke en utypet farge i samme slot som
erstatningsfarger. I dag finnes dessuten tre mekanismer parallelt:
{fallback,hover}-objekter (42), søsken-tokens (982 rene strenger) og
universal-overlegget.

**d) Tilstandsvokabularet varierer**: `active` (filter, search) og
`pressed` (menu-item) brukes uten en publisert state-taksonomi. De er
ikke nødvendigvis samme tilstand: `pressed` bør normalt være
øyeblikkelig interaksjon, mens Filter sannsynligvis mener varig
`selected`.

**Anbefaling samlet:** `fallback` → `default`; komplett tilstandsmatrise
for states som faktisk gjelder for komponenten, via aliaser; skill
`state-layer` fra erstatningsfarger som to typede konsepter; skill
midlertidige states (`hovered`, `pressed`) fra varige (`selected`,
`checked`, `expanded`) — og lint applicability og vokabular. Ikke tving
alle komponenter inn i én universell matrise.

### 4. Navne- og skala-grammatikken spriker

Målt på hele pakken:

- `background/color` brukes **185** steder — men Text Module alene sier
  `color/background` (**22** steder). `text/color` 113 steder,
  `color/text` 0. Én komponent har altså motsatt ordstilling.
- Skalaer: `cards-and-modules/radius` har `{small, large}` (hull på
  medium), `menus/radius` har `{small, medium, large}`, `menus/space`
  har i tillegg `tiny`. Sammen med `padding.medium` vs
  `padding.inline.small`-varianter må hver gruppe læres separat.
- Mange palettformede nøkler (`aubergine-50`, `wine-150`…) ligger
  re-eksponert i gruppe-stier (`groups/buttons/color`,
  `groups/menus/color` …). En ny gjennomgang fant 241 hex-blader i
  `groups`; det tidligere tallet 305 kunne ikke reproduseres og skal
  ikke brukes som beslutningsgrunnlag.

**Anbefaling:** skriv en navnegrammatikk på én side (Polaris har en
forbilledlig: `--p-color-{property}-{role}-{variant}-{state}`) og lint
token-bygget mot den. Grammatikk + lint koster en dag og stopper all
fremtidig drift av dette slaget.

### 5. Publiseringen: god pipeline, men JS-konsumenter mister intensjonen — og utgivelsen er manuell

Først honnør der den hører hjemme, for her er dere lenger fremme enn vi
først antok: bygget er **Style Dictionary**, det finnes
valideringsskript (`validate-references`, `find-unused-tokens`), og
`dist/CHANGELOG.txt` genereres per versjon med semver-klassifisering og
ADDED/REMOVED-lister. Dessuten **bevarer CSS-byggene nesten hele
referansegrafen**: i `tokens.css` er 938 av 940
komponentdeklarasjoner `var()`-referanser (763 → groups, 175 →
semantics); to er literaler. Det finnes også literale
`#ffffff`-verdier i semantics og layouts, så «kun primitives har
literaler» er ikke en gyldig invariant. Lagdelingen er likevel nyttig
publisert i CSS.

En detalj kjeden avslører: `text-label/…/brand/tone-b` peker i 13.0.0 på
`semantics/typography/color/brand/aubergine-50`. Driften mot Figma
(`#fdf9f9` = aubergine-25) er altså en _ompeking av den semantiske
referansen_ — nok et argument for at referansene, ikke bare verdiene,
bør være synlige for alle konsumenter.

To ting gjenstår:

- **JS-builden flater ut.** `dist/tokens.js` — det formatet
  React/TypeScript-konsumenter (og agenter) bruker — har bare literale
  hex-verdier; om `button/background` peker på et semantisk token er
  usynlig. Kilde-JSON-en (design-token-eksporten som CSS og JS bygges
  fra) ligger ikke i `dist`. Konsekvens: CSS-konsumenter kan spore
  intensjon, JS-konsumenter kan ikke.
- **Utgivelsen er ikke pipeline-gatet.** Pakke-README-en beskriver både
  en automatisert `/release`-kommando og en manuell fallback, men ingen
  publisert provenance som knytter npm-artefakten til en Figma-eksport.
  Figma-observasjonen 2026-07-04 var `#fdf9f9`, mens npm 13.0.0 fortsatt
  publiserte `#f9eaed` 2026-07-20. Re-verifiser kilden før årsaken
  konkluderes; forskjellen beviser drift, ikke hvilket prosessteg som
  feilet.

**Anbefaling:** (a) legg kilde-JSON-en (gjerne i W3C DTCG-format med
`$value`/`$type` og aliaser) i `dist`, og lag eventuelt en egen
JS-formatter som publiserer referanser. Style Dictionarys innebygde
JS/ESM-format bevarer ikke aliaser bare ved å skru på
`outputReferences`; det krever formatterarbeid og kontraktstester.
(b) Automatiser publiseringen
(eller minst en CI-diff Figma ↔ siste npm) slik at endringer i Figma
ikke kan bli liggende upublisert ubemerket. Changelog-genereringen dere
har er forbilledlig — gjør den gjerne maskinlesbar (JSON ved siden av
txt) med deprecation-markører.

### 6. Fundamenter som mangler (og ett som var gjemt)

- **Motion: 0 tokens** (duration/easing finnes ikke). Referanse-PoC-en
  foreslo `120/240/400 ms` + enter/exit-easing; seks av tolv
  Lab-forslag importerte settet direkte.
- **Breakpoints: 0 tokens.** Vi har hardkodet 768 px; M3s window size
  classes er en god mal.
- **Elevation:** `primitives/elevation/zindex` finnes, men skygger
  ligger spredt uten felles skala knyttet til flatenivåer. De 52 målte
  shadow-relaterte bladene er pakkeomfattende, ikke 52
  komponentverdier.
- **Gjemt gull:** `universal/focus` og `universal/disabled` er
  glimrende — men udokumenterte. Fokusringens tiltenkte offset
  (`focus/container/padding`) må dokumenteres som krav
  (upstream-funn 3).

### 7. Figma-filen er lukket for maskiner

Per Figma-API-lesingen **2026-07-04** så klienten 3 sider i filen —
«Introduksjon», «Text» og «Filter». Resten var bare tilgjengelig via
direkte node-lenker. Tilgang, publiseringsstatus og sidetall kan ha
endret seg; re-verifiser dette før funnet sendes som issue.
For oss betydde det manuell venting på lenker; for verktøy som Code
Connect, dokumentasjonsgeneratorer og designlinting betyr det at de
ikke kan kjøre i det hele tatt.

**Anbefaling:** gjør bibliotekssidene synlige/navigerbare (én side per
komponentkategori er nok), publiser biblioteket, og legg **Code
Connect**-mappinger fra komponentsett til kode når referanse-
implementasjonen(e) stabiliserer seg. Beskrivelsesfeltene bør fylles på
alle komponenter (bruk + UU-noter) — de dere har skrevet er allerede
sitert ordrett i vår kodedokumentasjon.

### 8. Trengs både `groups` og `semantics`?

Komponenter har i dag 763 referanser til `groups` og 175 til
`semantics`. `groups` øker grafdybden og er stedet der mange
palettformede aliaser re-eksponeres, men laget har også reell gjenbruk:
en måling fant 146 gruppevariabler med flere konsumenter.
**Anbefaling:** behold delte kategoriroller som uttrykker intent, fjern
ubrukte og én-til-én passthrough-aliaser, og forby rå
palett-reeksponering. Pensjonering av hele laget er ikke begrunnet uten
migrerings- og bruksmåling.

### 9. Alfakanal bakes inn i hex

**132 forekomster** er 8-sifrede hexer (`#1d00011a`), fordelt på 29
unike transparente farger — farge og opasitet limt sammen. Intensjonen
(«aubergine-1000 på 10 %») går tapt, og
verdien kan ikke følge en fargerolle i mørk modus. `primitives/opacity`
finnes allerede — la overlegg og skygger være _par_ (fargereferanse +
opasitetsreferanse) eller egne typede tokens, så overlever intensjonen
både modes og verktøy. (Samme gjelder vår side: vi har måttet lime
`${farge}66` for skygger — en skygge-/elevation-skala hadde fjernet
behovet, jf. funn 6.)

---

## Hvordan en KI-agent helst konsumerer et designsystem

Dette er kanskje det mest fremtidsrettede perspektivet vi kan tilby:
store deler av denne implementasjonen ble bygget av en KI-agent med
tokens-pakken og Figma-APIet som eneste sannhetskilder. Erfaringen,
rangert etter hva som faktisk kostet og reddet tid:

1. **Ett maskinlesbart kontaktpunkt reddet prosjektet.** At hele
   systemet kan importeres som et ESM-objekt gjorde at agenten kunne validere 33
   komponenter uten å forstyrre en designer. Dette er Kobbers største
   styrke i dag — behold den for enhver pris.
2. **Alt som krever et menneske i loopen, stopper en agent.** Skjulte
   Figma-sider → agenten må be om node-lenker → timer tapt. Synlige
   sider + publiserte variabler + stabile node-IDer gjør designfilen
   like scriptbar som npm-pakken.
3. **Rollenavn er prompts.** En agent (og en junior-utvikler) skal
   kunne oversette «deaktivert tekst på brand-flate» direkte til et
   tokennavn. `identity/extended/wine-600` krever palettkunnskap;
   `text/subtle/on-brand` krever ingenting.
4. **Eksplisitte par gjør kvalitet automatisk verifiserbar.** Vårt
   kontrastskript fant WCAG-bruddet på minutter — men bare fordi vi
   hadde håndkodet paringene. Lesbare on-token-navn må suppleres med et
   eksplisitt pair-manifest før pipelinen kan finne og teste alle
   foreskrevne kombinasjoner.
5. **Én tilstandsgrammatikk gjør komponenter genererbare.** Når
   hover/pressed/disabled alltid uttrykkes likt, kan en maskin skrive
   (og verifisere) styleVariants mekanisk. I dag må hver komponent
   inspiseres for hvilken av tre mekanismer den bruker.
6. **Bevarte aliaser = sporbar intensjon.** DTCG-referanser lar en
   agent svare «hvorfor er denne knappen mørkerød?» med en kjede
   (`button/bg → surface/brand → aubergine-750`) i stedet for en gjetning.
7. **Changelog + deprecations = automatiske migrasjoner.**
   `CHANGELOG.txt`-genereringen deres er allerede bedre enn hos mange —
   gjør den maskinlesbar (JSON) med deprecation-markører, så kan
   agenter skrive codemods for konsumentene ved major-versjoner.
   (Driften i 13.0.0 måtte vi likevel finne ved å diffe hex mot Figma —
   en publisert «bygget fra Figma-versjon X»-stämpel hadde avslørt den.)
8. **Kontraktstester bør følge tokens.** Kontrast på alle foreskrevne
   par, monotone skalaer, komplette par og navnegrammatikk hører hjemme
   i token-pipelinen. PoC-skriptet er metodeevidens; upstream bør skrive
   testen mot sitt kanoniske manifest og sin generator.

---

## Fem prioriterte anbefalinger

1. **Gjør genererte artefakter korrekte og paritets-testet.** Rett
   z-index-navnekollisjonen og de syv nullverdiene som mangler i JS/d.ts;
   gate kilde ↔ CSS ↔ JS ↔ TypeScript fra pakket tarball. Se
   `docs/token-quality-roadmap.md` punkt 1–3.
2. **Re-verifiser Figma-paret og publiser korrigert tokens-versjon.**
   Automatiser deretter provenance eller minst diff mellom godkjent
   Figma-eksport og npm. Konsumentene må fortsatt oppgradere og deploye.
3. **Innfør rollebaserte semantiske tokens og foreskrevne kontrastpar**
   (`surface/brand` + `text/on-brand`) gradvis, med Button og Filter som
   første migrering.
4. **Definer og lint navne-, alias- og state-grammatikk.** Skill
   `pressed` fra `selected`, state-layer fra erstatningsfarge, og la
   palettformede aliasnavn matche faktisk mål og alfa.
5. **Publiser maskinlesbar intensjon og provenance:** DTCG-kilde eller
   kanonisk manifest, maskinlesbar changelog/deprecations og stabile
   Figma-nodekoblinger. Åpne Figma-strukturen etter at dagens
   tilgangsstatus er re-verifisert.

All dokumentasjon, alle målinger og anbefalinger i `docs/` er ment som
underlag for Kobber-teamet. Pakker, demo og tester er bevismateriale
fra referanse-PoC-en, ikke kode som skal flyttes til produksjon.

---

## Metode

- **Tokens:** strukturanalyse av `@gyldendal/kobber-tokens` 13.0.0
  (fortsatt nyeste på npm 2026-07-20; 1 876 JS-bladverdier over seks
  eksportområder), pluss WCAG 2.x-måling av 41 kuraterte kandidatpar.
- **Figma:** variable defs per komponent-node og sideliste via
  Figma-API (kun lesing), 2026-07-04.
- **Referansesystemer:** offentlig dokumentasjon og token-pakker fra
  Material 3, Carbon, Polaris, Spectrum, Primer og Atlassian.
- **Praksis:** 33 komponentfamilier + 12 forslag validert i
  referanse-PoC, 112 automatiske tester inkl. SSR/hydrering. Axe ble
  kjørt på 12 hash-ruter + `statisk.html` på desktop og bare `#/` på
  mobil, med menyer åpne. React 18 ble verifisert i en datert lokal
  kjøring; den nåværende CI-en tester bare installert React 19.
