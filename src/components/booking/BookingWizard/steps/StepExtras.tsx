'use client';

import { useTranslations } from 'next-intl';
import { useFormContext } from 'react-hook-form';
import { Checkbox } from '@/design/Checkbox/Checkbox';
import { Text } from '@/design/Text/Text';
import { EXTRAS, formatPrice } from '@/lib/booking/data';
import type { BookingValues } from '@/lib/booking/schema';
import S from './StepExtras.styles';

export function StepExtras() {
  const t = useTranslations('Booking');
  const { register } = useFormContext<BookingValues>();

  return (
    <S.List>
      {EXTRAS.map((extra) => (
        <S.Item key={extra.id}>
          <Checkbox
            value={extra.id}
            {...register('extras')}
            label={
              <S.Info>
                <Text as="span" weight="medium">
                  {t(`extras.${extra.id}.name`)}
                </Text>
                <Text as="span" size="sm" tone="muted">
                  {t(`extras.${extra.id}.desc`)}
                </Text>
              </S.Info>
            }
          />
          <S.Price>
            <Text weight="medium" tone="accent">
              {extra.price > 0 ? formatPrice(extra.price) : t('extras.included')}
            </Text>
          </S.Price>
        </S.Item>
      ))}
    </S.List>
  );
}
