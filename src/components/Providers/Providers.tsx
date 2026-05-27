'use client';

import type { ReactNode } from 'react';
import { EmotionRegistry } from '@/design/theme/EmotionRegistry';
import { StoreProvider } from '@/store/StoreProvider';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <StoreProvider>
      <EmotionRegistry>{children}</EmotionRegistry>
    </StoreProvider>
  );
}
