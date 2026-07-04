# Info Card

Presentation of a person or entity: image beside a text column.

## Built-in behavior

- `<article>` with the title as an `<h3>` heading

## Usage responsibilities

- Portraits are content images: give the `<img>` a meaningful `alt`
  ("Portrett av Sigrid Undset"), not `alt=""`.
- If the heading level doesn't fit your page outline, adjust the surrounding
  structure — heading order must not skip levels (WCAG 1.3.1).
- For non-Norwegian names/bios inside a Norwegian page, set `lang` on the
  element: `<InfoCard lang="en" …>`.
