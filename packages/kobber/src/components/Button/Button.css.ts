import { style, styleVariants } from "@vanilla-extract/css";
import type { ComplexStyleRule } from "@vanilla-extract/css";
import { tokens, val } from "../../styles/tokens";
import { label } from "../../styles/typography.css";
import { disabledState, focusRing, hoverOverlay } from "../../styles/interaction.css";

const { button, uiButton, textLabel } = tokens.component;

const text = textLabel.text.color;

export const root = style([
  label.medium,
  focusRing,
  disabledState,
  {
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: val(button.gap),
    height: val(button.size.height),
    paddingInline: val(button.padding.inline),
    maxWidth: "100%",
    whiteSpace: "nowrap",
    border: "1px solid transparent",
    borderRadius: val(button.border.radius),
    cursor: "pointer",
  },
]);

/** Icon-only button: square, like the official .kobber-button--icon-only. */
export const iconOnly = style({
  padding: 0,
  aspectRatio: "1 / 1",
  minWidth: val(button.size.height),
});

/** Solid button: token background, hover = translucent overlay on top of it. */
const solid = (
  background: { fallback: string; hover: string },
  textColor: string,
): ComplexStyleRule => ({
  backgroundColor: background.fallback,
  color: textColor,
  selectors: {
    "&:hover:not(:disabled)": {
      backgroundImage: hoverOverlay(background.hover),
    },
  },
});

/** Tertiary button: transparent, hover/active draws an underline inside the padding. */
const underlined = (textColor: string, underlineColor: string): ComplexStyleRule => ({
  backgroundColor: "transparent",
  color: textColor,
  selectors: {
    "&:hover:not(:disabled)::after, &:active:not(:disabled)::after": {
      content: "",
      position: "absolute",
      bottom: val(button.underline.padding.bottom),
      left: val(button.padding.inline),
      right: val(button.padding.inline),
      borderBottom: `${val(button.border.width.hover)} solid ${underlineColor}`,
    },
  },
});

/**
 * One line per variant that exists in the tokens, named after the Figma
 * properties: color(-level)-tone. Solid backgrounds get the text-label
 * color of the opposite tone (dark background -> light text).
 *
 * Button = components.button (color x level x tone)
 * Success/warning/informative = components.uiButton ("UI Button" in Figma, no level)
 */
export const variant = styleVariants({
  "brand-primary-a": solid(button.background.color.brand.primary.toneA, text.brand.toneB),
  "brand-secondary-a": solid(button.background.color.brand.secondary.toneA, text.brand.toneB),
  "brand-secondary-b": solid(button.background.color.brand.secondary.toneB, text.brand.toneA),
  "brand-tertiary-a": underlined(text.brand.toneA, button.border.color.brand.tertiary.toneA.hover),

  "neutral-primary-a": solid(button.background.color.neutral.primary.toneA, text.neutral.toneB),
  "neutral-secondary-b": solid(button.background.color.neutral.secondary.toneB, text.neutral.toneA),
  "neutral-tertiary-a": underlined(
    text.neutral.toneA,
    button.border.color.neutral.tertiary.toneA.hover,
  ),

  "success-a": solid(uiButton.background.color.success.toneA, text.success.toneB),
  "success-b": solid(uiButton.background.color.success.toneB, text.success.toneA),

  "warning-a": solid(uiButton.background.color.warning.toneA, text.warning.toneB),
  "warning-b": solid(uiButton.background.color.warning.toneB, text.warning.toneA),

  "informative-a": solid(uiButton.background.color.informative.toneA, text.informative.toneB),
  "informative-b": solid(uiButton.background.color.informative.toneB, text.informative.toneA),
});
