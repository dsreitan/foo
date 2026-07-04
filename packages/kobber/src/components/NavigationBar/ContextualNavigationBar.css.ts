import { style } from "@vanilla-extract/css";
import { tokens, val } from "../../styles/tokens";
import { label } from "../../styles/typography.css";
import { focusRing } from "../../styles/interaction.css";
import { media } from "../../styles/breakpoints";

const bar = tokens.component._contextualNavigationBar;
const { menuItem, textLabel } = tokens.component;

export const root = style({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "space-between",
  paddingBlock: val(bar.padding.block),
  paddingInline: val(bar.padding.inline),
  backgroundColor: bar.background.color,
});

/** Mobile disclosure toggle; gone on desktop where items show inline. */
export const toggle = style([
  label.medium,
  focusRing,
  {
    display: "flex",
    alignItems: "center",
    gap: val(menuItem.gap),
    paddingBlock: val(menuItem.padding.block),
    paddingInline: val(menuItem.padding.inline),
    border: "none",
    borderRadius: val(menuItem.border.radius),
    backgroundColor: "transparent",
    color: textLabel.text.color.brand.toneA,
    cursor: "pointer",
    selectors: {
      "&:hover": {
        backgroundColor: menuItem.background.color.hover,
      },
    },
    "@media": {
      [media.desktop]: {
        display: "none",
      },
    },
  },
]);

export const toggleIcon = style({
  display: "inline-flex",
  selectors: {
    '[aria-expanded="true"] > &': {
      transform: "rotate(180deg)",
    },
  },
});

export const left = style({
  display: "none",
  alignItems: "center",
  gap: val(bar.leftContainer.gap),
  "@media": {
    [media.desktop]: {
      display: "flex",
      flexWrap: "wrap",
    },
  },
});

/** Toggle open: items as a full-width column under the toggle row. */
export const leftOpen = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: val(tokens.groups.menus.space.tiny),
  order: 3,
  width: "100%",
  "@media": {
    [media.desktop]: {
      flexDirection: "row",
      alignItems: "center",
      gap: val(bar.leftContainer.gap),
      order: "initial",
      width: "auto",
    },
  },
});

export const right = style({
  display: "flex",
  alignItems: "center",
  gap: val(bar.rightContainer.gap),
});
