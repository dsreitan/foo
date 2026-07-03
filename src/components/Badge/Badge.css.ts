import { createVar, style, styleVariants } from '@vanilla-extract/css'
import { tokens, val, fontFamily } from '../../styles/tokens'

const { badge, textLabel } = tokens.component

const circleColor = createVar()

export const root = style({
  display: 'inline-flex',
  alignItems: 'center',
  borderRadius: val(badge.border.radius),
  fontFamily: `${fontFamily.ppMori}, system-ui, sans-serif`,
  fontWeight: textLabel.text.weight,
  lineHeight: 1,
  vars: {
    // Fallback for color/tone combos without a status-circle token
    [circleColor]: 'currentColor',
  },
})

/**
 * Color × tone combos defined in the badge tokens.
 * Text color is the text-label color of the opposite tone, so dark
 * backgrounds (tone-a) get light text and vice versa.
 */
export const colorTone = styleVariants({
  'brand-a': {
    backgroundColor: badge.background.color.brand.toneA,
    color: textLabel.text.color.brand.toneB,
    vars: { [circleColor]: badge.statusCircle.background.color.brand.toneA },
  },
  'brand-b': {
    backgroundColor: badge.background.color.brand.toneB,
    color: textLabel.text.color.brand.toneA,
  },
  'rettsdata-a': {
    backgroundColor: badge.background.color.rettsdata.toneA,
    color: textLabel.text.color.rettsdata.toneB,
  },
  'rettsdata-b': {
    backgroundColor: badge.background.color.rettsdata.toneB,
    color: textLabel.text.color.rettsdata.toneA,
    vars: { [circleColor]: badge.statusCircle.background.color.rettsdata.toneB },
  },
  'neutral-b': {
    backgroundColor: badge.background.color.neutral.toneB,
    color: textLabel.text.color.neutral.toneA,
  },
})

export const size = styleVariants({
  medium: {
    padding: val(badge.padding.medium),
    gap: val(badge.gap.medium),
    fontSize: val(textLabel.text.size.medium),
  },
  small: {
    paddingInline: val(badge.padding.inline.small),
    paddingBlock: val(badge.padding.block.small),
    gap: val(badge.gap.small),
    fontSize: val(textLabel.text.size.small),
  },
})

export const statusCircle = style({
  borderRadius: '50%',
  backgroundColor: circleColor,
})

export const statusCircleSize = styleVariants({
  medium: {
    width: val(badge.statusCircle.size.width.medium),
    height: val(badge.statusCircle.size.height.medium),
  },
  small: {
    width: val(badge.statusCircle.size.width.small),
    height: val(badge.statusCircle.size.height.small),
  },
})
