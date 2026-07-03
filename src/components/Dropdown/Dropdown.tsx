import {
  useEffect,
  useId,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type ReactNode,
} from 'react'
import { ChevronCircleIcon } from '../icons'
import { cx } from '../../utils/cx'
import * as styles from './Dropdown.css'

export interface DropdownProps {
  /** Trigger label */
  label: ReactNode
  /** DropdownItem elements (or anything else) shown in the open menu */
  children: ReactNode
  /** Figma variant: plain (navigation) or filled (select-like) trigger */
  appearance?: keyof typeof styles.trigger
  className?: string
}

/**
 * Kobber Dropdown — trigger with expandable menu, as used in the
 * Navigation Bar. The menu closes on item click, outside click and
 * Escape. Items are passed as children and keep their own props
 * (onClick included), same composition pattern as the rest of the
 * library.
 */
export function Dropdown({ label, children, appearance = 'plain', className }: DropdownProps) {
  const [open, setOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const menuId = useId()

  useEffect(() => {
    if (!open) return
    const onPointerDown = (event: PointerEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) setOpen(false)
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <div ref={wrapperRef} className={cx(styles.wrapper, className)}>
      <button
        type="button"
        className={styles.trigger[appearance]}
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((value) => !value)}
      >
        {label}
        <span className={styles.chevron}>
          <ChevronCircleIcon />
        </span>
      </button>
      {open && (
        <div
          id={menuId}
          className={styles.menu}
          onClick={() => setOpen(false)}
        >
          {children}
        </div>
      )}
    </div>
  )
}

export type DropdownItemProps = ButtonHTMLAttributes<HTMLButtonElement>

/** Menu item; a plain button styled by the _dropdown-item tokens. */
export function DropdownItem({ className, ...props }: DropdownItemProps) {
  return <button type="button" className={cx(styles.item, className)} {...props} />
}
