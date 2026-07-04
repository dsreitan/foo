import type { HTMLAttributes } from "react";
import { cx } from "../../utils/cx";
import * as styles from "./Logo.css";

export interface LogoProps extends HTMLAttributes<HTMLSpanElement> {
  /** Accessible name; also the alt text once the DAM image lands */
  alt?: string;
}

/**
 * Kobber Logo — PLACEHOLDER wordmark until the logo assets are served
 * from the DAM CDN (see src/assets/dam.ts). Swap the inner content for
 * an <img src={dam.previewUrl(...)} alt={alt}> when asset IDs exist.
 */
export function Logo({ alt = "Gyldendal", className, ...props }: LogoProps) {
  return (
    <span role="img" aria-label={alt} className={cx(styles.root, className)} {...props}>
      <svg viewBox="0 0 16 16" width="20" height="20" aria-hidden fill="currentColor">
        {/* Simplified tree mark placeholder */}
        <path d="M8 1 3.5 8h2L3 12h4v3h2v-3h4l-2.5-4h2L8 1Z" />
      </svg>
      {alt}
    </span>
  );
}
