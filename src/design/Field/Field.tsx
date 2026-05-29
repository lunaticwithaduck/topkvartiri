'use client';

import type { ReactNode } from 'react';
import { Text } from '@/design/Text/Text';
import S from './Field.styles';

type FieldProps = {
  label?: string;
  htmlFor?: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
};

export function Field({ label, htmlFor, error, hint, required, children, className }: FieldProps) {
  return (
    <S.Root className={className}>
      {label ? (
        <Text as="label" htmlFor={htmlFor} size="sm" weight="medium">
          {label}
          {required ? <S.Req> *</S.Req> : null}
        </Text>
      ) : null}
      {children}
      {error ? (
        <S.ErrorMsg role="alert">{error}</S.ErrorMsg>
      ) : hint ? (
        <S.Hint>{hint}</S.Hint>
      ) : null}
    </S.Root>
  );
}
