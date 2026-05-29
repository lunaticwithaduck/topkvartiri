'use client';

import type { ReactNode } from 'react';
import S from './Card.styles';

type CardProps = {
  variant?: 'media' | 'plain';
  hover?: boolean;
  children: ReactNode;
  className?: string;
};

export function Card({ variant = 'media', hover = true, children, className }: CardProps) {
  return (
    <S.Root $variant={variant} $hover={hover} className={className}>
      {children}
    </S.Root>
  );
}

type CardMediaProps = {
  aspectRatio?: string;
  children: ReactNode;
};

export function CardMedia({ aspectRatio = '4 / 3', children }: CardMediaProps) {
  return <S.Media $aspectRatio={aspectRatio}>{children}</S.Media>;
}

type CardSlotProps = { children: ReactNode };

export function CardBody({ children }: CardSlotProps) {
  return <S.Body>{children}</S.Body>;
}

export function CardFooter({ children }: CardSlotProps) {
  return <S.Footer>{children}</S.Footer>;
}
