import { style, styleVariants } from "@vanilla-extract/css";
import { tokens, val } from "../../styles/tokens";
import { label as labelTypography } from "../../styles/typography.css";
import { focusRing, hoverOverlay } from "../../styles/interaction.css";

const { productCard, textLabel } = tokens.component;

const background = productCard.productContainer.background.color;

/**
 * Colored product container; the whole card is a link. Only brand and
 * neutral — theme colors (fantasy/nature/...) are out of scope, see
 * CLAUDE.md guardrails.
 */
export const root = styleVariants(
  {
    brand: { background: background.brand, text: textLabel.text.color.brand.toneA },
    neutral: { background: background.neutral, text: textLabel.text.color.neutral.toneA },
  },
  (color) => [
    focusRing,
    {
      display: "flex",
      flexDirection: "column",
      minHeight: val(productCard.productContainer.size.height),
      padding: val(productCard.productContainer.padding),
      borderRadius: val(productCard.productContainer.border.radius),
      backgroundColor: color.background.fallback,
      color: color.text,
      textDecoration: "none",
      selectors: {
        "&:hover": {
          backgroundImage: hoverOverlay(color.background.hover),
        },
      },
    },
  ],
);

export const inner = style({
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
  gap: val(productCard.innerProductContainer.gap),
  paddingBottom: val(productCard.innerProductContainer.paddingBottom),
});

/** Image area: grows, centers the cover. */
export const image = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexGrow: 1,
  paddingInline: val(productCard.imageContainer.padding.inline),
});

export const text = style({
  display: "flex",
  flexDirection: "column",
  gap: val(productCard.textContainer.gap),
  paddingInline: val(productCard.textContainer.padding.inline),
  paddingBlock: val(productCard.textContainer.padding.block),
});

export const title = style([
  labelTypography.large,
  {
    margin: 0,
  },
]);

export const subtitle = style([
  labelTypography.small,
  {
    margin: 0,
  },
]);
