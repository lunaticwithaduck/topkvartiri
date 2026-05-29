'use client';

import type { ReactNode } from 'react';
import type { SectionBg } from './Section.styles';
import S from './Section.styles';

type SectionProps = {
  bg?: SectionBg;
  imageSrc?: string;
  overlay?: 'dark' | 'light' | 'none';
  minHeight?: string;
  padTop?: boolean;
  padBottom?: boolean;
  children: ReactNode;
  className?: string;
  id?: string;
};

export function Section({
  bg = 'background',
  imageSrc,
  overlay = 'none',
  minHeight,
  padTop = true,
  padBottom = true,
  children,
  className,
  id,
}: SectionProps) {
  return (
    <S.Root
      $bg={bg}
      $imageSrc={imageSrc}
      $minHeight={minHeight}
      $padTop={padTop}
      $padBottom={padBottom}
      className={className}
      id={id}
    >
      {overlay !== 'none' ? <S.Overlay $tone={overlay} /> : null}
      <S.Inner>{children}</S.Inner>
    </S.Root>
  );
}
