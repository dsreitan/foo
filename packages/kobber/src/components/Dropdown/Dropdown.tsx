import {
  useId,
  useRef,
  type ButtonHTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
  type RefObject,
} from "react";
import { ChevronCircleIcon } from "../icons";
import { usePopover } from "../Popover";
import { cx } from "../../utils/cx";
import * as styles from "./Dropdown.css";

export interface DropdownProps {
  /** Trigger label */
  label: ReactNode;
  /** DropdownItem elements shown in the open menu */
  children: ReactNode;
  /** Figma variant: plain (navigation) or filled (select-like) trigger */
  appearance?: keyof typeof styles.trigger;
  className?: string;
}

/**
 * Kobber Dropdown — trigger with expandable menu, following the APG
 * menu-button pattern: ArrowDown/ArrowUp open the menu and move focus
 * through the items (wrapping), Home/End jump, Escape closes and
 * returns focus to the trigger, item click closes.
 */
export function Dropdown({ label, children, appearance = "plain", className }: DropdownProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const { open, setOpen, close, triggerRef } = usePopover(wrapperRef);
  const menuId = useId();

  const items = () =>
    Array.from(menuRef.current?.querySelectorAll<HTMLElement>("button, a[href]") ?? []);

  const focusItem = (index: number) => {
    const all = items();
    if (all.length === 0) return;
    const target = all[((index % all.length) + all.length) % all.length];
    target?.focus();
  };

  const onTriggerKeyDown = (event: KeyboardEvent) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      setOpen(true);
      // Focus first/last item once the menu is in the DOM
      requestAnimationFrame(() => focusItem(event.key === "ArrowDown" ? 0 : -1));
    }
  };

  const onMenuKeyDown = (event: KeyboardEvent) => {
    const all = items();
    const current = all.indexOf(document.activeElement as HTMLElement);
    if (event.key === "ArrowDown") {
      event.preventDefault();
      focusItem(current + 1);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      focusItem(current - 1);
    } else if (event.key === "Home") {
      event.preventDefault();
      focusItem(0);
    } else if (event.key === "End") {
      event.preventDefault();
      focusItem(-1);
    } else if (event.key === "Tab") {
      close();
    }
  };

  return (
    <div ref={wrapperRef} className={cx(styles.wrapper, className)}>
      <button
        ref={triggerRef as RefObject<HTMLButtonElement>}
        type="button"
        className={styles.trigger[appearance]}
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        onClick={() => setOpen((value) => !value)}
        onKeyDown={onTriggerKeyDown}
      >
        {label}
        <span className={styles.chevron} aria-hidden>
          <ChevronCircleIcon />
        </span>
      </button>
      {open && (
        <div
          ref={menuRef}
          id={menuId}
          className={styles.menu}
          onClick={() => close()}
          onKeyDown={onMenuKeyDown}
        >
          {children}
        </div>
      )}
    </div>
  );
}

export type DropdownItemProps = ButtonHTMLAttributes<HTMLButtonElement>;

/** Menu item; a plain button styled by the _dropdown-item tokens. */
export function DropdownItem({ className, ...props }: DropdownItemProps) {
  return <button type="button" className={cx(styles.item, className)} {...props} />;
}
