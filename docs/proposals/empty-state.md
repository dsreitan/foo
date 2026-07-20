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

Tittelen skal være en ekte overskrift med nivå valgt ut fra
sidekonteksten, slik at tilstanden dukker opp riktig i
overskriftsnavigasjon uten å hoppe over nivåer. API-et bør tilby
`headingLevel` eller polymorf `as`, ikke hardkode `<h2>`. Illustrasjonen
er `aria-hidden` (dekorativ; bruk `alt=""` på DAM-bilder).
Handlingsknappen er et vanlig fokuserbart element. Ved tomt
søkeresultat bør appen i tillegg annonsere antall treff i en egen
`role="status"`; komponenten er ellers statisk innhold.

## Animasjonsforslag

Ingen — tomtilstander skal ikke trekke oppmerksomhet.
