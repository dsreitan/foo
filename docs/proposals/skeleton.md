# Forslag: Skeleton

## Motivasjon

Innlasting av kort/lister gir i dag layout-hopp. Skeleton holder plassen.

## Anatomi og foreslåtte tokens

Varianter text/rectangle/circle. Flate: `aubergine-50`; radius fra
inputs-gruppen. Nye tokens: `skeleton/background/color` per tone.

## Tilgjengelighet

`aria-hidden` — skjermlesere skal ikke lese pulserende bokser. Appen viser
én synlig `role="status"`-melding («Laster innhold») per region.

## Animasjonsforslag

Puls i opacity 1 -> 0.5 -> 1 over 1,6 s, uendelig. `prefers-reduced-motion`:
statisk flate uten puls.
