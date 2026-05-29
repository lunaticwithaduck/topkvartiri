'use client';

import type { ReactNode } from 'react';
import { Reveal } from '@/design/Reveal/Reveal';
import S from './Band.styles';

type BandProps = {
  children: ReactNode;
  bg?: 'default' | 'elevated';
  reveal?: boolean;
};

// Full-bleed tinted background wrapper for a homepage band, with a built-in
// scroll reveal. Inner content keeps its own max-width/padding.
export function Band({ children, bg = 'default', reveal = true }: BandProps) {
  return <S.Root $bg={bg}>{reveal ? <Reveal>{children}</Reveal> : children}</S.Root>;
}
