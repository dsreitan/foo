import type { HTMLAttributes } from "react";
import { cx } from "kobber";
import * as styles from "./ProgressBar.css";

export interface ProgressBarProps extends HTMLAttributes<HTMLDivElement> {
  /** 0–100 */
  value: number;
  /** Accessible name, e.g. the student's or task's name */
  label: string;
}

/**
 * PROPOSAL — determinate progress bar (student progress, uploads).
 * See docs/proposals/progress-bar.md.
 */
export function ProgressBar({ value, label, className, ...props }: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={clamped}
      className={cx(styles.track, className)}
      {...props}
    >
      <div
        className={cx(styles.fill, clamped === 100 && styles.complete)}
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}
