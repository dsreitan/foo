import {
  cloneElement,
  isValidElement,
  useId,
  useState,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
} from "react";
import { cx } from "kobber";
import * as styles from "./Tooltip.css";

export interface TooltipProps extends Omit<HTMLAttributes<HTMLSpanElement>, "content"> {
  /** Short supplementary text — never content that exists nowhere else */
  content: ReactNode;
  /** A single focusable trigger element (e.g. a Button); it receives aria-describedby */
  children: ReactElement<HTMLAttributes<HTMLElement>>;
}

/**
 * PROPOSAL — supplementary text on hover and keyboard focus, dismissible
 * with Escape (WCAG 1.4.13). CSS-driven visibility, so it also works
 * prerendered. See docs/proposals/tooltip.md.
 */
export function Tooltip({ content, children, className, ...props }: TooltipProps) {
  const id = useId();
  const [dismissed, setDismissed] = useState(false);
  const trigger = isValidElement(children)
    ? cloneElement(children, { "aria-describedby": id })
    : children;
  return (
    <span
      className={cx(styles.wrapper, className)}
      data-dismissed={dismissed || undefined}
      onKeyDown={(event) => {
        if (event.key === "Escape") setDismissed(true);
      }}
      onMouseLeave={() => setDismissed(false)}
      onBlur={() => setDismissed(false)}
      {...props}
    >
      {trigger}
      <span role="tooltip" id={id} className={styles.tip}>
        {content}
      </span>
    </span>
  );
}
