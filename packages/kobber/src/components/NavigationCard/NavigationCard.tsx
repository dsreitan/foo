import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cx } from "../../utils/cx";
import * as styles from "./NavigationCard.css";

export interface NavigationCardProps extends Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "title"
> {
  /** Card label shown in the bottom text box */
  title: ReactNode;
  /** Background image slot; give the <img> an empty alt="" (decorative) */
  image?: ReactNode;
  /** Overlay tone on hover: dark over light images, light over dark */
  overlay?: "overlay-dark" | "overlay-light";
}

/**
 * Kobber Navigation Card — image entry point to a content area; the
 * whole card is one link named by its title.
 */
export function NavigationCard({
  title,
  image,
  overlay = "overlay-dark",
  className,
  ...props
}: NavigationCardProps) {
  return (
    <a className={cx(styles.root[overlay], className)} {...props}>
      {image && (
        <span className={styles.imageContainer} aria-hidden>
          {image}
        </span>
      )}
      <span className={styles.textBox}>{title}</span>
    </a>
  );
}
