import {
  cloneElement,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactElement,
  type ReactNode,
  type RefObject,
} from "react";
import { cx } from "../../utils/cx";
import * as styles from "./Popover.css";

export interface PopoverProps {
  /**
   * The trigger element. Popover clones it and wires aria-expanded,
   * aria-controls and onClick — pass a Button or any focusable element.
   */
  trigger: ReactElement<Record<string, unknown>>;
  /** Popover contents */
  children: ReactNode;
  /** Kobber popover variants: color x size */
  variant?: keyof typeof styles.root;
  className?: string;
}

/**
 * Shared floating-surface behavior for Popover and Dropdown:
 * open state, outside-click + Escape dismissal, focus return.
 */
export function usePopover(wrapperRef: RefObject<HTMLElement | null>) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLElement | null>(null);

  const close = useCallback((returnFocus = false) => {
    setOpen(false);
    if (returnFocus) triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) close();
    };
    const onKeyDown = (event: KeyboardEvent) => {
      // Escape closes and returns focus to the trigger (APG dialog/menu pattern)
      if (event.key === "Escape") close(true);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, close, wrapperRef]);

  return { open, setOpen, close, triggerRef };
}

/**
 * Kobber Popover — floating surface anchored to its trigger, with
 * outside-click/Escape dismissal and focus return. For menus, use
 * Dropdown (built on the same behavior).
 */
export function Popover({ trigger, children, variant = "brand-medium", className }: PopoverProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { open, setOpen, triggerRef } = usePopover(wrapperRef);
  const surfaceId = useId();

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      {cloneElement(trigger, {
        ref: triggerRef,
        "aria-expanded": open,
        "aria-controls": open ? surfaceId : undefined,
        onClick: () => setOpen((value) => !value),
      })}
      {open && (
        <div id={surfaceId} className={cx(styles.root[variant], className)}>
          {children}
        </div>
      )}
    </div>
  );
}
