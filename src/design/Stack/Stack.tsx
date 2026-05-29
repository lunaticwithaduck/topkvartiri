'use client';

import type { ReactNode } from 'react';
import type { SpacingToken } from '../tokens/spacing';
import type { StackAlign, StackDirection, StackJustify } from './Stack.styles';
import S from './Stack.styles';

type StackProps = {
  direction?: StackDirection;
  gap?: SpacingToken;
  align?: StackAlign;
  justify?: StackJustify;
  wrap?: boolean;
  children: ReactNode;
  className?: string;
};

export function Stack({
  direction = 'column',
  gap = 4,
  align = 'stretch',
  justify = 'start',
  wrap = false,
  children,
  className,
}: StackProps) {
  return (
    <S.Root
      $direction={direction}
      $gap={gap}
      $align={align}
      $justify={justify}
      $wrap={wrap}
      className={className}
    >
      {children}
    </S.Root>
  );
}
