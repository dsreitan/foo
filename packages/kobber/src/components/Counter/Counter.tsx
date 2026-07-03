import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "../../utils/cx";
import * as styles from "./Counter.css";

export interface CounterProps extends HTMLAttributes<HTMLSpanElement> {
  /** Number or letter to display */
  children: ReactNode;
  /** Color variant from the counter tokens */
  color?: keyof typeof styles.root;
}

/**
 * Kobber Counter — small standalone count/letter chip (the Figma set
 * is type number/letter x color). Same square-minimum rule as the
 * counter inside Filter.
 */
export function Counter({ children, color = "neutral", className, ...props }: CounterProps) {
  return (
    <span className={cx(styles.root[color], className)} {...props}>
      {children}
    </span>
  );
}
