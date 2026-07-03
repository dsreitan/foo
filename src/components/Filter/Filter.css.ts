import { style } from '@vanilla-extract/css'
import { components, universal, px, fontFamily } from '../../styles/tokens'

const { filter, textLabel } = components

// Hover is a translucent overlay on top of the current background,
// matching the Figma spec (filter/background/color/hover on both states).
const hoverOverlay = `linear-gradient(${filter.background.color.hover}, ${filter.background.color.hover})`

export const root = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: px(filter.gap),
  height: px(filter.size.height),
  paddingInline: px(filter.padding.inline),
  border: 'none',
  borderRadius: px(filter.border.radius),
  backgroundColor: filter.background.color.fallback,
  color: textLabel.text.color.brand.toneA,
  fontFamily,
  fontSize: px(textLabel.text.size.medium),
  fontWeight: textLabel.text.weight,
  cursor: 'pointer',
  selectors: {
    '&:hover:not(:disabled)': {
      backgroundImage: hoverOverlay,
    },
    '&[aria-pressed="true"]': {
      backgroundColor: filter.background.color.active,
      color: textLabel.text.color.brand.toneB,
    },
    '&:disabled': {
      opacity: universal.disabled.container.opacity,
      cursor: 'not-allowed',
    },
    '&:focus-visible': {
      outline: `${px(universal.focus.border.width)} solid ${universal.focus.border.color}`,
      outlineOffset: px(universal.focus.container.padding),
    },
  },
})

export const counter = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  // Stretches for counts above 100, but keeps a square minimum (Figma annotation).
  minWidth: px(filter.counter.size.height),
  height: px(filter.counter.size.height),
  paddingInline: px(filter.counter.padding.inline),
  borderRadius: px(filter.counter.border.radius),
  backgroundColor: filter.counter.background.color.fallback,
  color: textLabel.text.color.brand.toneA,
})
