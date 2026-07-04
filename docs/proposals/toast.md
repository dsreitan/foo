# Forslag: Toast

## Motivasjon

Kortlevde bekreftelser («Lagt i handlekurven») uten å flytte fokus.
Alert Banner er for permanent for dette.

## Anatomi og foreslåtte tokens

Gjenbruker alert-severity-fargene (`alert-label/background/color/*`) +
popover-skyggen. Nye tokens: `toast/size/max-width`, ev. egen elevation.

## Tilgjengelighet

`role="status"` (warning: `role="alert"`). Komponenten er kun presentasjon —
stabling, plassering (portal) og auto-lukk-timing eies av appen; anbefalt
minst 5 s + pause ved hover/fokus.

## Animasjonsforslag

Inn: slide 16px fra høyre + fade, 240 ms enter-easing.
Ut (appstyrt): fade 120 ms. `prefers-reduced-motion`: ingen bevegelse.
