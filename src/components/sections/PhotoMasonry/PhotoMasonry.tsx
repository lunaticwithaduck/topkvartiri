'use client';

import { Image } from '@/design/Image/Image';
import S from './PhotoMasonry.styles';

type Photo = {
  src: string;
  alt: string;
};

type PhotoMasonryProps = {
  photos: Photo[];
  columns?: 2 | 3 | 4;
};

export function PhotoMasonry({ photos, columns = 3 }: PhotoMasonryProps) {
  return (
    <S.Root $columns={columns}>
      {photos.map((photo) => (
        <S.Tile key={photo.src}>
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
          />
        </S.Tile>
      ))}
    </S.Root>
  );
}
