import type { DetailsHTMLAttributes, HTMLAttributes, MouseEventHandler, ReactNode } from "react";
import { CheckIcon, ChevronDownIcon, CloseIcon, InfoIcon, WarningIcon } from "../icons";
import { cx } from "../../utils/cx";
import * as styles from "./Alert.css";

export type AlertSeverity = "success" | "informative" | "warning";

const severityIcon: Record<AlertSeverity, ReactNode> = {
  success: <CheckIcon />,
  informative: <InfoIcon />,
  warning: <WarningIcon />,
};

/** warning interrupts (role=alert); success/informative are polite (role=status). */
const severityRole = (severity: AlertSeverity) => (severity === "warning" ? "alert" : "status");

export interface AlertLabelProps extends HTMLAttributes<HTMLDivElement> {
  severity?: AlertSeverity;
  children: ReactNode;
}

/** Inline alert placed next to the content it concerns (forms, modules). */
export function AlertLabel({
  severity = "informative",
  className,
  children,
  ...props
}: AlertLabelProps) {
  return (
    <div role={severityRole(severity)} className={cx(styles.label[severity], className)} {...props}>
      <span className={styles.icon} aria-hidden>
        {severityIcon[severity]}
      </span>
      {children}
    </div>
  );
}

export interface AlertBannerProps extends HTMLAttributes<HTMLDivElement> {
  severity?: AlertSeverity;
  children: ReactNode;
  /** Renders the dismiss button and receives its click. */
  onDismiss?: MouseEventHandler<HTMLButtonElement>;
}

/** Page-top alert: "vises i toppen av siden for å informere bruker". */
export function AlertBanner({
  severity = "informative",
  onDismiss,
  className,
  children,
  ...props
}: AlertBannerProps) {
  return (
    <div
      role={severityRole(severity)}
      className={cx(styles.banner[severity], className)}
      {...props}
    >
      <span className={styles.bannerMessage}>
        <span className={styles.icon} aria-hidden>
          {severityIcon[severity]}
        </span>
        {children}
      </span>
      {onDismiss && (
        <button type="button" className={styles.dismiss} aria-label="Lukk" onClick={onDismiss}>
          <CloseIcon />
        </button>
      )}
    </div>
  );
}

export interface AlertAccordionProps extends Omit<
  DetailsHTMLAttributes<HTMLDetailsElement>,
  "title"
> {
  severity?: AlertSeverity;
  /** Always-visible summary line */
  title: ReactNode;
  /** Expanded content */
  children: ReactNode;
}

/**
 * Expandable secondary alert on a native <details>, for detailed
 * notices that don't need immediate attention.
 */
export function AlertAccordion({
  severity = "informative",
  title,
  className,
  children,
  ...props
}: AlertAccordionProps) {
  return (
    <details className={cx(styles.accordion[severity], className)} {...props}>
      <summary className={styles.summary}>
        <span className={styles.summaryLabel}>
          <span className={styles.icon} aria-hidden>
            {severityIcon[severity]}
          </span>
          {title}
        </span>
        <span className={styles.chevron} aria-hidden>
          <ChevronDownIcon />
        </span>
      </summary>
      <div className={styles.accordionBody}>{children}</div>
    </details>
  );
}
