import { getTranslations, setRequestLocale } from 'next-intl/server';
import { HeroBooking } from '@/components/booking/HeroBooking/HeroBooking';
import { Band } from '@/components/sections/Band/Band';
import { ImageGridBand } from '@/components/sections/ImageGridBand/ImageGridBand';
import { ImageTextBand } from '@/components/sections/ImageTextBand/ImageTextBand';
import { SectionHeader } from '@/components/sections/SectionHeader/SectionHeader';
import { StatementBand } from '@/components/sections/StatementBand/StatementBand';
import { TileGrid } from '@/components/sections/TileGrid/TileGrid';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Home');

  return (
    <>
      <HeroBooking
        imageSrc="/img/hero-home.jpg"
        imageAlt={t('heroAlt')}
        eyebrow={t('heroEyebrow')}
        title={t('heroTitle')}
        subtitle={t('heroSubtitle')}
        priority
      />

      <Band bg="default">
        <ImageTextBand
          lede
          eyebrow={t('introEyebrow')}
          title={t('introTitle')}
          body={t('introBody')}
          images={[
            { src: '/img/home-intro-1.jpg', alt: t('introImage1Alt') },
            { src: '/img/home-intro-2.jpg', alt: t('introImage2Alt') },
          ]}
        />
      </Band>

      <Band bg="elevated">
        <SectionHeader index="01" align="left" title={t('roomsTitle')} body={t('roomsBody')} />
        <ImageGridBand
          columns={3}
          tiles={[
            {
              title: t('rooms.maisonetteTitle'),
              body: t('rooms.maisonetteBody'),
              imageSrc: '/img/room-maisonette.jpg',
              imageAlt: t('rooms.maisonetteAlt'),
            },
            {
              title: t('rooms.studioTitle'),
              body: t('rooms.studioBody'),
              imageSrc: '/img/room-studio.jpg',
              imageAlt: t('rooms.studioAlt'),
            },
            {
              title: t('rooms.houseTitle'),
              body: t('rooms.houseBody'),
              imageSrc: '/img/room-house.jpg',
              imageAlt: t('rooms.houseAlt'),
            },
          ]}
          footerCta={{ label: t('roomsCta'), href: '/accommodation' }}
        />
      </Band>

      <Band bg="default">
        <ImageTextBand
          reverse
          eyebrow={t('restaurantsEyebrow')}
          title={t('restaurantsTitle')}
          body={t('restaurantsBody')}
          images={[{ src: '/img/restaurant.jpg', alt: t('restaurantsImageAlt') }]}
          cta={{ label: t('restaurantsCta'), href: '/services' }}
        />
      </Band>

      <StatementBand
        imageSrc="/img/hero-accommodation.jpg"
        imageAlt={t('statement.imageAlt')}
        eyebrow={t('statement.eyebrow')}
        title={t('statement.title')}
        body={t('statement.body')}
        cta={{ label: t('statement.cta'), href: '/activities' }}
      />

      <Band bg="default">
        <SectionHeader
          index="02"
          align="left"
          title={t('amenitiesTitle')}
          body={t('amenitiesBody')}
        />
        <ImageGridBand
          columns={4}
          tiles={[
            {
              title: t('amenities.wellnessTitle'),
              body: t('amenities.wellnessBody'),
              imageSrc: '/img/amenity-wellness.jpg',
              imageAlt: t('amenities.wellnessAlt'),
            },
            {
              title: t('amenities.fitnessTitle'),
              body: t('amenities.fitnessBody'),
              imageSrc: '/img/amenity-fitness.jpg',
              imageAlt: t('amenities.fitnessAlt'),
            },
            {
              title: t('amenities.poolTitle'),
              body: t('amenities.poolBody'),
              imageSrc: '/img/amenity-pool.jpg',
              imageAlt: t('amenities.poolAlt'),
            },
            {
              title: t('amenities.kidsTitle'),
              body: t('amenities.kidsBody'),
              imageSrc: '/img/amenity-kids.jpg',
              imageAlt: t('amenities.kidsAlt'),
            },
          ]}
          footerCta={{ label: t('amenitiesCta'), href: '/services' }}
        />
      </Band>

      <Band bg="elevated">
        <ImageTextBand
          dropCap
          eyebrow={t('longStayEyebrow')}
          title={t('longStayTitle')}
          body={t('longStayBody')}
          images={[{ src: '/img/long-stay.jpg', alt: t('longStayImageAlt') }]}
          cta={{ label: t('longStayCta'), href: '/prices' }}
        />
      </Band>

      <Band bg="default">
        <SectionHeader
          index="03"
          align="left"
          title={t('experiencesTitle')}
          body={t('experiencesBody')}
        />
        <TileGrid
          columns={4}
          tiles={[
            {
              caption: t('experiences.golfCaption'),
              imageSrc: '/img/amenity-golf.jpg',
              imageAlt: t('experiences.golfAlt'),
              href: '/activities',
            },
            {
              caption: t('experiences.bikesCaption'),
              imageSrc: '/img/exp-bikes.jpg',
              imageAlt: t('experiences.bikesAlt'),
              href: '/activities',
            },
            {
              caption: t('experiences.natureCaption'),
              imageSrc: '/img/exp-nature.jpg',
              imageAlt: t('experiences.natureAlt'),
              href: '/activities',
            },
            {
              caption: t('experiences.horsesCaption'),
              imageSrc: '/img/exp-horses.jpg',
              imageAlt: t('experiences.horsesAlt'),
              href: '/activities',
            },
            {
              caption: t('experiences.skiCaption'),
              imageSrc: '/img/exp-ski.jpg',
              imageAlt: t('experiences.skiAlt'),
              href: '/activities',
            },
          ]}
        />
      </Band>
    </>
  );
}
