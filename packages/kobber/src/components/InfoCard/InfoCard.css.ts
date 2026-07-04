import { style } from "@vanilla-extract/css";
import { tokens, val } from "../../styles/tokens";
import { title as titleTypography } from "../../styles/typography.css";

const { infoCard, textLabel } = tokens.component;

export const root = style({
  display: "flex",
  alignItems: "flex-start",
  gap: val(infoCard.gap),
  color: textLabel.text.color.brand.toneA,
});

export const image = style({
  width: val(infoCard.image.size.width),
  height: val(infoCard.image.size.height),
  borderRadius: val(infoCard.image.border.radius),
  overflow: "hidden",
  flexShrink: 0,
});

export const inner = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: val(infoCard.innerContainer.gap),
});

export const title = style([
  titleTypography.small,
  {
    margin: 0,
  },
]);
