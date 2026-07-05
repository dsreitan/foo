# Kobber sett fra en konsument — og fra en KI-agent

Vennlig og konstruktiv tilbakemelding til Kobber-teamet, skrevet etter å
ha implementert **33 Kobber-komponenter og 12 komponentforslag** i React
utelukkende fra tokens-pakken og Figma-filen, dokumentert og
tilgjengelighetstestet dem, og konsumert **hvert eneste token
programmatisk** — inkludert av en KI-agent som byggeverktøy. Det gjør
oss antakelig til den mest intensive konsumenten Kobber har hatt, og
denne rapporten er betalingen: hva som fungerer, hva de beste
designsystemene i verden gjør annerledes, og hva som ville gjort Kobber
til et system både mennesker og maskiner kan bygge feilfritt på.

Konkrete bugs/funn ligger i `docs/upstream-findings.md` (token-drift som
bryter WCAG, fokusfargen, hull i skalaene). Anbefalingene for
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
- **Arkitekturen har allerede seks lag**: `primitives` (14 fargefamilier,
  size, font, elevation, opacity, blur, spread) → `semantics` →
  `universal` (focus/disabled/hover) → `groups` → `components` →
  `layouts`. Fundamentet for et førsteklasses system er altså støpt;
  kritikken under handler om hvordan lagene brukes, ikke om at de mangler.
- **Tokens publiseres på npm med semver.** Selvfølgelig for de store,
  sjeldent i praksis ellers.
- **Figma-variablene har god navnehygiene** (`button/background/color/
brand/primary/tone-a/fallback`) og komponent-props i Figma
  (color × level × tone) mapper 1:1 til kode-varianter. Vår Button-API
  er bokstavelig talt Figma-propene — det beste enkelttrekket ved å
  konsumere Kobber.
- **Paletten er solid.** 39 av 41 tekst/flate-par passerer WCAG AA, de
  fleste med god margin (8:1–16:1). De to bruddene er samme fargepar og
  skyldes drift, ikke design.
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

I tillegg er alle fem _åpne_: dokumentasjonssidene genereres fra
tokens, Figma-bibliotekene er publiserte og navigerbare, og endringer
har changelog med deprecation-løp. Det er kontrakten som gjør at
hundrevis av team tør å bygge på dem.

---

## Funnene, med tall

### 1. Semantikklaget navngir opphav, ikke rolle

`semantics/color` er organisert som `identity/{brand,base,extended}/
aubergine-25` — altså _hvor fargen kommer fra_, ikke _hva den er til_.
En konsument kan ikke spørre systemet «hva er standard tekstfarge på en
brand-flate?»; man må kunne paletten utenat eller reverse-engineere
komponent-tokens.

Konsekvensen er målbar i komponentlaget: **1 024 fargeverdier, men bare
123 unike farger**. `#691837` er deklarert **56 ganger** under 56 ulike
stier, `#f9eaed` 42 ganger. Hver av dem er i praksis samme semantiske
beslutning («mørk brand-tekst», «lys brand-flate») som ikke har noe navn.

**Anbefaling:** Gi semantikklaget rollenavn — `text/primary`,
`text/on-brand`, `surface/default`, `surface/brand`, `border/subtle` —
og la komponent-tokens peke på dem. Da blir 56 deklarasjoner til én,
tema-arbeid blir å bytte hva rollene peker på, og dokumentasjonen
skriver seg selv.

### 2. Tekst-på-flate-par er ikke tokens

Badge har bakgrunnsfarger men ingen tekstfarger. Button-teksten er
«text-label i motsatt tone» — en muntlig regel vi måtte utlede. Det er
nettopp her det eneste WCAG-bruddet oppsto, og hvorfor det ikke ble
fanget: **paringen finnes ikke som data, så den kan ikke testes**.
M3 løser dette med `on-primary`/`on-surface`; Atlassian med
`color.text.inverse`. Med par-tokens kunne en pipeline-test målt alle
par ved hver publisering (vårt skript gjør dette på 41 par i dag —
gjerne stjel det).

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

**d) Tilstandsvokabularet varierer**: `active` (filter, search) vs
`pressed` (menu-item) for samme tilstand.

