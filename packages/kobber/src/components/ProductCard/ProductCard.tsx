import type { ElementType, ReactNode } from "react";
import { cx } from "../../utils/cx";
import type { PolymorphicProps } from "../../utils/polymorphic";
import * as styles from "./ProductCard.css";

export type ProductCardProps<C extends ElementType = "a"> = PolymorphicProps<
  C,
  {
    /** Product/cover image slot */
    image?: ReactNode;
    title: ReactNode;
    /** Secondary line, e.g. author or format */
    subtitle?: ReactNode;
    /** Colored container variant */
    color?: keyof typeof styles.root;
  }
>;

/**
 * Kobber Product Card — a book/digital product on a colored container.
 * The whole card is a link; pass href like any anchor, or a router
 * link via `as`: `<ProductCard as={Link} to="/bok/123" …>`.
 */
export function ProductCard<C extends ElementType = "a">({
  as,
  image,
  title,
  subtitle,
  color = "brand",
  className,
  ...props
}: ProductCardProps<C>) {
  const Component: ElementType = as ?? "a";
  return (
    <Component className={cx(styles.root[color], className)} {...props}>
      <span className={styles.inner}>
        {image && <span className={styles.image}>{image}</span>}
        <span className={styles.text}>
          <span className={styles.title}>{title}</span>
          {subtitle && <span className={styles.subtitle}>{subtitle}</span>}
        </span>
      </span>
    </Component>
  );
}
