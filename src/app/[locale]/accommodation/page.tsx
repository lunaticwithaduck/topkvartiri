import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Hero } from '@/components/sections/Hero/Hero';
import { ImageTextBand } from '@/components/sections/ImageTextBand/ImageTextBand';

export default async function AccommodationPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Accommodation');

  return (
    <>
      <Hero
        imageSrc="/img/hero-accommodation.jpg"
        imageAlt={t('heroAlt')}
        title={t('heroTitle')}
        compact
      />

      <ImageTextBand
        title={t('maisonetteTitle')}
        body={t('maisonetteBody')}
        images={[
          { src: '/img/maisonette-1.jpg', alt: t('maisonetteImage1Alt') },
          { src: '/img/maisonette-2.jpg', alt: t('maisonetteImage2Alt') },
        ]}
        cta={{ label: t('viewMore'), href: '/accommodation/maisonette' }}
      />

      <ImageTextBand
        reverse
        title={t('studioTitle')}
        body={t('studioBody')}
        images={[
          { src: '/img/studio-1.jpg', alt: t('studioImage1Alt') },
          { src: '/img/studio-2.jpg', alt: t('studioImage2Alt') },
        ]}
        cta={{ label: t('viewMore'), href: '/accommodation/studio' }}
      />

      <ImageTextBand
        title={t('houseTitle')}
        body={t('houseBody')}
        images={[
          { src: '/img/house-1.jpg', alt: t('houseImage1Alt') },
          { src: '/img/house-2.jpg', alt: t('houseImage2Alt') },
        ]}
        cta={{ label: t('viewMore'), href: '/accommodation/house' }}
      />
    </>
  );
}
