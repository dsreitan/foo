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
}

/**
 * Kobber Info Card — presentation of a person or entity: 120px image
 * beside a text column. Not interactive by itself.
 */
export function InfoCard({ title, image, className, children, ...props }: InfoCardProps) {
  return (
    <article className={cx(styles.root, className)} {...props}>
      {image && <div className={styles.image}>{image}</div>}
      <div className={styles.inner}>
        <h3 className={styles.title}>{title}</h3>
        {children}
      </div>
    </article>
  );
}
