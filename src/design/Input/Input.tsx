'use client';

import { forwardRef, type InputHTMLAttributes } from 'react';
import S from './Input.styles';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  invalid?: boolean;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { invalid = false, ...rest },
  ref,
) {
  return <S.Root ref={ref} $invalid={invalid} aria-invalid={invalid || undefined} {...rest} />;
});
