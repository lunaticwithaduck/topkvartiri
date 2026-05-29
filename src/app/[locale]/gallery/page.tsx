import { getTranslations, setRequestLocale } from 'next-intl/server';
import { EmbedFrame } from '@/components/sections/EmbedFrame/EmbedFrame';
import { Hero } from '@/components/sections/Hero/Hero';
import { PhotoMasonry } from '@/components/sections/PhotoMasonry/PhotoMasonry';
import { SectionHeader } from '@/components/sections/SectionHeader/SectionHeader';

const galleryPhotos = Array.from({ length: 10 }, (_, i) => ({
  src: `/img/gallery-${i + 1}.jpg`,
  alt: `Gallery photo ${i + 1}`,
}));

export default async function GalleryPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Gallery');

  return (
    <>
      <Hero imageSrc="/img/hero-gallery.jpg" imageAlt={t('heroAlt')} compact />

      <SectionHeader title={t('photosTitle')} />
      <PhotoMasonry photos={galleryPhotos} columns={4} />

      <SectionHeader title={t('virtualTitle')} />
      <EmbedFrame src="about:blank" title={t('virtualTitle')} aspectRatio="16 / 9" />

      <SectionHeader title={t('videoTitle')} />
      <EmbedFrame src="about:blank" title={t('videoTitle')} aspectRatio="16 / 9" />
    </>
  );
}
