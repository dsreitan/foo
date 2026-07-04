import type { HTMLAttributes } from "react";
import { cx } from "kobber";
import * as styles from "./Avatar.css";

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
  /** Person's name — used for the initials fallback and accessible label */
  name: string;
  /** Portrait URL; initials from name are shown when omitted */
  src?: string;
  /** Alt text for the portrait; defaults to name. Pass "" when the name is visible next to the avatar. */
  alt?: string;
  size?: keyof typeof styles.root;
}

function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? (parts[parts.length - 1][0] ?? "") : "";
  return `${first}${last}`;
}

/**
 * PROPOSAL — round portrait with initials fallback for lists, comments
 * and collaboration views. See docs/proposals/avatar.md.
 */
export function Avatar({ name, src, alt, size = "medium", className, ...props }: AvatarProps) {
  return (
    <span
      className={cx(styles.root[size], className)}
      {...(src ? {} : { role: "img", "aria-label": name })}
      {...props}
    >
      {src ? (
        <img className={styles.image} src={src} alt={alt ?? name} />
      ) : (
        <span aria-hidden>{initials(name)}</span>
      )}
    </span>
  );
}
