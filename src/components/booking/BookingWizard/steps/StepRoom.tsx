'use client';

import { useTranslations } from 'next-intl';
import { useFormContext } from 'react-hook-form';
import { Field } from '@/design/Field/Field';
import { Image } from '@/design/Image/Image';
import { SelectableCard } from '@/design/SelectableCard/SelectableCard';
import { Text } from '@/design/Text/Text';
import { Link } from '@/i18n/navigation';
import { ACCOMMODATIONS, formatPrice } from '@/lib/booking/data';
import type { BookingValues } from '@/lib/booking/schema';
import S from './StepRoom.styles';

export function StepRoom() {
  const t = useTranslations('Booking');
  const tDetail = useTranslations('AccommodationDetail');
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<BookingValues>();
  const selected = watch('roomId');

  return (
    <Field error={errors.roomId ? t('validation.selectRoom') : undefined}>
      <S.Grid>
        {ACCOMMODATIONS.map((room) => (
          <S.Cell key={room.id}>
            <SelectableCard
              selected={selected === room.id}
              onSelect={() => setValue('roomId', room.id, { shouldValidate: true })}
              ariaLabel={t(`rooms.${room.id}.name`)}
            >
              <S.Media>
                <Image
                  src={room.image}
                  alt={t(`rooms.${room.id}.name`)}
                  fill
                  sizes="(min-width: 768px) 30vw, 100vw"
                />
              </S.Media>
              <S.Body>
                <Text as="h3" size="xl">
                  {t(`rooms.${room.id}.name`)}
                </Text>
                <Text size="sm" tone="muted">
                  {t(`rooms.${room.id}.desc`)}
                </Text>
                <S.PriceRow>
                  <Text size="sm" tone="muted">
                    {t('room.capacity', { count: room.capacity })}
                  </Text>
                  <Text weight="medium" tone="accent">
                    {t('room.perNight', { price: formatPrice(room.pricePerNight) })}
                  </Text>
                </S.PriceRow>
              </S.Body>
            </SelectableCard>
            <Link href={`/accommodation/${room.id}`}>
              <S.DetailsLink as="span">{tDetail('viewDetails')}</S.DetailsLink>
            </Link>
          </S.Cell>
        ))}
      </S.Grid>
    </Field>
  );
}
