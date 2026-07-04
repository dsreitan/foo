import { style } from "@vanilla-extract/css";
import { tokens, val, typography, interaction } from "kobber/styles";

const { _textInput, textLabel } = tokens.component;

export const container = style({
  display: "inline-flex",
  flexDirection: "column",
  gap: val(_textInput.container.gap),
});

export const label = style([
  typography.label.small,
  {
    color: textLabel.text.color.brand.toneA,
  },
]);

export const fieldWrapper = style({
  position: "relative",
  display: "inline-flex",
});

/** Same underlined-field anatomy as TextInput, on a native <select>. */
export const field = style([
  typography.label.medium,
  interaction.focusRing,
  interaction.disabledState,
  {
    appearance: "none",
    width: "100%",
    minWidth: "240px",
    display: "flex",
    alignItems: "center",
    gap: val(_textInput.topContainer.gap),
    padding: val(_textInput.topContainer.padding),
    paddingRight: val(_textInput.topContainer.padding * 3),
    border: "none",
    borderBottom: `${val(_textInput.topContainer.border.width.fallback)} solid ${_textInput.topContainer.border.color.toneA}`,
    backgroundColor: "transparent",
    color: textLabel.text.color.brand.toneA,
    cursor: "pointer",
    selectors: {
      "&:hover:not(:disabled)": {
        backgroundColor: _textInput.background.color.primary.hover,
      },
      "&:focus": {
        outline: "none",
        backgroundColor: _textInput.background.color.primary.active,
        borderBottomWidth: val(_textInput.topContainer.border.width.active),
      },
    },
  },
]);

export const icon = style({
  position: "absolute",
  right: val(_textInput.topContainer.padding),
  top: "50%",
  transform: "translateY(-50%)",
  pointerEvents: "none",
  display: "inline-flex",
  color: textLabel.text.color.brand.toneA,
});
