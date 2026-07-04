import type { ElementType, HTMLAttributes, ReactNode } from "react";
import { cx } from "../../utils/cx";
import type { PolymorphicProps } from "../../utils/polymorphic";
import * as styles from "./NavLink.css";

export type NavLinkProps<C extends ElementType = "a"> = PolymorphicProps<
  C,
  {
    color?: keyof typeof styles.root;
    /** Marks the link as the current page (persistent underline) */
    active?: boolean;
  }
>;

/**
 * Kobber Nav Link — navigation link that underlines on hover and stays
 * underlined on the active page. Pass a router link via `as`:
 * `<NavLink as={Link} to="/side">`.
 */
export function NavLink<C extends ElementType = "a">({
  as,
  color = "brand",
  active,
  className,
  ...props
}: NavLinkProps<C>) {
  const Component: ElementType = as ?? "a";
  return (
    <Component
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
