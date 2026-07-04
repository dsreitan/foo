import { useId, type ReactNode, type SelectHTMLAttributes } from "react";
import { ChevronDownIcon, cx } from "kobber";
import * as styles from "./Select.css";

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  /** Visible label above the field */
  label: string;
  /** Native <option>/<optgroup> elements */
  children: ReactNode;
}

/**
 * PROPOSAL — form select on a native <select>, so keyboard, screen
 * reader and mobile pickers come from the platform. Same underlined
 * anatomy as TextInput. Dropdown is a menu, not a form control — this
 * fills that gap. See docs/proposals/select.md.
 */
export function Select({ label, id, className, children, ...props }: SelectProps) {
  const autoId = useId();
  const selectId = id ?? autoId;
  return (
    <div className={cx(styles.container, className)}>
      <label className={styles.label} htmlFor={selectId}>
        {label}
      </label>
      <span className={styles.fieldWrapper}>
        <select className={styles.field} id={selectId} {...props}>
          {children}
        </select>
        <span className={styles.icon} aria-hidden>
          <ChevronDownIcon />
        </span>
      </span>
    </div>
  );
}
