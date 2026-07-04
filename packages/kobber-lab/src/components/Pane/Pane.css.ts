import { style } from "@vanilla-extract/css";
import { tokens, val, interaction, media } from "kobber/styles";

const { divider, menuItem, productCard } = tokens.component;

/**
 * M3-style pane layout: side-by-side on expanded windows, stacked on
 * compact ones (where the resize handles disappear).
 */
export const group = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
  gap: val(tokens.groups.menus.space.xsmall),
  "@media": {
    [media.desktop]: {
      flexDirection: "row",
      gap: 0,
    },
  },
});

/** Fixed pane: sized by --pane-size on desktop, natural height stacked. */
export const pane = style({
  minWidth: 0,
  "@media": {
    [media.desktop]: {
      width: "var(--pane-size)",
      flexShrink: 0,
    },
  },
});

export const flexiblePane = style({
  minWidth: 0,
  "@media": {
    [media.desktop]: {
      flexGrow: 1,
    },
  },
});

/** M3 "surface container": panes sit on their own rounded surface. */
export const surface = style({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  gap: val(tokens.groups.cardsAndModules.space.medium),
  padding: val(tokens.groups.cardsAndModules.space.large),
  borderRadius: val(tokens.groups.cardsAndModules.radius.large),
  backgroundColor: productCard.productContainer.background.color.brand.fallback,
});

/**
 * Resize handle (APG window splitter): 8px hit area with a 1px line,
 * hidden when panes stack on compact windows.
 */
export const separator = style([
  interaction.focusRing,
  {
    display: "none",
    flexShrink: 0,
    width: val(tokens.groups.menus.space.xsmall),
    cursor: "col-resize",
    border: "none",
    padding: 0,
    // 1px divider line centered in the hit area
    background: `linear-gradient(to right, transparent calc(50% - 0.5px), ${divider.background.color.brand.toneB} calc(50% - 0.5px), ${divider.background.color.brand.toneB} calc(50% + 0.5px), transparent calc(50% + 0.5px))`,
    selectors: {
      "&:hover": {
        backgroundColor: menuItem.background.color.hover,
      },
      "&:active": {
        backgroundColor: menuItem.background.color.pressed,
      },
    },
    "@media": {
      [media.desktop]: {
        display: "block",
      },
    },
  },
]);
