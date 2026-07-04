import {
  useId,
  useState,
  type HTMLAttributes,
  type MouseEventHandler,
  type ReactNode,
} from "react";
import { Button } from "../Button";
import { CloseIcon, MenuIcon, SearchIcon, UserIcon } from "../icons";
import { cx } from "../../utils/cx";
import * as styles from "./NavigationBar.css";

export interface NavigationBarProps extends HTMLAttributes<HTMLElement> {
  /** Brand/logo area on the left, e.g. a link or an <img> */
  logo?: ReactNode;
  /**
   * Center menu slot (dropdowns/links in Figma; behind a hamburger
   * toggle on mobile). Pass your own components — their props,
   * including onClick, stay on the component you render, nothing is
   * forwarded or renamed.
   */
  children?: ReactNode;
  /**
   * The parts the navbar owns get one narrow, purpose-named prop each,
   * forwarded to the internal element's onClick. Each part renders only
   * when its handler is set.
   */
  onSearchClick?: MouseEventHandler<HTMLButtonElement>;
  /** Placeholder text in the search trigger */
  searchLabel?: string;
  onProfileClick?: MouseEventHandler<HTMLButtonElement>;
  /** Accessible name for the profile button */
  profileLabel?: string;
  /** Accessible name for the menu landmark and its mobile hamburger toggle */
  menuLabel?: string;
}

/**
 * Kobber Navigation Bar — "Toppbarer som viser logo, meny, søk og andre
 * valg som skal være lett tilgjengelig."
 *
 * Anatomy from the Figma component set (product x size variants):
 * logo | menu items | search trigger + icon-only profile button.
 * On mobile the menu collapses behind a hamburger (disclosure pattern:
 * aria-expanded + aria-controls), like gyldendal.no does in production.
 */
export function NavigationBar({
  logo,
  children,
  onSearchClick,
  searchLabel = "Søk",
  onProfileClick,
  profileLabel = "Profil",
  menuLabel = "Meny",
  className,
  ...props
}: NavigationBarProps) {
  const menuId = useId();
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className={cx(styles.root, className)} {...props}>
      <div className={styles.inner}>
        {logo && <div className={styles.logo}>{logo}</div>}
        {children && (
          <nav
            id={menuId}
            aria-label={menuLabel}
            className={cx(styles.menu, menuOpen && styles.menuOpen)}
          >
            {children}
          </nav>
        )}
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
              aria-label={profileLabel}
              onClick={onProfileClick}
            >
              <UserIcon />
            </Button>
          )}
          {children && (
            <Button
              variant="brand-secondary-b"
              iconOnly
              className={styles.menuToggle}
              aria-label={menuLabel}
              aria-expanded={menuOpen}
              aria-controls={menuId}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <CloseIcon /> : <MenuIcon />}
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
