import { useId, type InputHTMLAttributes } from "react";
import { cx } from "../../utils/cx";
import * as styles from "./TextInput.css";

export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Visible label above the field */
  label: string;
}

/**
 * Kobber text input, built from the (work-in-progress) _text-input
 * tokens: underlined field that fills on hover and gets a thicker line
 * while active. Neither the Figma library nor kobber-components ships a
 * finished text input yet, so the exact anatomy is our interpretation —
 * revisit when the tokens lose their underscore.
 *
 * All native input props (value, onChange, placeholder, type, disabled,
 * ...) pass straight through to the <input> element.
 */
export function TextInput({ label, id, className, ...props }: TextInputProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  return (
    <div className={cx(styles.container, className)}>
      <label className={styles.label} htmlFor={inputId}>
        {label}
      </label>
      <input className={styles.field} id={inputId} {...props} />
    </div>
  );
}
