import { tokens } from "./tokens";

/**
 * Kobber has no shadow/elevation tokens yet. Centralized here so no
 * component carries a raw shadow value; replace with tokens when the
 * design system defines elevation. The color is derived from the
 * darkest brand hover color (aubergine-1000) at low opacity.
 */
export const elevation = {
  menu: `0 4px 16px ${tokens.universal.hover.container.lighten}1f`,
};
