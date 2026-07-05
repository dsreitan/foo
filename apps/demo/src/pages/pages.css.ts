import { style, styleVariants } from "@vanilla-extract/css";
import { tokens, val, typography, media } from "kobber/styles";

const { content } = tokens.layouts;
const text = tokens.component.textLabel.text.color;

/**
 * Fluid page rhythm between two layout-token endpoints (min at 360px
 * viewport, max at 1440px) — the clamp() a token pipeline would emit
 * from min/max pair tokens. See docs/responsive-tokens.md. Page-level
 * spacing only; component-internal spacing stays static.
 */
const fluidSpace = (min: number, max: number, vwMin = 360, vwMax = 1440) => {
  const slope = (max - min) / (vwMax - vwMin);
  const intercept = min - vwMin * slope;
  return `clamp(${min}px, ${intercept.toFixed(2)}px + ${(slope * 100).toFixed(3)}vw, ${max}px)`;
};

export const main = style({
  maxWidth: val(content.size.maxWidth.xxlarge),
  margin: "0 auto",
  padding: fluidSpace(content.space.padding.small, content.space.padding.xlarge),
  display: "flex",
  flexDirection: "column",
  gap: fluidSpace(content.space.gap.medium, content.space.gap.large),
});

export const grid = styleVariants({ two: "220px", three: "260px", four: "200px" }, (min) => ({
  display: "grid",
  gridTemplateColumns: `repeat(auto-fill, minmax(${min}, 1fr))`,
  gap: fluidSpace(content.space.gap.small, content.space.gap.medium),
}));

export const row = style({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  gap: val(content.space.gap.small),
});

export const hero = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: val(content.space.gap.small),
  maxWidth: val(content.size.maxWidth.large),
});

export const spread = style({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "space-between",
  gap: val(content.space.gap.small),
});

/** Student table, styled app-side with the library's typography/tokens. */
export const table = style([
  typography.label.medium,
  {
    width: "100%",
    borderCollapse: "collapse",
    color: text.brand.toneA,
  },
]);

export const th = style({
  textAlign: "left",
  paddingBlock: val(tokens.groups.inputs.space.medium),
  paddingInline: val(tokens.groups.inputs.space.small),
  borderBottom: `2px solid ${tokens.component.divider.background.color.brand.toneA}`,
});

export const td = style({
  paddingBlock: val(tokens.groups.inputs.space.medium),
  paddingInline: val(tokens.groups.inputs.space.small),
  borderBottom: `1px solid ${tokens.component.divider.background.color.brand.toneB}`,
});

/** Slideshow layout with a toggleable side panel. */
export const slideshow = style({
  display: "flex",
  alignItems: "stretch",
  gap: val(content.space.gap.medium),
});

export const slidePanel = style({
  flexShrink: 0,
  width: "220px",
  display: "flex",
  flexDirection: "column",
});

export const slide = style({
  flexGrow: 1,
  minHeight: "420px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  borderRadius: val(tokens.groups.cardsAndModules.radius.large),
});

export const coverImage = style({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  display: "block",
});

/** Main column + sidebar (video page); stacks on mobile. */
export const withSidebar = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
  gap: val(content.space.gap.medium),
  "@media": {
    [media.desktop]: {
      flexDirection: "row",
      alignItems: "flex-start",
    },
  },
});

export const sidebar = style({
  display: "flex",
  flexDirection: "column",
  gap: val(content.space.gap.small),
  "@media": {
    [media.desktop]: {
      width: "300px",
      flexShrink: 0,
    },
  },
});

export const videoFrame = style({
  width: "100%",
  aspectRatio: "16 / 9",
  objectFit: "cover",
  display: "block",
  borderRadius: val(tokens.groups.cardsAndModules.radius.large),
});

/** VS Code-like workspace: collapsible panels around a center editor. */
export const workspace = style({
  display: "flex",
  alignItems: "stretch",
  gap: val(content.space.gap.small),
});

export const workspacePanel = style({
  flexShrink: 0,
  width: "240px",
  display: "flex",
  flexDirection: "column",
  gap: val(content.space.gap.small),
});

export const workspaceCenter = style({
  flexGrow: 1,
  minWidth: 0,
});

/** Column layout for NavLinkGroups used as a file explorer. */
export const explorer = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: val(tokens.groups.inputs.space.small),
});

export const widget = style({
  display: "flex",
  flexDirection: "column",
  gap: val(tokens.groups.inputs.space.medium),
  padding: val(tokens.groups.cardsAndModules.space.large),
  border: `1px solid ${tokens.component.divider.background.color.brand.toneB}`,
  borderRadius: val(tokens.groups.cardsAndModules.radius.small),
});
