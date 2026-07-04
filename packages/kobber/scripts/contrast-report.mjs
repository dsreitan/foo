// WCAG contrast sweep over every foreground/background pairing the
// components define (all pairings mirror Figma). Feeds
// docs/upstream-findings.md — rerun after a token bump:
//   node scripts/contrast-report.mjs
import { components, groups } from "@gyldendal/kobber-tokens";

/** Some tokens are {fallback, hover} objects; use the resting color. */
const hexOf = (value) => (typeof value === "string" ? value : value.fallback);

const lum = (hex) => {
  const c = [0, 2, 4]
    .map((i) => parseInt(hex.slice(i + 1, i + 3), 16) / 255)
    .map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
};

/** Contrast between two hexes; 8-digit hexes are composited over #fff first. */
const ratio = (fg, bg) => {
  const solid = (hex, base) => {
    if (hex.length !== 9) return hex;
    const a = parseInt(hex.slice(7, 9), 16) / 255;
    const mix = (i) =>
      Math.round(
        parseInt(hex.slice(i + 1, i + 3), 16) * a +
          parseInt(base.slice(i + 1, i + 3), 16) * (1 - a),
      );
    return `#${[0, 2, 4].map((i) => mix(i).toString(16).padStart(2, "0")).join("")}`;
  };
  const b = solid(bg, "#ffffff");
  const [l1, l2] = [lum(solid(fg, b)), lum(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
};

const {
  button,
  uiButton,
  badge,
  counter,
  alertLabel,
  textModule,
  productCard,
  navigationCard,
  filter,
  search,
  textLabel,
  popover,
} = components;
const text = textLabel.text.color;
const PAGE = "#ffffff";
const PAGE_TINT = popover.background.color.brand; // aubergine-25, common surface

// [component, variant, fg, bg, requirement]
// requirement: 4.5 = normal text (all component labels are 14-16px
// regular), 3 = non-text (icons, focus indicators, borders)
const pairs = [
  // Button — text-label opposite tone on solid backgrounds (Figma pairing)
  [
    "Button",
    "brand-primary-a",
    text.brand.toneB,
    button.background.color.brand.primary.toneA.fallback,
    4.5,
  ],
  [
    "Button",
    "brand-secondary-a",
    text.brand.toneB,
    button.background.color.brand.secondary.toneA.fallback,
    4.5,
  ],
  [
    "Button",
    "brand-secondary-b",
    text.brand.toneA,
    button.background.color.brand.secondary.toneB.fallback,
    4.5,
  ],
  ["Button", "brand-tertiary-a (on white)", text.brand.toneA, PAGE, 4.5],
  [
    "Button",
    "neutral-primary-a",
    text.neutral.toneB,
    button.background.color.neutral.primary.toneA.fallback,
    4.5,
  ],
  [
    "Button",
    "neutral-secondary-b",
    text.neutral.toneA,
    button.background.color.neutral.secondary.toneB.fallback,
    4.5,
  ],
  ["UI Button", "success-a", text.success.toneB, uiButton.background.color.success.toneA, 4.5],
  ["UI Button", "success-b", text.success.toneA, uiButton.background.color.success.toneB, 4.5],
  ["UI Button", "warning-a", text.warning.toneB, uiButton.background.color.warning.toneA, 4.5],
  ["UI Button", "warning-b", text.warning.toneA, uiButton.background.color.warning.toneB, 4.5],
  [
    "UI Button",
    "informative-a",
    text.informative.toneB,
    uiButton.background.color.informative.toneA,
    4.5,
  ],
  [
    "UI Button",
    "informative-b",
    text.informative.toneA,
    uiButton.background.color.informative.toneB,
    4.5,
  ],

  // Badge
  ["Badge", "brand-a", text.brand.toneB, badge.background.color.brand.toneA, 4.5],
  ["Badge", "brand-b", text.brand.toneA, badge.background.color.brand.toneB, 4.5],
  ["Badge", "neutral-b", text.neutral.toneA, badge.background.color.neutral.toneB, 4.5],
  [
    "Badge",
    "rettsdata-a (not implemented here)",
    text.rettsdata.toneB,
    badge.background.color.rettsdata.toneA,
    4.5,
  ],
  [
    "Badge",
    "rettsdata-b (not implemented here)",
    text.rettsdata.toneA,
    badge.background.color.rettsdata.toneB,
    4.5,
  ],

  // Counter
  ["Counter", "neutral", text.neutral.toneA, counter.background.color.neutral, 4.5],
  ["Counter", "brand-a", text.brand.toneA, counter.background.color.brand.toneA, 4.5],
  ["Counter", "brand-b", text.brand.toneB, counter.background.color.brand.toneB, 4.5],
  ["Counter", "success", text.success.toneB, counter.background.color.success, 4.5],
  ["Counter", "warning", text.warning.toneB, counter.background.color.warning, 4.5],

  // Alert Label (banner/accordion share the severity colors)
  ["Alert", "success", text.success.toneA, alertLabel.background.color.success, 4.5],
  ["Alert", "informative", text.informative.toneA, alertLabel.background.color.informative, 4.5],
  ["Alert", "warning", text.warning.toneA, alertLabel.background.color.warning, 4.5],
  [
    "Alert",
    "success icon",
    alertLabel.icon.shape.color.success,
    alertLabel.background.color.success,
    3,
  ],
  [
    "Alert",
    "informative icon",
    alertLabel.icon.shape.color.informative,
    alertLabel.background.color.informative,
    3,
  ],
  [
    "Alert",
    "warning icon",
    alertLabel.icon.shape.color.warning,
    alertLabel.background.color.warning,
    3,
  ],

  // Text Module
  ["Text Module", "brand-a", text.brand.toneB, textModule.color.background.brand.toneA, 4.5],
  ["Text Module", "brand-b", text.brand.toneA, textModule.color.background.brand.toneB, 4.5],
  ["Text Module", "neutral-a", text.neutral.toneB, textModule.color.background.neutral.toneA, 4.5],
  ["Text Module", "neutral-b", text.neutral.toneA, textModule.color.background.neutral.toneB, 4.5],

  // Cards
  [
    "Product Card",
    "brand",
    text.brand.toneA,
    productCard.productContainer.background.color.brand,
    4.5,
  ],
  [
    "Product Card",
    "neutral",
    text.neutral.toneA,
    productCard.productContainer.background.color.neutral,
    4.5,
  ],
  [
    "Navigation Card",
    "text box",
    text.brand.toneA,
    navigationCard.bottomTextBox.background.color,
    4.5,
  ],

  // Filter
  ["Filter", "idle", text.brand.toneA, filter.background.color.fallback, 4.5],
  ["Filter", "selected", text.brand.toneB, filter.background.color.active, 4.5],
  ["Filter", "counter chip", text.brand.toneA, filter.counter.background.color.fallback, 4.5],

  // Fields & secondary text
  ["Search", "placeholder", text.subtle.toneA, search.background.color.fallback, 4.5],
  ["Secondary text", "subtle on white", text.subtle.toneA, PAGE, 4.5],
  ["Secondary text", "subtle on aubergine-25", text.subtle.toneA, PAGE_TINT, 4.5],
];

let failures = 0;
console.log("| Komponent | Variant | Tekst | Bakgrunn | Kontrast | Krav | Status |");
console.log("| --------- | ------- | ----- | -------- | -------- | ---- | ------ |");
for (const [component, variant, rawFg, rawBg, req] of pairs) {
  const fg = hexOf(rawFg);
  const bg = hexOf(rawBg);
  const r = ratio(fg, bg);
  const ok = r >= req;
  if (!ok) failures++;
  console.log(
    `| ${component} | ${variant} | \`${fg}\` | \`${bg}\` | ${r.toFixed(2)}:1 | ${req}:1 | ${ok ? "OK" : "**BRYTER**"} |`,
  );
}
console.log(`\n${failures} av ${pairs.length} par under kravet.`);
if (typeof groups !== "undefined") {
  // referenced to keep the import honest if token shape changes
}
