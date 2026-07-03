import { style } from '@vanilla-extract/css'
import { tokens, val } from '../../styles/tokens'
import { label } from '../../styles/typography.css'

const { navigationBar, search, textLabel, _dropdownMenu } = tokens.component
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

/** Center menu slot; collapses on mobile like the Figma size=mobile variant. */
export const menu = style({
  display: 'none',
  alignItems: 'center',
  gap: val(_dropdownMenu.gap),
  '@media': {
    'screen and (min-width: 768px)': {
      display: 'flex',
    },
  },
})

export const actions = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: val(navigationBar.innerContainer.gap),
})

/** Search trigger from the search tokens ("Søkefelt som brukes i navigasjonsmenyer"). */
export const searchTrigger = style([
  label.medium,
  {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: val(search.padding.gap),
    width: '146px',
    height: val(search.size.height),
    paddingLeft: val(search.padding.inline.left),
    paddingRight: val(search.padding.inline.right),
    border: 'none',
    borderRadius: val(search.border.radius),
    backgroundColor: search.background.color.fallback,
    color: textLabel.text.color.subtle.toneA,
    cursor: 'pointer',
    selectors: {
      '&:hover': {
        boxShadow: `inset 0 0 0 ${val(search.border.width)} ${search.border.color.hover}`,
      },
      '&:focus-visible': {
        outline: 'none',
        boxShadow: `0 0 0 ${val(tokens.universal.focus.border.width)} ${tokens.universal.focus.border.color}`,
      },
    },
  },
])

export const searchIcon = style({
  display: 'inline-flex',
  color: search.icon.shape.color.fallback,
})
