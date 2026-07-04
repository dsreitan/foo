import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import { CheckIcon } from "../icons";
import { cx } from "../../utils/cx";
import * as styles from "./Checkbox.css";

export interface CheckboxProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "children"
> {
  /** Visible label next to the control */
  label: ReactNode;
  /** Color theme from the checkbox tokens */
  color?: keyof typeof styles.control;
}

/**
 * Kobber Checkbox — native input wrapped in a label, with the bordered
 * control that fills when checked and shows the soft halo on
 * hover/active. All native input props (checked, onChange, disabled,
 * name, value, ...) pass straight through.
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { label, color = "brand", className, ...props },
  ref,
) {
  return (
    <label className={cx(styles.root, className)}>
      <input ref={ref} type="checkbox" className={styles.input} {...props} />
      <span className={styles.control[color]} aria-hidden>
        <span className={styles.check}>
          <CheckIcon />
        </span>
      </span>
      {label}
    </label>
  );
});
