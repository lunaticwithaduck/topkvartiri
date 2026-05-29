import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Hero } from '@/components/sections/Hero/Hero';
import { Button } from '@/design/Button/Button';
import { Container } from '@/design/Container/Container';
import { Gallery } from '@/design/Gallery/Gallery';
import { Section } from '@/design/Section/Section';
import { Stack } from '@/design/Stack/Stack';
import { Text } from '@/design/Text/Text';
import { ACCOMMODATION_IDS, formatPrice, getAccommodation } from '@/lib/booking/data';

export function generateStaticParams() {
  return ACCOMMODATION_IDS.map((id) => ({ id }));
}

export default async function AccommodationDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  const accommodation = getAccommodation(id);
  if (!accommodation) notFound();

  const td = await getTranslations('AccommodationDetail');
  const tb = await getTranslations('Booking');
  const name = tb(`rooms.${accommodation.id}.name`);
  const lightboxLabels = {
    close: td('lightbox.close'),
    prev: td('lightbox.prev'),
    next: td('lightbox.next'),
  };

  return (
    <>
      <Hero
        imageSrc={accommodation.heroImage}
        imageAlt={name}
        title={name}
        subtitle={tb(`rooms.${accommodation.id}.desc`)}
        compact
        priority
      />
      <Section>
        <Container width="lg">
          <Stack gap={10}>
            <Stack gap={4}>
              <Text size="xs" tone="accent" uppercase letterSpacing="wider">
                {td('eyebrow')}
              </Text>
              <Text as="h2">{td('aboutTitle')}</Text>
              <Text as="p" tone="muted">
                {td(`description.${accommodation.id}`)}
              </Text>
              <Stack direction="row" gap={6} wrap align="center">
                <Text weight="medium">{td('capacity', { count: accommodation.capacity })}</Text>
                <Text weight="semibold" tone="accent">
                  {td('perNight', { price: formatPrice(accommodation.pricePerNight) })}
                </Text>
              </Stack>
              <Stack direction="row">
                <Button href={`/book?accommodation=${accommodation.id}`}>{td('bookCta')}</Button>
              </Stack>
            </Stack>

            <Stack gap={4}>
              <Text as="h2">{td('amenitiesTitle')}</Text>
              <Stack direction="row" gap={3} wrap>
                {accommodation.amenities.map((a) => (
                  <Text key={a} size="sm">
                    {`✓ ${td(`amenities.${a}`)}`}
                  </Text>
                ))}
              </Stack>
            </Stack>

            <Stack gap={4}>
              <Text as="h2">{td('gallery')}</Text>
              <Gallery
                images={accommodation.gallery.map((src) => ({ src, alt: name }))}
                labels={lightboxLabels}
              />
            </Stack>
          </Stack>
        </Container>
      </Section>
    </>
  );
}
