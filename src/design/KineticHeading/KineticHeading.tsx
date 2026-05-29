'use client';

import { motion, useReducedMotion, type Variants } from 'motion/react';
import { animation } from '../tokens/motion';
import S from './KineticHeading.styles';

type KineticHeadingProps = {
  text: string;
  className?: string;
  /** Delay before the word cascade begins, in seconds. */
  delay?: number;
};

// Splits a heading into words and reveals each from a clipping mask in sequence.
// Inherits its type styling from the parent (e.g. a <Text as="h1">). No-ops to
// plain text under reduced motion.
export function KineticHeading({ text, className, delay = 0 }: KineticHeadingProps) {
  const reduce = useReducedMotion();
  const words = text.split(' ');

  if (reduce) return <span className={className}>{text}</span>;

  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.09, delayChildren: delay } },
  };
  const word: Variants = {
    hidden: { y: '115%' },
    visible: {
      y: '0%',
      transition: { duration: animation.duration.slow, ease: animation.ease.entrance },
    },
  };

  return (
    <motion.span
      className={className}
      variants={container}
      initial="hidden"
      animate="visible"
      aria-label={text}
    >
      {words.map((w, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: static word list, never reordered
        <span key={i} aria-hidden>
          <S.Mask>
            <S.Word variants={word}>{w}</S.Word>
          </S.Mask>
          {i < words.length - 1 ? ' ' : null}
        </span>
      ))}
    </motion.span>
  );
}
