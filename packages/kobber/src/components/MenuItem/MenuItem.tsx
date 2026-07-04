import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cx } from "../../utils/cx";
import * as styles from "./MenuItem.css";

interface MenuItemBaseProps {
  children: ReactNode;
  /** Marks the current page (persistent underline + aria-current) */
  active?: boolean;
  /** Indented sub-level item */
  nested?: boolean;
}

export type MenuItemProps = MenuItemBaseProps &
  (
    | ({ href: string } & AnchorHTMLAttributes<HTMLAnchorElement>)
    | ({ href?: undefined } & ButtonHTMLAttributes<HTMLButtonElement>)
  );

/**
 * Kobber Menu Item — row in menus and side navigation. Renders an
 * anchor when href is set, otherwise a button, so semantics follow
 * usage (navigation vs action).
 */
export function MenuItem({ children, active, nested, className, ...props }: MenuItemProps) {
  const classes = cx(styles.root, nested && styles.nested, className);
  const content = <span className={styles.text}>{children}</span>;

  if ("href" in props && props.href !== undefined) {
    return (
      <a
        className={classes}
        aria-current={active ? "page" : undefined}
        {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {content}
      </a>
    );
  }
  return (
    <button
      type="button"
      className={classes}
      aria-current={active ? "true" : undefined}
      {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {content}
    </button>
  );
}
