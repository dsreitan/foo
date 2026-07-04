import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "kobber";
import * as styles from "./EmptyState.css";

export interface EmptyStateProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  /** What is empty, e.g. "Ingen innleveringer ennå" (rendered as an h2) */
  title: ReactNode;
  /** Decorative illustration slot (icon or DAM image with alt="") */
  illustration?: ReactNode;
  /** Explanation and the way forward */
  children?: ReactNode;
  /** Primary action, e.g. a Button */
  action?: ReactNode;
}

/**
 * PROPOSAL — standardized empty state so "nothing here yet" never is a
 * blank surface: what's empty, why, and the next step. See
 * docs/proposals/empty-state.md.
 */
export function EmptyState({
  title,
  illustration,
  children,
  action,
  className,
  ...props
}: EmptyStateProps) {
  return (
    <div className={cx(styles.root, className)} {...props}>
      {illustration && (
        <span className={styles.illustration} aria-hidden>
          {illustration}
        </span>
      )}
      <h2 className={styles.title}>{title}</h2>
      {children && <p className={styles.description}>{children}</p>}
      {action}
    </div>
  );
}
