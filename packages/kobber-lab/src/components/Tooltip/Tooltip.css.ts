import { style } from "@vanilla-extract/css";
import { tokens, val, typography, zIndex } from "kobber/styles";
import { motion, reducedMotion } from "../../styles/motion";

const { popover, textLabel } = tokens.component;

/** PROPOSED token — tooltip/delay/show; hover intent so tooltips don't
 * flash while the pointer travels across the page. */
const showDelay = "600ms";

export const wrapper = style({
  position: "relative",
  display: "inline-flex",
});

export const tip = style([
  typography.label.small,
  {
    position: "absolute",
    bottom: "100%",
    left: "50%",
    transform: "translate(-50%, -4px)",
    zIndex: zIndex.dropdown,
    width: "max-content",
    maxWidth: val(popover.size.small),
    paddingBlock: val(popover.padding.small),
    paddingInline: val(popover.padding.medium / 2),
    borderRadius: val(popover.border.radius),
    backgroundColor: textLabel.text.color.brand.toneA,
    color: popover.background.color.brand,
    pointerEvents: "none",
    opacity: 0,
    visibility: "hidden",
    transition: `opacity ${motion.duration.fast} ${motion.easing.enter}`,
    selectors: {
      // Show on hover (delayed) and on keyboard focus (immediately)
      [`${wrapper}:hover > &`]: {
        opacity: 1,
        visibility: "visible",
        transitionDelay: showDelay,
      },
      [`${wrapper}:focus-within > &`]: {
        opacity: 1,
        visibility: "visible",
        transitionDelay: "0ms",
      },
      // Escape pressed: stay hidden until the trigger is left
      [`${wrapper}[data-dismissed] > &`]: {
        opacity: 0,
        visibility: "hidden",
      },
    },
    "@media": {
      [reducedMotion]: {
        transition: "none",
      },
    },
  },
]);
