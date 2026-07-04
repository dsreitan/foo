import { useId, useState, type HTMLAttributes, type ReactNode } from "react";
import { ChevronDownIcon } from "../icons";
import { cx } from "../../utils/cx";
import * as styles from "./Collapsible.css";

export interface CollapsibleProps extends HTMLAttributes<HTMLDivElement> {
  /** Content that is clamped while collapsed */
  children: ReactNode;
  /** Visible height while collapsed (px). Behavior parameter, not a token. */
  collapsedHeight?: number;
  expandLabel?: string;
  collapseLabel?: string;
}

/**
 * Kobber Collapsible — "vis mer"-clamp for long content: collapsed
 * content fades toward the page background and a toggle expands it.
 */
export function Collapsible({
  children,
  collapsedHeight = 120,
  expandLabel = "Vis mer",
  collapseLabel = "Vis mindre",
  className,
  ...props
}: CollapsibleProps) {
  const [expanded, setExpanded] = useState(false);
  const contentId = useId();
  return (
    <div className={cx(styles.root, className)} {...props}>
      <div
        id={contentId}
        className={styles.content}
        data-collapsed={!expanded}
        style={expanded ? undefined : { maxHeight: collapsedHeight }}
      >
        {children}
      </div>
      <button
        type="button"
        className={styles.toggle}
        aria-expanded={expanded}
        aria-controls={contentId}
        onClick={() => setExpanded((value) => !value)}
      >
        <span className={styles.toggleIcon} aria-hidden>
          <ChevronDownIcon />
        </span>
        {expanded ? collapseLabel : expandLabel}
      </button>
    </div>
  );
}
