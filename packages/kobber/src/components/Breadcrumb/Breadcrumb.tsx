import type { AnchorHTMLAttributes, ElementType, HTMLAttributes, ReactNode } from "react";
import { cx } from "../../utils/cx";
import type { PolymorphicProps } from "../../utils/polymorphic";
import * as styles from "./Breadcrumb.css";

export interface BreadcrumbProps extends HTMLAttributes<HTMLElement> {
  /** BreadcrumbItem elements in order; the last one is the current page */
  children: ReactNode;
  /** Accessible name for the breadcrumb landmark */
  label?: string;
}

/**
 * Kobber Breadcrumb — the path back up the hierarchy. Items are a
 * children slot; give the last item no href to mark the current page.
 */
export function Breadcrumb({
  children,
  label = "Brødsmulesti",
  className,
  ...props
}: BreadcrumbProps) {
  return (
    <nav aria-label={label} className={className} {...props}>
      <ol className={styles.list}>{children}</ol>
    </nav>
  );
}

export type BreadcrumbItemProps<C extends ElementType = "a"> = PolymorphicProps<
  C,
  {
    children: ReactNode;
  }
>;

/**
 * With href (or a router link via `as`): a link up the hierarchy.
 * Without: the current page.
 */
export function BreadcrumbItem<C extends ElementType = "a">({
  as,
  children,
  className,
  ...props
}: BreadcrumbItemProps<C>) {
  const isLink = as !== undefined || ("href" in props && props.href !== undefined);
  const Component: ElementType = as ?? "a";
  return (
    <li className={styles.item}>
      {isLink ? (
        <Component className={cx(styles.link, className)} {...props}>
          {children}
        </Component>
      ) : (
        <span
          aria-current="page"
          className={cx(styles.current, className)}
          {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {children}
        </span>
      )}
    </li>
  );
}
