import { keyframes, styleVariants } from "@vanilla-extract/css";
import { tokens, val } from "kobber/styles";
import { motion, reducedMotion } from "../../styles/motion";

const pulse = keyframes({
  "0%, 100%": { opacity: 1 },
  "50%": { opacity: 0.5 },
});

const base = {
  backgroundColor: tokens.groups.inputs.color["aubergine-50"],
  // Animation suggestion: gentle pulse; static surface under reduced motion
  animation: `${pulse} 1.6s ${motion.easing.enter} infinite`,
  "@media": {
    [reducedMotion]: {
      animation: "none",
    },
  },
} as const;

export const root = styleVariants({
  text: {
    ...base,
    height: "1em",
    width: "100%",
    borderRadius: val(tokens.groups.inputs.radius.small / 2),
  },
  rectangle: {
    ...base,
    borderRadius: val(tokens.groups.inputs.radius.small),
  },
  circle: {
    ...base,
    borderRadius: "50%",
  },
});
