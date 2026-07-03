import type { HTMLAttributes, MouseEventHandler, ReactNode } from 'react'
import { Button } from '../Button'
import { SearchIcon, UserIcon } from '../icons'
import { cx } from '../../utils/cx'
import * as styles from './NavigationBar.css'

export interface NavigationBarProps extends HTMLAttributes<HTMLElement> {
  /** Brand/logo area on the left, e.g. a link or an <img> */
  logo?: ReactNode
  /**
   * Center menu slot (dropdowns/links in Figma; hidden on mobile).
   * Pass your own components — their props, including onClick, stay on
   * the component you render, nothing is forwarded or renamed.
   */
  children?: ReactNode
  /**
   * The parts the navbar owns get one narrow, purpose-named prop each,
   * forwarded to the internal element's onClick. Each part renders only
   * when its handler is set.
   */
  onSearchClick?: MouseEventHandler<HTMLButtonElement>
  /** Placeholder text in the search trigger */
  searchLabel?: string
  onProfileClick?: MouseEventHandler<HTMLButtonElement>
}

/**
 * Kobber Navigation Bar — "Toppbarer som viser logo, meny, søk og andre
 * valg som skal være lett tilgjengelig."
 *
 * Anatomy from the Figma component set (product x size variants):
 * logo | menu items | search trigger + icon-only profile button.
 */
export function NavigationBar({
  logo,
  children,
  onSearchClick,
  searchLabel = 'Søk',
  onProfileClick,
  className,
  ...props
}: NavigationBarProps) {
  return (
    <header className={cx(styles.root, className)} {...props}>
      <div className={styles.inner}>
        {logo && <div className={styles.logo}>{logo}</div>}
        {children && <nav className={styles.menu}>{children}</nav>}
        <div className={styles.actions}>
          {onSearchClick && (
            <button type="button" className={styles.searchTrigger} onClick={onSearchClick}>
              {searchLabel}
              <span className={styles.searchIcon}>
                <SearchIcon />
              </span>
            </button>
          )}
          {onProfileClick && (
            <Button
              variant="brand-secondary-b"
              iconOnly
              aria-label="Profil"
              onClick={onProfileClick}
            >
              <UserIcon />
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
