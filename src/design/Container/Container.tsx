'use client';

import type { ReactNode } from 'react';
import type { ContainerWidth } from './Container.styles';
import S from './Container.styles';

type ContainerProps = {
  width?: ContainerWidth;
  children: ReactNode;
  className?: string;
};

export function Container({ width = 'xl', children, className }: ContainerProps) {
  return (
    <S.Root $width={width} className={className}>
      {children}
    </S.Root>
  );
}
