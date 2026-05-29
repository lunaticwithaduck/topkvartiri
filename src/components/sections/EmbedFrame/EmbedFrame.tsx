'use client';

import S from './EmbedFrame.styles';

type EmbedFrameProps = {
  src: string;
  title: string;
  aspectRatio?: string;
  allow?: string;
  allowFullScreen?: boolean;
};

export function EmbedFrame({
  src,
  title,
  aspectRatio = '16 / 9',
  allow,
  allowFullScreen = true,
}: EmbedFrameProps) {
  return (
    <S.Root $aspectRatio={aspectRatio}>
      <S.FrameWrap $aspectRatio={aspectRatio}>
        <iframe
          src={src}
          title={title}
          loading="lazy"
          allow={allow}
          allowFullScreen={allowFullScreen}
        />
      </S.FrameWrap>
    </S.Root>
  );
}
