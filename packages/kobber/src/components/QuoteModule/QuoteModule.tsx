import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "../../utils/cx";
import * as styles from "./QuoteModule.css";

export interface QuoteModuleProps extends HTMLAttributes<HTMLElement> {
  /** The quoted text (rendered in a <blockquote>) */
  children: ReactNode;
  /** Who said it (rendered in a <figcaption>) */
  attribution?: ReactNode;
  /** Round image slot — meaningful alt if it shows the person */
  image?: ReactNode;
}

/** Kobber Quote Module — pull quote with optional round image and attribution. */
export function QuoteModule({
  children,
  attribution,
  image,
  className,
  ...props
}: QuoteModuleProps) {
  return (
    <figure className={cx(styles.root, className)} {...props}>
      {image && <div className={styles.image}>{image}</div>}
      <div className={styles.inner}>
        <blockquote className={styles.quote}>{children}</blockquote>
        {attribution && <figcaption className={styles.caption}>{attribution}</figcaption>}
      </div>
    </figure>
  );
}
