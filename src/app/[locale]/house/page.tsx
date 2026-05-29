import { getTranslations, setRequestLocale } from 'next-intl/server';
import { EmbedFrame } from '@/components/sections/EmbedFrame/EmbedFrame';
import { Hero } from '@/components/sections/Hero/Hero';
import { PhotoMasonry } from '@/components/sections/PhotoMasonry/PhotoMasonry';
import { SectionHeader } from '@/components/sections/SectionHeader/SectionHeader';

const housePhotos = [
  'house-1.jpg',
  'house-2.jpg',
  'gallery-9.jpg',
  'gallery-10.jpg',
  'hero-house.jpg',
  'gallery-1.jpg',
].map((file, i) => ({ src: `/img/${file}`, alt: `House photo ${i + 1}` }));

export default async function HousePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('House');

  return (
    <>
      <Hero imageSrc="/img/hero-house.jpg" imageAlt={t('heroAlt')} compact />

      <SectionHeader title={t('title')} body={t('body')} showOrnament={false} />

      <SectionHeader title={t('virtualTitle')} />
      <EmbedFrame src="about:blank" title={t('virtualTitle')} aspectRatio="16 / 9" />

      <PhotoMasonry photos={housePhotos} columns={3} />
    </>
  );
}
