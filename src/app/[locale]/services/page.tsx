import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Hero } from '@/components/sections/Hero/Hero';
import { ImageGridBand } from '@/components/sections/ImageGridBand/ImageGridBand';
import { ImageTextBand } from '@/components/sections/ImageTextBand/ImageTextBand';
import { SectionHeader } from '@/components/sections/SectionHeader/SectionHeader';
import { TileGrid } from '@/components/sections/TileGrid/TileGrid';

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Services');

  return (
    <>
      <Hero imageSrc="/img/hero-services.jpg" imageAlt={t('heroAlt')} compact />

      <ImageTextBand
        title={t('restaurantsTitle')}
        body={t('restaurantsBody')}
        images={[{ src: '/img/restaurant.jpg', alt: t('restaurantsImageAlt') }]}
      />

      <ImageTextBand
        reverse
        title={t('barsTitle')}
        body={t('barsBody')}
        images={[{ src: '/img/bar.jpg', alt: t('barsImageAlt') }]}
      />

      <SectionHeader title={t('eventsTitle')} body={t('eventsBody')} />
      <ImageGridBand
        columns={3}
        tiles={[
          {
            title: t('events.weddingsTitle'),
            body: t('events.weddingsBody'),
            imageSrc: '/img/event-wedding.jpg',
            imageAlt: t('events.weddingsAlt'),
          },
          {
            title: t('events.corporateTitle'),
            body: t('events.corporateBody'),
            imageSrc: '/img/event-corporate.jpg',
            imageAlt: t('events.corporateAlt'),
          },
          {
            title: t('events.privateTitle'),
            body: t('events.privateBody'),
            imageSrc: '/img/event-private.jpg',
            imageAlt: t('events.privateAlt'),
          },
        ]}
      />

      <SectionHeader title={t('amenitiesTitle')} />
      <TileGrid
        columns={4}
        tiles={[
          {
            caption: t('amenities.outdoorPoolCaption'),
            imageSrc: '/img/amenity-pool.jpg',
            imageAlt: t('amenities.outdoorPoolAlt'),
          },
          {
            caption: t('amenities.golfCaption'),
            imageSrc: '/img/amenity-golf.jpg',
            imageAlt: t('amenities.golfAlt'),
          },
          {
            caption: t('amenities.wellnessCaption'),
            imageSrc: '/img/amenity-wellness.jpg',
            imageAlt: t('amenities.wellnessAlt'),
          },
          {
            caption: t('amenities.indoorPoolCaption'),
            imageSrc: '/img/amenity-pool.jpg',
            imageAlt: t('amenities.indoorPoolAlt'),
          },
          {
            caption: t('amenities.kidsCaption'),
            imageSrc: '/img/amenity-kids.jpg',
            imageAlt: t('amenities.kidsAlt'),
          },
          {
            caption: t('amenities.workshopCaption'),
            imageSrc: '/img/amenity-workshop.jpg',
            imageAlt: t('amenities.workshopAlt'),
          },
          {
            caption: t('amenities.fitnessCaption'),
            imageSrc: '/img/amenity-fitness.jpg',
            imageAlt: t('amenities.fitnessAlt'),
          },
          {
            caption: t('amenities.tennisCaption'),
            imageSrc: '/img/amenity-golf.jpg',
            imageAlt: t('amenities.tennisAlt'),
          },
        ]}
      />
    </>
  );
}
