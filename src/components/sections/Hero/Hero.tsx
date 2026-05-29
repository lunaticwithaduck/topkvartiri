'use client';

import type { ReactNode } from 'react';
import { Image } from '@/design/Image/Image';
import { Text } from '@/design/Text/Text';
import S from './Hero.styles';

type HeroProps = {
  imageSrc: string;
  imageAlt: string;
  title?: string;
  subtitle?: string;
  compact?: boolean;
  priority?: boolean;
  children?: ReactNode;
};

export function Hero({
  imageSrc,
  imageAlt,
  title,
  subtitle,
  compact = false,
  priority = false,
  children,
}: HeroProps) {
  const hasContent = title || subtitle || children;

  return (
    <S.Root $compact={compact}>
      <S.Media>
        <Image src={imageSrc} alt={imageAlt} fill priority={priority} sizes="100vw" />
      </S.Media>
      {hasContent ? <S.Scrim /> : null}
      {hasContent ? (
        <S.Content>
          {title ? (
            <Text as="h1" tone="inverse" align="center" uppercase letterSpacing="wider">
              {title}
            </Text>
          ) : null}
          {subtitle ? (
            <Text as="p" size="lg" tone="inverse" align="center">
              {subtitle}
            </Text>
          ) : null}
          {children}
        </S.Content>
      ) : null}
    </S.Root>
  );
}
