import { useId, useState, type HTMLAttributes, type ReactNode } from "react";
import { ChevronDownIcon } from "../icons";
import { cx } from "../../utils/cx";
import * as styles from "./ContextualNavigationBar.css";

export interface ContextualNavigationBarProps extends HTMLAttributes<HTMLElement> {
  /** Accessible name distinguishing this nav from the main one */
  label?: string;
  /** Left area: MenuItems/NavLinks for the current context */
  children?: ReactNode;
  /** Right area: contextual actions (Buttons, Dropdowns...) */
  actions?: ReactNode;
  /** Label on the mobile disclosure toggle that collapses the menu */
  menuLabel?: string;
}

/**
 * Kobber Contextual Navigation Bar — secondary bar under the main
 * NavigationBar for section-level navigation. Built from the WIP
 * _contextual-navigation-bar tokens; revisit when they lose the
 * underscore. On mobile the items collapse behind a disclosure toggle
 * (aria-expanded + aria-controls).
 */
export function ContextualNavigationBar({
  label = "Kontekstuell navigasjon",
  children,
  actions,
  menuLabel = "Meny",
  className,
  ...props
}: ContextualNavigationBarProps) {
  const menuId = useId();
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav aria-label={label} className={cx(styles.root, className)} {...props}>
      {children && (
        <button
          type="button"
          className={styles.toggle}
          aria-expanded={menuOpen}
          aria-controls={menuId}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuLabel}
          <span className={styles.toggleIcon}>
            <ChevronDownIcon />
          </span>
        </button>
      )}
      <div id={menuId} className={cx(styles.left, menuOpen && styles.leftOpen)}>
        {children}
      </div>
      {actions && <div className={styles.right}>{actions}</div>}
    </nav>
  );
}
