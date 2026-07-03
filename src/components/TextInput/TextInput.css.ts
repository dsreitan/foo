import { style } from '@vanilla-extract/css'
import { tokens, val } from '../../styles/tokens'
import { label as labelTypography } from '../../styles/typography.css'

const { _textInput, textLabel } = tokens.component
const { focus, disabled } = tokens.universal

export const container = style({
  display: 'inline-flex',
  flexDirection: 'column',
  gap: val(_textInput.container.gap),
})

export const label = style([
  labelTypography.small,
  {
    color: textLabel.text.color.brand.toneA,
  },
])

/**
 * The field itself ("top container" in the tokens): underlined,
 * fills on hover, thicker line + light fill while active.
 */
export const field = style([
  labelTypography.medium,
  {
    display: 'flex',
    alignItems: 'center',
    gap: val(_textInput.topContainer.gap),
    padding: val(_textInput.topContainer.padding),
    border: 'none',
    borderBottom: `${val(_textInput.topContainer.border.width.fallback)} solid ${_textInput.topContainer.border.color.toneA}`,
    backgroundColor: 'transparent',
    color: textLabel.text.color.brand.toneA,
    minWidth: '240px',
    selectors: {
      '&:hover:not(:disabled)': {
        backgroundColor: _textInput.background.color.primary.hover,
      },
      '&:focus': {
        outline: 'none',
        backgroundColor: _textInput.background.color.primary.active,
        borderBottomWidth: val(_textInput.topContainer.border.width.active),
      },
      '&:focus-visible': {
        boxShadow: `0 0 0 ${val(focus.border.width)} ${focus.border.color}`,
      },
      '&:disabled': {
        opacity: disabled.container.opacity,
        cursor: 'not-allowed',
      },
      '&::placeholder': {
        color: textLabel.text.color.subtle.toneA,
      },
    },
  },
])
