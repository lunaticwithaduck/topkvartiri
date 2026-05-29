'use client';

import { useTranslations } from 'next-intl';
import { Text } from '@/design/Text/Text';
import S from './StepsNav.styles';

const STEP_KEYS = ['dates', 'room', 'extras', 'confirm'] as const;

export function StepsNav({ current }: { current: number }) {
  const t = useTranslations('Booking');

  return (
    <S.Root aria-label={t('stepsLabel')}>
      {STEP_KEYS.map((key, i) => (
        <S.Item key={key} aria-current={i === current ? 'step' : undefined}>
          <S.Bar>
            <S.Fill $on={i <= current} />
          </S.Bar>
          <Text
            size="xs"
            uppercase
            letterSpacing="wider"
            tone={i === current ? 'accent' : i < current ? 'default' : 'muted'}
          >
            {`${i + 1}. ${t(`steps.${key}`)}`}
          </Text>
        </S.Item>
      ))}
    </S.Root>
  );
}
