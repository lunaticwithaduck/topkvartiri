'use client';

import type { ReactNode } from 'react';
import S from './Icon.styles';

type IconProps = {
  size?: number;
  tone?: 'default' | 'inverse' | 'accent' | 'primary';
  strokeWidth?: number;
  viewBox?: string;
  className?: string;
  'aria-label'?: string;
  children: ReactNode;
};

export function Icon({
  size = 24,
  tone = 'default',
  strokeWidth = 1.5,
  viewBox = '0 0 24 24',
  className,
  'aria-label': ariaLabel,
  children,
}: IconProps) {
  return (
    <S.Root
      $size={size}
      $tone={tone}
      strokeWidth={strokeWidth}
      viewBox={viewBox}
      className={className}
      role={ariaLabel ? 'img' : 'presentation'}
      aria-label={ariaLabel}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </S.Root>
  );
}
