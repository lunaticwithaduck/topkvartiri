'use client';

import { Button } from '@/design/Button/Button';
import { Image } from '@/design/Image/Image';
import { Reveal } from '@/design/Reveal/Reveal';
import { Text } from '@/design/Text/Text';
import S from './StatementBand.styles';

type StatementBandProps = {
  imageSrc: string;
  imageAlt: string;
  eyebrow?: string;
  title: string;
  body?: string;
  cta?: { label: string; href: string };
};

export function StatementBand({
  imageSrc,
  imageAlt,
  eyebrow,
  title,
  body,
  cta,
}: StatementBandProps) {
  return (
    <S.Root>
      <S.Media>
        <S.ParallaxLayer amount={0.1}>
          <Image src={imageSrc} alt={imageAlt} fill sizes="100vw" />
        </S.ParallaxLayer>
      </S.Media>
      <S.Overlay />
      <S.Inner>
        <Reveal>
          <S.Content>
            {eyebrow ? (
              <S.Eyebrow>
                <Text size="sm" tone="accent" uppercase letterSpacing="wider" align="center">
                  {eyebrow}
                </Text>
              </S.Eyebrow>
            ) : null}
            <Text
              as="h2"
              size="display"
              weight="light"
              tone="inverse"
              align="center"
              uppercase
              letterSpacing="wide"
              lineHeight="tight"
            >
              {title}
            </Text>
            {body ? (
              <Text as="p" size="xl" tone="inverse" align="center" lineHeight="relaxed">
                {body}
              </Text>
            ) : null}
            {cta ? (
              <S.Actions>
                <Button href={cta.href}>{cta.label}</Button>
              </S.Actions>
            ) : null}
          </S.Content>
        </Reveal>
      </S.Inner>
    </S.Root>
  );
}
