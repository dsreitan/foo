import { style } from "@vanilla-extract/css";
import { tokens, val } from "kobber/styles";
import { motion, reducedMotion } from "../../styles/motion";

const { counter } = tokens.component;
const inputs = tokens.groups.inputs;

export const track = style({
  width: "100%",
  height: val(inputs.size.xxsmall),
  borderRadius: val(inputs.radius.circle),
  backgroundColor: inputs.color["aubergine-50"],
  overflow: "hidden",
});

export const fill = style({
  height: "100%",
  borderRadius: val(inputs.radius.circle),
  backgroundColor: counter.background.color.brand.toneB,
  // Animation suggestion: ease width changes so progress reads as movement
  transition: `width ${motion.duration.slow} ${motion.easing.enter}`,
  "@media": {
    [reducedMotion]: {
      transition: "none",
    },
  },
});

export const complete = style({
  backgroundColor: counter.background.color.success,
});
