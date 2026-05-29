'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/design/Button/Button';
import { Text } from '@/design/Text/Text';
import { formatPrice } from '@/lib/booking/data';
import S from './StepSuccess.styles';

type StepSuccessProps = {
  reference: string;
  total: number;
  email: string;
};

export function StepSuccess({ reference, total, email }: StepSuccessProps) {
  const t = useTranslations('Booking');

  return (
    <S.Root>
      <S.Badge aria-hidden="true">✓</S.Badge>
      <Text as="h1" size="3xl">
        {t('success.title')}
      </Text>
      <Text tone="muted">{t('success.body', { email })}</Text>
      <S.Ref>
        <Text size="sm" tone="muted" uppercase letterSpacing="wider">
          {t('success.reference')}
        </Text>
        <Text size="xl" weight="medium">
          {reference}
        </Text>
      </S.Ref>
      <Text weight="medium">{t('success.total', { price: formatPrice(total) })}</Text>
      <Button href="/">{t('success.home')}</Button>
    </S.Root>
  );
}
