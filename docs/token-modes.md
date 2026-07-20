# Anbefaling: modes i Kobber (mørk modus, barnemodus, temaer)

Til Kobber-teamet, som vurderer utvidede variabel-kolleksjoner i Figma.
Modes er riktig verktøy for mørk modus og barnemodus — og gjort riktig
løser de samtidig den største duplikasjonen vi har målt i dagens tokens.
Gjort feil multipliserer de den med antall modes. Dette dokumentet er
våre anbefalinger for Figma-siden og en konkret gjennomgang av hvordan
det spiller ut i kode, basert på erfaringen fra React-implementasjonen
(se `docs/design-system-review.md` for målingene det refereres til).

React-koden er en referanse-PoC som ikke skal adopteres. Målinger av
migreringsarbeid under illustrerer konsekvenser for en konsument; den
virkelige kostnaden må måles i upstream- og produktrepoene.

## Prinsippet alt annet følger av

**Modes bør som hovedregel eies av semantiske roller, ikke dupliseres i
primitives eller komponent-tokens.**

- _Primitives_ er normalt fysikk: `aubergine-750` bør være samme hex i
  alle modes. Dersom et produkttema faktisk har en annen palett, bør
  temaet velge mellom egne stabile foundations gjennom semantiske
  roller, ikke redefinere betydningen av `aubergine-750`.
- _Semantics_ er beslutninger: «standardflate», «primærtekst»,
  «kontrollhøyde». Det er beslutningene som endrer seg i mørk modus og
  barnemodus — altså er det her modes hører hjemme.
- _Komponent-tokens_ refererer semantikk og arver modes gratis. I npm
  13.0.0 er 938 av 940 komponentdeklarasjoner referanser (CSS-byggene) —
  arkitekturen deres er altså _bygget_ for dette. Én komponent-token som
  peker direkte på en primitive vil derimot stå stille når moden bytter;
  `validate-references`-skriptet bør håndheve en eksplisitt graf.
  Et mulig utgangspunkt er components → groups/semantics/universal,
  groups/universal → semantics/primitives etter dokumenterte unntak,
  og semantics → primitives/foundations. Dagens faktiske graf må
  kartlegges før regelen gjøres hard.

Konsekvensen i tall: med modes på semantikklaget er mørk modus i
størrelsesorden **50–100 nye rolleverdier**. Med modes på
komponentlaget ville vedlikeholdsflaten nærmet seg 940
komponentdeklarasjoner per mode.

## Kolleksjonsoppsettet i Figma

Modes er per kolleksjon i Figma. Farge, tetthet og produkttema er
uavhengige beslutningsakser, men separate kolleksjoner komponerer ikke
automatisk dersom flere akser redefinerer samme rolle. Tabellen er et
startpunkt som må bevises med en faktisk aliasgraf:

| Kolleksjon                   | Modes                                  | Innhold                                                                                                          |
| ---------------------------- | -------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| **Primitives**               | ingen                                  | palett, størrelsesskalaer, font-ramper (skjul fra publisering)                                                   |
| **Farge** (semantikk)        | `lys` / `mørk`                         | fargeroller: `surface/default`, `surface/brand`, `text/primary`, `text/on-brand`, `border/subtle`, `focus/ring`… |
| **Tetthet** (semantikk)      | `standard` / `barn`                    | skala-roller: `size/control-height`, `space/inset/*`, `text/size/*`, `size/touch-target`                         |
| **Tema** (semantikk, senere) | `kobber` / `nostalgia` / `fantasy` / … | brand-rollene per produkttema                                                                                    |
| **Components**               | ingen                                  | refererer semantikk-kolleksjonene                                                                                |

Tre begrunnelser som er verdt å ha med i beslutningen:

1. **Uavhengige dimensjoner bør kunne kombineres fritt.** Mørk + barn,
   lys + standard, mørk + nostalgia — med én kolleksjon per dimensjon
   unngår dere i utgangspunktet ett stort kryssprodukt. Men farge- og
   temakolleksjonen kan ikke begge skrive `surface/brand` uten en
   eierskapsregel. La for eksempel Theme velge brand-foundations som
   Color-rollene refererer, eller generer og test eksplisitte
   kombinasjoner.
2. **Barnemodus er tetthet, ikke farge.** Den endrer et lite sett
   skala-roller (kontrollhøyde 40 → 48/56, treffflate ≥ 44 px, større
   brødtekst, rausere inset/gap) — og ingenting annet. Jo færre roller
   som deltar i en mode, jo billigere er den å vedlikeholde og teste.
   Material 3s density-skala og «large touch targets» er gode referanser.
3. **Temaer kan fjerne målt duplikasjon når de faktisk er globale.** I
   dag ligger
   nostalgia/fantasy/nature… som parallelle grener i hvert
   komponent-token — vi målte enkeltfarger deklarert 25 ganger på tvers
   av komponenter per tema. Som mode på brand-rollene forsvinner hele
   den duplikasjonen, og nye produkttemaer blir én kolonne i én
   kolleksjon i stedet for en redigering av 64 komponentgrupper.
   Dersom uttrykkene kan sameksistere på samme side, er de derimot
   lokale innholdsvarianter og skal ikke modelleres som global app-mode.

