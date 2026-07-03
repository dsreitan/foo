import type { HTMLAttributes, ReactNode } from 'react'
import { cx } from '../../utils/cx'
import * as styles from './Badge.css'

export type BadgeColor = 'brand' | 'rettsdata' | 'neutral'
export type BadgeTone = 'a' | 'b'
export type BadgeSize = 'small' | 'medium'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode
  /** Color theme from the badge tokens */
  color?: BadgeColor
  /** tone-a = dark background, tone-b = light background */
  tone?: BadgeTone
  size?: BadgeSize
  /** Show the status circle in front of the label */
  statusCircle?: boolean
}

/**
 * Kobber Badge — small status/category label with color themes,
 * tones, sizes and an optional status circle, driven by
 * @gyldendal/kobber-tokens (components.badge).
 */
export function Badge({
  children,
  color = 'neutral',
  tone = 'b',
  size = 'medium',
  statusCircle = false,
  className,
  ...props
}: BadgeProps) {
  // The neutral theme is only defined for tone-b in the tokens.
  const colorTone = color === 'neutral' ? 'neutral-b' : (`${color}-${tone}` as const)

  return (
    <span
      className={cx(styles.root, styles.colorTone[colorTone], styles.size[size], className)}
      {...props}
    >
      {statusCircle && (
        <span className={`${styles.statusCircle} ${styles.statusCircleSize[size]}`} />
      )}
      {children}
    </span>
  )
}
