import { globalStyle } from '@vanilla-extract/css'
import { vars } from './theme.css'

globalStyle('*, *::before, *::after', {
  boxSizing: 'border-box',
})

globalStyle('body', {
  margin: 0,
  fontFamily: vars.typography.fontFamily,
  fontSize: vars.typography.fontSize.medium,
  color: vars.color.text,
  backgroundColor: vars.color.background,
})
