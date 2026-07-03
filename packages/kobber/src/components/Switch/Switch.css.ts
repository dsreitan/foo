import { style, styleVariants } from "@vanilla-extract/css";
import { tokens, val } from "../../styles/tokens";
import { label as labelTypography } from "../../styles/typography.css";

const { switch: switchTokens } = tokens.component;
const { focus, disabled } = tokens.universal;

export const root = style([
  labelTypography.medium,
  {
    display: "inline-flex",
    alignItems: "center",
    gap: val(tokens.groups.inputs.space.small),
    cursor: "pointer",
    selectors: {
      "&:has(input:disabled)": {
        opacity: disabled.container.opacity,
        cursor: "not-allowed",
      },
    },
  },
]);

export const input = style({
  position: "absolute",
  width: 1,
  height: 1,
  margin: 0,
  opacity: 0,
  pointerEvents: "none",
});

const background = switchTokens.background.color;

/**
 * Track: neutral when off, brand when on, darker on hover.
 * Thumb slides the difference between track width and thumb + padding.
 */
export const track = styleVariants(
  {
    brand: { off: background.neutral, on: background.brand },
  },
  (color) => ({
    display: "inline-flex",
    alignItems: "center",
    flexShrink: 0,
    width: val(switchTokens.size.width),
    height: val(switchTokens.size.height),
    padding: val(switchTokens.padding),
    borderRadius: val(switchTokens.border.radius),
    backgroundColor: color.off.fallback,
    transition: "background-color 0.15s ease",
    selectors: {
      [`${root}:hover input:not(:disabled) + &`]: {
        backgroundColor: color.off.hover,
      },
      "input:checked + &": {
        backgroundColor: color.on.fallback,
      },
      [`${root}:hover input:checked:not(:disabled) + &`]: {
        backgroundColor: color.on.hover,
      },
      "input:focus-visible + &": {
        boxShadow: `0 0 0 ${val(focus.border.width)} ${focus.border.color}`,
      },
    },
  }),
);

const travel = switchTokens.size.width - switchTokens.thumb.size - 2 * switchTokens.padding;

export const thumb = style({
  width: val(switchTokens.thumb.size),
  height: val(switchTokens.thumb.size),
  borderRadius: val(switchTokens.thumb.radius),
  backgroundColor: switchTokens.thumb.color.brand,
  transition: "transform 0.15s ease",
  selectors: {
    "input:checked + * > &": {
      transform: `translateX(${val(travel)})`,
    },
  },
});
