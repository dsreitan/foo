import { style } from '@vanilla-extract/css'
import { vars } from './styles/theme.css'

export const page = style({
  maxWidth: '48rem',
  margin: '0 auto',
  padding: vars.spacing.xl,
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing.l,
})

export const header = style({
  marginBottom: vars.spacing.m,
})

export const title = style({
  fontSize: '2rem',
  fontWeight: vars.typography.fontWeight.bold,
  color: vars.color.brand,
  margin: 0,
})

export const subtitle = style({
  fontSize: vars.typography.fontSize.large,
  margin: `${vars.spacing.s} 0 0`,
})

export const card = style({
  backgroundColor: vars.color.surface,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.m,
  padding: vars.spacing.l,
})

export const componentName = style({
  margin: `0 0 ${vars.spacing.s}`,
  fontSize: vars.typography.fontSize.large,
})

export const demoRow = style({
  display: 'flex',
  gap: vars.spacing.m,
  flexWrap: 'wrap',
  alignItems: 'center',
})
