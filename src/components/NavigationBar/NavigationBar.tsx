import type { HTMLAttributes, MouseEventHandler, ReactNode } from 'react'
import { Button } from '../Button'
import * as styles from './NavigationBar.css'

export interface NavigationBarProps extends HTMLAttributes<HTMLElement> {
  /** Brand/logo area on the left, e.g. a link or an <img> */
  logo?: ReactNode
  /**
   * Slot for the actions on the right. Pass your own components
   * (Button, Filter, links...) — their props, including onClick, stay
   * on the component you render, nothing is forwarded or renamed.
   */
  children?: ReactNode
  /**
   * The one button the navbar owns: the menu button. Rendered only when
   * this handler is set; the navbar forwards it to the internal
   * Button's onClick.
   */
  onMenuClick?: MouseEventHandler<HTMLButtonElement>
}

/**
 * Kobber Navigation Bar — "Toppbarer som viser logo, meny, søk og andre
 * valg som skal være lett tilgjengelig."
 *
 * Prop propagation happens two ways:
 * 1. Composition (preferred): the actions area is a children slot, so a
 *    consumer's <Button onClick={...}> keeps its own props untouched.
 * 2. Owned parts: for the menu button the navbar itself renders, it
 *    exposes one narrow, purpose-named prop (onMenuClick) and forwards
 *    it internally — never a grab-bag like buttonProps.
 */
export function NavigationBar({ logo, children, onMenuClick, ...props }: NavigationBarProps) {
  return (
    <header className={styles.root} {...props}>
      <div className={styles.inner}>
        {logo && <div className={styles.logo}>{logo}</div>}
        <nav className={styles.actions}>
          {children}
          {onMenuClick && (
            <Button variant="brand-tertiary-a" onClick={onMenuClick}>
              Meny
            </Button>
          )}
        </nav>
      </div>
    </header>
  )
}
