import type { HTMLAttributes } from "react";
import * as styles from "./Pagination.css";

export interface PaginationProps extends Omit<HTMLAttributes<HTMLElement>, "onChange"> {
  /** Current 1-based page */
  page: number;
  /** Total number of pages */
  count: number;
  onPageChange: (page: number) => void;
  /** Accessible name for the pagination landmark */
  label?: string;
  previousLabel?: string;
  nextLabel?: string;
  /** Prefix for each page button's accessible name, e.g. "Side 3" */
  pageLabel?: string;
}

/** Pages to show: first, last, and a window around the current page. */
function pageItems(page: number, count: number): (number | "…")[] {
  if (count <= 7) return Array.from({ length: count }, (_, i) => i + 1);
  const window = [page - 1, page, page + 1].filter((p) => p > 1 && p < count);
  const items: (number | "…")[] = [1];
  if (window[0] !== undefined && window[0] > 2) items.push("…");
  items.push(...window);
  const lastShown = window[window.length - 1];
  if (lastShown !== undefined && lastShown < count - 1) items.push("…");
  items.push(count);
  return items;
}

/**
 * PROPOSAL — page navigation for search results and long lists.
 * A nav landmark of buttons; the current page has aria-current="page".
 * See docs/proposals/pagination.md.
 */
export function Pagination({
  page,
  count,
  onPageChange,
  label = "Sidenavigasjon",
  previousLabel = "Forrige side",
  nextLabel = "Neste side",
  pageLabel = "Side",
  className,
  ...props
}: PaginationProps) {
  return (
    <nav aria-label={label} className={className} {...props}>
      <ul className={styles.list}>
        <li>
          <button
            type="button"
            className={styles.page}
            disabled={page <= 1}
            aria-label={previousLabel}
            onClick={() => onPageChange(page - 1)}
          >
            ‹
          </button>
        </li>
        {pageItems(page, count).map((item, index) =>
          item === "…" ? (
            <li key={`gap-${index}`} aria-hidden className={styles.ellipsis}>
              …
            </li>
          ) : (
            <li key={item}>
              <button
                type="button"
                className={styles.page}
                aria-label={`${pageLabel} ${item}`}
                aria-current={item === page ? "page" : undefined}
                onClick={() => onPageChange(item)}
              >
                {item}
              </button>
            </li>
          ),
        )}
        <li>
          <button
            type="button"
            className={styles.page}
            disabled={page >= count}
            aria-label={nextLabel}
            onClick={() => onPageChange(page + 1)}
          >
            ›
          </button>
        </li>
      </ul>
    </nav>
  );
}
