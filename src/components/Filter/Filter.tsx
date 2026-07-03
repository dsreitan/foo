import type { ButtonHTMLAttributes, ReactNode } from 'react'
import * as styles from './Filter.css'

export interface FilterProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /** Label of the filter */
  children: ReactNode
  /** Whether the filter is applied (Figma state=active) */
  selected?: boolean
  /** Optional result count shown in the counter chip (Figma "Show filter number") */
  count?: number
}

/**
 * Kobber Filter — "Brukes når man endrer hva som vises innenfor samme
 * grensesnitt." Toggle button with idle/hover/focus/active/disabled states
 * and an optional counter chip.
 */
export function Filter({ children, selected = false, count, ...props }: FilterProps) {
  return (
    <button type="button" aria-pressed={selected} className={styles.root} {...props}>
      {children}
      {count !== undefined && <span className={styles.counter}>{count}</span>}
    </button>
  )
}
