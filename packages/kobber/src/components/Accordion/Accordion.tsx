import type { DetailsHTMLAttributes, HTMLAttributes, ReactNode } from "react";
import { ChevronDownIcon } from "../icons";
import { cx } from "../../utils/cx";
import * as styles from "./Accordion.css";

export interface AccordionItemProps extends Omit<
  DetailsHTMLAttributes<HTMLDetailsElement>,
  "title"
> {
  /** Always-visible header line */
  title: ReactNode;
  /** Expanded content */
  children: ReactNode;
}

/** One expandable row on a native <details>/<summary>. */
export function AccordionItem({ title, className, children, ...props }: AccordionItemProps) {
  return (
    <details className={cx(styles.item, className)} {...props}>
      <summary className={styles.summary}>
        {title}
        <span className={styles.chevron} aria-hidden>
          <ChevronDownIcon />
        </span>
      </summary>
      <div className={styles.body}>{children}</div>
    </details>
  );
}

export interface AccordionGroupProps extends HTMLAttributes<HTMLDivElement> {
  /** AccordionItem elements */
  children: ReactNode;
}

/** Stacks AccordionItems with the group gap. */
export function AccordionGroup({ className, ...props }: AccordionGroupProps) {
  return <div className={cx(styles.group, className)} {...props} />;
}
