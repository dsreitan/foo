import { style, styleVariants } from '@vanilla-extract/css'
import { tokens, val } from '../../styles/tokens'
import { label } from '../../styles/typography.css'

const { dropdown, _dropdownItem, textLabel } = tokens.component
const { focus } = tokens.universal

export const wrapper = style({
  position: 'relative',
  display: 'inline-block',
})

const triggerBase = style([
  label.medium,
  {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: val(dropdown.gap),
    height: val(dropdown.size.height),
    // The Figma component pads the trigger with the gap token (12), not padding/inline
    paddingInline: val(dropdown.gap),
    border: 'none',
    borderRadius: val(dropdown.border.radius),
    backgroundColor: 'transparent',
    color: textLabel.text.color.brand.toneA,
    whiteSpace: 'nowrap',
    cursor: 'pointer',
    selectors: {
      '&:focus-visible': {
        outline: 'none',
        boxShadow: `0 0 0 ${val(focus.border.width)} ${focus.border.color}`,
      },
    },
  },
])

export const trigger = styleVariants({
  plain: [triggerBase],
  filled: [
    triggerBase,
    {
      backgroundColor: dropdown.background.color.filled.fallback,
      selectors: {
        '&:hover': {
          backgroundColor: dropdown.background.color.filled.hover,
        },
      },
    },
  ],
})

export const chevron = style({
  display: 'inline-flex',
  color: dropdown.icon.color,
  transition: 'transform 0.15s ease',
  selectors: {
    '[aria-expanded="true"] > &': {
      transform: 'rotate(180deg)',
    },
  },
})

export const menu = style({
  position: 'absolute',
  top: '100%',
  left: 0,
  zIndex: 1,
  minWidth: '100%',
  marginTop: val(tokens.component._dropdownMenu.gap),
  padding: val(tokens.component._dropdownMenu.gap),
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: tokens.component.navigationBar.background.color,
  borderRadius: val(_dropdownItem.border.radius),
  boxShadow: '0 4px 16px rgba(40, 0, 14, 0.12)',
})

export const item = style([
  label.medium,
  {
    display: 'flex',
    alignItems: 'center',
    gap: val(_dropdownItem.gap),
    height: val(_dropdownItem.size.height),
    paddingInline: val(_dropdownItem.padding.inline),
    border: 'none',
    borderRadius: val(_dropdownItem.border.radius),
    backgroundColor: 'transparent',
    color: textLabel.text.color.brand.toneA,
    whiteSpace: 'nowrap',
    textAlign: 'left',
    cursor: 'pointer',
    selectors: {
      '&:hover': {
        backgroundColor: _dropdownItem.background.color.hover,
      },
      '&:active': {
        backgroundColor: _dropdownItem.background.color.pressed,
      },
      '&:focus-visible': {
        outline: 'none',
        boxShadow: `0 0 0 ${val(focus.border.width)} ${focus.border.color}`,
      },
    },
  },
])
