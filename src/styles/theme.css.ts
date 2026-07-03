import { createGlobalTheme } from '@vanilla-extract/css'

/**
 * Design tokens for the Kobber component library.
 *
 * Placeholder values — to be replaced with the real Kobber tokens
 * exported from the "Kobber komponenter" Figma file (variables /
 * style dictionary).
 */
export const vars = createGlobalTheme(':root', {
  color: {
    brand: '#6f2c3f',
    brandHover: '#5a2333',
    text: '#1f1f1f',
    textInverted: '#ffffff',
    background: '#fbf5f1',
    surface: '#ffffff',
    border: '#d9cfc7',
    disabled: '#b3a9a1',
  },
  typography: {
    fontFamily: "'Gyldendal Sans', system-ui, -apple-system, sans-serif",
    fontSize: {
      small: '0.875rem',
      medium: '1rem',
      large: '1.25rem',
    },
    fontWeight: {
      regular: '400',
      medium: '500',
      bold: '700',
    },
  },
  spacing: {
    xs: '0.25rem',
    s: '0.5rem',
    m: '1rem',
    l: '1.5rem',
    xl: '2.5rem',
  },
  radius: {
    s: '4px',
    m: '8px',
    full: '9999px',
  },
})
