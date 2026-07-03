/**
 * Breakpoints for the desktop/mobile size variants in Figma.
 * Kobber tokens don't define breakpoints (yet); keep them here so no
 * component hardcodes a width.
 */
export const breakpoints = {
  /** Figma size=desktop variants apply from here */
  desktop: 768,
};

export const media = {
  desktop: `screen and (min-width: ${breakpoints.desktop}px)`,
};
