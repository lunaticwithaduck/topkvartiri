import styled from '@emotion/styled';
import type { FontSize, FontWeight, LetterSpacing, LineHeight } from '../tokens/typography';

type Tone = 'default' | 'muted' | 'inverse' | 'accent' | 'primary';

export type TextStyleProps = {
  $size: FontSize;
  $weight: FontWeight;
  $lineHeight: LineHeight;
  $letterSpacing: LetterSpacing;
  $tone: Tone;
  $uppercase: boolean;
  $align: 'left' | 'center' | 'right';
  $dropCap: boolean;
};

const Root = styled.span<TextStyleProps>`
  margin: 0;
  font-family: ${({ theme }) => theme.fontFamily.body};
  font-size: ${({ theme, $size }) => theme.fontSize[$size]};
  font-weight: ${({ theme, $weight }) => theme.fontWeight[$weight]};
  line-height: ${({ theme, $lineHeight }) => theme.lineHeight[$lineHeight]};
  letter-spacing: ${({ theme, $letterSpacing }) => theme.letterSpacing[$letterSpacing]};
  text-align: ${({ $align }) => $align};
  text-transform: ${({ $uppercase }) => ($uppercase ? 'uppercase' : 'none')};
  text-wrap: pretty;
  color: ${({ theme, $tone }) => {
    switch ($tone) {
      case 'muted':
        return theme.colors.muted;
      case 'inverse':
        return theme.colors.inverse;
      case 'accent':
        return theme.colors.accent;
      case 'primary':
        return theme.colors.primary;
      default:
        return theme.colors.text;
    }
  }};
  ${({ $dropCap, theme }) =>
    $dropCap
      ? `&::first-letter {
          float: left;
          font-size: 3.1em;
          line-height: 0.78;
          padding-right: 0.08em;
          font-weight: ${theme.fontWeight.light};
          color: ${theme.colors.accent};
        }`
      : ''}
`;

const S = { Root };

export default S;
