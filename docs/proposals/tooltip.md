# Forslag: Tooltip

## Motivasjon

Kort tilleggstekst på ikon-knapper og avkortede titler — arbeidsflater
med mange små kontroller trenger det. MUI (`Tooltip`) og shadcn/ui
(`Tooltip`) har det; Kobber Popover er for tung for ren tekst.

## Anatomi og foreslåtte tokens

Wrapper rundt ett fokuserbart trigger-element som får `aria-describedby`.
Mørk flate = invertert: bakgrunn fra text-label-fargen, tekst fra
popover-bakgrunnen; radius/padding/maksbredde fra popover-tokens.
Nye tokens: `tooltip/delay/show` (600 ms), `tooltip/background/color`.

## Tilgjengelighet

`role="tooltip"` + `aria-describedby` på triggeren. Vises ved hover
(med intensjonsforsinkelse) og umiddelbart ved tastaturfokus. WCAG
1.4.13: kan avvises med Escape uten å flytte fokus, forblir synlig så
lenge pekeren/fokus er på triggeren. Aldri innhold som bare finnes i
tooltipen.

## Animasjonsforslag

Inn: fade 120 ms etter 600 ms hover-forsinkelse (0 ms ved fokus).
`prefers-reduced-motion`: ingen overgang.
