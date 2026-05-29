'use client';

import { AnimatePresence, useReducedMotion } from 'motion/react';
import { useCallback, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Close } from '@/design/Icon/icons';
import { Image } from '@/design/Image/Image';
import S from './Gallery.styles';

type GalleryImage = { src: string; alt: string };

type GalleryProps = {
  images: GalleryImage[];
  labels?: { close?: string; prev?: string; next?: string };
};

export function Gallery({ images, labels }: GalleryProps) {
  const [index, setIndex] = useState<number | null>(null);
  const reduce = useReducedMotion();
  const open = index !== null;

  const close = useCallback(() => setIndex(null), []);
  const prev = useCallback(
    () => setIndex((i) => (i === null ? i : (i - 1 + images.length) % images.length)),
    [images.length],
  );
  const next = useCallback(
    () => setIndex((i) => (i === null ? i : (i + 1) % images.length)),
    [images.length],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft') prev();
      else if (e.key === 'ArrowRight') next();
    };
    document.addEventListener('keydown', onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, close, prev, next]);

  const active = index !== null ? images[index] : null;
  const stop = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <>
      <S.Grid>
        {images.map((img, i) => (
          <S.Thumb key={img.src} type="button" aria-label={img.alt} onClick={() => setIndex(i)}>
            <Image src={img.src} alt={img.alt} fill sizes="(min-width: 768px) 33vw, 50vw" />
          </S.Thumb>
        ))}
      </S.Grid>

      <AnimatePresence>
        {active ? (
          <S.Backdrop
            role="dialog"
            aria-modal="true"
            aria-label={active.alt}
            onClick={close}
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <S.Stage
              onClick={stop}
              initial={reduce ? false : { scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={reduce ? undefined : { scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Image src={active.src} alt={active.alt} fill fit="contain" sizes="92vw" />
            </S.Stage>

            <S.CloseBtn
              type="button"
              aria-label={labels?.close ?? 'Close'}
              onClick={(e) => {
                stop(e);
                close();
              }}
            >
              <Close size={24} tone="inverse" />
            </S.CloseBtn>

            {images.length > 1 ? (
              <>
                <S.PrevBtn
                  type="button"
                  aria-label={labels?.prev ?? 'Previous'}
                  onClick={(e) => {
                    stop(e);
                    prev();
                  }}
                >
                  <ChevronLeft size={26} tone="inverse" />
                </S.PrevBtn>
                <S.NextBtn
                  type="button"
                  aria-label={labels?.next ?? 'Next'}
                  onClick={(e) => {
                    stop(e);
                    next();
                  }}
                >
                  <ChevronRight size={26} tone="inverse" />
                </S.NextBtn>
                <S.Counter>{`${(index ?? 0) + 1} / ${images.length}`}</S.Counter>
              </>
            ) : null}
          </S.Backdrop>
        ) : null}
      </AnimatePresence>
    </>
  );
}
