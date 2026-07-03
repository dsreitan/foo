import { style, styleVariants } from '@vanilla-extract/css'
import { vars } from '../../styles/theme.css'

const base = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: vars.spacing.s,
  border: 'none',
  borderRadius: vars.radius.full,
  fontFamily: vars.typography.fontFamily,
  fontSize: vars.typography.fontSize.medium,
  fontWeight: vars.typography.fontWeight.medium,
  padding: `${vars.spacing.s} ${vars.spacing.l}`,
  cursor: 'pointer',
  transition: 'background-color 0.15s ease, color 0.15s ease',
  selectors: {
    '&:disabled': {
      backgroundColor: vars.color.disabled,
      color: vars.color.textInverted,
      cursor: 'not-allowed',
    },
    '&:focus-visible': {
      outline: `2px solid ${vars.color.focus}`,
      outlineOffset: '2px',
    },
  },
})

export const button = styleVariants({
  primary: [
    base,
    {
      backgroundColor: vars.color.brand,
      color: vars.color.textInverted,
      selectors: {
        '&:hover:not(:disabled)': {
          backgroundColor: vars.color.brandHover,
        },
      },
    },
  ],
  secondary: [
    base,
    {
      backgroundColor: 'transparent',
      color: vars.color.brand,
      boxShadow: `inset 0 0 0 1px ${vars.color.brand}`,
      selectors: {
        '&:hover:not(:disabled)': {
          backgroundColor: vars.color.surface,
        },
      },
    },
  ],
})
