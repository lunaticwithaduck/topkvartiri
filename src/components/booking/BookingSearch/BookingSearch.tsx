'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useId, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button } from '@/design/Button/Button';
import { DateRangeField } from '@/design/DateRangeField/DateRangeField';
import { Field } from '@/design/Field/Field';
import { Select } from '@/design/Select/Select';
import { Stepper } from '@/design/Stepper/Stepper';
import { Text } from '@/design/Text/Text';
import { useRouter } from '@/i18n/navigation';
import { ACCOMMODATION_IDS } from '@/lib/booking/data';
import { validationKey } from '@/lib/booking/errors';
import { type SearchValues, searchSchema } from '@/lib/booking/schema';
import S from './BookingSearch.styles';

export function BookingSearch() {
  const t = useTranslations('BookingSearch');
  const tb = useTranslations('Booking');
  const router = useRouter();
  const ids = useId();
  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<SearchValues>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      accommodation: ACCOMMODATION_IDS[0],
      arrival: '',
      departure: '',
      adults: 2,
      children: 0,
    },
  });

  const arrival = watch('arrival');
  const departure = watch('departure');
  const dateError = errors.departure
    ? t(`validation.${validationKey('departure', errors.departure.message)}`)
    : errors.arrival
      ? t(`validation.${validationKey('arrival', errors.arrival.message)}`)
      : undefined;

  const onSubmit = (values: SearchValues) => {
    const params = new URLSearchParams({
      accommodation: values.accommodation,
      arrival: values.arrival,
      departure: values.departure,
      adults: String(values.adults),
      children: String(values.children),
    });
    router.push(`/book?${params.toString()}`);
  };

  return (
    <S.Form onSubmit={handleSubmit(onSubmit)} noValidate aria-label={t('formLabel')}>
      <Field label={t('accommodation')} htmlFor={`${ids}-acc`}>
        <Select id={`${ids}-acc`} invalid={!!errors.accommodation} {...register('accommodation')}>
          {ACCOMMODATION_IDS.map((id) => (
            <option key={id} value={id}>
              {tb(`rooms.${id}.name`)}
            </option>
          ))}
        </Select>
      </Field>

      <Field label={t('dates')} error={dateError}>
        <DateRangeField
          from={arrival}
          to={departure}
          minDate={today}
          invalid={!!(errors.arrival || errors.departure)}
          placeholder={t('datesPlaceholder')}
          onChange={({ from, to }) => {
            setValue('arrival', from ?? '', { shouldValidate: true, shouldDirty: true });
            setValue('departure', to ?? '', { shouldValidate: true, shouldDirty: true });
          }}
        />
      </Field>

      <Field label={t('guests')}>
        <S.Guests>
          <S.GuestCell>
            <Text as="span" size="xs" tone="muted">
              {t('adults')}
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
                  ariaLabel={t('adults')}
                  decreaseLabel={t('decrease')}
                  increaseLabel={t('increase')}
                />
              )}
            />
          </S.GuestCell>
          <S.GuestCell>
            <Text as="span" size="xs" tone="muted">
              {t('children')}
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
                  ariaLabel={t('children')}
                  decreaseLabel={t('decrease')}
                  increaseLabel={t('increase')}
                />
              )}
            />
          </S.GuestCell>
        </S.Guests>
      </Field>

      <S.Submit>
        <Button type="submit">{t('reserve')}</Button>
      </S.Submit>
    </S.Form>
  );
}
