import type { ComponentPropsWithoutRef, ElementType } from "react";

/**
 * Props for link components that render an <a> by default but can
 * render a router's link instead via `as`:
 *
 *   <TextLink as={Link} to="/laeremidler">Læremidler</TextLink>  // react-router / TanStack
 *   <TextLink as={NextLink} href="/laeremidler">…</TextLink>     // Next.js
 *
 * The rendered element's own props (to, href, prefetch, ...) are typed
 * from `as`, so misspelled router props still fail typecheck.
 */
export type PolymorphicProps<C extends ElementType, OwnProps> = OwnProps & {
  /** Element or component to render instead of <a> */
  as?: C;
} & Omit<ComponentPropsWithoutRef<C>, keyof OwnProps | "as">;
