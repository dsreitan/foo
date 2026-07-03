import { styleVariants } from "@vanilla-extract/css";
import { tokens, val } from "../../styles/tokens";
import { label as labelTypography } from "../../styles/typography.css";

const { counter, textLabel } = tokens.component;

const text = textLabel.text.color;
const background = counter.background.color;

/**
 * Color variants from the counter tokens; light backgrounds get the
 * tone-a text color, dark backgrounds tone-b.
 */
export const root = styleVariants(
  {
    neutral: [background.neutral, text.neutral.toneA],
    "brand-a": [background.brand.toneA, text.brand.toneA],
    "brand-b": [background.brand.toneB, text.brand.toneB],
    success: [background.success, text.success.toneB],
    warning: [background.warning, text.warning.toneB],
  },
  ([backgroundColor, color]) => [
    labelTypography.medium,
    {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      // Stretches for values over 100, square minimum (same rule as Filter's counter)
      minWidth: val(counter.padding.size.height),
      height: val(counter.padding.size.height),
      paddingInline: val(counter.padding.inline),
      borderRadius: val(counter.border.radius),
      backgroundColor,
      color,
    },
  ],
);
