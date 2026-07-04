import { style } from "@vanilla-extract/css";
import { tokens, val } from "../../styles/tokens";

const bar = tokens.component._contextualNavigationBar;

export const root = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  paddingBlock: val(bar.padding.block),
  paddingInline: val(bar.padding.inline),
  backgroundColor: bar.background.color,
});

export const left = style({
  display: "flex",
  alignItems: "center",
  gap: val(bar.leftContainer.gap),
});

export const right = style({
  display: "flex",
  alignItems: "center",
  gap: val(bar.rightContainer.gap),
});
