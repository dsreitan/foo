import type { AnchorHTMLAttributes, HTMLAttributes, ReactNode } from "react";
import { cx } from "../../utils/cx";
import * as styles from "./Breadcrumb.css";

export interface BreadcrumbProps extends HTMLAttributes<HTMLElement> {
  /** BreadcrumbItem elements in order; the last one is the current page */
  children: ReactNode;
}

/**
 * Kobber Breadcrumb — the path back up the hierarchy. Items are a
 * children slot; give the last item no href to mark the current page.
 */
export function Breadcrumb({ children, className, ...props }: BreadcrumbProps) {
  return (
    <nav aria-label="Brødsmulesti" className={className} {...props}>
      <ol className={styles.list}>{children}</ol>
    </nav>
  );
}

export interface BreadcrumbItemProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
}

/** With href: a link up the hierarchy. Without: the current page. */
export function BreadcrumbItem({ href, children, className, ...props }: BreadcrumbItemProps) {
  return (
    <li className={styles.item}>
      {href ? (
        <a href={href} className={cx(styles.link, className)} {...props}>
          {children}
        </a>
      ) : (
        <span aria-current="page" className={cx(styles.current, className)}>
          {children}
        </span>
      )}
    </li>
  );
}
