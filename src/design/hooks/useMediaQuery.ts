'use client';

import { useEffect, useState } from 'react';
import { type Breakpoint, breakpoints } from '../tokens/breakpoints';

/**
 * SSR-safe media query hook.
 * Returns `false` during SSR and on first render, then syncs with `matchMedia`.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    setMatches(mql.matches);

    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, [query]);

  return matches;
}

/**
 * Returns `true` when the viewport is at or above the given breakpoint.
 */
export function useBreakpoint(breakpoint: Breakpoint): boolean {
  return useMediaQuery(`(min-width: ${breakpoints[breakpoint]})`);
}
