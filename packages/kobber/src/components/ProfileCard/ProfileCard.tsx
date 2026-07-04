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
}

/** Kobber Profile Card — stacked person presentation: portrait above name and details. */
export function ProfileCard({ title, image, className, children, ...props }: ProfileCardProps) {
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
