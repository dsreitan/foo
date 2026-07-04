import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "../../utils/cx";
import * as styles from "./TextModule.css";

export interface TextModuleProps extends HTMLAttributes<HTMLElement> {
  /** Text content: headings, paragraphs, lists, links */
  children: ReactNode;
  /** Colored surface variant; tone-a is dark with light text */
  color?: keyof typeof styles.root;
}

/**
 * Kobber Text Module — colored text section for long-form content.
 * Text color cascades from the surface, so Text/List/TextLink children
 * inherit correctly.
 */
export function TextModule({ children, color = "brand-b", className, ...props }: TextModuleProps) {
  return (
    <section className={cx(styles.root[color], className)} {...props}>
      {children}
    </section>
  );
}
