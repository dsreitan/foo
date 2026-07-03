import { style, styleVariants } from "@vanilla-extract/css";
import { tokens, val } from "../../styles/tokens";
import { label as labelTypography } from "../../styles/typography.css";
import { focusRing } from "../../styles/interaction.css";

const { alertLabel, alertBanner, alertAccordion, textLabel } = tokens.component;

const text = textLabel.text.color;

/** Shared severity colors: background + icon/text pair per component. */
const severityRule = (background: string, iconColor: string, textColor: string) => ({
  backgroundColor: background,
  color: textColor,
  vars: { "--alert-icon-color": iconColor },
});

export const icon = style({
  display: "inline-flex",
  flexShrink: 0,
  color: "var(--alert-icon-color)" as string,
});

/** Alert Label — small inline alert next to the content it concerns. */
export const label = styleVariants(
  {
    success: [
      alertLabel.background.color.success,
      alertLabel.icon.shape.color.success,
      text.success.toneA,
    ],
    informative: [
      alertLabel.background.color.informative,
      alertLabel.icon.shape.color.informative,
      text.informative.toneA,
    ],
    warning: [
      alertLabel.background.color.warning,
      alertLabel.icon.shape.color.warning,
      text.warning.toneA,
    ],
  },
  ([background, iconColor, textColor]) => [
    labelTypography.medium,
    {
      display: "inline-flex",
      alignItems: "center",
      gap: val(alertLabel.gap),
      padding: val(alertLabel.padding),
      borderRadius: val(alertLabel.border.radius),
      ...severityRule(background, iconColor, textColor),
    },
  ],
);

/** Alert Banner — page-top alert with message and optional dismiss. */
export const banner = styleVariants(
  {
    success: [alertBanner.color.success, alertBanner.icon.shape.color.success, text.success.toneA],
    informative: [
      alertBanner.color.informative,
      alertBanner.icon.shape.color.informative,
      text.informative.toneA,
    ],
    warning: [alertBanner.color.warning, alertBanner.icon.shape.color.warning, text.warning.toneA],
  },
  ([background, iconColor, textColor]) => [
    labelTypography.medium,
    {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      minHeight: val(alertBanner.size.height),
      paddingTop: val(alertBanner.padding.top),
      paddingRight: val(alertBanner.padding.right),
      paddingBottom: val(alertBanner.padding.bottom),
      paddingLeft: val(alertBanner.padding.left),
      borderRadius: val(alertBanner.border.radius),
      ...severityRule(background, iconColor, textColor),
    },
  ],
);

export const bannerMessage = style({
  display: "flex",
  alignItems: "center",
  gap: val(alertBanner.innerContainerLeft.gap),
});

export const dismiss = style([
  focusRing,
  {
    display: "inline-flex",
    padding: val(alertBanner.padding.top),
    marginRight: val(alertBanner.innerContainerRight.padding.right),
    border: "none",
    borderRadius: val(alertLabel.border.radius),
    backgroundColor: "transparent",
    color: "inherit",
    cursor: "pointer",
  },
]);

/** Alert Accordion — expandable secondary alert on <details>. */
export const accordion = styleVariants(
  {
    success: [
      alertAccordion.background.color.success,
      alertAccordion.icon.shape.color.success,
      text.success.toneA,
    ],
    informative: [
      alertAccordion.background.color.informative,
      alertAccordion.icon.shape.color.informative,
      text.informative.toneA,
    ],
    warning: [
      alertAccordion.background.color.warning,
      alertAccordion.icon.shape.color.warning,
      text.warning.toneA,
    ],
  },
  ([background, iconColor, textColor]) => [
    labelTypography.medium,
    {
      padding: val(alertAccordion.padding),
      borderRadius: val(alertAccordion.border.radius),
      ...severityRule(background, iconColor, textColor),
    },
  ],
);

export const summary = style([
  focusRing,
  {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: val(alertAccordion.innerContainerLeft.gap),
    borderRadius: val(alertLabel.border.radius),
    cursor: "pointer",
    listStyle: "none",
    selectors: {
      "&::-webkit-details-marker": {
        display: "none",
      },
    },
  },
]);

export const summaryLabel = style({
  display: "flex",
  alignItems: "center",
  gap: val(alertAccordion.message.gap),
});

export const chevron = style({
  display: "inline-flex",
  flexShrink: 0,
  transition: "transform 0.15s ease",
  selectors: {
    "details[open] > summary &": {
      transform: "rotate(180deg)",
    },
  },
});

export const accordionBody = style({
  marginTop: val(alertAccordion.message.gap),
  marginBottom: 0,
});
