import { style } from "@vanilla-extract/css";
import { tokens, val } from "../../styles/tokens";
import { label as labelTypography } from "../../styles/typography.css";
import { disabledState } from "../../styles/interaction.css";

const { search, textLabel } = tokens.component;
const { focus } = tokens.universal;

/**
 * "Søkefelt som brukes i navigasjonsmenyer." Filled field that clears
 * to the active background and gets the active border while typing.
 */
export const root = style({
  display: "inline-flex",
  alignItems: "center",
  gap: val(search.padding.gap),
  height: val(search.size.height),
  paddingLeft: val(search.padding.inline.left),
  paddingRight: val(search.padding.inline.right),
  borderRadius: val(search.border.radius),
  backgroundColor: search.background.color.fallback,
  transition: "background-color 0.1s ease",
  selectors: {
    "&:hover": {
      boxShadow: `inset 0 0 0 ${val(search.border.width)} ${search.border.color.hover}`,
    },
    "&:focus-within": {
      backgroundColor: search.background.color.active,
      boxShadow: `inset 0 0 0 ${val(search.border.width)} ${search.border.color.active}, 0 0 0 ${val(focus.border.width)} ${focus.border.color}`,
    },
  },
});

export const input = style([
  labelTypography.medium,
  disabledState,
  {
    flexGrow: 1,
    minWidth: 0,
    border: "none",
    outline: "none",
    backgroundColor: "transparent",
    color: textLabel.text.color.brand.toneA,
    selectors: {
      "&::placeholder": {
        color: textLabel.text.color.subtle.toneA,
      },
    },
  },
]);

export const icon = style({
  display: "inline-flex",
  flexShrink: 0,
  color: search.icon.shape.color.fallback,
  selectors: {
    [`${root}:focus-within &`]: {
      color: search.icon.shape.color.active,
    },
  },
});
