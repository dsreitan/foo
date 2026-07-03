import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "../../utils/cx";
import * as styles from "./ContentCard.css";

export interface ContentCardProps extends HTMLAttributes<HTMLElement> {
  /** prominent = stacked with large image; subtle = compact row */
  variant?: keyof typeof styles.root;
  /** Image slot (an <img>, gradient, illustration...) */
  image?: ReactNode;
  /** Card heading */
  title: ReactNode;
  /** Meta slot above the title, e.g. a Badge */
  meta?: ReactNode;
  /** Body/ingress and anything else (TextLink, ...) */
  children?: ReactNode;
}

/**
 * Kobber Content Card — article/content entry with image, meta, title
 * and ingress. Slots keep their own props; the card itself is not
 * interactive (put a TextLink or wrap in an anchor as needed).
 */
export function ContentCard({
  variant = "prominent",
  image,
  title,
  meta,
  className,
  children,
  ...props
}: ContentCardProps) {
  return (
    <article className={cx(styles.root[variant], className)} {...props}>
      {image && <div className={styles.image[variant]}>{image}</div>}
      <div className={styles.text}>
        {meta}
        <h3 className={styles.title}>{title}</h3>
        {children}
      </div>
    </article>
  );
}
