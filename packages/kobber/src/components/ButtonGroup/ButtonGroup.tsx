import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "../../utils/cx";
import * as styles from "./ButtonGroup.css";

export interface ButtonGroupProps extends HTMLAttributes<HTMLDivElement> {
  /** Buttons (or other actions) with their own props */
  children: ReactNode;
}

/** Kobber Button Group — a row of related actions with token gap. */
export function ButtonGroup({ className, ...props }: ButtonGroupProps) {
  return <div role="group" className={cx(styles.root, className)} {...props} />;
}
