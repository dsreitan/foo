import { style, styleVariants } from "@vanilla-extract/css";
import { tokens, val } from "../../styles/tokens";
import { label as labelTypography } from "../../styles/typography.css";
import { focusRing } from "../../styles/interaction.css";

const { navigationCard, textLabel } = tokens.component;

const base = style([
  focusRing,
  {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-start",
    overflow: "hidden",
    minHeight: val(navigationCard.size.height),
    padding: val(navigationCard.padding),
    borderRadius: val(navigationCard.border.radius),
    backgroundSize: "cover",
    backgroundPosition: "center",
    textDecoration: "none",
  },
]);

/** Hover/active overlay tone matches the image: light image -> dark overlay. */
export const root = styleVariants(
  {
    "overlay-dark": navigationCard.overlay.background.color.overlayDark,
    "overlay-light": navigationCard.overlay.background.color.overlayLight,
  },
  (overlay) => [
    base,
    {
      selectors: {
        "&:hover::before": {
          content: "",
          position: "absolute",
          inset: 0,
          backgroundColor: overlay.hover,
        },
        "&:active::before": {
          content: "",
          position: "absolute",
          inset: 0,
          backgroundColor: overlay.active,
        },
      },
    },
  ],
);

export const imageContainer = style({
  position: "absolute",
  inset: 0,
});

export const textBox = style([
  labelTypography.large,
  {
    position: "relative",
    paddingInline: val(navigationCard.bottomTextBox.padding.inline),
    paddingBlock: val(navigationCard.bottomTextBox.padding.block),
    borderRadius: val(navigationCard.bottomTextBox.border.radius),
    backgroundColor: navigationCard.bottomTextBox.background.color,
    color: textLabel.text.color.brand.toneA,
  },
]);
