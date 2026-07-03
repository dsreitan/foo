/** Join class names, dropping falsy values. Every component merges the
 * consumer's className with its own classes through this. */
export const cx = (...classes: Array<string | false | undefined | null>) =>
  classes.filter(Boolean).join(' ')
