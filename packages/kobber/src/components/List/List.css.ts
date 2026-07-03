import { style, styleVariants } from "@vanilla-extract/css";
import { tokens, val } from "../../styles/tokens";
import { body } from "../../styles/typography.css";

const { list, _listElements, textLabel } = tokens.component;

const base = {
  display: "flex",
  flexDirection: "column",
  margin: 0,
  padding: 0,
  listStyle: "none",
} as const;

export const root = styleVariants({
  unordered: [
    body.medium,
    {
      ...base,
      gap: val(list.gap.unordered.medium),
    },
  ],
  ordered: [
    body.medium,
    {
      ...base,
      gap: val(list.gap.ordered.medium),
      counterReset: "kobber-list",
    },
  ],
});

/** Nested lists indent per the _list-elements tokens. */
export const nested = style({
  paddingLeft: val(_listElements.padding.left.nested),
  marginTop: val(list.nestedListContainer.gap),
});

export const item = style({
  display: "flex",
  gap: val(list.listBlock.gap),
  selectors: {
    // Marker; accent-colored bullet or counter depending on the parent list
    [`${root.unordered} > &::before`]: {
      content: "•",
      color: textLabel.text.color.accent.toneA,
    },
    [`${root.ordered} > &::before`]: {
      content: 'counter(kobber-list) "."',
      counterIncrement: "kobber-list",
      color: textLabel.text.color.accent.toneA,
    },
  },
});
