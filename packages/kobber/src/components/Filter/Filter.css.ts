import { style } from "@vanilla-extract/css";
import { tokens, val } from "../../styles/tokens";
import { label } from "../../styles/typography.css";
import { disabledState, focusOutline, hoverOverlay } from "../../styles/interaction.css";

const { filter, textLabel } = tokens.component;

export const root = style([
  label.medium,
  focusOutline,
  disabledState,
  {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: val(filter.gap),
    height: val(filter.size.height),
    paddingInline: val(filter.padding.inline),
    border: "none",
    borderRadius: val(filter.border.radius),
    backgroundColor: filter.background.color.fallback,
    color: textLabel.text.color.brand.toneA,
    cursor: "pointer",
    selectors: {
      "&:hover:not(:disabled)": {
        backgroundImage: hoverOverlay(filter.background.color.hover),
      },
      '&[aria-pressed="true"]': {
        backgroundColor: filter.background.color.active,
        color: textLabel.text.color.brand.toneB,
      },
    },
  },
]);

export const counter = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  // Stretches for counts above 100, but keeps a square minimum (Figma annotation).
  minWidth: val(filter.counter.size.height),
  height: val(filter.counter.size.height),
  paddingInline: val(filter.counter.padding.inline),
  borderRadius: val(filter.counter.border.radius),
  backgroundColor: filter.counter.background.color.fallback,
  color: textLabel.text.color.brand.toneA,
});
