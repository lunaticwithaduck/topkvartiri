'use client';

import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';
import S from './Checkbox.styles';

type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  label: ReactNode;
};

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { label, className, ...rest },
  ref,
) {
  return (
    <S.Root className={className}>
      <S.Box ref={ref} type="checkbox" {...rest} />
      <S.LabelText>{label}</S.LabelText>
    </S.Root>
  );
});
