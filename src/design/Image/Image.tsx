'use client';

import type { CSSProperties } from 'react';
import S from './Image.styles';

type CommonProps = {
  src: string;
  alt: string;
  className?: string;
  style?: CSSProperties;
  fit?: 'cover' | 'contain';
  priority?: boolean;
  sizes?: string;
};

type SizedProps = CommonProps & {
  width: number;
  height: number;
  fill?: never;
};

type FillProps = CommonProps & {
  fill: true;
  width?: never;
  height?: never;
};

type ImageProps = SizedProps | FillProps;

// Wraps next/image with sensible defaults for our reference port. During
// scaffolding we keep `unoptimized` on so the image pipeline isn't a
// blocker — flip to optimized once final assets land.
export function Image(props: ImageProps) {
  const { src, alt, className, style, fit = 'cover', priority, sizes } = props;

  if ('fill' in props && props.fill) {
    return (
      <S.Fill
        src={src}
        alt={alt}
        fill
        $fit={fit}
        priority={priority}
        sizes={sizes ?? '100vw'}
        className={className}
        style={style}
        unoptimized
      />
    );
  }

  return (
    <S.Root
      src={src}
      alt={alt}
      width={props.width}
      height={props.height}
      $fit={fit}
      priority={priority}
      sizes={sizes}
      className={className}
      style={style}
      unoptimized
    />
  );
}
