import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "../../utils/cx";
import * as styles from "./ProfileCard.css";

export interface ProfileCardProps extends Omit<HTMLAttributes<HTMLElement>, "title"> {
  /** Person name */
  title: ReactNode;
  /** Portrait slot — meaningful alt required */
  image?: ReactNode;
  /** Role, contact info, links... */
  children?: ReactNode;
  /** Heading level of the title; match the page outline (default h3) */
  headingLevel?: 2 | 3 | 4;
}

/** Kobber Profile Card — stacked person presentation: portrait above name and details. */
export function ProfileCard({
  title,
  image,
  headingLevel = 3,
  className,
  children,
  ...props
}: ProfileCardProps) {
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
