import { styleVariants } from '@vanilla-extract/css'
import { tokens, val, fontFamily } from './tokens'

/**
 * Core typography styles, one styleVariants map per text component in
 * Figma (Text-Label, Text-Body, Text-Title, Text-Heading, Text-Display).
 *
 * These deliberately do NOT set color: text color belongs to the
 * consuming component (tones flip with component state, e.g. an active
 * Filter) and cascades via `color`/`currentColor`.
 *
 * Interactive components compose these classes; the public <Text>
 * component is a thin veneer over the same styles.
 */

const { textLabel, textBody, textTitle, textHeading, textDisplay, textLead } = tokens.component

const brandFont = `${fontFamily.ppMori}, system-ui, sans-serif`

/** UI text: buttons, filters, badges, form labels. */
export const label = styleVariants({
  small: {
    fontFamily: brandFont,
    fontSize: val(textLabel.text.size.small),
    fontWeight: textLabel.text.weight,
  },
  medium: {
    fontFamily: brandFont,
    fontSize: val(textLabel.text.size.medium),
    fontWeight: textLabel.text.weight,
  },
  large: {
    fontFamily: brandFont,
    fontSize: val(textLabel.text.size.large),
    fontWeight: textLabel.text.weight,
  },
})

/** Running text (brand flavor, long-form line heights). */
export const body = styleVariants({
  small: {
    fontFamily: brandFont,
    fontSize: val(textBody.text.size.small),
    fontWeight: textBody.text.weight.brand,
    lineHeight: val(textBody.text.lineHeight.brand.small.long),
  },
  medium: {
    fontFamily: brandFont,
    fontSize: val(textBody.text.size.medium),
    fontWeight: textBody.text.weight.brand,
    lineHeight: val(textBody.text.lineHeight.brand.medium.long),
  },
  large: {
    fontFamily: brandFont,
    fontSize: val(textBody.text.size.large),
    fontWeight: textBody.text.weight.brand,
    lineHeight: val(textBody.text.lineHeight.brand.large.long),
  },
})

/** Intro/ingress text under a heading. One size in the tokens. */
export const lead = styleVariants({
  medium: {
    fontFamily: brandFont,
    fontSize: val(textLead.text.size),
    fontWeight: textLead.text.weight.brand,
    lineHeight: val(textLead.text.lineHeight),
  },
})

/** Section titles. */
export const title = styleVariants({
  small: {
    fontFamily: brandFont,
    fontSize: val(textTitle.text.size.small),
    fontWeight: textTitle.text.weight.brand,
    lineHeight: val(textTitle.text.lineHeight.small),
  },
  medium: {
    fontFamily: brandFont,
    fontSize: val(textTitle.text.size.medium),
    fontWeight: textTitle.text.weight.brand,
    lineHeight: val(textTitle.text.lineHeight.medium),
  },
  large: {
    fontFamily: brandFont,
    fontSize: val(textTitle.text.size.large),
    fontWeight: textTitle.text.weight.brand,
    lineHeight: val(textTitle.text.lineHeight.large),
  },
})

/** Page headings. */
export const heading = styleVariants({
  medium: {
    fontFamily: brandFont,
    fontSize: val(textHeading.text.size.medium),
    fontWeight: textHeading.text.weight.brand,
    lineHeight: val(textHeading.text.lineHeight.brand.medium),
  },
  large: {
    fontFamily: brandFont,
    fontSize: val(textHeading.text.size.large),
    fontWeight: textHeading.text.weight.brand,
    lineHeight: val(textHeading.text.lineHeight.brand.large),
  },
})

/** Hero/display text. */
export const display = styleVariants({
  medium: {
    fontFamily: brandFont,
    fontSize: val(textDisplay.size.medium),
    fontWeight: textDisplay.text.weight,
    lineHeight: val(textDisplay.text.lineHeight.medium),
  },
  large: {
    fontFamily: brandFont,
    fontSize: val(textDisplay.size.large),
    fontWeight: textDisplay.text.weight,
    lineHeight: val(textDisplay.text.lineHeight.large),
  },
})
