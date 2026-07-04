# Navigation Card

Image card that is one whole link into a content area.

## Built-in behavior

- The card is a single `<a>` whose accessible name is the `title`
- The image slot is `aria-hidden` (decorative by design)
- Hover/active tint via the `overlay` prop

## Usage responsibilities

- Pick `overlay="overlay-dark"` over light images, `overlay-light` over dark
  ones, so the hover tint keeps contrast.
- The bottom text box supplies contrast for the title; don't remove it and
  rely on the image alone (WCAG 1.4.3).
- Pass a _background_ image (`<img alt="">` or a styled div). Any information
  in the image must also appear in text.
