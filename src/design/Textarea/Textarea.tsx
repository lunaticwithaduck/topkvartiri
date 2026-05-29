'use client';

import { forwardRef, type TextareaHTMLAttributes } from 'react';
import S from './Textarea.styles';

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  invalid?: boolean;
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { invalid = false, ...rest },
  ref,
) {
  return <S.Root ref={ref} $invalid={invalid} aria-invalid={invalid || undefined} {...rest} />;
});
