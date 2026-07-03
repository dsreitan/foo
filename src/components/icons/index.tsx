import type { SVGProps } from 'react'

/**
 * Minimal placeholder icons until the Kobber icon package is added.
 * 16px, colored via currentColor like the Figma icon tokens.
 */

const iconProps = {
  width: 16,
  height: 16,
  viewBox: '0 0 16 16',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
} satisfies SVGProps<SVGSVGElement>

export function SearchIcon() {
  return (
    <svg {...iconProps}>
      <circle cx="7" cy="7" r="4.5" />
      <path d="m10.5 10.5 3.5 3.5" />
    </svg>
  )
}

export function UserIcon() {
  return (
    <svg {...iconProps}>
      <circle cx="8" cy="5" r="2.75" />
      <path d="M2.75 14a5.25 5.25 0 0 1 10.5 0" />
    </svg>
  )
}

/** Chevron in a soft circle, like the Figma dropdown icon asset. */
export function ChevronCircleIcon() {
  return (
    <svg {...iconProps}>
      <circle cx="8" cy="8" r="8" fill="currentColor" opacity="0.18" stroke="none" />
      <path d="m5 6.75 3 3 3-3" />
    </svg>
  )
}
