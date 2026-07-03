import type { ButtonHTMLAttributes } from 'react'
import * as styles from './Button.css'

/**
 * Derived from the style map, so the valid variants live in exactly one
 * place (Button.css.ts). Adding a variant there updates this type and
 * the editor autocomplete automatically; invalid combinations (like
 * "success-tertiary") cannot be expressed.
 */
export type ButtonVariant = keyof typeof styles.variant

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Figma properties color(-level)-tone, e.g. "brand-primary-a" or "success-b" */
  variant?: ButtonVariant
}

/**
 * Kobber Button — "brukes for å utføre en bestemt handling eller trigge
 * en hendelse". Covers both the Figma Button (brand/neutral x
 * primary/secondary/tertiary) and UI Button (success/warning/informative).
 */
export function Button({ variant = 'brand-primary-a', ...props }: ButtonProps) {
  return (
    <button
      className={`${styles.root} ${styles.variant[variant]}`}
      type="button"
      {...props}
    />
  )
}