**Anbefaling samlet:** `fallback` → `default`; komplett tilstandsmatrise
via aliaser; skill `state-layer` fra erstatningsfarger som to typede
konsepter; ett vokabular (`hovered/pressed/…`) — og lint alt i
token-bygget.

### 4. Navne- og skala-grammatikken spriker

Målt på hele pakken:

- `background/color` brukes **185** steder — men Text Module alene sier
  `color/background` (**22** steder). `text/color` 113 steder,
  `color/text` 0. Én komponent har altså motsatt ordstilling.
- Skalaer: `cards-and-modules/radius` har `{small, large}` (hull på
  medium), `menus/radius` har `{small, medium, large}`, `menus/space`
  har i tillegg `tiny`. Sammen med `padding.medium` vs
  `padding.inline.small`-varianter må hver gruppe læres separat.
- **305 rå palettnøkler** (`aubergine-50`, `wine-150`…) ligger duplisert
  inn i 29 gruppe-stier (`groups/buttons/color`, `groups/menus/color` …)
  — paletten re-eksponeres per gruppe i stedet for å refereres.

**Anbefaling:** skriv en navnegrammatikk på én side (Polaris har en
forbilledlig: `--p-color-{property}-{role}-{variant}-{state}`) og lint
token-bygget mot den. Grammatikk + lint koster en dag og stopper all
fremtidig drift av dette slaget.

### 5. Publiseringen: god pipeline, men JS-konsumenter mister intensjonen — og utgivelsen er manuell

Først honnør der den hører hjemme, for her er dere lenger fremme enn vi
først antok: bygget er **Style Dictionary**, det finnes
valideringsskript (`validate-references`, `find-unused-tokens`), og
`dist/CHANGELOG.txt` genereres per versjon med semver-klassifisering og
ADDED/REMOVED-lister. Dessuten **bevarer CSS-buildene hele
referansegrafen**: i `tokens.css` er 938 av 939 komponent-deklarasjoner
`var()`-referanser (763 → groups, 175 → semantics), groups og semantics
refererer videre nedover, og kun primitives-laget inneholder literale
hex-verdier (96 stk). Lagdelingen er altså reelt publisert — i CSS.

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
- **Utgivelsen er et manuelt steg.** Figma sier i dag `#fdf9f9` der
  siste publiserte npm (13.0.0) sier `#f9eaed` — driften som er årsaken
  til WCAG-bruddet (`docs/upstream-findings.md` funn 1) er altså ikke
  en datamodellfeil, men et release-etterslep.

**Anbefaling:** (a) legg kilde-JSON-en (gjerne i W3C DTCG-format med
`$value`/`$type` og aliaser) i `dist` — eller bygg JS-varianten med
`outputReferences` — slik at JS/agent-konsumenter får samme sporbarhet
som CSS-konsumentene allerede har; med Style Dictionary på plass er
dette konfigurasjon, ikke ny pipeline. (b) Automatiser publiseringen
(eller minst en CI-diff Figma ↔ siste npm) slik at endringer i Figma
ikke kan bli liggende upublisert ubemerket. Changelog-genereringen dere
har er forbilledlig — gjør den gjerne maskinlesbar (JSON ved siden av
txt) med deprecation-markører.

### 6. Fundamenter som mangler (og ett som var gjemt)

- **Motion: 0 tokens** (duration/easing finnes ikke). Vi har foreslått
  et sett i kobber-lab (`120/240/400 ms` + enter/exit-easing) som 12
  komponentforslag allerede bruker.
- **Breakpoints: 0 tokens.** Vi har hardkodet 768 px; M3s window size
  classes er en god mal.
- **Elevation:** `primitives/elevation/zindex` finnes (bra!), men
  skygger ligger spredt som 52 komponent-verdier uten felles skala
  knyttet til flatenivåer (jf. Carbons `layer`-modell).
- **Gjemt gull:** `universal/focus` og `universal/disabled` er
  glimrende — men udokumenterte. Fokusringens tiltenkte offset
  (`focus/container/padding`) må dokumenteres som krav
  (upstream-funn 3).

### 7. Figma-filen er lukket for maskiner

