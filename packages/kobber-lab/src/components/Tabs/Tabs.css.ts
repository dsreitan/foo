import { keyframes, style } from "@vanilla-extract/css";
import { tokens, val, typography, interaction } from "kobber/styles";
import { motion, reducedMotion } from "../../styles/motion";

const { menuItem, divider, textLabel } = tokens.component;

export const list = style({
  display: "flex",
  flexWrap: "wrap",
  gap: val(tokens.groups.menus.space.tiny),
  borderBottom: `${val(tokens.groups.menus.stroke)} solid ${divider.background.color.brand.toneB}`,
});

/** Reuses the menu-item anatomy: same padding, hover and active underline. */
export const tab = style([
  typography.label.medium,
  interaction.focusRing,
  {
    display: "inline-flex",
    alignItems: "center",
    gap: val(menuItem.gap),
    paddingBlock: val(menuItem.padding.block),
    paddingInline: val(menuItem.padding.inline),
    border: "none",
    borderRadius: `${val(menuItem.border.radius)} ${val(menuItem.border.radius)} 0 0`,
    backgroundColor: "transparent",
    color: textLabel.text.color.brand.toneA,
    cursor: "pointer",
    boxShadow: `inset 0 0 0 transparent`,
    transition: `box-shadow ${motion.duration.fast} ${motion.easing.enter}`,
    selectors: {
      "&:hover": {
        backgroundColor: menuItem.background.color.hover,
      },
      "&:active": {
        backgroundColor: menuItem.background.color.pressed,
      },
      '&[aria-selected="true"]': {
        boxShadow: `inset 0 -${val(menuItem.textContainer.border.weight.active)} 0 ${menuItem.textContainer.border.color.active}`,
      },
      "&:disabled": {
        cursor: "not-allowed",
        opacity: 0.4,
      },
    },
    "@media": {
      [reducedMotion]: {
        transition: "none",
      },
    },
  },
]);

const fadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

export const panel = style([
  interaction.focusRing,
  {
    paddingBlock: val(tokens.groups.menus.space.medium),
    // Animation suggestion: short cross-fade when the panel switches
    animation: `${fadeIn} ${motion.duration.fast} ${motion.easing.enter}`,
    "@media": {
      [reducedMotion]: {
        animation: "none",
      },
    },
  },
]);
