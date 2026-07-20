# Popover

Floating surface anchored to a trigger, for secondary content (help text,
small forms, filters). Sizes small/medium/large × brand/neutral backgrounds.

## Built-in behavior

- Clones the trigger and wires `aria-expanded`, `aria-controls`, `onClick`
- Outside click and Escape close; Escape returns focus to the trigger

## Reference defect — do not copy

The PoC overwrites the trigger's existing `onClick` and ref when it
uses `cloneElement`. A real implementation must compose the consumer's
handler and merge refs. Define whether `preventDefault()` suppresses
the toggle, preserve disabled behavior, and test an analytics handler
plus both object and callback refs. Prefer an upstream primitive/API
that makes ownership explicit rather than relying on undocumented
element cloning.

## Usage responsibilities

- The trigger must be a **focusable element** (Button works out of the box).
- Content is plain children: heading levels inside must fit the page outline.
- Don't put critical, must-see information in a popover — it's dismissible
  and invisible to screen-reader users until opened.
- For action menus, use the completed upstream menu-button or
  disclosure pattern selected in `dropdown.md`; the PoC `Dropdown`
  hybrid must not ship.
- If content is a form, focus the first field on open in your app code and
  label the surface: `<Popover ... ><form aria-label="Filtrer">…</form></Popover>`.
