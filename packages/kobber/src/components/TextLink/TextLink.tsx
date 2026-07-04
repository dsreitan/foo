import type { ElementType } from "react";
import { cx } from "../../utils/cx";
import type { PolymorphicProps } from "../../utils/polymorphic";
import * as styles from "./TextLink.css";

export type TextLinkProps<C extends ElementType = "a"> = PolymorphicProps<
  C,
  {
    /** Disables the link (renders aria-disabled, keeps it in the DOM) */
    disabled?: boolean;
  }
>;

/**
 * Kobber Text Link — inline link with the accent underline. For
 * actions, use Button instead ("for å navigere til et annet sted,
 * bruk link-komponentet"). Pass a router link via `as`:
 * `<TextLink as={Link} to="/side">`.
 */
export function TextLink<C extends ElementType = "a">({
  as,
  disabled,
  className,
  ...props
}: TextLinkProps<C>) {
  const Component: ElementType = as ?? "a";
  return (
    <Component
      className={cx(styles.root, className)}
      aria-disabled={disabled || undefined}
      tabIndex={disabled ? -1 : undefined}
      {...props}
    />
  );
}
