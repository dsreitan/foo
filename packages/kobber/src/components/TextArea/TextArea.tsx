import { useId, type TextareaHTMLAttributes } from "react";
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
export function TextArea({ label, id, className, ...props }: TextAreaProps) {
  const autoId = useId();
  const textareaId = id ?? autoId;
  return (
    <div className={cx(styles.container, className)}>
      <label className={styles.label} htmlFor={textareaId}>
        {label}
      </label>
      <textarea className={styles.textarea} id={textareaId} {...props} />
    </div>
  );
}
