import type { HTMLAttributes, LiHTMLAttributes, ReactNode } from "react";
import { cx } from "../../utils/cx";
import * as styles from "./List.css";

export interface ListProps extends HTMLAttributes<HTMLUListElement | HTMLOListElement> {
  /** Numbered list with accent counters instead of bullets */
  ordered?: boolean;
  /** Set on a List rendered inside a ListItem */
  nested?: boolean;
  children: ReactNode;
}

/**
 * Kobber content list — ordered/unordered running-text lists with
 * accent-colored markers (the LIST section on the Figma Text page).
 */
export function List({ ordered = false, nested = false, className, ...props }: ListProps) {
  const Tag = ordered ? "ol" : "ul";
  return (
    <Tag
      className={cx(
        styles.root[ordered ? "ordered" : "unordered"],
        nested && styles.nested,
        className,
      )}
      {...props}
    />
  );
}

export type ListItemProps = LiHTMLAttributes<HTMLLIElement>;

export function ListItem({ className, ...props }: ListItemProps) {
  return <li className={cx(styles.item, className)} {...props} />;
}
