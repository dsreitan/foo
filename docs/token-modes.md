# Anbefaling: modes i Kobber (mørk modus, barnemodus, temaer)

Til Kobber-teamet, som vurderer utvidede variabel-kolleksjoner i Figma.
Modes er riktig verktøy for mørk modus og barnemodus — og gjort riktig
løser de samtidig den største duplikasjonen vi har målt i dagens tokens.
Gjort feil multipliserer de den med antall modes. Dette dokumentet er
våre anbefalinger for Figma-siden og en konkret gjennomgang av hvordan
det spiller ut i kode, basert på erfaringen fra React-implementasjonen
(se `docs/design-system-review.md` for målingene det refereres til).

## Prinsippet alt annet følger av

**Modes bor i semantikklaget — aldri i primitives, aldri i
komponent-tokens.**

- _Primitives_ er fysikk: `aubergine-750` er samme hex i alle
  virkeligheter. Ingen modes.
- _Semantics_ er beslutninger: «standardflate», «primærtekst»,
  «kontrollhøyde». Det er beslutningene som endrer seg i mørk modus og
  barnemodus — altså er det her modes hører hjemme.
- _Komponent-tokens_ refererer semantikk og arver modes gratis. I dag er
  938 av 939 komponent-deklarasjoner allerede referanser (CSS-builden) —
  arkitekturen deres er altså _bygget_ for dette. Én komponent-token som
  peker direkte på en primitive vil derimot stå stille når moden bytter;
  `validate-references`-skriptet deres bør gjøres om til en hard regel:
  komponenter → groups/semantics, groups → semantics, kun semantics →
  primitives.

Konsekvensen i tall: med modes på semantikklaget er mørk modus i
størrelsesorden **50–100 nye verdier** (fargerollene). Med modes på
komponentlaget hadde det vært 939 × antall modes.

## Kolleksjonsoppsettet i Figma

Modes er per kolleksjon i Figma, og dimensjonene er uavhengige — derfor
én kolleksjon per dimensjon, ikke én kolleksjon med kryssproduktet:

| Kolleksjon                   | Modes                                  | Innhold                                                                                                          |
| ---------------------------- | -------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| **Primitives**               | ingen                                  | palett, størrelsesskalaer, font-ramper (skjul fra publisering)                                                   |
| **Farge** (semantikk)        | `lys` / `mørk`                         | fargeroller: `surface/default`, `surface/brand`, `text/primary`, `text/on-brand`, `border/subtle`, `focus/ring`… |
| **Tetthet** (semantikk)      | `standard` / `barn`                    | skala-roller: `size/control-height`, `space/inset/*`, `text/size/*`, `size/touch-target`                         |
| **Tema** (semantikk, senere) | `kobber` / `nostalgia` / `fantasy` / … | brand-rollene per produkttema                                                                                    |
| **Components**               | ingen                                  | refererer semantikk-kolleksjonene                                                                                |

Tre begrunnelser som er verdt å ha med i beslutningen:

1. **Uavhengige dimensjoner må kunne kombineres fritt.** Mørk + barn,
   lys + standard, mørk + nostalgia — med én kolleksjon per dimensjon
   får dere alle kombinasjoner uten å tegne dem; med alt i én kolleksjon
   måtte hver kombinasjon vært en egen mode (2 × 2 × 8 tema = 32 modes).
2. **Barnemodus er tetthet, ikke farge.** Den endrer et lite sett
   skala-roller (kontrollhøyde 40 → 48/56, treffflate ≥ 44 px, større
   brødtekst, rausere inset/gap) — og ingenting annet. Jo færre roller
   som deltar i en mode, jo billigere er den å vedlikeholde og teste.
   Material 3s density-skala og «large touch targets» er gode referanser.
3. **Temaer som mode fjerner målt duplikasjon.** I dag ligger
   nostalgia/fantasy/nature… som parallelle grener i hvert
   komponent-token — vi målte enkeltfarger deklarert 25 ganger på tvers
   av komponenter per tema. Som mode på brand-rollene forsvinner hele
   den duplikasjonen, og nye produkttemaer blir én kolonne i én
   kolleksjon i stedet for en redigering av 64 komponentgrupper.

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
- `data-*`-attributter (ikke klasser) på `<html>`: SSR-vennlig (rendres
  på serveren fra en cookie — ingen blink ved lasting), og media-query
  som fallback når brukeren ikke har valgt eksplisitt.
- Stabile ASCII-slugs for modenavn (`dark`, `barn`) — de blir
  attributtverdier og filnavn.
- **JS-builden**: flatede literaler kan per definisjon ikke uttrykke
  modes. Ikke lag `tokens.dark.js`-varianter (kombinatorikk); tilby i
  stedet en variant der verdiene er `var(--k-…)`-strenger. Behold gjerne
  dagens flate build som «statisk lys modus»-artefakt.

### Hva det koster i vårt React-bibliotek (målt)

Hele biblioteket leser tokens gjennom én fil (`styles/tokens.ts`) —
guardrailen «ingen råverdier i komponentfiler» var forberedelsen til
akkurat dette. Migreringen er:

1. Importer `k-tokens.css` (med modes) én gang i appen.
2. La `tokens.ts` levere `var(--k-…)`-strenger i stedet for literaler.
   vanilla-extract skriver strenger rett inn i CSS — **null endringer i
   komponentfilene** for alle rene oppslag.
3. Håndter unntakene, som er talt opp: av 295 `val()`-kall gjør **10**
   aritmetikk (`padding * 2`, `blur * 6`, `gap / 2`) → blir `calc()`,
   og en håndfull steder limer alfakanal på hex (`${farge}66`) → trenger
   en `color-mix()`- eller egen alfa-rolle. En dags arbeid, lokalisert.
4. Appen setter `<html data-mode data-density>` (cookie + serverrendring;
   demoens prerender-løype beviser mønsteret uten hydreringsblink).

### Testing per mode (billig, fordi det finnes fra før)

- **Kontrast**: dagens skript måler 41 par; med modes blir det par ×
  modes-matrisen. Mørk modus er historisk der kontrastfeil oppstår —
  gate i pipeline, per mode, før publisering.
- **axe-feiing**: kjør per `data-mode`-kombinasjon (samme skript, ett
  attributt å sette).
- **Paritetslint**: hver variabel i en mode-kolleksjon skal ha verdi i
  alle modes (Figma faller stille tilbake til default — lint det i
  bygget).
- **Barnemodus-spesifikt**: assert at `size/touch-target` ≥ 44 px og at
  tekstroller ikke underskrider standardmodus.

## Rekkefølgen vi anbefaler

1. Døp om semantikklaget til roller (hovedrapportens funn 1) — modes er
   anledningen.
2. Innfør Farge-kolleksjonen med `lys`/`mørk` og flytt komponent-
   referanser over på rollene. Skip mørk modus som første leveranse —
   den beviser hele kjeden Figma → pipeline → CSS → app.
3. Innfør Tetthet-kolleksjonen med `standard`/`barn` (få roller, stor
   produktverdi for skole-produktene).
4. Vurder Tema-kolleksjonen sist — størst opprydding (fjerner målt
   25×-duplikasjon), men også størst flytting.

Vi stiller gjerne demo-appen som testbenk: en mode-bryter i toppmenyen
og skjermbilder per kombinasjon er noen timers arbeid hos oss den dagen
en CSS med modes finnes å teste mot.
