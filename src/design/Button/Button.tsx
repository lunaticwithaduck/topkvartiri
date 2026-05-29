'use client';

import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { Link } from '@/i18n/navigation';
import S from './Button.styles';

export type ButtonVariant = 'primary' | 'secondary';

type CommonProps = {
  variant?: ButtonVariant;
  children: ReactNode;
  className?: string;
};

type AsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & {
    href?: undefined;
  };

type AsInternalLink = CommonProps & {
  href: string;
  external?: false;
};

type AsExternalLink = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps | 'href'> & {
    href: string;
    external: true;
  };

type ButtonProps = AsButton | AsInternalLink | AsExternalLink;

export function Button(props: ButtonProps) {
  const variant = props.variant ?? 'primary';

  if ('href' in props && props.href !== undefined) {
    if ('external' in props && props.external) {
      const { href, external: _external, variant: _v, children, className, ...rest } = props;
      return (
        <S.AnchorRoot
          $variant={variant}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={className}
          {...rest}
        >
          {children}
        </S.AnchorRoot>
      );
    }
    return (
      <S.AnchorRoot as={Link} $variant={variant} href={props.href} className={props.className}>
        {props.children}
      </S.AnchorRoot>
    );
  }

  const { variant: _v, children, className, ...rest } = props;
  return (
    <S.ButtonRoot $variant={variant} className={className} {...rest}>
      {children}
    </S.ButtonRoot>
  );
}
