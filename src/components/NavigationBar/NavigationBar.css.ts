import { style } from '@vanilla-extract/css'
import { tokens, val } from '../../styles/tokens'
import { label } from '../../styles/typography.css'

const { navigationBar, textLabel } = tokens.component
const { navigationBars } = tokens.groups

export const root = style({
  backgroundColor: navigationBar.background.color,
  paddingBlock: val(navigationBar.padding.block.mobile),
  paddingInline: val(navigationBars.space.medium),
  '@media': {
    'screen and (min-width: 768px)': {
      paddingBlock: val(navigationBar.padding.block.desktop),
      paddingInline: val(navigationBars.space.xlarge),
    },
  },
})

export const inner = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: val(navigationBar.innerContainer.gap),
})

export const logo = style([
  label.large,
  {
    color: textLabel.text.color.brand.toneA,
    textDecoration: 'none',
  },
])

export const actions = style({
  display: 'flex',
  alignItems: 'center',
  gap: val(navigationBar.innerContainer.gap),
})
