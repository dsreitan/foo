import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ComponentPropsWithoutRef,
  ElementType,
  ReactNode,
} from "react";
import { cx } from "../../utils/cx";
import * as styles from "./MenuItem.css";

interface MenuItemBaseProps {
  children: ReactNode;
  /** Marks the current page (persistent underline + aria-current) */
  active?: boolean;
  /** Indented sub-level item */
  nested?: boolean;
}

export type MenuItemProps<C extends ElementType = "a"> = MenuItemBaseProps &
  (
    | ({ as: C; href?: string } & Omit<ComponentPropsWithoutRef<C>, "as">)
    | ({ as?: undefined; href: string } & AnchorHTMLAttributes<HTMLAnchorElement>)
    | ({ as?: undefined; href?: undefined } & ButtonHTMLAttributes<HTMLButtonElement>)
  );

/**
 * Kobber Menu Item — row in menus and side navigation. Renders an
 * anchor when href is set, otherwise a button, so semantics follow
 * usage (navigation vs action). Pass a router link via `as`:
 * `<MenuItem as={Link} to="/side">`.
 */
export function MenuItem<C extends ElementType = "a">({
  children,
  active,
  nested,
  className,
  ...props
}: MenuItemProps<C>) {
  const classes = cx(styles.root, nested && styles.nested, className);
  const content = <span className={styles.text}>{children}</span>;

  if ("as" in props && props.as !== undefined) {
    const { as: Component, ...rest } = props as { as: ElementType } & Record<string, unknown>;
    return (
      <Component className={classes} aria-current={active ? "page" : undefined} {...rest}>
        {content}
      </Component>
    );
  }
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
