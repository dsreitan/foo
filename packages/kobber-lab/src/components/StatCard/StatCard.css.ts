import { style } from "@vanilla-extract/css";
import { tokens, val, typography } from "kobber/styles";

const { textModule, textLabel } = tokens.component;
const cards = tokens.groups.cardsAndModules;

export const root = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: val(cards.space.small),
  padding: val(cards.space.xlarge),
  borderRadius: val(cards.radius.large),
  backgroundColor: textModule.color.background.neutral.toneB,
  color: textLabel.text.color.neutral.toneA,
});

export const label = style([typography.label.medium, {}]);

export const value = style([
  typography.display.medium,
  {
    color: textLabel.text.color.brand.toneA,
    lineHeight: 1,
  },
]);
