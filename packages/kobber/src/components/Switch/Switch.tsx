import type { InputHTMLAttributes, ReactNode } from "react";
import { cx } from "../../utils/cx";
import * as styles from "./Switch.css";

export interface SwitchProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "children" | "role"
> {
  /** Visible label next to the switch */
  label: ReactNode;
}

/**
 * Kobber Switch — on/off toggle on the switch tokens (56x32 track,
 * 24px thumb). A native checkbox with role="switch" underneath, so
 * checked/onChange/disabled work as usual.
 */
export function Switch({ label, className, ...props }: SwitchProps) {
  return (
    <label className={cx(styles.root, className)}>
      <input type="checkbox" role="switch" className={styles.input} {...props} />
      <span className={styles.track.brand} aria-hidden>
        <span className={styles.thumb} />
      </span>
      {label}
    </label>
  );
}
