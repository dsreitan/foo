import { style } from "@vanilla-extract/css";
import { tokens, val } from "../../styles/tokens";
import { label as labelTypography } from "../../styles/typography.css";
import { focusRing } from "../../styles/interaction.css";

const { accordionItem, accordionGroup, textLabel } = tokens.component;

export const group = style({
  display: "flex",
  flexDirection: "column",
  gap: val(accordionGroup.accordionItemContainer.gap),
});

export const item = style({
  color: textLabel.text.color.brand.toneA,
});

export const summary = style([
  labelTypography.large,
  focusRing,
  {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: val(accordionItem.container.gap),
    paddingInline: val(accordionItem.container.padding.inline),
    paddingBlock: val(accordionItem.container.padding.block),
    borderRadius: val(accordionItem.container.border.radius),
    cursor: "pointer",
    listStyle: "none",
    selectors: {
      "&:hover": {
        backgroundColor: accordionItem.container.background.color.hover,
      },
      "&::-webkit-details-marker": {
        display: "none",
      },
    },
  },
]);

export const chevron = style({
  display: "inline-flex",
  flexShrink: 0,
  color: accordionItem.container.icon.color,
  transition: "transform 0.15s ease",
  selectors: {
    "details[open] > summary &": {
      transform: "rotate(180deg)",
    },
  },
});

export const body = style({
  display: "flex",
  flexDirection: "column",
  gap: val(accordionItem.slotContainer.gap),
  padding: val(accordionItem.slotContainer.linkContainer.padding),
});
