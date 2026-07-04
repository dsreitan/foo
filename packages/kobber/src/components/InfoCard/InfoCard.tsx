import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "../../utils/cx";
import * as styles from "./InfoCard.css";

export interface InfoCardProps extends Omit<HTMLAttributes<HTMLElement>, "title"> {
  /** Person/entity name */
  title: ReactNode;
  /** Portrait/illustration slot — give the <img> a meaningful alt */
  image?: ReactNode;
  /** Body: role, bio, contact links... */
  children?: ReactNode;
  /** Heading level of the title; match the page outline (default h3) */
  headingLevel?: 2 | 3 | 4;
}

/**
 * Kobber Info Card — presentation of a person or entity: 120px image
 * beside a text column. Not interactive by itself.
 */
export function InfoCard({
  title,
  image,
  headingLevel = 3,
  className,
  children,
  ...props
}: InfoCardProps) {
  const Heading = `h${headingLevel}` as const;
  return (
    <article className={cx(styles.root, className)} {...props}>
      {image && <div className={styles.image}>{image}</div>}
      <div className={styles.inner}>
        <Heading className={styles.title}>{title}</Heading>
        {children}
      </div>
    </article>
  );
}
