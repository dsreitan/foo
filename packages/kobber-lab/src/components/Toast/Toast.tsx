import type { HTMLAttributes, MouseEventHandler, ReactNode } from "react";
import { Button, cx } from "kobber";
import * as styles from "./Toast.css";

export interface ToastProps extends HTMLAttributes<HTMLDivElement> {
  severity?: keyof typeof styles.root;
  children: ReactNode;
  onDismiss?: MouseEventHandler<HTMLButtonElement>;
  dismissLabel?: string;
}

/**
 * PROPOSAL — transient notification. Presentational only: stacking,
 * auto-dismiss timing and portal placement belong to the app. See
 * docs/proposals/toast.md.
 */
export function Toast({
  severity = "informative",
  children,
  onDismiss,
  dismissLabel = "Lukk",
  className,
  ...props
}: ToastProps) {
  return (
    <div
      role={severity === "warning" ? "alert" : "status"}
      className={cx(styles.root[severity], className)}
      {...props}
    >
      {children}
      {onDismiss && (
        <Button variant="brand-tertiary-a" onClick={onDismiss}>
          {dismissLabel}
        </Button>
      )}
    </div>
  );
}
