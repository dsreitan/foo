import type { HTMLAttributes } from "react";
import { cx } from "kobber";
import * as styles from "./Skeleton.css";

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: keyof typeof styles.root;
  /** px or CSS size; text variant follows the current font size */
  width?: number | string;
  height?: number | string;
}

/**
 * PROPOSAL — loading placeholder. aria-hidden: pair it with a visible
 * loading announcement (role=status) in the app. See
 * docs/proposals/skeleton.md.
 */
export function Skeleton({
  variant = "text",
  width,
  height,
  className,
  style,
  ...props
}: SkeletonProps) {
  return (
    <div
      aria-hidden
      className={cx(styles.root[variant], className)}
      style={{ width, height, ...style }}
      {...props}
    />
  );
}
