import { style } from "@vanilla-extract/css";
import { tokens, val } from "../../styles/tokens";
import { label as labelTypography } from "../../styles/typography.css";

const { textLabel, navigationBar } = tokens.component;

export const root = style([
  labelTypography.large,
  {
    display: "inline-flex",
    alignItems: "center",
    gap: val(navigationBar.innerContainer.gap / 2),
    color: textLabel.text.color.brand.toneA,
    whiteSpace: "nowrap",
  },
]);
