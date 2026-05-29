import { breakpoints } from '../tokens/breakpoints';
import { colors } from '../tokens/colors';
import { animation } from '../tokens/motion';
import { radius } from '../tokens/radius';
import { spacing } from '../tokens/spacing';
import { fontFamily, fontSize, fontWeight, letterSpacing, lineHeight } from '../tokens/typography';
import { zIndex } from '../tokens/zIndex';

export const theme = {
  colors,
  spacing,
  radius,
  fontSize,
  fontWeight,
  lineHeight,
  letterSpacing,
  fontFamily,
  breakpoints,
  zIndex,
  animation,
} as const;

export type Theme = typeof theme;
