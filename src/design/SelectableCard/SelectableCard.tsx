'use client';

import type { ReactNode } from 'react';
import S from './SelectableCard.styles';

type SelectableCardProps = {
  selected: boolean;
  onSelect: () => void;
  ariaLabel?: string;
  children: ReactNode;
  className?: string;
};

export function SelectableCard({
  selected,
  onSelect,
  ariaLabel,
  children,
  className,
}: SelectableCardProps) {
  return (
    <S.Root
      type="button"
      aria-pressed={selected}
      aria-label={ariaLabel}
      onClick={onSelect}
      $selected={selected}
      className={className}
    >
      {children}
    </S.Root>
  );
}
