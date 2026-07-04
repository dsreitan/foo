/**
 * PROPOSED motion tokens — Kobber has none today. Values follow common
 * practice (Material/Carbon): fast for state flips, base for surface
 * enter/exit, slow for large panels. Every animation in kobber-lab uses
 * these and respects prefers-reduced-motion.
 */
export const motion = {
  duration: {
    fast: "120ms",
    base: "240ms",
    slow: "400ms",
  },
  easing: {
    enter: "cubic-bezier(0.2, 0, 0, 1)",
    exit: "cubic-bezier(0.4, 0, 1, 1)",
  },
};

export const reducedMotion = "(prefers-reduced-motion: reduce)";
