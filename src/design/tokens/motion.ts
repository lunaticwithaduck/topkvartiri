// Motion tokens for Framer Motion. Durations are in seconds and easings are
// cubic-bezier tuples, because these feed `transition={…}` props (JS), not CSS.
// CSS-only transitions (hover/focus) stay inline in *.styles.ts files.

type Bezier = [number, number, number, number];

export const animation = {
  duration: {
    fast: 0.2,
    base: 0.45,
    slow: 0.7,
    cinematic: 1.1,
  },
  ease: {
    standard: [0.4, 0, 0.2, 1] as Bezier,
    entrance: [0.16, 1, 0.3, 1] as Bezier, // easeOutExpo — a calm, weighted settle
    soft: [0.25, 0.1, 0.25, 1] as Bezier,
  },
  // Default vertical travel for fade-and-rise reveals.
  reveal: { distance: 24 },
} as const;

export type Animation = typeof animation;
