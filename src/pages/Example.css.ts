import { style } from '@vanilla-extract/css'
import { tokens, val } from '../styles/tokens'
import { media } from '../styles/breakpoints'

const { content } = tokens.layouts
const { cardsAndModules } = tokens.groups

export const main = style({
  maxWidth: val(content.size.maxWidth.xxlarge),
  margin: '0 auto',
  padding: val(content.space.padding.small),
  display: 'flex',
  flexDirection: 'column',
  gap: val(content.space.gap.medium),
  '@media': {
    [media.desktop]: {
      padding: val(content.space.padding.medium),
      gap: val(content.space.gap.large),
    },
  },
})

export const intro = style({
  maxWidth: val(content.size.maxWidth.small),
})

export const filterRow = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: val(tokens.groups.filters.space.small),
})

export const cardGrid = style({
  display: 'grid',
  gap: val(cardsAndModules.space.large),
  gridTemplateColumns: '1fr',
  '@media': {
    [media.desktop]: {
      gridTemplateColumns: 'repeat(3, 1fr)',
    },
  },
})

export const card = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: val(cardsAndModules.space.medium),
  padding: val(cardsAndModules.space.xlarge),
  borderRadius: val(cardsAndModules.radius.large),
  backgroundColor: cardsAndModules.color['aubergine-25'],
})

export const cardBody = style({
  margin: 0,
  flexGrow: 1,
})

export const form = style({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'flex-end',
  gap: val(content.space.gap.small),
  padding: val(content.space.padding.small),
  borderRadius: val(cardsAndModules.radius.large),
  backgroundColor: content.color.background['aubergine-50'],
})
