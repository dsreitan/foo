import { keyframes, styleVariants } from "@vanilla-extract/css";
import { tokens, val, typography } from "kobber/styles";
import { motion, reducedMotion } from "../../styles/motion";

const { alertLabel, textLabel } = tokens.component;

const slideIn = keyframes({
  from: { opacity: 0, transform: "translateX(16px)" },
  to: { opacity: 1, transform: "translateX(0)" },
});

const text = textLabel.text.color;

/** Reuses the alert severity tokens; adds elevation + slide-in. */
export const root = styleVariants(
  {
    success: [alertLabel.background.color.success, text.success.toneA],
    informative: [alertLabel.background.color.informative, text.informative.toneA],
    warning: [alertLabel.background.color.warning, text.warning.toneA],
  },
  ([background, color]) => [
    typography.label.medium,
    {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: val(alertLabel.gap),
      padding: val(alertLabel.padding * 2),
      borderRadius: val(alertLabel.border.radius),
      backgroundColor: background,
      color,
      boxShadow: `0 ${val(tokens.component.popover.effect.shadow.blur.small)} ${val(tokens.component.popover.effect.shadow.blur.small * 6)} ${tokens.component.popover.effect.shadow.color.neutral}66`,
      // Animation suggestion: slide in from the right edge
      animation: `${slideIn} ${motion.duration.base} ${motion.easing.enter}`,
      "@media": {
        [reducedMotion]: {
          animation: "none",
        },
      },
    },
  ],
);
