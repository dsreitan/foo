import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "kobber";
import * as styles from "./StatCard.css";

export interface StatCardProps extends HTMLAttributes<HTMLElement> {
  /** What is being counted */
  label: ReactNode;
  /** The key figure */
  value: ReactNode;
  /** Trend/context slot, e.g. a Badge or Counter */
  meta?: ReactNode;
}

/**
 * PROPOSAL — dashboard key figure. Our dashboards currently misuse
 * TextModule for this. See docs/proposals/stat-card.md.
 */
export function StatCard({ label, value, meta, className, ...props }: StatCardProps) {
  return (
    <article className={cx(styles.root, className)} {...props}>
      <span className={styles.label}>{label}</span>
      <span className={styles.value}>{value}</span>
      {meta}
    </article>
  );
}
