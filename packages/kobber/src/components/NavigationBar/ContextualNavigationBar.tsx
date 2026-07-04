import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "../../utils/cx";
import * as styles from "./ContextualNavigationBar.css";

export interface ContextualNavigationBarProps extends HTMLAttributes<HTMLElement> {
  /** Accessible name distinguishing this nav from the main one */
  label?: string;
  /** Left area: MenuItems/NavLinks for the current context */
  children?: ReactNode;
  /** Right area: contextual actions (Buttons, Dropdowns...) */
  actions?: ReactNode;
}

/**
 * Kobber Contextual Navigation Bar — secondary bar under the main
 * NavigationBar for section-level navigation. Built from the WIP
 * _contextual-navigation-bar tokens; revisit when they lose the
 * underscore.
 */
export function ContextualNavigationBar({
  label = "Kontekstuell navigasjon",
  children,
  actions,
  className,
  ...props
}: ContextualNavigationBarProps) {
  return (
    <nav aria-label={label} className={cx(styles.root, className)} {...props}>
      <div className={styles.left}>{children}</div>
      {actions && <div className={styles.right}>{actions}</div>}
    </nav>
  );
}
