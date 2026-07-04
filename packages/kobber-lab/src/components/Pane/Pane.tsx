import {
  useRef,
  useState,
  type CSSProperties,
  type HTMLAttributes,
  type KeyboardEvent,
  type PointerEvent,
  type ReactNode,
} from "react";
import { cx } from "kobber";
import * as styles from "./Pane.css";

/** PROPOSED tokens — pane/size/{min,max} and pane/resize/step. */
const PANE_MIN = 180;
const PANE_MAX = 480;
const RESIZE_STEP = 16;

export interface PaneGroupProps extends HTMLAttributes<HTMLDivElement> {
  /** Panes side by side on desktop; stacked on compact windows (M3) */
  children: ReactNode;
}

/**
 * PROPOSAL — pane layout for workspaces, after Material 3's panes and
 * canonical layouts: fixed panes around a flexible one, resizable with
 * pointer or keyboard, stacked below the desktop breakpoint. See
 * docs/proposals/pane.md.
 */
export function PaneGroup({ children, className, ...props }: PaneGroupProps) {
  return (
    <div className={cx(styles.group, className)} {...props}>
      {children}
    </div>
  );
}

export interface PaneProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Start width in px. Makes the pane fixed-size with a resize handle;
   * omit for the flexible pane that fills the remaining space.
   */
  defaultSize?: number;
  minSize?: number;
  maxSize?: number;
  /**
   * Which edge carries the resize handle: "end" for panes left of the
   * flexible pane, "start" for panes right of it.
   */
  handle?: "start" | "end";
  /** Accessible name for the pane and its resize handle */
  label?: string;
  /** M3 surface container: rounded tinted surface behind the content */
  surface?: boolean;
  /** Fires with the new width (px) after every resize */
  onSizeChange?: (size: number) => void;
  children: ReactNode;
}

/**
 * One pane in a PaneGroup. Fixed panes own their width and render a
 * resize handle (APG window splitter: role="separator" with
 * aria-valuenow, arrow keys, Home/End).
 */
export function Pane({
  defaultSize,
  minSize = PANE_MIN,
  maxSize = PANE_MAX,
  handle = "end",
  label,
  surface = false,
  onSizeChange,
  className,
  style,
  children,
  ...props
}: PaneProps) {
  const [size, setSize] = useState(defaultSize ?? 0);
  const dragStart = useRef<{ x: number; size: number } | null>(null);
  const fixed = defaultSize !== undefined;

  const resize = (next: number) => {
    const clamped = Math.min(maxSize, Math.max(minSize, next));
    setSize(clamped);
    onSizeChange?.(clamped);
  };

  // Arrows move the boundary itself: for an end-handle pane the boundary
  // sits on its right, so ArrowRight grows it; mirrored for start-handles.
  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const direction = handle === "end" ? 1 : -1;
    if (event.key === "ArrowRight") resize(size + RESIZE_STEP * direction);
    else if (event.key === "ArrowLeft") resize(size - RESIZE_STEP * direction);
    else if (event.key === "Home") resize(minSize);
    else if (event.key === "End") resize(maxSize);
    else return;
    event.preventDefault();
  };

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    dragStart.current = { x: event.clientX, size };
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragStart.current) return;
    const delta = event.clientX - dragStart.current.x;
    resize(dragStart.current.size + (handle === "end" ? delta : -delta));
  };
  const onPointerUp = () => {
    dragStart.current = null;
  };

  const separator = fixed && (
    <div
      role="separator"
      aria-orientation="vertical"
      aria-label={label ? `Endre bredde på ${label}` : "Endre bredde"}
      aria-valuenow={size}
      aria-valuemin={minSize}
      aria-valuemax={maxSize}
      tabIndex={0}
      className={styles.separator}
      onKeyDown={onKeyDown}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    />
  );

  const sizeVar = fixed ? ({ "--pane-size": `${size}px` } as CSSProperties) : undefined;

  return (
    <>
      {handle === "start" && separator}
      <div
        aria-label={label}
        className={cx(fixed ? styles.pane : styles.flexiblePane, className)}
        style={{ ...sizeVar, ...style }}
        {...props}
      >
        {surface ? <div className={styles.surface}>{children}</div> : children}
      </div>
      {handle === "end" && separator}
    </>
  );
}
