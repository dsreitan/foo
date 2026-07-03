import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cx } from "../../utils/cx";
import * as styles from "./ProductCard.css";

export interface ProductCardProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Product/cover image slot */
  image?: ReactNode;
  title: ReactNode;
  /** Secondary line, e.g. author or format */
  subtitle?: ReactNode;
  /** Colored container variant */
  color?: keyof typeof styles.root;
}

/**
 * Kobber Product Card — a book/digital product on a colored container.
 * The whole card is a link; pass href like any anchor.
 */
export function ProductCard({
  image,
  title,
  subtitle,
  color = "brand",
  className,
  ...props
}: ProductCardProps) {
  return (
    <a className={cx(styles.root[color], className)} {...props}>
      <span className={styles.inner}>
        {image && <span className={styles.image}>{image}</span>}
        <span className={styles.text}>
          <span className={styles.title}>{title}</span>
          {subtitle && <span className={styles.subtitle}>{subtitle}</span>}
        </span>
      </span>
    </a>
  );
}
