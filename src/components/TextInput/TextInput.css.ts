import { style } from '@vanilla-extract/css'
import { tokens, val } from '../../styles/tokens'
import { label as labelTypography } from '../../styles/typography.css'
import { disabledState, focusRing } from '../../styles/interaction.css'

const { _textInput, textLabel } = tokens.component

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
  focusRing,
  disabledState,
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
      '&::placeholder': {
        color: textLabel.text.color.subtle.toneA,
      },
    },
  },
])
