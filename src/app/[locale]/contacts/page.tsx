import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ContactBand } from '@/components/sections/ContactBand/ContactBand';
import { EmbedFrame } from '@/components/sections/EmbedFrame/EmbedFrame';
import { Hero } from '@/components/sections/Hero/Hero';

export default async function ContactsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Contacts');

  return (
    <>
      <Hero imageSrc="/img/hero-contacts.jpg" imageAlt={t('heroAlt')} compact />

      <ContactBand
        info={{
          title: t('title'),
          phone: t('phone'),
          email: t('email'),
          checkInNote: t('checkInNote'),
          facebookHref: t('facebookHref'),
          instagramHref: t('instagramHref'),
        }}
        formCopy={{
          nameLabel: t('form.name'),
          emailLabel: t('form.email'),
          phoneLabel: t('form.phone'),
          messageLabel: t('form.message'),
          consentLabel: t('form.consent'),
          submitLabel: t('form.submit'),
        }}
      />

      <EmbedFrame
        src="https://www.openstreetmap.org/export/embed.html?bbox=23.16%2C41.83%2C23.20%2C41.86&layer=mapnik"
        title="Map"
        aspectRatio="16 / 9"
      />
    </>
  );
}
