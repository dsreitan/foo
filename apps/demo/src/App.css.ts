import { style } from "@vanilla-extract/css";
import { tokens, val, typography, media } from "kobber/styles";

const { label } = typography;

const { content } = tokens.layouts;
const text = tokens.component.textLabel.text.color;

export const page = style({
  maxWidth: val(content.size.maxWidth.xxlarge),
  margin: "0 auto",
  padding: val(content.space.padding.medium),
  display: "flex",
  flexDirection: "column",
  gap: val(content.space.gap.medium),
});

export const nav = style({
  display: "flex",
  gap: val(content.space.gap.small),
});

export const navLink = style([
  label.medium,
  {
    color: text.brand.toneA,
    selectors: {
      '&[aria-current="true"]': {
        fontWeight: "600",
      },
    },
  },
]);

export const header = style({
  marginBottom: val(content.space.gap.xsmall),
});

export const title = style({
  color: text.brand.toneA,
  margin: 0,
});

export const subtitle = style({
  margin: `${val(content.space.gap.xsmall)} 0 0`,
});

export const card = style({
  scrollMarginTop: val(content.space.gap.medium),
  backgroundColor: content.color.background["neutral-25"],
  borderRadius: val(tokens.groups.cardsAndModules.radius.large),
  padding: val(content.space.padding.small),
});

export const componentName = style({
  margin: `0 0 ${val(content.space.gap.xsmall)}`,
});

export const demoRow = style({
  display: "flex",
  gap: val(content.space.gap.small),
  flexWrap: "wrap",
  alignItems: "center",
});

export const galleryLayout = style({
  display: "flex",
  alignItems: "flex-start",
  gap: val(content.space.gap.large),
});

export const aside = style({
  display: "none",
  "@media": {
    [media.desktop]: {
      display: "flex",
      flexDirection: "column",
      position: "sticky",
      top: val(content.space.gap.medium),
      flexShrink: 0,
      width: "220px",
      maxHeight: "85vh",
      overflowY: "auto",
    },
  },
});

export const sections = style({
  display: "flex",
  flexDirection: "column",
  gap: val(content.space.gap.medium),
  minWidth: 0,
  flexGrow: 1,
});
