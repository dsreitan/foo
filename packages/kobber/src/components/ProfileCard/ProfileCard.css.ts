import { style } from "@vanilla-extract/css";
import { tokens, val } from "../../styles/tokens";
import { title as titleTypography } from "../../styles/typography.css";

const { profileCard, textLabel } = tokens.component;

export const root = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: val(profileCard.gap),
  padding: val(profileCard.padding),
  color: textLabel.text.color.brand.toneA,
});

export const image = style({
  borderRadius: val(profileCard.image.border.radius),
  overflow: "hidden",
  alignSelf: "stretch",
});

export const inner = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: val(profileCard.innerContainer.gap),
});

export const title = style([
  titleTypography.small,
  {
    margin: 0,
  },
]);
