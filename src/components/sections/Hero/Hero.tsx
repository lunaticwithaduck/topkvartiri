'use client';

import { motion, useReducedMotion, type Variants } from 'motion/react';
import type { ReactNode } from 'react';
import { Image } from '@/design/Image/Image';
import { KineticHeading } from '@/design/KineticHeading/KineticHeading';
import { Text } from '@/design/Text/Text';
import { animation } from '@/design/tokens/motion';
import S from './Hero.styles';

type HeroProps = {
  imageSrc: string;
  imageAlt: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  compact?: boolean;
  priority?: boolean;
  children?: ReactNode;
};

export function Hero({
  imageSrc,
  imageAlt,
  eyebrow,
  title,
  subtitle,
  compact = false,
  priority = false,
  children,
}: HeroProps) {
  const reduce = useReducedMotion();
  const hasContent = eyebrow || title || subtitle || children;

  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.14, delayChildren: 0.15 } },
  };
  const item: Variants = {
    hidden: { opacity: 0, y: 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: animation.duration.slow, ease: animation.ease.entrance },
    },
  };

  return (
    <S.Root $compact={compact}>
      <S.MediaClip>
        <S.Media
          animate={reduce ? undefined : { scale: [1.05, 1.13] }}
          transition={
            reduce
              ? undefined
              : {
                  duration: 20,
                  ease: 'easeInOut',
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: 'reverse',
                }
          }
        >
          <Image src={imageSrc} alt={imageAlt} fill priority={priority} sizes="100vw" />
        </S.Media>
      </S.MediaClip>
      {hasContent ? <S.Scrim $compact={compact} /> : null}
      <S.Grain aria-hidden />
      <S.Sweep aria-hidden />
      {hasContent ? (
        <S.Content
          variants={reduce ? undefined : container}
          initial={reduce ? false : 'hidden'}
          animate={reduce ? false : 'visible'}
        >
          {eyebrow ? (
            <motion.div variants={reduce ? undefined : item}>
              <S.Eyebrow>
                <Text size="sm" tone="accent" uppercase letterSpacing="wider" align="center">
                  {eyebrow}
                </Text>
              </S.Eyebrow>
            </motion.div>
          ) : null}
          {title ? (
            <Text
              as="h1"
              size={compact ? undefined : 'hero'}
              tone="inverse"
              align="center"
              uppercase
              letterSpacing={compact ? 'wider' : 'wide'}
              lineHeight="tight"
            >
              <KineticHeading text={title} delay={0.25} />
            </Text>
          ) : null}
          {subtitle ? (
            <motion.div variants={reduce ? undefined : item}>
              <Text as="p" size="lg" tone="inverse" align="center">
                {subtitle}
              </Text>
            </motion.div>
          ) : null}
          {children ? (
            <motion.div variants={reduce ? undefined : item}>{children}</motion.div>
          ) : null}
        </S.Content>
      ) : null}
    </S.Root>
  );
}
