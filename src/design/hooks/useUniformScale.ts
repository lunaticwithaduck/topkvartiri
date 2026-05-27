'use client';

import { useEffect, useState } from 'react';
import { breakpoints } from '../tokens/breakpoints';
import { designResolution } from '../tokens/designResolution';

const MD_BREAKPOINT = Number.parseInt(breakpoints.md, 10);

function computeScale(width: number, height: number): number | null {
  if (width >= MD_BREAKPOINT) return null;
  return Math.min(width / designResolution.width, height / designResolution.height);
}

/**
 * Returns a uniform scale factor for mobile viewports based on the design
 * resolution (see src/design/tokens/designResolution.ts). Returns `null` at md
 * (768px) and above — scaling is disabled on larger screens and layouts flow
 * responsively from there.
 */
export function useUniformScale(): number | null {
  const [scale, setScale] = useState<number | null>(null);

  useEffect(() => {
    function update() {
      setScale(computeScale(window.innerWidth, window.innerHeight));
    }

    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return scale;
}
