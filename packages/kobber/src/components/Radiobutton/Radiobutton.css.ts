import { style, styleVariants } from "@vanilla-extract/css";
import { tokens, val } from "../../styles/tokens";
import { label as labelTypography } from "../../styles/typography.css";

const { radiobutton } = tokens.component;
const { focus, disabled } = tokens.universal;

export const root = style([
  labelTypography.medium,
  {
    display: "inline-flex",
    alignItems: "center",
    gap: val(radiobutton.gap),
    padding: val(radiobutton.padding),
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

const indicator = radiobutton.indicator;

export const control = styleVariants(
  {
    brand: {
      color: indicator.border.color.brand,
      halo: radiobutton.outline.border.color.brand,
    },
    success: {
      color: indicator.border.color.success,
      halo: radiobutton.outline.border.color.success,
    },
  },
  (variant) => ({
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    width: val(radiobutton.outline.width),
    height: val(radiobutton.outline.height),
    border: `${val(indicator.border.width)} solid ${variant.color}`,
    borderRadius: val(indicator.border.radius),
    color: variant.color,
    transition: "outline-color 0.2s ease",
    outline: "4px solid transparent",
    selectors: {
      [`${root}:hover input:not(:disabled) + &`]: {
        outlineColor: variant.halo.hover,
      },
      [`${root}:active input:not(:disabled) + &`]: {
        outlineColor: variant.halo.active,
      },
      "input:focus-visible + &": {
        outlineColor: "transparent",
        boxShadow: `0 0 0 ${val(focus.border.width)} ${focus.border.color}`,
      },
    },
  }),
);

/** Inner dot; scales in when the input is checked. */
export const dot = style({
  width: val(indicator.shape.width),
  height: val(indicator.shape.height),
  borderRadius: "50%",
  backgroundColor: "currentColor",
  transform: "scale(0)",
  transition: "transform 0.15s ease",
  selectors: {
    "input:checked + * > &": {
      transform: "scale(1)",
    },
  },
});
