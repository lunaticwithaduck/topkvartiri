// Spacing scale — 4px grid (Tailwind/majstorbg-shaped: key = step number, value
// = step * 4px in rem).
//
// Why not derive every key from the reference: tools/output/reference/design-
// notes.md shows the reference's top paddings as 10/13/14/17.5/12/24/8 px, but
// those are Elementor framework defaults — not a designed scale. Using them as
// tokens would import an opaque set of magic values from someone else's CMS.
//
// What we did derive: the reference's two most-frequent paddings that don't
// already sit on the 4px grid are 10px (×63 uses, by far the dominant pad)
// and 14px (×16). We add `2.5 = 10px` and `3.5 = 14px` as Tailwind-standard
// half-step keys so reference-faithful section ports don't need raw values.
// 13px and 17.5px outliers are left out — too close to 12/16/20 to justify.

export const spacing = {
  px: '1px',
  0: '0',
  1: '0.25rem', // 4px
  2: '0.5rem', // 8px — reference: padding ×12
  2.5: '0.625rem', // 10px — reference: padding ×63 (Elementor dominant)
  3: '0.75rem', // 12px — reference: padding ×12
  3.5: '0.875rem', // 14px — reference: padding ×16
  4: '1rem', // 16px — reference: padding ×4
  5: '1.25rem', // 20px
  6: '1.5rem', // 24px — reference: padding ×12
  8: '2rem', // 32px
  10: '2.5rem', // 40px
  12: '3rem', // 48px
  14: '3.5rem', // 56px
  16: '4rem', // 64px
  20: '5rem', // 80px
  24: '6rem', // 96px
  32: '8rem', // 128px
  40: '10rem', // 160px
  48: '12rem', // 192px
  64: '16rem', // 256px
} as const;

export type SpacingToken = keyof typeof spacing;
export type SpacingValue = (typeof spacing)[SpacingToken];
