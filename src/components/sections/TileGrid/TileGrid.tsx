'use client';

import { Image } from '@/design/Image/Image';
import { Text } from '@/design/Text/Text';
import S from './TileGrid.styles';

type TileItem = {
  caption: string;
  imageSrc: string;
  imageAlt: string;
  href?: string;
};

type TileGridProps = {
  tiles: TileItem[];
  columns?: 2 | 3 | 4;
};

export function TileGrid({ tiles, columns = 4 }: TileGridProps) {
  return (
    <S.Root $columns={columns}>
      {tiles.map((tile) => (
        <S.Tile key={tile.caption} href={tile.href ?? '#'}>
          <Image
            src={tile.imageSrc}
            alt={tile.imageAlt}
            fill
            sizes="(min-width: 1024px) 25vw, 50vw"
          />
          <S.Scrim />
          <S.Caption>
            <Text size="lg" tone="inverse" uppercase letterSpacing="wider">
              {tile.caption}
            </Text>
          </S.Caption>
        </S.Tile>
      ))}
    </S.Root>
  );
}
