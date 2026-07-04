import { style } from "@vanilla-extract/css";
import { tokens, val } from "../../styles/tokens";

export const root = style({
  display: "inline-flex",
  alignItems: "center",
  flexWrap: "wrap",
  gap: val(tokens.component.buttonGroup.gap),
});
