# Profile Card

Stacked person presentation: portrait above name and details.

## Built-in behavior

- `<article>` with the name as `<h3>`

## Usage responsibilities

- Portraits are content images: meaningful `alt` ("Portrett av …").
- Use `lang` for non-Norwegian bios: `<ProfileCard lang="en" …>`.

## Overskriftsnivå

Tittelen rendres som `<h3>` som standard. Sett `headingLevel={2}` (eller 4) slik at kortet passer inn i sidens overskriftshierarki — aldri hopp
over nivåer.
