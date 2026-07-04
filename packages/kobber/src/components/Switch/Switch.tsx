import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
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
export const Switch = forwardRef<HTMLInputElement, SwitchProps>(function Switch(
  { label, className, ...props },
  ref,
) {
  return (
    <label className={cx(styles.root, className)}>
      <input ref={ref} type="checkbox" role="switch" className={styles.input} {...props} />
      <span className={styles.track.brand} aria-hidden>
        <span className={styles.thumb} />
      </span>
      {label}
    </label>
  );
});
