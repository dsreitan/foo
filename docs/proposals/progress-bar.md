# Forslag: ProgressBar

## Motivasjon

Elevprogresjon og opplastinger vises i dag som tall i en Counter.

## Anatomi og foreslåtte tokens

Track: `aubergine-50`, høyde `inputs/size/xxsmall`, radius `circle`.
Fyll: `counter/background/color/brand/tone-b`; 100 % bytter til success.
Nye tokens: `progress/track/color`, `progress/fill/color/*`.

## Tilgjengelighet

`role="progressbar"` med `aria-valuenow/min/max` og påkrevd `label`.

## Animasjonsforslag

Breddeendring med transition 400 ms enter-easing, slik at fremdrift leses
som bevegelse. `prefers-reduced-motion`: hopp uten transition.
