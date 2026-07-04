# Forslag: Select

## Motivasjon

Skjemaer trenger et nedtrekksvalg: velg klasse, trinn, sortering.
Kobber Dropdown er en meny (navigasjon/handlinger), ikke et skjemafelt —
i dag ender produktene med ustylede `<select>` eller misbrukt Dropdown.
MUI (`Select`) og shadcn/ui (`Select`) har begge komponenten.

## Anatomi og foreslåtte tokens

Native `<select>` med samme understrekede felt-anatomi som TextInput
(gjenbruker `_text-input`-tokens) pluss chevron-ikon. Ingen nye tokens —
komponenten faller ut av tekstfelt-tokens når de ferdigstilles.

## Tilgjengelighet

Ekte `<label htmlFor>`. Fordi feltet er en native `<select>`, kommer
tastatur, skjermleser-semantikk og mobil-pickere fra plattformen —
ingen ARIA-reimplementasjon. Custom listboks (som MUI) anbefales IKKE
før et reelt behov (f.eks. rike opsjoner) er dokumentert.

## Animasjonsforslag

Ingen — plattformens picker animerer selv.
