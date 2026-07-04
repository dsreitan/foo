import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import { cx } from "../../utils/cx";
import * as styles from "./Radiobutton.css";

export interface RadiobuttonProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "children"
> {
  /** Visible label next to the control */
  label: ReactNode;
  /** Color theme from the radiobutton tokens */
  color?: keyof typeof styles.control;
}

/**
 * Kobber Radiobutton — "brukes når vi ønsker å la brukeren velge et
 * alternativ fra en gruppe med valg". Native radio input; group by
 * giving the buttons the same `name`.
 */
export const Radiobutton = forwardRef<HTMLInputElement, RadiobuttonProps>(function Radiobutton(
  { label, color = "brand", className, ...props },
  ref,
) {
  return (
    <label className={cx(styles.root, className)}>
      <input ref={ref} type="radio" className={styles.input} {...props} />
      <span className={styles.control[color]} aria-hidden>
        <span className={styles.dot} />
      </span>
      {label}
    </label>
  );
});
