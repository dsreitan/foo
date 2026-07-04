import { style } from "@vanilla-extract/css";
import { tokens, val } from "../../styles/tokens";
import { label as labelTypography } from "../../styles/typography.css";
import { focusRing } from "../../styles/interaction.css";

const { collapsible, textLabel } = tokens.component;

export const root = style({
  display: "flex",
  flexDirection: "column",
  gap: val(collapsible.gap),
});

export const content = style({
  position: "relative",
  overflow: "hidden",
  selectors: {
    // Fade toward the page background while collapsed
    '&[data-collapsed="true"]::after': {
      content: "",
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      height: val(collapsible.padding.top * 4),
      background: `linear-gradient(transparent, ${collapsible.gradient.color} ${collapsible.gradient.stop * 100}%)`,
    },
  },
});

export const toggle = style([
  labelTypography.medium,
  focusRing,
  {
    display: "inline-flex",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: val(collapsible.gap),
    paddingTop: val(collapsible.padding.top),
    border: "none",
    backgroundColor: "transparent",
    color: textLabel.text.color.brand.toneA,
    cursor: "pointer",
  },
]);

/** Circle around the chevron, from the collapsible icon tokens. */
export const toggleIcon = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: val(collapsible.gap / 2),
  borderRadius: "50%",
  backgroundColor: collapsible.icon.background.color,
  color: collapsible.icon.shape.color,
  transition: "transform 0.15s ease",
  selectors: {
    '[aria-expanded="true"] > &': {
      transform: "rotate(180deg)",
    },
  },
});