Målt i dag: **APIet ser 3 sider** i filen — «Introduksjon», «Text» og
«Filter». Resten av biblioteket (40+ komponentsett) er usynlig for
API-et og kun tilgjengelig når et menneske limer en node-lenke i chat.
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

Referansekjeden er i dag fire hopp: komponenter → groups (763 av 938
referanser) → semantics → primitives. De store systemene klarer seg med
tre (primitiv → semantisk → komponent). `groups`-laget ser ut til å
være kategori-bekvemmelighet («fargene knapper bruker»), men det er
også laget der paletten re-eksponeres rått — 305 palettnøkler à la
`groups/buttons/color/aubergine-50` — og hvert ekstra hopp er et sted
drift og navnespriket kan oppstå. Når semantikklaget får rollenavn
(funn 1), blir spørsmålet konkret: hva sier `groups/buttons/color` som
ikke `surface/brand` + `text/on-brand` sier bedre? **Anbefaling:**
vurder å la groups-laget pensjoneres inn i semantikken som del av
rolle-omdøpingen — færre lag å holde konsistente, kortere kjeder å
resonnere om.

### 9. Alfakanal bakes inn i hex

**132 verdier** er 8-sifrede hexer (`#1d00011a`) — farge og opasitet
limt sammen. Intensjonen («aubergine-1000 på 10 %») går tapt, og
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
   systemet kan importeres som JSON gjorde at agenten kunne bygge 33
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
   hadde håndkodet paringene. Med on-tokens hadde pipelinen deres
   fanget det før publisering.
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
8. **Kontraktstester bør følge tokens.** Kontrast på alle par, monotone
   skalaer, komplette par, navnegrammatikk — alt er noen titalls linjer
   (våre ligger i `packages/kobber/scripts/contrast-report.mjs` og er
   fritt vilt). Kjør dem i token-pipelinen, ikke hos konsumentene.

---

## Fem prioriterte anbefalinger

1. **Publiser ny tokens-versjon fra gjeldende Figma, og automatiser
   utgivelsen** (eller minst en CI-diff Figma ↔ siste npm) — retter
   dagens WCAG-brudd uten kodeendringer hos noen konsument, og gjør at
   release-etterslep ikke kan bli usynlig drift. (Detaljer:
   `docs/upstream-findings.md` funn 1.)
2. **Rollebaserte semantiske tokens med on-par** (`surface/brand` +
   `text/on-brand`), og la komponent-tokens referere dem. Størst
   varig gevinst; kan gjøres gradvis komponent for komponent.
3. **Én navne- og tilstandsgrammatikk, lintet i token-bygget.**
   En side dokumentasjon + en lint-regel; stopper kategori 3 og 4 for
   alltid.
4. **Gi JS-konsumentene referansene CSS-buildene allerede har**: legg
   kilde-JSON (gjerne DTCG) i `dist`, eller bygg JS med
   `outputReferences` — konfigurasjon i Style Dictionary-oppsettet dere
   allerede kjører. Maskinlesbar changelog med deprecations på kjøpet.
5. **Åpne Figma-strukturen** (synlige sider, publisert bibliotek,
   beskrivelser overalt, Code Connect når koden er hjemme hos et team).

Og en stående invitasjon: alt vi har bygget — 33 komponenter, 12
dokumenterte forslag med demoer, kontrast- og axe-skriptene,
SSR-testene — er ment som underlag for dere. Demoen viser hele systemet
i bruk på realistiske sider, og `docs/proposals/` er ønskelisten vår i
prioritert rekkefølge.

---

## Metode

- **Tokens:** strukturanalyse av `@gyldendal/kobber-tokens` 13.0.0
  (1 876 bladverdier over seks eksport-lag; skript i repoets historikk),
  kontrastfeiing av 41 par (`packages/kobber/scripts/contrast-report.mjs`).
- **Figma:** variable defs per komponent-node og sideliste via
  Figma-API (kun lesing), 2026-07-04.
- **Referansesystemer:** offentlig dokumentasjon og token-pakker fra
  Material 3, Carbon, Polaris, Spectrum, Primer og Atlassian.
- **Praksis:** 33 komponenter + 12 forslag implementert, 112
  automatiske tester inkl. SSR/hydrering, axe-feiing av 13 sider,
  verifisert på React 18 og 19.
