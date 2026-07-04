import { style } from "@vanilla-extract/css";
import { tokens, val } from "../../styles/tokens";
import { label as labelTypography } from "../../styles/typography.css";
import { focusRing } from "../../styles/interaction.css";

const { menuItem, textLabel } = tokens.component;

export const root = style([
  labelTypography.medium,
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
    textDecoration: "none",
    textAlign: "left",
    width: "100%",
    cursor: "pointer",
    selectors: {
      "&:hover": {
        backgroundColor: menuItem.background.color.hover,
      },
      "&:active": {
        backgroundColor: menuItem.background.color.pressed,
      },
    },
  },
]);

/** Active page: underline under the text, like the Figma text-container border. */
export const text = style({
  paddingBottom: val(menuItem.textContainer.borderBottom.padding),
  selectors: {
    "[aria-current] > &": {
      boxShadow: `inset 0 -${val(menuItem.textContainer.border.weight.active)} 0 ${menuItem.textContainer.border.color.active}`,
    },
  },
});

export const nested = style({
  paddingLeft: val(menuItem.padding.left.nested),
  paddingRight: val(menuItem.padding.right.nested),
});
