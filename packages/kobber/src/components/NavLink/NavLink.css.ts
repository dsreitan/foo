import { style, styleVariants } from "@vanilla-extract/css";
import { tokens, val } from "../../styles/tokens";
import { label as labelTypography } from "../../styles/typography.css";
import { focusRing } from "../../styles/interaction.css";

const { navLink, navLinkGroup, textLabel } = tokens.component;

const base = style([
  labelTypography.medium,
  focusRing,
  {
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
    gap: val(navLink.gap),
    textDecoration: "none",
  },
]);

/**
 * Underline appears on hover and stays on the active page
 * (aria-current), in the variant's own color.
 */
export const root = styleVariants(
  {
    brand: { text: textLabel.text.color.brand.toneA, line: navLink.border.color.hover.brand },
    accent: { text: textLabel.text.color.accent.toneA, line: navLink.border.color.hover.accent },
    subtle: { text: textLabel.text.color.subtle.toneA, line: navLink.border.color.hover.subtle },
  },
  (color) => [
    base,
    {
      color: color.text,
      selectors: {
        "&:hover::after, &[aria-current]::after": {
          content: "",
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          borderBottom: `${val(navLink.border.width.hover)} solid ${color.line}`,
        },
      },
    },
  ],
);

export const group = style({
  display: "flex",
  alignItems: "center",
  flexWrap: "wrap",
  gap: val(navLinkGroup.gap),
});
