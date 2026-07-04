import { styleVariants } from "@vanilla-extract/css";
import { tokens, val } from "../../styles/tokens";

const { textModule, textLabel } = tokens.component;

const background = textModule.color.background;
const text = textLabel.text.color;

/**
 * brand/neutral × tone; tone-a (dark) gets light text. Theme colors
 * (nature/fantasy/...) skipped per CLAUDE.md guardrails.
 */
export const root = styleVariants(
  {
    "brand-a": { background: background.brand.toneA, color: text.brand.toneB },
    "brand-b": { background: background.brand.toneB, color: text.brand.toneA },
    "neutral-a": { background: background.neutral.toneA, color: text.neutral.toneB },
    "neutral-b": { background: background.neutral.toneB, color: text.neutral.toneA },
  },
  (variant) => ({
    display: "flex",
    flexDirection: "column",
    gap: val(textModule.innerTextContainer.gap),
    paddingInline: val(textModule.padding.inline),
    paddingTop: val(textModule.padding.top),
    paddingBottom: val(textModule.padding.bottom),
    backgroundColor: variant.background,
    color: variant.color,
  }),
);
