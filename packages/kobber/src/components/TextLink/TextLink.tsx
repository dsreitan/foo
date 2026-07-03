import type { AnchorHTMLAttributes } from "react";
import { cx } from "../../utils/cx";
import * as styles from "./TextLink.css";

export interface TextLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Disables the link (renders aria-disabled, keeps it in the DOM) */
  disabled?: boolean;
}

/**
 * Kobber Text Link — inline link with the accent underline. For
 * actions, use Button instead ("for å navigere til et annet sted,
 * bruk link-komponentet").
 */
export function TextLink({ disabled, className, ...props }: TextLinkProps) {
  return (
    <a
      className={cx(styles.root, className)}
      aria-disabled={disabled || undefined}
      tabIndex={disabled ? -1 : undefined}
      {...props}
    />
  );
}
