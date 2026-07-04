import { style, styleVariants } from "@vanilla-extract/css";
import { tokens, val } from "../../styles/tokens";
import { zIndex } from "../../styles/layers";

const { popover, textLabel } = tokens.component;

export const wrapper = style({
  position: "relative",
  display: "inline-block",
});

const surface = style({
  position: "absolute",
  top: "100%",
  left: 0,
  zIndex: zIndex.dropdown,
  marginTop: val(popover.padding.small),
  display: "flex",
  flexDirection: "column",
  gap: val(popover.innerContainer.gap.small),
  borderRadius: val(popover.border.radius),
  color: textLabel.text.color.brand.toneA,
  // First real elevation token in Kobber: popover/effect/shadow
  boxShadow: `0 ${val(popover.effect.shadow.blur.small)} ${val(popover.effect.shadow.blur.small * 4)} ${popover.effect.shadow.color.neutral}66`,
});

export const root = styleVariants(
  {
    "brand-small": {
      background: popover.background.color.brand,
      width: popover.size.small,
      padding: popover.padding.small,
    },
    "brand-medium": {
      background: popover.background.color.brand,
      width: popover.size.medium,
      padding: popover.padding.medium,
    },
    "brand-large": {
      background: popover.background.color.brand,
      width: popover.size.large,
      padding: popover.padding.medium,
    },
    "neutral-small": {
      background: popover.background.color.neutral,
      width: popover.size.small,
      padding: popover.padding.small,
    },
    "neutral-medium": {
      background: popover.background.color.neutral,
      width: popover.size.medium,
      padding: popover.padding.medium,
    },
    "neutral-large": {
      background: popover.background.color.neutral,
      width: popover.size.large,
      padding: popover.padding.medium,
    },
  },
  (variant) => [
    surface,
    {
      minWidth: val(variant.width),
      padding: val(variant.padding),
      backgroundColor: variant.background,
    },
  ],
);
