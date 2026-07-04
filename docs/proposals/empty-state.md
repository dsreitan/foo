# Forslag: Empty state

## Motivasjon

Tomme flater («ingen innleveringer ennå», «ingen treff») er i dag blanke
eller improviserte. En standardisert tom-tilstand sier hva som er tomt,
hvorfor, og hva neste steg er. shadcn/ui har `Empty`; MUI dokumenterer
mønsteret i sine DataGrid/listeretningslinjer.

## Anatomi og foreslåtte tokens

Sentrert boks på popover-flaten: illustrasjonsslot (fra DAM, dekorativ),
tittel (title-typografi), forklaring (body, subtle tekstfarge) og en
handlingsslot for en knapp. Nye tokens: `empty-state/padding`,
`empty-state/max-width`.

## Tilgjengelighet

Tittelen er en `<h2>` slik at tilstanden dukker opp i
overskriftsnavigasjon. Illustrasjonen er `aria-hidden` (dekorativ; bruk
alt="" på DAM-bilder). Handlingsknappen er et vanlig fokuserbart
element. Ved tomt SØKERESULTAT bør appen i tillegg announcere antall
treff i en egen `role="status"` (komponenten er statisk innhold).

## Animasjonsforslag

Ingen — tomtilstander skal ikke trekke oppmerksomhet.
