import { style } from "@vanilla-extract/css";
import { tokens, val } from "../../styles/tokens";
import { focusRing } from "../../styles/interaction.css";

const { textLink } = tokens.component;
const { disabled } = tokens.universal;

/**
 * Inline link with the accent underline drawn as a pseudo-element,
 * like the official .kobber-text-link.
 */
export const root = style([
  focusRing,
  {
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
    gap: val(textLink.gap),
    color: "inherit",
    textDecoration: "none",
    cursor: "pointer",
    selectors: {
      "&::after": {
        content: "",
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        borderBottom: `${val(textLink.border.width)} solid ${textLink.border.color}`,
      },
      '&[aria-disabled="true"]': {
        opacity: disabled.container.opacity,
        cursor: "auto",
        pointerEvents: "none",
      },
    },
  },
]);
