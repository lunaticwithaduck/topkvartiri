'use client';

import type { ElementType, ReactNode } from 'react';
import type { FontSize, FontWeight, LetterSpacing, LineHeight } from '../tokens/typography';
import S from './Text.styles';

type TextElement = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'label' | 'div';

type TextProps = {
  as?: TextElement;
  size?: FontSize;
  weight?: FontWeight;
  lineHeight?: LineHeight;
  letterSpacing?: LetterSpacing;
  tone?: 'default' | 'muted' | 'inverse' | 'accent' | 'primary';
  uppercase?: boolean;
  align?: 'left' | 'center' | 'right';
  dropCap?: boolean;
  children: ReactNode;
  className?: string;
  htmlFor?: string;
};

// Default size/weight per element — keeps consumers terse for the common case.
const ELEMENT_DEFAULTS: Record<
  TextElement,
  { size: FontSize; weight: FontWeight; lineHeight: LineHeight }
> = {
  h1: { size: '5xl', weight: 'light', lineHeight: 'tight' },
  h2: { size: '4xl', weight: 'light', lineHeight: 'tight' },
  h3: { size: '3xl', weight: 'light', lineHeight: 'snug' },
  h4: { size: '2xl', weight: 'light', lineHeight: 'snug' },
  h5: { size: 'xl', weight: 'normal', lineHeight: 'snug' },
  h6: { size: 'lg', weight: 'normal', lineHeight: 'snug' },
  p: { size: 'base', weight: 'normal', lineHeight: 'normal' },
  span: { size: 'base', weight: 'normal', lineHeight: 'normal' },
  label: { size: 'sm', weight: 'medium', lineHeight: 'snug' },
  div: { size: 'base', weight: 'normal', lineHeight: 'normal' },
};

export function Text({
  as = 'span',
  size,
  weight,
  lineHeight,
  letterSpacing = 'normal',
  tone = 'default',
  uppercase = false,
  align = 'left',
  dropCap = false,
  children,
  className,
  htmlFor,
}: TextProps) {
  const defaults = ELEMENT_DEFAULTS[as];
  return (
    <S.Root
      as={as as ElementType}
      $size={size ?? defaults.size}
      $weight={weight ?? defaults.weight}
      $lineHeight={lineHeight ?? defaults.lineHeight}
      $letterSpacing={letterSpacing}
      $tone={tone}
      $uppercase={uppercase}
      $align={align}
      $dropCap={dropCap}
      className={className}
      {...(as === 'label' && htmlFor ? { htmlFor } : {})}
    >
      {children}
    </S.Root>
  );
}
