import { globalStyle } from "@vanilla-extract/css";
import { tokens, fontFamily } from "kobber/styles";

globalStyle("*, *::before, *::after", {
  boxSizing: "border-box",
});

globalStyle("body", {
  margin: 0,
  fontFamily: `${fontFamily.ppMori}, system-ui, sans-serif`,
  fontSize: "16px",
  color: tokens.component.textLabel.text.color.neutral.toneA,
  backgroundColor: tokens.layouts.content.color.background["aubergine-25"],
});
