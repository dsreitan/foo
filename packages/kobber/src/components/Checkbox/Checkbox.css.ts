import { style, styleVariants } from "@vanilla-extract/css";
import { tokens, val } from "../../styles/tokens";
import { label as labelTypography } from "../../styles/typography.css";

const { checkbox } = tokens.component;
const { focus, disabled } = tokens.universal;

export const root = style([
  labelTypography.medium,
  {
    display: "inline-flex",
    alignItems: "center",
    gap: val(checkbox.gap),
    padding: val(checkbox.padding),
    cursor: "pointer",
    selectors: {
      "&:has(input:disabled)": {
        opacity: disabled.container.opacity,
        cursor: "not-allowed",
      },
    },
  },
]);

/** Visually hidden but focusable native input. */
export const input = style({
  position: "absolute",
  width: 1,
  height: 1,
  margin: 0,
  opacity: 0,
  pointerEvents: "none",
});

const colors = checkbox.indicator;

/**
 * The visible control: bordered box that fills when checked, with the
 * soft outline halo on hover/active like the official kobber CSS.
 */
export const control = styleVariants(
  {
    brand: {
      border: colors.border.color.brand,
      shape: colors.shape.color.brand,
      background: colors.background.color.brand,
      halo: checkbox.outline.border.color.brand,
    },
    success: {
      border: colors.border.color.success,
      shape: colors.shape.color.success,
      background: colors.background.color.success,
      halo: checkbox.outline.border.color.success,
    },
  },
  (color) => ({
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    width: val(colors.size.width),
    height: val(colors.size.height),
    border: `${val(colors.border.width)} solid ${color.border.idle}`,
    borderRadius: val(checkbox.outline.border.radius),
    color: color.shape,
    transition: "outline-color 0.2s ease, background-color 0.1s ease",
    outline: "4px solid transparent",
    selectors: {
      [`${root}:hover input:not(:disabled) + &`]: {
        outlineColor: color.halo.hover,
      },
      [`${root}:active input:not(:disabled) + &`]: {
        outlineColor: color.halo.active,
      },
      "input:checked + &": {
        backgroundColor: color.background.idle,
      },
      "input:disabled:checked + &": {
        backgroundColor: color.background.disabled,
      },
      "input:focus-visible + &": {
        outlineColor: "transparent",
        boxShadow: `0 0 0 ${val(focus.border.width)} ${focus.border.color}`,
      },
    },
  }),
);

export const check = style({
  display: "inline-flex",
  opacity: 0,
  selectors: {
    "input:checked + * > &": {
      opacity: 1,
    },
  },
});
