import { style } from '@vanilla-extract/css'
import { tokens, val, fontFamily } from '../../styles/tokens'

const { filter, textLabel } = tokens.component
const { focus, disabled } = tokens.universal

// Hover is a translucent overlay on top of the current background,
// matching the Figma spec (filter/background/color/hover on both states).
const hoverOverlay = `linear-gradient(${filter.background.color.hover}, ${filter.background.color.hover})`

export const root = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: val(filter.gap),
  height: val(filter.size.height),
  paddingInline: val(filter.padding.inline),
  border: 'none',
  borderRadius: val(filter.border.radius),
  backgroundColor: filter.background.color.fallback,
  color: textLabel.text.color.brand.toneA,
  fontFamily: `${fontFamily.ppMori}, system-ui, sans-serif`,
  fontSize: val(textLabel.text.size.medium),
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
      opacity: disabled.container.opacity,
      cursor: 'not-allowed',
    },
    '&:focus-visible': {
      outline: `${val(focus.border.width)} solid ${focus.border.color}`,
      outlineOffset: val(focus.container.padding),
    },
  },
})

export const counter = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  // Stretches for counts above 100, but keeps a square minimum (Figma annotation).
  minWidth: val(filter.counter.size.height),
  height: val(filter.counter.size.height),
  paddingInline: val(filter.counter.padding.inline),
  borderRadius: val(filter.counter.border.radius),
  backgroundColor: filter.counter.background.color.fallback,
  color: textLabel.text.color.brand.toneA,
})
