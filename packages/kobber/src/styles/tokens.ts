// import { component, universal, groups } from "@gyldendal/kobber-base/themes/tokens.css-variables.js"; // css variable tokens, ex. "font-size": "--kobber-font-size"
import { components, groups, layouts, primitives, universal } from "@gyldendal/kobber-tokens"; // value tokens, ex. "font-size": "14px"

export const tokens = {
  component: components,
  universal,
  groups,
  layouts,
};

export const fontFamily = primitives.font.family;

/** CSS variable tokens - wraps tokens in var() */
// export const val = (value: string | number) => `var(${value})`;

/** Value tokens - converts number to pixel string */
export const val = (value: string | number, addPx = true) => {
  if (typeof value === "number") {
    return addPx ? `${value}px` : `${value}`;
  }

  return `${value}`;
};
