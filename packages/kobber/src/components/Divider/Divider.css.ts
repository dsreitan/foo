import { styleVariants } from "@vanilla-extract/css";
import { tokens, val } from "../../styles/tokens";

const { divider } = tokens.component;

const colors = divider.background.color;

/** color-tone combos from the tokens (rettsdata skipped, see CLAUDE.md). */
export const root = styleVariants(
  {
    "brand-a": colors.brand.toneA,
    "brand-b": colors.brand.toneB,
    "neutral-a": colors.neutral.toneA,
    "neutral-b": colors.neutral.toneB,
  },
  (backgroundColor) => ({
    border: "none",
    margin: 0,
    alignSelf: "stretch",
    borderRadius: val(divider.border.radius),
    backgroundColor,
    selectors: {
      '&[aria-orientation="horizontal"]': {
        height: val(divider.size.height.horizontal),
        marginBlock: val(divider.padding.block.horizontal),
      },
      '&[aria-orientation="vertical"]': {
        width: val(divider.size.width.vertical),
        marginInline: val(divider.padding.inline.vertical),
      },
    },
  }),
);
