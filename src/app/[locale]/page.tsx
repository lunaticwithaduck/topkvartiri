import { setRequestLocale } from 'next-intl/server';
import { HomeHero } from '@/components/HomeHero/HomeHero';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <HomeHero />;
}
