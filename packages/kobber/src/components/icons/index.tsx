import type { SVGProps } from "react";

/**
 * Minimal placeholder icons until the Kobber icon package is added.
 * 16px, colored via currentColor like the Figma icon tokens.
 */

const iconProps = {
  width: 16,
  height: 16,
  viewBox: "0 0 16 16",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} satisfies SVGProps<SVGSVGElement>;

export function MenuIcon() {
  return (
    <svg {...iconProps}>
      <path d="M2.5 4.5h11M2.5 8h11M2.5 11.5h11" />
    </svg>
  );
}

export function SearchIcon() {
  return (
    <svg {...iconProps}>
      <circle cx="7" cy="7" r="4.5" />
      <path d="m10.5 10.5 3.5 3.5" />
    </svg>
  );
}

export function UserIcon() {
  return (
    <svg {...iconProps}>
      <circle cx="8" cy="5" r="2.75" />
      <path d="M2.75 14a5.25 5.25 0 0 1 10.5 0" />
    </svg>
  );
}

export function CheckIcon() {
  return (
    <svg {...iconProps}>
      <path d="m3.25 8.5 3 3 6.5-7" />
    </svg>
  );
}

export function InfoIcon() {
  return (
    <svg {...iconProps}>
      <circle cx="8" cy="8" r="6.5" />
      <path d="M8 7.5v3.5" />
      <path d="M8 5.2v.1" />
    </svg>
  );
}

export function WarningIcon() {
  return (
    <svg {...iconProps}>
      <path d="M8 2.2 14.5 13.5H1.5L8 2.2Z" strokeLinejoin="round" />
      <path d="M8 6.5v3" />
      <path d="M8 11.7v.1" />
    </svg>
  );
}

export function CloseIcon() {
  return (
    <svg {...iconProps}>
      <path d="m4 4 8 8M12 4l-8 8" />
    </svg>
  );
}

export function ChevronDownIcon() {
  return (
    <svg {...iconProps}>
      <path d="m4 6.5 4 4 4-4" />
    </svg>
  );
}

/** Chevron in a soft circle, like the Figma dropdown icon asset. */
export function ChevronCircleIcon() {
  return (
    <svg {...iconProps}>
      <circle cx="8" cy="8" r="8" fill="currentColor" opacity="0.18" stroke="none" />
      <path d="m5 6.75 3 3 3-3" />
    </svg>
  );
}
