# Anbefaling: flytende verdier (clamp) for sidelayout

Til Kobber-teamet: hvordan uttrykke responsiv side-rytme —
`clamp(min, …, maks)` for spacing og store overskrifter — i et system
der Figma-variabler bare kan holde statiske tall. Kort svar: **tokenene
er endepunktene (min/maks), formelen bor i pipelinen, og bare
layout-laget er flytende.** Utopia (utopia.fyi) er referansemetoden;
dette er den tilpasset Kobbers arkitektur.

## Problemet

Side-luft i dag er trappetrinn: `layouts/content/space/padding` har
`small=24 … xxlarge=64`, og konsumenter bytter trinn med media queries
(referanse-PoC-en brukte ett hopp på 768 px). Det gir
synlige sprang, flere breakpoints å vedlikeholde, og ingen definert
oppførsel mellom dem. Moderne CSS løser dette med flytende verdier:

```css
padding-inline: clamp(24px, 13.333333px + 2.962963vw, 56px);
```

— kontinuerlig skalering fra 24 px ved 360 px viewport til 56 px ved
1440 px, uten ett eneste breakpoint.

## Hvordan uttrykke det i tokens og Figma

Figma-variabler kan ikke holde `clamp()` eller `vw`. Ikke prøv å presse
formelen inn i Figma — del ansvaret:

1. **Tokens = endepunktene.** Hver flytende rolle er en token-gruppe
   med to vanlige dimension-tokens:
   `layout/page-inset/min = 24px`,
   `layout/page-inset/max = 56px`. Ikke bruk en egendefinert
   `{min,max}` DTCG composite-type; den er ikke en standard
   DTCG-token-type.
2. **To globale ankere som primitives**: `viewport/min = 360`,
   `viewport/max = 1440`. Det er hele konfigurasjonen formelen trenger.
3. **Formelen bor i Style Dictionary-bygget** (lineær interpolasjon
   mellom ankrene):

   ```
   slope     = (max − min) / (vwMax − vwMin)
   intercept = min − vwMin × slope
   output    = clamp(minpx, interceptpx + (slope·100)vw, maxpx)
   ```

   CSS-builden emitterer ferdig `clamp()`; JS-builden kan levere samme
   streng. Ingen konsument regner selv.

4. **I Figma kan modes brukes som endepunkt-visning.** En «Viewport»-
   kolleksjon med modes `kompakt`/`bred` der variabelen viser min- og
   maks-verdien: designere setter mode på rammen (360-ramme = kompakt,
   1440-ramme = bred) og ser riktige endepunkter. Figma velger ikke mode
   automatisk etter rammebredden; dette er en manuell QA-forhåndsvisning,
   ikke runtime-modellen eller den kanoniske kilden.

## Hvilke tokens skal være flytende — og hvilke aldri

Regelen som holder systemet forutsigbart:

| Flytende (layout-rytme)         | Statisk (komponent-anatomi)    |
| ------------------------------- | ------------------------------ |
| Side-inset (`content/padding`)  | Knappehøyde, felthøyde         |
| Seksjonsavstand (`content/gap`) | Padding/gap _inni_ komponenter |
| Hero-/display-typografi         | Brødtekst, labels (leselighet) |
| Maksbredder for innholdsspalter | Radius, stroke, ikonstørrelser |

- **Kobber har allerede riktig hjem for dette**: `layouts`-laget. Gjør
  layout-rollene flytende; rør ikke `components`.
- Komponent-indre avstander skal _ikke_ følge viewport — en knapp i et
  smalt sidepanel på en bred skjerm skal se ut som en knapp. Størrelses-
  variasjon per målgruppe er tetthets-modens jobb (`barn`-mode, se
  `docs/token-modes.md`) — og de to komponerer: modes kan sette ulike
  min/maks-endepunkter per tetthet.
- For komponent-responsivitet er **container queries** riktig verktøy
  (komponenten reagerer på plassen sin, ikke på skjermen) — en egen,
  senere diskusjon; clamp er for side-rytmen.

## Tilgjengelighet: bland alltid inn rem i flytende typografi

Ren `vw`-typografi bryter WCAG 1.4.4 (tekst skal kunne forstørres
200 %): zoom endrer ikke `vw`. Flytende _tekst_-verdier må derfor ha
rem-ledd i både min, preferred og maks:

```css
font-size: clamp(1.75rem, 1.2rem + 2.4vw, 3.5rem);
```

Da følger teksten både viewport og brukerens tekststørrelse. For ren
_avstand_ er px-endepunkter akseptable. Legg denne regelen i samme
token-lint som resten (par-komplett: både min og maks finnes; min <
maks; typografi-par er rem-baserte).

## Referanse-implementasjon i PoC-en

Referansedemoens sider byttet fra media query-trapp til clamp — se
`fluidSpace()` i `apps/demo/src/pages/pages.css.ts`, som interpolerer
mellom eksisterende `layouts/content`-tokens (24→56 px inset, 24→40 px
gap) over 360–1440 px. Det er nøyaktig koden Style Dictionary-bygget
kan generere. Koden er illustrasjon og skal ikke flyttes til det ekte
repoet; implementer og test formelen i token-pipelinen.

Gevinsten i konsumentkoden er målbar: media query-blokkene for
side-luft forsvinner (breakpointet beholdes kun der _strukturen_
endres, som når paneler stables), og mellomstørrelser — nettbrett,
delt skjerm, sidepaneler — får definert oppførsel i stedet for å arve
nærmeste trinn.

Pipeline-testen bør substituere begge viewportankerne og kreve eksakte
endepunktverdier, samt sample mellomstørrelser for monotoni og bounds.
Flytende typografi må i tillegg nettlesertestes ved 200 % tekstzoom.
