'use client';

import { useReducedMotion } from 'motion/react';
import { useEffect, useRef } from 'react';
import type WebGLFluidEnhanced from 'webgl-fluid-enhanced';

type FluidBackgroundProps = {
  /** Hex colours the fluid dye is tinted with. */
  palette?: string[];
  className?: string;
};

const DEFAULT_PALETTE = ['#bb9b69', '#d8b87a', '#3a5696', '#e2ecff'];

// A real Navier–Stokes WebGL fluid simulation (webgl-fluid-enhanced) used as a
// reactive background: it drifts ambiently and swirls toward the cursor. Guards:
// the sim only runs while on-screen (IntersectionObserver start/stop — the only
// true way to idle its render loop), never starts under reduced motion, and is
// loaded via dynamic import so it never touches WebGL during SSR.
export function FluidBackground({ palette = DEFAULT_PALETTE, className }: FluidBackgroundProps) {
  // The lib hard-sets its container to `position: relative; display: flex` via
  // inline styles and never gives it a height, so its canvas (height: 100%)
  // collapses. We hand it an inner container sized 100% inside an outer wrapper
  // that actually has dimensions (positioned by `className`).
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const container = ref.current;
    if (!container) return;

    let sim: WebGLFluidEnhanced | null = null;
    let io: IntersectionObserver | null = null;
    let ambient: ReturnType<typeof setInterval> | null = null;
    let cancelled = false;

    const stopAmbient = () => {
      if (ambient) {
        clearInterval(ambient);
        ambient = null;
      }
    };

    import('webgl-fluid-enhanced')
      .then((mod) => {
        if (cancelled || !ref.current) return;
        try {
          sim = new mod.default(container);
          sim.setConfig({
            simResolution: 96,
            dyeResolution: 640,
            densityDissipation: 0.78,
            velocityDissipation: 0.5,
            pressure: 0.8,
            pressureIterations: 18,
            curl: 18,
            splatRadius: 0.26,
            splatForce: 5600,
            colorful: false,
            colorPalette: palette,
            hover: true,
            transparent: true,
            brightness: 0.6,
            bloom: false,
            sunrays: false,
            shading: true,
          });
        } catch {
          sim = null;
          return; // WebGL unavailable — leave the plain navy card
        }

        let running = false;
        io = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting && !running) {
              running = true;
              sim?.start();
              sim?.multipleSplats(10);
              if (!ambient) ambient = setInterval(() => sim?.multipleSplats(1), 1700);
            } else if (!entry.isIntersecting && running) {
              running = false;
              sim?.stop();
              stopAmbient();
            }
          },
          { threshold: 0 },
        );
        io.observe(container);
      })
      .catch(() => {});

    return () => {
      cancelled = true;
      io?.disconnect();
      stopAmbient();
      sim?.stop();
    };
  }, [reduce, palette]);

  return (
    <div className={className} aria-hidden>
      <div ref={ref} style={{ width: '100%', height: '100%' }} />
    </div>
  );
}
