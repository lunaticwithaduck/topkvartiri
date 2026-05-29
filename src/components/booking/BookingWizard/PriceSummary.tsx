'use client';

import { useTranslations } from 'next-intl';
import { useFormContext, useWatch } from 'react-hook-form';
import { Text } from '@/design/Text/Text';
import { formatPrice, getAccommodation, nightsBetween, priceBreakdown } from '@/lib/booking/data';
import type { BookingValues } from '@/lib/booking/schema';
import S from './PriceSummary.styles';

export function PriceSummary() {
  const t = useTranslations('Booking');
  const { control } = useFormContext<BookingValues>();
  const [roomId, extras, arrival, departure, adults, children] = useWatch({
    control,
    name: ['roomId', 'extras', 'arrival', 'departure', 'adults', 'children'],
  });

  const nights = nightsBetween(arrival, departure);
  const selectedExtras = extras ?? [];
  const { roomTotal, extrasTotal, total } = priceBreakdown(roomId, selectedExtras, nights);
  const room = getAccommodation(roomId);

  return (
    <S.Root>
      <Text as="h2" size="lg" weight="medium">
        {t('summary.title')}
      </Text>

      <S.Row>
        <Text size="sm" tone="muted">
          {t('summary.accommodation')}
        </Text>
        <Text size="sm">{room ? t(`rooms.${room.id}.name`) : '—'}</Text>
      </S.Row>

      <S.Row>
        <Text size="sm" tone="muted">
          {t('summary.dates')}
        </Text>
        <Text size="sm">{arrival && departure ? `${arrival} → ${departure}` : '—'}</Text>
      </S.Row>

      <S.Row>
        <Text size="sm" tone="muted">
          {t('summary.guests')}
        </Text>
        <Text size="sm">{t('summary.guestsValue', { adults, children })}</Text>
      </S.Row>

      <S.Divider />

      <S.Row>
        <Text size="sm" tone="muted">
          {t('summary.nights', { nights })}
        </Text>
        <Text size="sm">{formatPrice(roomTotal)}</Text>
      </S.Row>

      {extrasTotal > 0 ? (
        <S.Row>
          <Text size="sm" tone="muted">
            {t('summary.extras')}
          </Text>
          <Text size="sm">{formatPrice(extrasTotal)}</Text>
        </S.Row>
      ) : null}

      <S.Divider />

      <S.Row>
        <Text weight="medium">{t('summary.total')}</Text>
        <Text weight="semibold" tone="accent">
          {formatPrice(total)}
        </Text>
      </S.Row>
    </S.Root>
  );
}
