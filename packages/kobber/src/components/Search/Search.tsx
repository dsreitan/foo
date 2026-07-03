import type { InputHTMLAttributes } from "react";
import { SearchIcon } from "../icons";
import { cx } from "../../utils/cx";
import * as styles from "./Search.css";

export interface SearchProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "children"
> {}

/**
 * Kobber Search — the full search field ("Søkefelt som brukes i
 * navigasjonsmenyer"). Native input props pass straight through;
 * wire up onChange/onKeyDown for the actual searching.
 */
export function Search({ className, "aria-label": ariaLabel = "Søk", ...props }: SearchProps) {
  return (
    <span className={cx(styles.root, className)}>
      <input
        type="search"
        className={styles.input}
        placeholder="Søk"
        aria-label={ariaLabel}
        {...props}
      />
      <span className={styles.icon} aria-hidden>
        <SearchIcon />
      </span>
    </span>
  );
}
