import { createGlobalTheme } from '@vanilla-extract/css'

/**
 * Design tokens for the Kobber component library.
 *
 * Seeded from variables in the Kobber Komponentbibliotek Figma file
 * (https://www.figma.com/design/zMcbm8ujSMldgS1VB70IMP/Kobber-Komponentbibliotek),
 * e.g. text-label/text/color/brand/tone-a, color/purple/450, text/ui/font-family.
 * Values not yet defined in Figma are placeholders.
 */
export const vars = createGlobalTheme(':root', {
  color: {
    brand: '#691837',
    brandHover: '#4f1229',
    text: '#1d0001',
    textInverted: '#fdf9f9',
    background: '#fdf9f9',
    surface: '#ffffff',
    border: '#d9cfc7',
    disabled: '#b3a9a1',
    focus: '#7155f0',
  },
  typography: {
    fontFamily: "'PP Mori', system-ui, -apple-system, sans-serif",
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
