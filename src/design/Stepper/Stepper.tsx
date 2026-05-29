'use client';

import S from './Stepper.styles';

type StepperProps = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  ariaLabel?: string;
  decreaseLabel?: string;
  increaseLabel?: string;
};

export function Stepper({
  value,
  onChange,
  min = 0,
  max = 20,
  ariaLabel,
  decreaseLabel = 'decrease',
  increaseLabel = 'increase',
}: StepperProps) {
  return (
    <S.Root role="group" aria-label={ariaLabel}>
      <S.Btn
        type="button"
        aria-label={decreaseLabel}
        disabled={value <= min}
        onClick={() => onChange(Math.max(min, value - 1))}
      >
        −
      </S.Btn>
      <S.Value aria-live="polite">{value}</S.Value>
      <S.Btn
        type="button"
        aria-label={increaseLabel}
        disabled={value >= max}
        onClick={() => onChange(Math.min(max, value + 1))}
      >
        +
      </S.Btn>
    </S.Root>
  );
}
