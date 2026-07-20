# Dropdown

Reference notes for an action menu. The PoC attempted the
[APG menu-button pattern](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/)
but did not complete its semantics: the trigger lacks
`aria-haspopup="menu"`, and the surface/items lack `role="menu"` and
`role="menuitem"`. Do not copy that implementation.

## Behavior validated in the PoC

- `aria-expanded`/`aria-controls` on the trigger
- ArrowDown/ArrowUp on the trigger opens the menu and focuses first/last item
- Arrow keys move focus between items and wrap; Home/End jump
- Escape closes and returns focus to the trigger; outside click and item click close
- Tab out closes the menu

## Upstream decision and acceptance criteria

Choose one complete pattern:

1. **APG menu button:** add `aria-haspopup="menu"`, `role="menu"` and
   `role="menuitem"`; implement the APG focus/tab contract and test it
   with a browser and assistive technology.
2. **Disclosure of native controls:** retain native button/link
   semantics, remove menu-specific arrow-key claims, and document the
   simpler keyboard model.

Do not ship the current hybrid contract. Forms should use a native
`<select>` or a separately specified combobox, not this action menu.

## Usage responsibilities

- Use Dropdown for **actions or in-page choices**. For navigation to other
  pages, prefer `NavLink`/`MenuItem` in a `nav` — screen-reader users expect
  links, not menu buttons, for navigation.
- Keep item labels short; the trigger label should describe the collection
  ("Sorter etter"), not the current value alone.
- If the choice acts like a form value, consider a native `<select>` first.
