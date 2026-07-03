import { createElement, type ElementType, type HTMLAttributes } from 'react'
import * as typography from '../../styles/typography.css'

const variants = {
  label: typography.label,
  body: typography.body,
  title: typography.title,
  heading: typography.heading,
  display: typography.display,
}

const defaultTag: Record<keyof typeof variants, ElementType> = {
  label: 'span',
  body: 'p',
  title: 'h3',
  heading: 'h2',
  display: 'h1',
}

/**
 * Discriminated union derived from the typography styles: each variant
 * only accepts the sizes that exist in its tokens (heading has no
 * "small", label has no "large" display, etc.).
 */
type VariantProps =
  | {
      [V in keyof typeof variants]: {
        variant: V
        size?: keyof (typeof variants)[V]
      }
    }[keyof typeof variants]
  | { variant?: undefined; size?: keyof typeof variants.body }

export type TextProps = VariantProps & {
  /** Element to render; defaults per variant (heading -> h2, body -> p, ...) */
  as?: ElementType
} & Omit<HTMLAttributes<HTMLElement>, 'color'>

/**
 * Kobber text component — public veneer over the core typography styles
 * in src/styles/typography.css.ts. Color is inherited from the parent on
 * purpose; interactive components compose the underlying styles directly
 * instead of nesting <Text>.
 */
export function Text({ variant = 'body', size, as, className, ...props }: TextProps) {
  const sizes = variants[variant]
  const sizeClass = sizes[(size ?? 'medium') as keyof typeof sizes]
  const cls = className ? `${sizeClass} ${className}` : sizeClass
  return createElement(as ?? defaultTag[variant], { className: cls, ...props })
}
