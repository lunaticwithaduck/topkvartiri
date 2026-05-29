import { getTranslations, setRequestLocale } from 'next-intl/server';
import { EmbedFrame } from '@/components/sections/EmbedFrame/EmbedFrame';
import { Hero } from '@/components/sections/Hero/Hero';
import { PhotoMasonry } from '@/components/sections/PhotoMasonry/PhotoMasonry';
import { SectionHeader } from '@/components/sections/SectionHeader/SectionHeader';

const ap105Photos = [
  'hero-ap105.jpg',
  'gallery-1.jpg',
  'gallery-2.jpg',
  'gallery-3.jpg',
  'gallery-4.jpg',
  'gallery-5.jpg',
].map((file, i) => ({ src: `/img/${file}`, alt: `Apartment 105 photo ${i + 1}` }));

export default async function Ap105Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Ap105');

  return (
    <>
      <Hero imageSrc="/img/hero-ap105.jpg" imageAlt={t('heroAlt')} compact />

      <SectionHeader title={t('title')} body={t('body')} showOrnament={false} />

      <SectionHeader title={t('virtualTitle')} />
      <EmbedFrame src="about:blank" title={t('virtualTitle')} aspectRatio="16 / 9" />

      <PhotoMasonry photos={ap105Photos} columns={3} />
    </>
  );
}
