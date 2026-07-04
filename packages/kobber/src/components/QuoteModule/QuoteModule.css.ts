import { style } from "@vanilla-extract/css";
import { tokens, val } from "../../styles/tokens";
import { title as titleTypography, label as labelTypography } from "../../styles/typography.css";
import { media } from "../../styles/breakpoints";

const { quoteModule, textLabel } = tokens.component;

export const root = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: val(quoteModule.gap.mobile),
  margin: 0,
  color: textLabel.text.color.brand.toneA,
  "@media": {
    [media.desktop]: {
      flexDirection: "row",
      alignItems: "center",
      gap: val(quoteModule.gap.medium.desktop),
    },
  },
});

export const image = style({
  flexShrink: 0,
  width: val(quoteModule.imageContainer.size.width.small),
  height: val(quoteModule.imageContainer.size.height.small),
  borderRadius: "50%",
  overflow: "hidden",
  "@media": {
    [media.desktop]: {
      width: val(quoteModule.imageContainer.size.width.medium),
      height: val(quoteModule.imageContainer.size.height.medium),
    },
  },
});

export const inner = style({
  display: "flex",
  flexDirection: "column",
  gap: val(quoteModule.innerContainer.gap),
});

export const quote = style([
  titleTypography.large,
  {
    margin: 0,
  },
]);

export const caption = style([labelTypography.medium, {}]);
