'use client';

import type { ReactNode } from 'react';
import { EmotionRegistry } from '@/lib/emotion/EmotionRegistry';
import { StoreProvider } from '@/lib/redux/StoreProvider';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <StoreProvider>
      <EmotionRegistry>{children}</EmotionRegistry>
    </StoreProvider>
  );
}
