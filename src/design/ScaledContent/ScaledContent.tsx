'use client';

import type { ReactNode } from 'react';
import { useUniformScale } from '../hooks/useUniformScale';
import { designResolution } from '../tokens/designResolution';
import S from './ScaledContent.styles';

interface ScaledContentProps {
  children: ReactNode;
}

/**
 * Wraps main content and applies uniform scaling on mobile viewports.
 * At md (768px) and above, renders children without any transform.
 *
 * On mobile, the content is rendered at the design resolution (375x812)
 * and scaled to fit the viewport, centered with letterboxing.
 */
export function ScaledContent({ children }: ScaledContentProps) {
  const scale = useUniformScale();

  if (scale === null) {
    return <>{children}</>;
  }

  return (
    <S.Wrapper>
      <S.Canvas
        style={{
          width: designResolution.width,
          height: designResolution.height,
          transform: `scale(${scale})`,
        }}
      >
        {children}
      </S.Canvas>
    </S.Wrapper>
  );
}
