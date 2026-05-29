'use client';

import { useTranslations } from 'next-intl';
import { useId, useMemo } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { DateRangeField } from '@/design/DateRangeField/DateRangeField';
import { Field } from '@/design/Field/Field';
import { Select } from '@/design/Select/Select';
import { Stepper } from '@/design/Stepper/Stepper';
import { Text } from '@/design/Text/Text';
import { ACCOMMODATION_IDS } from '@/lib/booking/data';
import { validationKey } from '@/lib/booking/errors';
import type { BookingValues } from '@/lib/booking/schema';
import S from './StepDates.styles';

export function StepDates() {
  const t = useTranslations('Booking');
  const ids = useId();
  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const {
    register,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<BookingValues>();

  const arrival = watch('arrival');
  const departure = watch('departure');
  const dateError = errors.departure
    ? t(`validation.${validationKey('departure', errors.departure.message)}`)
    : errors.arrival
      ? t(`validation.${validationKey('arrival', errors.arrival.message)}`)
      : undefined;

  return (
    <S.Grid>
      <Field label={t('fields.accommodation')} htmlFor={`${ids}-acc`}>
        <Select id={`${ids}-acc`} invalid={!!errors.accommodation} {...register('accommodation')}>
          {ACCOMMODATION_IDS.map((id) => (
            <option key={id} value={id}>
              {t(`rooms.${id}.name`)}
            </option>
          ))}
        </Select>
      </Field>

      <Field label={t('fields.guests')}>
        <S.Guests>
          <S.GuestCell>
            <Text as="span" size="xs" tone="muted">
              {t('fields.adults')}
            </Text>
            <Controller
              control={control}
              name="adults"
              render={({ field }) => (
                <Stepper
                  value={field.value}
                  onChange={field.onChange}
                  min={1}
                  max={10}
                  ariaLabel={t('fields.adults')}
                  decreaseLabel={t('decrease')}
                  increaseLabel={t('increase')}
                />
              )}
            />
          </S.GuestCell>
          <S.GuestCell>
            <Text as="span" size="xs" tone="muted">
              {t('fields.children')}
            </Text>
            <Controller
              control={control}
              name="children"
              render={({ field }) => (
                <Stepper
                  value={field.value}
                  onChange={field.onChange}
                  min={0}
                  max={10}
                  ariaLabel={t('fields.children')}
                  decreaseLabel={t('decrease')}
                  increaseLabel={t('increase')}
                />
              )}
            />
          </S.GuestCell>
        </S.Guests>
      </Field>

      <Field label={t('fields.dates')} error={dateError}>
        <DateRangeField
          from={arrival}
          to={departure}
          minDate={today}
          invalid={!!(errors.arrival || errors.departure)}
          placeholder={t('fields.datesPlaceholder')}
          onChange={({ from, to }) => {
            setValue('arrival', from ?? '', { shouldValidate: true, shouldDirty: true });
            setValue('departure', to ?? '', { shouldValidate: true, shouldDirty: true });
          }}
        />
      </Field>
    </S.Grid>
  );
}
