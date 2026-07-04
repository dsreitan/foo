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

globalStyle(".sr-only", {
  position: "absolute",
  width: 1,
  height: 1,
  margin: -1,
  padding: 0,
  overflow: "hidden",
  clipPath: "inset(50%)",
  whiteSpace: "nowrap",
});

// Demo shell: allow the contextual nav's containers to wrap on small screens
globalStyle("nav > div", {});
