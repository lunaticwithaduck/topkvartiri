'use client';

import type { ButtonHTMLAttributes } from 'react';
import S from './Button.styles';

export type ButtonVariant = 'primary' | 'secondary';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

export function Button({ variant = 'primary', children, ...rest }: ButtonProps) {
  return (
    <S.Root $variant={variant} {...rest}>
      {children}
    </S.Root>
  );
}
