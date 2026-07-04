import { style, styleVariants } from "@vanilla-extract/css";
import { tokens, typography } from "kobber/styles";

const { badge, textLabel } = tokens.component;

/** PROPOSED tokens — avatar/size/{small,medium,large}; no size scale for
 * round portraits exists in Kobber yet. */
const proposedSize = { small: 24, medium: 32, large: 48 };

const base = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  overflow: "hidden",
  borderRadius: "50%",
  backgroundColor: badge.background.color.brand.toneB,
  color: textLabel.text.color.brand.toneA,
  textTransform: "uppercase",
  userSelect: "none",
});

export const root = styleVariants(proposedSize, (size) => [
  size >= proposedSize.large ? typography.label.medium : typography.label.small,
  base,
  {
    width: size,
    height: size,
  },
]);

export const image = style({
  width: "100%",
  height: "100%",
  objectFit: "cover",
});
