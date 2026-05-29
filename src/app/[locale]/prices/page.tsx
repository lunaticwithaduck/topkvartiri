import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Hero } from '@/components/sections/Hero/Hero';
import { PricingTable } from '@/components/sections/PricingTable/PricingTable';
import { SectionHeader } from '@/components/sections/SectionHeader/SectionHeader';

export default async function PricesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Prices');

  return (
    <>
      <Hero imageSrc="/img/hero-prices.jpg" imageAlt={t('heroAlt')} compact />

      <SectionHeader title={t('regularTitle')} body={t('regularBody')} />
      <PricingTable
        cards={[
          {
            title: t('regular.maisonetteTitle'),
            priceLabel: t('regular.maisonettePrice'),
            priceNote: t('regular.maisonetteNote'),
            features: [t('regular.maisonetteFeature1'), t('regular.maisonetteFeature2')],
          },
          {
            title: t('regular.studioTitle'),
            priceLabel: t('regular.studioPrice'),
            priceNote: t('regular.studioNote'),
            features: [t('regular.studioFeature1'), t('regular.studioFeature2')],
          },
          {
            title: t('regular.houseTitle'),
            priceLabel: t('regular.housePrice'),
            priceNote: t('regular.houseNote'),
            features: [t('regular.houseFeature1'), t('regular.houseFeature2')],
          },
        ]}
      />

      <SectionHeader title={t('longStayTitle')} body={t('longStayBody')} />
      <PricingTable
        cards={[
          {
            title: t('longStay.maisonetteTitle'),
            priceLabel: t('longStay.maisonettePrice'),
            priceNote: t('longStay.maisonetteNote'),
            features: [t('longStay.maisonetteFeature1'), t('longStay.maisonetteFeature2')],
          },
          {
            title: t('longStay.studioTitle'),
            priceLabel: t('longStay.studioPrice'),
            priceNote: t('longStay.studioNote'),
            features: [t('longStay.studioFeature1'), t('longStay.studioFeature2')],
          },
          {
            title: t('longStay.houseTitle'),
            priceLabel: t('longStay.housePrice'),
            priceNote: t('longStay.houseNote'),
            features: [t('longStay.houseFeature1'), t('longStay.houseFeature2')],
          },
        ]}
      />
    </>
  );
}
