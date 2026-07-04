import { forwardRef, useId, type TextareaHTMLAttributes } from "react";
import { cx } from "../../utils/cx";
import * as styles from "./TextArea.css";

export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Visible label above the field */
  label: string;
}

/**
 * Kobber text-area — multiline sibling of TextInput, sharing its
 * underlined field styling. Native textarea props pass straight through.
 */
export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(function TextArea(
  { label, id, className, ...props },
  ref,
) {
  const autoId = useId();
  const textareaId = id ?? autoId;
  return (
    <div className={cx(styles.container, className)}>
      <label className={styles.label} htmlFor={textareaId}>
        {label}
      </label>
      <textarea ref={ref} className={styles.textarea} id={textareaId} {...props} />
    </div>
  );
});
