import { style } from "@vanilla-extract/css";
import { tokens, val, typography, interaction } from "kobber/styles";

const { menuItem, textLabel } = tokens.component;

export const list = style({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  gap: val(tokens.groups.menus.space.tiny),
  listStyle: "none",
  margin: 0,
  padding: 0,
});

/** Page buttons reuse the menu-item anatomy; the current page gets the
 * same active underline as MenuItem and Tab. */
export const page = style([
  typography.label.medium,
  interaction.focusRing,
  interaction.disabledState,
  {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: val(tokens.groups.menus.space.xlarge),
    paddingBlock: val(menuItem.padding.block),
    paddingInline: val(menuItem.padding.inline),
    border: "none",
    borderRadius: val(menuItem.border.radius),
    backgroundColor: "transparent",
    color: textLabel.text.color.brand.toneA,
    cursor: "pointer",
    selectors: {
      "&:hover:not(:disabled)": {
        backgroundColor: menuItem.background.color.hover,
      },
      '&[aria-current="page"]': {
        boxShadow: `inset 0 -${val(menuItem.textContainer.border.weight.active)} 0 ${menuItem.textContainer.border.color.active}`,
        cursor: "default",
      },
    },
  },
]);

export const ellipsis = style([
  typography.label.medium,
  {
    color: textLabel.text.color.subtle.toneA,
    paddingInline: val(menuItem.padding.inline),
  },
]);
