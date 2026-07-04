# Forslag: Avatar

## Motivasjon

Rundt portrett med initial-fallback for elevlister, kommentarfelt og
samarbeidsvisninger. Standard i MUI (`Avatar`) og shadcn/ui (`Avatar`);
Profile Card dekker bare store, frittstående portretter.

## Anatomi og foreslåtte tokens

Sirkel med bilde-slot eller initialer fra navnet. Farger gjenbruker
badge-flaten (`badge/background/color/brand/toneB`) og tekstfargen fra
text-label. Nye tokens: `avatar/size/{small,medium,large}` (24/32/48).

## Tilgjengelighet

Med bilde: `alt` er påkrevd tankegang — standard er navnet, og `alt=""`
når navnet står synlig ved siden av. Uten bilde: `role="img"` +
`aria-label={name}`, initialene er `aria-hidden`. Bildet kommer fra DAM
(preview-endepunktet) i produktene.

## Animasjonsforslag

Ingen — statisk komponent.
