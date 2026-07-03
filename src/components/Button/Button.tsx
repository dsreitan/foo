import type { ButtonHTMLAttributes } from 'react'
import { button } from './Button.css'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual variant, mirrors the variants in the Kobber komponenter Figma file */
  variant?: keyof typeof button
}

export function Button({ variant = 'primary', ...props }: ButtonProps) {
  return <button className={button[variant]} type="button" {...props} />
}
