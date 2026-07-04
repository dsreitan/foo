import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "../../utils/cx";
import * as styles from "./ContentCard.css";

export interface ContentCardProps extends Omit<HTMLAttributes<HTMLElement>, "title"> {
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
  /** Heading level of the title; match the page outline (default h3) */
  headingLevel?: 2 | 3 | 4;
}

/**
 * Kobber Content Card — article/content entry with image, meta, title
 * and ingress. Slots keep their own props; the card itself is not
 * interactive (put a TextLink or wrap in an anchor as needed).
 */
export function ContentCard({
  variant = "prominent",
  image,
  headingLevel = 3,
  title,
  meta,
  className,
  children,
  ...props
}: ContentCardProps) {
  const Heading = `h${headingLevel}` as const;
  return (
    <article className={cx(styles.root[variant], className)} {...props}>
      {image && <div className={styles.image[variant]}>{image}</div>}
      <div className={styles.text}>
        {meta}
        <Heading className={styles.title}>{title}</Heading>
        {children}
      </div>
    </article>
  );
}
