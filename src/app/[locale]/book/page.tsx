import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Suspense } from 'react';
import { BookingWizard } from '@/components/booking/BookingWizard/BookingWizard';
import { Hero } from '@/components/sections/Hero/Hero';

export default async function BookPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Booking');

  return (
    <>
      <Hero
        imageSrc="/img/hero-prices.jpg"
        imageAlt={t('pageTitle')}
        title={t('pageTitle')}
        subtitle={t('pageSubtitle')}
        compact
        priority
      />
      <Suspense>
        <BookingWizard />
      </Suspense>
    </>
  );
}
