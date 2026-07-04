# Popover

Floating surface anchored to a trigger, for secondary content (help text,
small forms, filters). Sizes small/medium/large × brand/neutral backgrounds.

## Built-in behavior

- Clones the trigger and wires `aria-expanded`, `aria-controls`, `onClick`
- Outside click and Escape close; Escape returns focus to the trigger

## Usage responsibilities

- The trigger must be a **focusable element** (Button works out of the box).
- Content is plain children: heading levels inside must fit the page outline.
- Don't put critical, must-see information in a popover — it's dismissible
  and invisible to screen-reader users until opened.
- For menus of actions, use `Dropdown` (adds full keyboard navigation).
- If content is a form, focus the first field on open in your app code and
  label the surface: `<Popover ... ><form aria-label="Filtrer">…</form></Popover>`.
