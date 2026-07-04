import {
  createContext,
  useContext,
  useId,
  useState,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { cx } from "kobber";
import * as styles from "./Tabs.css";

interface TabsContextValue {
  value: string;
  setValue: (value: string) => void;
  idPrefix: string;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabs(component: string) {
  const context = useContext(TabsContext);
  if (!context) throw new Error(`<${component}> must be used inside <Tabs>`);
  return context;
}

export interface TabsProps extends HTMLAttributes<HTMLDivElement> {
  /** Selected tab when uncontrolled */
  defaultValue: string;
  /** Controlled selected tab; pair with onValueChange */
  value?: string;
  onValueChange?: (value: string) => void;
  children: ReactNode;
}

/**
 * PROPOSAL — WAI-ARIA tabs pattern (automatic activation) as compound
 * components: Tabs > TabList > Tab, plus one TabPanel per tab. See
 * docs/proposals/tabs.md.
 */
export function Tabs({
  defaultValue,
  value: controlledValue,
  onValueChange,
  children,
  ...props
}: TabsProps) {
  const idPrefix = useId();
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const value = controlledValue ?? uncontrolledValue;
  const setValue = (next: string) => {
    setUncontrolledValue(next);
    onValueChange?.(next);
  };
  return (
    <TabsContext.Provider value={{ value, setValue, idPrefix }}>
      <div {...props}>{children}</div>
    </TabsContext.Provider>
  );
}

export interface TabListProps extends HTMLAttributes<HTMLDivElement> {
  /** Accessible name for the tab list */
  label: string;
  children: ReactNode;
}

export function TabList({ label, children, className, ...props }: TabListProps) {
  const { setValue } = useTabs("TabList");

  // Roving focus with automatic activation: arrows/Home/End move AND select
  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const keys = ["ArrowLeft", "ArrowRight", "Home", "End"];
    if (!keys.includes(event.key)) return;
    const tabs = Array.from(
      event.currentTarget.querySelectorAll<HTMLButtonElement>('[role="tab"]:not(:disabled)'),
    );
    const current = tabs.indexOf(event.target as HTMLButtonElement);
    if (current === -1) return;
    event.preventDefault();
    const next =
      event.key === "Home"
        ? 0
        : event.key === "End"
          ? tabs.length - 1
          : (current + (event.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length;
    const tab = tabs[next];
    tab.focus();
    if (tab.dataset.value) setValue(tab.dataset.value);
  };

  return (
    <div
      role="tablist"
      aria-label={label}
      className={cx(styles.list, className)}
      onKeyDown={onKeyDown}
      {...props}
    >
      {children}
    </div>
  );
}

export interface TabProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Matches the TabPanel with the same value */
  value: string;
  children: ReactNode;
}

export function Tab({ value, children, className, ...props }: TabProps) {
  const { value: selected, setValue, idPrefix } = useTabs("Tab");
  const isSelected = value === selected;
  return (
    <button
      type="button"
      role="tab"
      id={`${idPrefix}-tab-${value}`}
      aria-selected={isSelected}
      aria-controls={`${idPrefix}-panel-${value}`}
      tabIndex={isSelected ? 0 : -1}
      data-value={value}
      className={cx(styles.tab, className)}
      onClick={() => setValue(value)}
      {...props}
    >
      {children}
    </button>
  );
}

export interface TabPanelProps extends HTMLAttributes<HTMLDivElement> {
  /** Matches the Tab with the same value */
  value: string;
  children: ReactNode;
}

export function TabPanel({ value, children, className, ...props }: TabPanelProps) {
  const { value: selected, idPrefix } = useTabs("TabPanel");
  return (
    <div
      role="tabpanel"
      id={`${idPrefix}-panel-${value}`}
      aria-labelledby={`${idPrefix}-tab-${value}`}
      hidden={value !== selected}
      tabIndex={0}
      className={cx(styles.panel, className)}
      {...props}
    >
      {children}
    </div>
  );
}
