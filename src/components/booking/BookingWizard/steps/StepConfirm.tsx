'use client';

import { useTranslations } from 'next-intl';
import { useId } from 'react';
import { useFormContext } from 'react-hook-form';
import { Checkbox } from '@/design/Checkbox/Checkbox';
import { Field } from '@/design/Field/Field';
import { Input } from '@/design/Input/Input';
import { Select } from '@/design/Select/Select';
import { Textarea } from '@/design/Textarea/Textarea';
import { validationKey } from '@/lib/booking/errors';
import type { BookingValues } from '@/lib/booking/schema';
import S from './StepConfirm.styles';

const COUNTRY_CODES = ['BG', 'RU', 'GB', 'DE', 'GR', 'RO', 'OTHER'] as const;

export function StepConfirm() {
  const t = useTranslations('Booking');
  const ids = useId();
  const {
    register,
    formState: { errors },
  } = useFormContext<BookingValues>();

  const fieldError = (name: keyof BookingValues) => {
    const e = errors[name] as { message?: string } | undefined;
    return e ? t(`validation.${validationKey(name, e.message)}`) : undefined;
  };

  return (
    <S.Grid>
      <Field
        label={t('fields.firstName')}
        htmlFor={`${ids}-fn`}
        required
        error={fieldError('firstName')}
      >
        <Input
          id={`${ids}-fn`}
          autoComplete="given-name"
          invalid={!!errors.firstName}
          {...register('firstName')}
        />
      </Field>

      <Field
        label={t('fields.lastName')}
        htmlFor={`${ids}-ln`}
        required
        error={fieldError('lastName')}
      >
        <Input
          id={`${ids}-ln`}
          autoComplete="family-name"
          invalid={!!errors.lastName}
          {...register('lastName')}
        />
      </Field>

      <S.Full>
        <Field label={t('fields.email')} htmlFor={`${ids}-em`} required error={fieldError('email')}>
          <Input
            id={`${ids}-em`}
            type="email"
            autoComplete="email"
            invalid={!!errors.email}
            {...register('email')}
          />
        </Field>
      </S.Full>

      <Field label={t('fields.phone')} htmlFor={`${ids}-ph`} required error={fieldError('phone')}>
        <Input
          id={`${ids}-ph`}
          type="tel"
          autoComplete="tel"
          invalid={!!errors.phone}
          {...register('phone')}
        />
      </Field>

      <Field
        label={t('fields.country')}
        htmlFor={`${ids}-co`}
        required
        error={fieldError('country')}
      >
        <Select
          id={`${ids}-co`}
          defaultValue=""
          invalid={!!errors.country}
          {...register('country')}
        >
          <option value="" disabled>
            {t('fields.countryPlaceholder')}
          </option>
          {COUNTRY_CODES.map((code) => (
            <option key={code} value={code}>
              {t(`countries.${code}`)}
            </option>
          ))}
        </Select>
      </Field>

      <S.Full>
        <Field label={t('fields.notes')} htmlFor={`${ids}-no`} hint={t('fields.notesHint')}>
          <Textarea id={`${ids}-no`} {...register('notes')} />
        </Field>
      </S.Full>

      <S.Full>
        <Field error={errors.consent ? t('validation.consent') : undefined}>
          <Checkbox {...register('consent')} label={t('fields.consent')} />
        </Field>
      </S.Full>
    </S.Grid>
  );
}
