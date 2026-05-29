// Typography tokens. The reference site uses a single font (Jost) with a
// 9-step px ladder: 15/16/17/20/22/26/30/36/40 (see tools/FINDINGS.md). The
// 17px size dominates body copy. We map to rem with a 16px html root.

export const fontSize = {
  xs: '0.9375rem', // 15px — small body / fine print
  sm: '1rem', // 16px — small UI text
  base: '1.0625rem', // 17px — body (dominant on reference)
  lg: '1.25rem', // 20px — lead paragraph
  xl: '1.375rem', // 22px — sub-heading
  '2xl': '1.625rem', // 26px — sub-heading large
  '3xl': '1.875rem', // 30px — heading 3
  '4xl': '2.25rem', // 36px — heading 2
  '5xl': '2.5rem', // 40px — heading 1
  // Editorial display sizes — fluid, for section openers and the home hero.
  // Off the fixed reference ladder on purpose: cinematic scale needs to breathe.
  display: 'clamp(2.25rem, 5vw, 3.5rem)', // ~36 → 56px — editorial section titles
  hero: 'clamp(2.75rem, 7vw, 5rem)', // ~44 → 80px — hero headline
} as const;

// Reference uses 400 for body, 500 for small caps labels, 300 for display
// headings (light weight). Match those exactly.
export const fontWeight = {
  light: '300',
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
} as const;

export const lineHeight = {
  none: '1',
  tight: '1.25',
  snug: '1.375',
  normal: '1.5',
  relaxed: '1.625',
  loose: '2',
} as const;

export const letterSpacing = {
  tighter: '-0.05em',
  tight: '-0.025em',
  normal: '0',
  wide: '0.025em',
  wider: '0.05em',
} as const;

// Jost is the single brand font. Loaded via next/font/google in
// src/app/[locale]/layout.tsx, exposed as the `--font-sans` CSS variable.
export const fontFamily = {
  sans: 'var(--font-sans), Jost, -apple-system, ui-sans-serif, system-ui, sans-serif',
  body: 'var(--font-sans), Jost, -apple-system, ui-sans-serif, system-ui, sans-serif',
  display: 'var(--font-sans), Jost, -apple-system, ui-sans-serif, system-ui, sans-serif',
} as const;

export type FontSize = keyof typeof fontSize;
export type FontWeight = keyof typeof fontWeight;
export type LineHeight = keyof typeof lineHeight;
export type LetterSpacing = keyof typeof letterSpacing;
export type FontFamily = keyof typeof fontFamily;
