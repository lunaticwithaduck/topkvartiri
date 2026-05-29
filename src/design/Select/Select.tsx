'use client';

import { forwardRef, type SelectHTMLAttributes } from 'react';
import S from './Select.styles';

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  invalid?: boolean;
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { invalid = false, children, ...rest },
  ref,
) {
  return (
    <S.Root ref={ref} $invalid={invalid} aria-invalid={invalid || undefined} {...rest}>
      {children}
    </S.Root>
  );
});
