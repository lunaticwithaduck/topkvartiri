'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { type ReactNode, useRef } from 'react';

type ParallaxProps = {
  children: ReactNode;
  /** Vertical travel as a fraction of the element's own height (0.06 = ±6%). */
  amount?: number;
  className?: string;
};

// Subtle scroll parallax: the element drifts vertically as it passes through
// the viewport. Pair with an overflow-hidden frame whose inner layer overshoots
// the frame (e.g. inset: -9%) so the drift never reveals an edge. No-ops under
// reduced-motion.
export function Parallax({ children, amount = 0.06, className }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const pct = amount * 100;
  const y = useTransform(scrollYProgress, [0, 1], [`-${pct}%`, `${pct}%`]);

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div ref={ref} className={className} style={{ y }}>
      {children}
    </motion.div>
  );
}
