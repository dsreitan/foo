import { components, universal } from '@gyldendal/kobber-tokens'

export { components, universal }

/** Kobber tokens are unitless numbers; CSS needs px. */
export const px = (value: number) => `${value}px`

/** text/ui/font-family token is "pp-mori"; fall back to system fonts until the webfont is added. */
export const fontFamily = "'PP Mori', system-ui, -apple-system, sans-serif"
