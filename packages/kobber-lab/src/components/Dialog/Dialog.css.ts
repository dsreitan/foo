import { keyframes, style } from "@vanilla-extract/css";
import { tokens, val, typography } from "kobber/styles";
import { motion, reducedMotion } from "../../styles/motion";

const { popover, textLabel } = tokens.component;

const enter = keyframes({
  from: { opacity: 0, transform: "translateY(8px) scale(0.98)" },
  to: { opacity: 1, transform: "translateY(0) scale(1)" },
});

const backdropEnter = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

export const dialog = style([
  typography.body.medium,
  {
    padding: val(popover.padding.medium),
    border: "none",
    borderRadius: val(popover.border.radius),
    backgroundColor: popover.background.color.brand,
    color: textLabel.text.color.brand.toneA,
    maxWidth: val(popover.size.large),
    boxShadow: `0 ${val(popover.effect.shadow.blur.small * 2)} ${val(popover.effect.shadow.blur.small * 8)} ${popover.effect.shadow.color.neutral}66`,
    // Animation suggestion: fade + subtle rise on open
    selectors: {
      "&[open]": {
        animation: `${enter} ${motion.duration.base} ${motion.easing.enter}`,
      },
      "&::backdrop": {
        backgroundColor: tokens.groups.cardsAndModules.color["aubergine-1000-20"],
        animation: `${backdropEnter} ${motion.duration.base} ${motion.easing.enter}`,
      },
    },
    "@media": {
      [reducedMotion]: {
        selectors: {
          "&[open], &::backdrop": {
            animation: "none",
          },
        },
      },
    },
  },
]);

export const header = style({
  display: "flex",
  alignItems: "baseline",
  justifyContent: "space-between",
  gap: val(popover.gap),
  marginBottom: val(popover.gap),
});

export const title = style([
  typography.title.small,
  {
    margin: 0,
  },
]);
