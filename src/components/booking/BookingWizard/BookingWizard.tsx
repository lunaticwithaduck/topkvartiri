'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { type DefaultValues, FormProvider, useForm } from 'react-hook-form';
import { Button } from '@/design/Button/Button';
import { Text } from '@/design/Text/Text';
import {
  ACCOMMODATION_IDS,
  type AccommodationId,
  nightsBetween,
  priceBreakdown,
} from '@/lib/booking/data';
import { type BookingValues, bookingSchema, STEP_FIELDS, searchSchema } from '@/lib/booking/schema';
import S from './BookingWizard.styles';
import { PriceSummary } from './PriceSummary';
import { StepsNav } from './StepsNav';
import { StepConfirm } from './steps/StepConfirm';
import { StepDates } from './steps/StepDates';
import { StepExtras } from './steps/StepExtras';
import { StepRoom } from './steps/StepRoom';
import { StepSuccess } from './steps/StepSuccess';

const STEP_KEYS = ['dates', 'room', 'extras', 'confirm'] as const;

type Confirmation = { reference: string; total: number; email: string };

export function BookingWizard() {
  const t = useTranslations('Booking');
  const sp = useSearchParams();
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  const [confirmation, setConfirmation] = useState<Confirmation | null>(null);

  const accParam = sp.get('accommodation');
  const accommodation: AccommodationId = (ACCOMMODATION_IDS as readonly string[]).includes(
    accParam ?? '',
  )
    ? (accParam as AccommodationId)
    : ACCOMMODATION_IDS[0];
  const toInt = (value: string | null, fallback: number, min: number) => {
    const n = Number(value);
    return Number.isInteger(n) && n >= min ? n : fallback;
  };

  const defaultValues: DefaultValues<BookingValues> = {
    accommodation,
    arrival: sp.get('arrival') ?? '',
    departure: sp.get('departure') ?? '',
    adults: toInt(sp.get('adults'), 2, 1),
    children: toInt(sp.get('children'), 0, 0),
    roomId: accommodation,
    extras: [],
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    notes: '',
  };

  const methods = useForm<BookingValues>({
    resolver: zodResolver(bookingSchema),
    mode: 'onTouched',
    defaultValues,
  });

  const goNext = () => {
    const key = STEP_KEYS[step];
    // The zodResolver validates the whole bookingSchema, so trigger()'s boolean
    // reflects the entire form (later steps are still empty). Gate the dates step
    // on its own slice via searchSchema; room/extras are always valid (defaulted).
    if (key === 'dates') {
      const v = methods.getValues();
      const result = searchSchema.safeParse({
        accommodation: v.accommodation,
        arrival: v.arrival,
        departure: v.departure,
        adults: v.adults,
        children: v.children,
      });
      methods.clearErrors([...STEP_FIELDS.dates]);
      if (!result.success) {
        for (const issue of result.error.issues) {
          const field = issue.path[0];
          if (typeof field === 'string') {
            methods.setError(field as keyof BookingValues, { message: issue.message });
          }
        }
        return;
      }
    }
    setStep((s) => Math.min(STEP_KEYS.length - 1, s + 1));
  };

  const goBack = () => setStep((s) => Math.max(0, s - 1));

  const onValid = (values: BookingValues) => {
    const nights = nightsBetween(values.arrival, values.departure);
    const { total } = priceBreakdown(values.roomId, values.extras, nights);
    const reference = `TK-${Date.now().toString(36).toUpperCase().slice(-6)}`;
    setConfirmation({ reference, total, email: values.email });
  };

  if (confirmation) {
    return (
      <S.Root>
        <StepSuccess
          reference={confirmation.reference}
          total={confirmation.total}
          email={confirmation.email}
        />
      </S.Root>
    );
  }

  const stepKey = STEP_KEYS[step];
  const isLast = step === STEP_KEYS.length - 1;

  return (
    <S.Root>
      <FormProvider {...methods}>
        <S.Form onSubmit={methods.handleSubmit(onValid)} noValidate>
          <StepsNav current={step} />
          <S.Body>
            <S.Main>
              <S.Heading>
                <Text as="h2" size="3xl">
                  {t(`steps.${stepKey}`)}
                </Text>
                <Text tone="muted">{t(`stepHints.${stepKey}`)}</Text>
              </S.Heading>

              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={reduce ? false : { opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={reduce ? undefined : { opacity: 0, x: -16 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                >
                  {step === 0 ? <StepDates /> : null}
                  {step === 1 ? <StepRoom /> : null}
                  {step === 2 ? <StepExtras /> : null}
                  {step === 3 ? <StepConfirm /> : null}
                </motion.div>
              </AnimatePresence>

              <S.Actions>
                {step > 0 ? (
                  <Button variant="secondary" type="button" onClick={goBack}>
                    {t('actions.back')}
                  </Button>
                ) : (
                  <S.Spacer />
                )}
                {isLast ? (
                  <Button type="submit">{t('actions.confirm')}</Button>
                ) : (
                  <Button type="button" onClick={goNext}>
                    {t('actions.next')}
                  </Button>
                )}
              </S.Actions>
            </S.Main>

            <S.Aside>
              <PriceSummary />
            </S.Aside>
          </S.Body>
        </S.Form>
      </FormProvider>
    </S.Root>
  );
}
