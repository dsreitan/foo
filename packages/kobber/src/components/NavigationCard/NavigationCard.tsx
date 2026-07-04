import type { ElementType, ReactNode } from "react";
import { cx } from "../../utils/cx";
import type { PolymorphicProps } from "../../utils/polymorphic";
import * as styles from "./NavigationCard.css";

export type NavigationCardProps<C extends ElementType = "a"> = PolymorphicProps<
  C,
  {
    /** Card label shown in the bottom text box */
    title: ReactNode;
    /** Background image slot; give the <img> an empty alt="" (decorative) */
    image?: ReactNode;
    /** Overlay tone on hover: dark over light images, light over dark */
    overlay?: "overlay-dark" | "overlay-light";
  }
>;

/**
 * Kobber Navigation Card — image entry point to a content area; the
 * whole card is one link named by its title. Pass a router link via
 * `as`: `<NavigationCard as={Link} to="/omrade" …>`.
 */
export function NavigationCard<C extends ElementType = "a">({
  as,
  title,
  image,
  overlay = "overlay-dark",
  className,
  ...props
}: NavigationCardProps<C>) {
  const Component: ElementType = as ?? "a";
  return (
    <Component className={cx(styles.root[overlay], className)} {...props}>
      {image && (
        <span className={styles.imageContainer} aria-hidden>
          {image}
        </span>
      )}
      <span className={styles.textBox}>{title}</span>
    </Component>
  );
}
