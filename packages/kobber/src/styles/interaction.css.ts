import { style } from "@vanilla-extract/css";
import { tokens, val } from "./tokens";

/**
 * Shared interaction states — THE PATTERN for components:
 *
 *   export const root = style([
 *     label.medium,        // typography (typography.css.ts)
 *     focusRing,           // interaction states (this file)
 *     disabledState,
 *     { ...component-specific tokens only... },
 *   ])
 *
 * Component .css.ts files should only contain what is unique to that
 * component; anything two components share belongs in src/styles/.
 */

const { focus, disabled } = tokens.universal;

/** Focus ring as box-shadow, like the official kobber-components CSS. */
export const focusRing = style({
  selectors: {
    "&:focus-visible": {
      outline: "none",
      boxShadow: `0 0 0 ${val(focus.border.width)} ${focus.border.color}`,
    },
  },
});

/** Focus as outline with offset (Filter's focus wrapper in Figma). */
export const focusOutline = style({
  selectors: {
    "&:focus-visible": {
      outline: `${val(focus.border.width)} solid ${focus.border.color}`,
      outlineOffset: val(focus.container.padding),
    },
  },
});

/** Disabled: token opacity, blocked cursor. */
export const disabledState = style({
  selectors: {
    "&:disabled": {
      opacity: disabled.container.opacity,
      cursor: "not-allowed",
    },
  },
});

/**
 * Kobber hovers are a translucent overlay painted on top of the current
 * background (background-image so it stacks on background-color).
 * Use inside a selector: `backgroundImage: hoverOverlay(color)`.
 */
export const hoverOverlay = (color: string) => `linear-gradient(${color}, ${color})`;
