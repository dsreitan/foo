import type { HTMLAttributes } from "react";
import { cx } from "../../utils/cx";
import * as styles from "./Divider.css";

export interface DividerProps extends HTMLAttributes<HTMLHRElement> {
  color?: keyof typeof styles.root;
  orientation?: "horizontal" | "vertical";
}

/** Kobber Divider — 1px separator line, horizontal or vertical. */
export function Divider({
  color = "brand-b",
  orientation = "horizontal",
  className,
  ...props
}: DividerProps) {
  return (
    <hr aria-orientation={orientation} className={cx(styles.root[color], className)} {...props} />
  );
}
