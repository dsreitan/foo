# Dropdown

Menu button (trigger + expandable menu). Follows the
[APG menu-button pattern](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/).

## Built-in behavior

- `aria-expanded`/`aria-controls` on the trigger
- ArrowDown/ArrowUp on the trigger opens the menu and focuses first/last item
- Arrow keys move focus between items and wrap; Home/End jump
- Escape closes and returns focus to the trigger; outside click and item click close
- Tab out closes the menu

## Usage responsibilities (not the component's job)

- Use Dropdown for **actions or in-page choices**. For navigation to other
  pages, prefer `NavLink`/`MenuItem` in a `nav` — screen-reader users expect
  links, not menu buttons, for navigation.
- Keep item labels short; the trigger label should describe the collection
  ("Sorter etter"), not the current value alone.
- If the choice acts like a form value, consider a native `<select>` first.