**Forutsetningen** er funn 1 i hovedrapporten: rollenavn. En mode kan
ærlig si «`surface/default` er `#1a1114` i mørk modus»; den kan ikke si
«`aubergine-25` er noe annet enn aubergine-25». Døp om semantikklaget
til roller _som en del av_ modes-arbeidet — det er samme jobb, og modes
er argumentet som gjør den verdt det.

**Arbeidsflyt i Figma:** designere setter mode på side- eller
rammenivå; komponentene flipper automatisk fordi de refererer rollene.
Lag én QA-side per mode-kombinasjon dere støtter (lys/standard,
mørk/standard, lys/barn …) med de viktigste komponentene utstilt — det
er også siden verktøy tar skjermbilder av for visuell regresjon.

## Slik spiller det ut i kode

### Leveransen (tokens-pakken)

CSS-builden er allerede riktig formet for dette. Anbefalt output:

```css
:root {
  --k-color-surface-default: #fdf9f9; /* lys = default, inline */
  --k-density-control-height: 40px;
}
:root[data-mode="dark"] {
  --k-color-surface-default: #1a1114; /* kun fargerollene */
}
:root[data-density="barn"] {
  --k-density-control-height: 48px; /* kun skala-rollene */
}
@media (prefers-color-scheme: dark) {
  :root:not([data-mode]) {
    /* samme som data-mode="dark" */
  }
}
```

- Mode-blokkene inneholder **bare semantikk-rollene** — komponent- og
  gruppevariablene er referanser og trenger aldri per-mode-blokker.
  Det er gevinsten av referansegrafen dere allerede publiserer.
- `data-*`-attributter eller dokumenterte klasser på `<html>` er begge
  SSR-vennlige når serveren kjenner valget. Cookie-basert rendering kan
  hindre blink i SSR; statisk prerendering trenger en tidlig
  klientstrategi eller akseptert fallback.
- Stabile ASCII-slugs for modenavn (`dark`, `barn`) — de blir
  attributtverdier og filnavn.
- **JS-builden**: dagens flate schema representerer bare én mode.
  JavaScript kan representere flere modes med et annet schema, men
  ikke lag én `tokens.dark.js`-fil per kombinasjon. Tilby CSS-var-
  referanser eller et eksplisitt mode-aware objekt/manifest. Behold
  eventuelt dagens flate build som dokumentert statisk default-mode.

### Konsumentkontrakter observert i referanse-PoC-en

PoC-en viste hvilke kontrakter upstream må støtte, ikke en
implementasjon som skal gjenbrukes:

1. CSS-konsumenter trenger én dokumentert import og en eksplisitt
   default-selector; dagens pakke skjuler variablene bak
   `.kobber-theme-default`.
2. JS-konsumenter trenger enten `var(--k-…)`-referanser eller et
   mode-aware manifest. Dagens resolverte literaler kan bare
   representere én statisk mode.
3. Aritmetikk på tokenverdier må fungere når verdien er en CSS-var.
   Upstream bør tilby ferdige composites/`calc()` der kontrakten krever
   det, i stedet for at hver konsument parser eller ganger strenger.
4. Alfa må være et typet token/transform, ikke strengkonkatenering på
   hex.
5. SSR må ha en eksplisitt kontrakt for hvor mode-attributtet kommer
   fra. Cookie, tidlig klientkode og systempreferanse har ulike
   konsekvenser; PoC-en implementerte ikke modes og beviser derfor ikke
   blinkfri hydrering.

### Nye upstream-tester per mode

- **Kontrast**: etabler først et designgodkjent pair-manifest, og test
  deretter par × modes-matrisen. Gate i pipeline per mode før
  publisering.
- **axe-feiing**: upstream etablerer en egen audit per
  `data-mode`-kombinasjon; PoC-skriptet er bare metodeevidens.
- **Paritetslint**: hver variabel i en mode-kolleksjon skal ha verdi i
  alle modes (Figma faller stille tilbake til default — lint det i
  bygget).
- **Barnemodus-spesifikt**: assert at `size/touch-target` ≥ 44 px og at
  tekstroller ikke underskrider standardmodus.

## Rekkefølgen vi anbefaler

1. Døp om semantikklaget til roller (hovedrapportens funn 1) — modes er
   anledningen.
2. Innfør Farge-kolleksjonen med `lys`/`mørk` og flytt komponent-
   referanser over på rollene. Bruk mørk modus som første vertikale
   leveranse — den beviser hele kjeden Figma → pipeline → CSS → app.
3. Innfør Tetthet-kolleksjonen med `standard`/`barn` (få roller, stor
   produktverdi for skole-produktene).
4. Vurder Tema-kolleksjonen sist — størst opprydding (fjerner målt
   25×-duplikasjon), men også størst flytting.

Referansedemoen er bare en visuell illustrasjon. Upstream etablerer sin
egen mode-matrise og visuelle regresjon uten å kopiere eller tilpasse
PoC-kode, tester eller skript.
