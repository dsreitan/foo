import { useEffect, useRef, type HTMLAttributes, type ReactNode } from "react";
import { Button, cx } from "kobber";
import * as styles from "./Dialog.css";

export interface DialogProps extends Omit<HTMLAttributes<HTMLDialogElement>, "title"> {
  open: boolean;
  /** Called when the dialog closes (Escape, backdrop, close button) */
  onClose: () => void;
  title: ReactNode;
  children: ReactNode;
  closeLabel?: string;
}

/**
 * PROPOSAL — modal dialog on the native <dialog> element: focus is
 * trapped and returned by the platform, Escape closes. See
 * docs/proposals/dialog.md for the pitch and animation spec.
 */
export function Dialog({
  open,
  onClose,
  title,
  children,
  closeLabel = "Lukk",
  className,
  ...props
}: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    // Feature-detect for environments without the dialog API (jsdom, SSR)
    if (open && !dialog.open) {
      if (typeof dialog.showModal === "function") dialog.showModal();
      else dialog.setAttribute("open", "");
    }
    if (!open && dialog.open) {
      if (typeof dialog.close === "function") dialog.close();
      else dialog.removeAttribute("open");
    }
  }, [open]);

  return (
    <dialog
      ref={ref}
      className={cx(styles.dialog, className)}
      onClose={onClose}
      onClick={(event) => {
        // Backdrop click: the dialog itself is the target only outside the content box
        if (event.target === ref.current) onClose();
      }}
      {...props}
    >
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <Button variant="brand-tertiary-a" onClick={onClose}>
          {closeLabel}
        </Button>
      </div>
      {children}
    </dialog>
  );
}
