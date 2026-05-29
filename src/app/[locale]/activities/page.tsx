import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Hero } from '@/components/sections/Hero/Hero';
import { SectionHeader } from '@/components/sections/SectionHeader/SectionHeader';
import { TileGrid } from '@/components/sections/TileGrid/TileGrid';

export default async function ActivitiesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Activities');

  return (
    <>
      <Hero imageSrc="/img/hero-activities.jpg" imageAlt={t('heroAlt')} compact />

      <SectionHeader title={t('title')} body={t('body')} />
      <TileGrid
        columns={4}
        tiles={[
          {
            caption: t('tiles.rilaCaption'),
            imageSrc: '/img/act-1.jpg',
            imageAlt: t('tiles.rilaAlt'),
          },
          {
            caption: t('tiles.melnikCaption'),
            imageSrc: '/img/act-2.jpg',
            imageAlt: t('tiles.melnikAlt'),
          },
          {
            caption: t('tiles.churchCaption'),
            imageSrc: '/img/act-3.jpg',
            imageAlt: t('tiles.churchAlt'),
          },
          {
            caption: t('tiles.danceBearsCaption'),
            imageSrc: '/img/act-4.jpg',
            imageAlt: t('tiles.danceBearsAlt'),
          },
          {
            caption: t('tiles.funParkCaption'),
            imageSrc: '/img/act-funpark.jpg',
            imageAlt: t('tiles.funParkAlt'),
          },
          {
            caption: t('tiles.paintballCaption'),
            imageSrc: '/img/act-paintball.jpg',
            imageAlt: t('tiles.paintballAlt'),
          },
          {
            caption: t('tiles.atvCaption'),
            imageSrc: '/img/act-5.jpg',
            imageAlt: t('tiles.atvAlt'),
          },
          {
            caption: t('tiles.offroadCaption'),
            imageSrc: '/img/act-6.jpg',
            imageAlt: t('tiles.offroadAlt'),
          },
          {
            caption: t('tiles.horsesCaption'),
            imageSrc: '/img/exp-horses.jpg',
            imageAlt: t('tiles.horsesAlt'),
          },
          {
            caption: t('tiles.craftsCaption'),
            imageSrc: '/img/act-7.jpg',
            imageAlt: t('tiles.craftsAlt'),
          },
          {
            caption: t('tiles.hikingCaption'),
            imageSrc: '/img/exp-bikes.jpg',
            imageAlt: t('tiles.hikingAlt'),
          },
          {
            caption: t('tiles.picnicCaption'),
            imageSrc: '/img/exp-nature.jpg',
            imageAlt: t('tiles.picnicAlt'),
          },
        ]}
      />
    </>
  );
}
