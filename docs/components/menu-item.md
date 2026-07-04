# Menu Item

Row in menus and side navigation. Renders an `<a>` when `href` is set,
otherwise a `<button>` — semantics follow usage.

## Built-in behavior

- `active` sets `aria-current="page"` (anchor) / `aria-current="true"` (button)
  and the persistent underline
- Hover/pressed backgrounds, focus ring, `nested` indentation

## Usage responsibilities

- Wrap link items in a `<nav aria-label="…">` (or use
  `ContextualNavigationBar`) so assistive tech announces the landmark.
- One `active` item per menu.
- Don't use `role="menu"`/`menuitem` for page navigation — that ARIA pattern
  is for application menus (see Dropdown), not link lists.
