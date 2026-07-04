import { style } from "@vanilla-extract/css";
import { tokens, val, typography } from "kobber/styles";

const { textLabel } = tokens.component;
const cards = tokens.groups.cardsAndModules;

export const root = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  gap: val(cards.space.medium),
  paddingBlock: val(cards.space.xxlarge),
  paddingInline: val(cards.space.xlarge),
  borderRadius: val(cards.radius.large),
  backgroundColor: tokens.component.popover.background.color.brand,
  color: textLabel.text.color.brand.toneA,
});

export const illustration = style({
  display: "inline-flex",
  color: textLabel.text.color.subtle.toneA,
});

export const title = style([
  typography.title.medium,
  {
    margin: 0,
  },
]);

export const description = style([
  typography.body.medium,
  {
    margin: 0,
    maxWidth: val(cards.size.container.large),
    color: textLabel.text.color.subtle.toneA,
  },
]);
