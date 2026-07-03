import { style } from "@vanilla-extract/css";
import { tokens, val } from "../../styles/tokens";
import { label as labelTypography } from "../../styles/typography.css";
import { focusRing } from "../../styles/interaction.css";

const { breadcrumb, textLabel } = tokens.component;

export const list = style([
  labelTypography.medium,
  {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    gap: val(breadcrumb.gap),
    margin: 0,
    padding: 0,
    listStyle: "none",
  },
]);

export const item = style({
  display: "inline-flex",
  alignItems: "center",
  gap: val(breadcrumb.gap),
  selectors: {
    // Separator between items; swap for the chevron icon when the icon package lands
    "&:not(:first-child)::before": {
      content: "›",
      color: breadcrumb.icon.shape.color,
    },
  },
});

export const link = style([
  focusRing,
  {
    color: textLabel.text.color.subtle.toneA,
    textDecoration: "none",
    borderRadius: val(tokens.groups.inputs.radius.small),
    selectors: {
      "&:hover": {
        textDecoration: "underline",
      },
    },
  },
]);

/** Last item: the current page, not a link. */
export const current = style({
  color: textLabel.text.color.brand.toneA,
});
