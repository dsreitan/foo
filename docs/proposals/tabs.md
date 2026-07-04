# Forslag: Tabs

## Motivasjon

Flere innholdsflater på samme sted — «Oversikt / Kommentarer / Transkript»
under en video, panelene i en arbeidsflate. Finnes i både MUI (`Tabs`) og
shadcn/ui (`Tabs`), men ikke i Kobber. I dag misbrukes Filter eller
ButtonGroup til dette, uten korrekt semantikk.

## Anatomi og foreslåtte tokens

Sammensatte komponenter: `Tabs` (tilstand) → `TabList` → `Tab`, pluss én
`TabPanel` per fane. Gjenbruker menu-item-tokens for padding, hover og
aktiv understrek (`menu-item/text-container/border/*`); tablist-bunnlinje
fra divider-tokens. Nye tokens: `tabs/gap`, ev. egen aktiv-farge.

## Tilgjengelighet

WAI-ARIA tabs-mønsteret med automatisk aktivering: `role="tablist"` med
`aria-label`, `role="tab"` med `aria-selected`/`aria-controls`, roving
tabindex (piltaster, Home/End), `role="tabpanel"` med `aria-labelledby`
og `tabIndex=0` slik at panelinnholdet nås med tastatur.

## Animasjonsforslag

Panelbytte: kort kryssfade 120 ms. Aktiv understrek: box-shadow-overgang
120 ms. `prefers-reduced-motion`: ingen animasjon.
