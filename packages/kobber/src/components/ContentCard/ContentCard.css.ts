import { style, styleVariants } from "@vanilla-extract/css";
import { tokens, val } from "../../styles/tokens";
import { title as titleTypography } from "../../styles/typography.css";

const { contentCard, textLabel } = tokens.component;

/** prominent: stacked with a large image; subtle: compact row with a 120px image. */
export const root = styleVariants({
  prominent: {
    display: "flex",
    flexDirection: "column",
    gap: val(contentCard.gap.prominent),
  },
  subtle: {
    display: "flex",
    alignItems: "flex-start",
    gap: val(contentCard.gap.subtle),
  },
});

export const image = styleVariants({
  prominent: {
    height: val(contentCard.imageContainer.size.height.prominent),
    borderRadius: val(contentCard.imageContainer.border.radius.prominent),
    overflow: "hidden",
  },
  subtle: {
    width: val(contentCard.imageContainer.size.width.subtle),
    height: val(contentCard.imageContainer.size.height.subtle),
    borderRadius: val(contentCard.imageContainer.border.radius.subtle),
    overflow: "hidden",
    flexShrink: 0,
  },
});

export const text = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: val(contentCard.textContainer.gap),
  paddingInline: val(contentCard.textContainer.padding.inline),
  color: textLabel.text.color.brand.toneA,
});

export const title = style([
  titleTypography.small,
  {
    margin: 0,
  },
]);
