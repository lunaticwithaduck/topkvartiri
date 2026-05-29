'use client';

import { Button } from '@/design/Button/Button';
import { Card, CardBody, CardFooter, CardMedia } from '@/design/Card/Card';
import { Image } from '@/design/Image/Image';
import { Text } from '@/design/Text/Text';
import S from './ImageGridBand.styles';

type Tile = {
  title: string;
  body?: string;
  imageSrc: string;
  imageAlt: string;
  cta?: { label: string; href: string };
};

type ImageGridBandProps = {
  tiles: Tile[];
  columns?: 2 | 3 | 4;
  footerCta?: { label: string; href: string };
};

export function ImageGridBand({ tiles, columns = 3, footerCta }: ImageGridBandProps) {
  return (
    <S.Root $columns={columns}>
      {tiles.map((tile) => (
        <Card key={tile.title}>
          <CardMedia aspectRatio="4 / 3">
            <Image
              src={tile.imageSrc}
              alt={tile.imageAlt}
              fill
              sizes="(min-width: 1024px) 25vw, 50vw"
            />
          </CardMedia>
          <CardBody>
            <Text as="h3" size="2xl" uppercase letterSpacing="wider">
              {tile.title}
            </Text>
            {tile.body ? (
              <Text as="p" tone="muted">
                {tile.body}
              </Text>
            ) : null}
          </CardBody>
          {tile.cta ? (
            <CardFooter>
              <Button variant="secondary" href={tile.cta.href}>
                {tile.cta.label}
              </Button>
            </CardFooter>
          ) : null}
        </Card>
      ))}
      {footerCta ? (
        <S.CtaWrap>
          <Button href={footerCta.href}>{footerCta.label}</Button>
        </S.CtaWrap>
      ) : null}
    </S.Root>
  );
}
