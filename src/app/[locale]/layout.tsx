import type { Metadata } from 'next';
import { Jost } from 'next/font/google';
import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Providers } from '@/components/Providers/Providers';
import { SiteFooter } from '@/components/site/SiteFooter/SiteFooter';
import { SiteHeader } from '@/components/site/SiteHeader/SiteHeader';
import { routing } from '@/i18n/routing';

const jost = Jost({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Top Kvartiri',
  description: 'Boutique apartments and holiday rentals',
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  return (
    <html lang={locale} className={jost.variable}>
      <body>
        <NextIntlClientProvider>
          <Providers>
            <SiteHeader />
            <main>{children}</main>
            <SiteFooter />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
