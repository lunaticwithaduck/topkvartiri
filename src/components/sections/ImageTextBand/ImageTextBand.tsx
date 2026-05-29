'use client';

import type { ReactNode } from 'react';
import { Button } from '@/design/Button/Button';
import { Image } from '@/design/Image/Image';
import { Text } from '@/design/Text/Text';
import S from './ImageTextBand.styles';

type ImageRef = { src: string; alt: string };

type ImageTextBandProps = {
  title: string;
  body: string;
  eyebrow?: string;
  images: [ImageRef] | [ImageRef, ImageRef];
  reverse?: boolean;
  cta?: { label: string; href: string };
  children?: ReactNode;
};

export function ImageTextBand({
  title,
  body,
  eyebrow,
  images,
  reverse = false,
  cta,
  children,
}: ImageTextBandProps) {
  const stacked = images.length === 2;

  return (
    <S.Root $reverse={reverse}>
      <S.MediaColumn $stacked={stacked}>
        {images.map((img) => (
          <S.MediaTile key={img.src} $aspectRatio={stacked ? '3 / 4' : '4 / 3'}>
            <Image src={img.src} alt={img.alt} fill sizes="(min-width: 768px) 50vw, 100vw" />
          </S.MediaTile>
        ))}
      </S.MediaColumn>
      <S.TextColumn>
        {eyebrow ? (
          <S.Eyebrow>
            <Text size="sm" uppercase letterSpacing="wider" tone="accent">
              {eyebrow}
            </Text>
          </S.Eyebrow>
        ) : null}
        <Text as="h2" uppercase letterSpacing="wider">
          {title}
        </Text>
        <Text as="p" tone="muted">
          {body}
        </Text>
        {children}
        {cta ? (
          <S.Actions>
            <Button href={cta.href}>{cta.label}</Button>
          </S.Actions>
        ) : null}
      </S.TextColumn>
    </S.Root>
  );
}
