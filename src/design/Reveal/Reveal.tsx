'use client';

import { motion, useReducedMotion, type Variants } from 'motion/react';
import type { ReactNode } from 'react';
import { animation } from '../tokens/motion';

type RevealProps = {
  children: ReactNode;
  /** Delay before the reveal begins, in seconds. */
  delay?: number;
  /** Vertical travel distance in px (defaults to the reveal token). */
  y?: number;
  /** Fraction of the element that must be visible before it fires (0–1). */
  amount?: number;
  className?: string;
};

const VIEWPORT = { once: true, amount: 0.2 } as const;

// Fade-and-rise on scroll into view. Fires once. When the OS prefers reduced
// motion, renders a plain wrapper with no transform or opacity animation.
export function Reveal({ children, delay = 0, y, amount, className }: RevealProps) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  const variants: Variants = {
    hidden: { opacity: 0, y: y ?? animation.reveal.distance },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: animation.duration.slow, ease: animation.ease.entrance, delay },
    },
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={amount ? { once: true, amount } : VIEWPORT}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}

type StaggerProps = {
  children: ReactNode;
  /** Gap between each child's reveal, in seconds. */
  gap?: number;
  delay?: number;
  amount?: number;
  className?: string;
};

// Orchestrates a sequence of <Reveal.Item> children: each rises in turn once
// the container scrolls into view. Reduced motion renders a plain wrapper.
export function Stagger({ children, gap = 0.12, delay = 0, amount, className }: StaggerProps) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  const variants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: gap, delayChildren: delay } },
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={amount ? { once: true, amount } : VIEWPORT}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}

type StaggerItemProps = {
  children: ReactNode;
  y?: number;
  className?: string;
};

// A single member of a <Stagger>. Inherits the orchestration from its parent
// (no own initial/animate), so it only carries the per-item variants.
export function StaggerItem({ children, y, className }: StaggerItemProps) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  const variants: Variants = {
    hidden: { opacity: 0, y: y ?? animation.reveal.distance },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: animation.duration.base, ease: animation.ease.entrance },
    },
  };

  return (
    <motion.div className={className} variants={variants}>
      {children}
    </motion.div>
  );
}
