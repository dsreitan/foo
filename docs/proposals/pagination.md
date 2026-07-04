# Forslag: Pagination

## Motivasjon

Søkeresultater og lange lister trenger sidenavigasjon; «vis mer»-knapper
skalerer ikke for hopp til slutten. MUI (`Pagination`) og shadcn/ui
(`Pagination`) har begge komponenten.

## Anatomi og foreslåtte tokens

`<nav>` med en liste av sideknapper: første/siste side alltid synlig,
vindu rundt gjeldende side, ellipsis for hull, forrige/neste i endene.
Gjenbruker menu-item-tokens; gjeldende side får samme aktive understrek
som MenuItem/Tab. Nye tokens: ev. `pagination/size/min-width`.

## Tilgjengelighet

Eget nav-landemerke (`aria-label="Sidenavigasjon"`, overstyrbart).
Gjeldende side: `aria-current="page"`. Alle knapper har fullt navn
(«Side 3», «Forrige side», «Neste side» — alle overstyrbare props).
Ellipsis er `aria-hidden`. Deaktiverte piler i endene i stedet for å
forsvinne, så layouten er stabil.

## Animasjonsforslag

Ingen — sidebytte eies av appen.
