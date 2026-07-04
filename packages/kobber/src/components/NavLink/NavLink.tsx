import type { AnchorHTMLAttributes, HTMLAttributes, ReactNode } from "react";
import { cx } from "../../utils/cx";
import * as styles from "./NavLink.css";

export interface NavLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  color?: keyof typeof styles.root;
  /** Marks the link as the current page (persistent underline) */
  active?: boolean;
}

/**
 * Kobber Nav Link — navigation link that underlines on hover and stays
 * underlined on the active page.
 */
export function NavLink({ color = "brand", active, className, ...props }: NavLinkProps) {
  return (
    <a
      className={cx(styles.root[color], className)}
      aria-current={active ? "page" : undefined}
      {...props}
    />
  );
}

export interface NavLinkGroupProps extends HTMLAttributes<HTMLElement> {
  /** Accessible name for the navigation landmark */
  label: string;
  children: ReactNode;
}

/** A nav landmark laying out NavLinks with the group gap. */
export function NavLinkGroup({ label, className, ...props }: NavLinkGroupProps) {
  return <nav aria-label={label} className={cx(styles.group, className)} {...props} />;
}
