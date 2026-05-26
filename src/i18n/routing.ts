import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['bg', 'en', 'ru'],
  defaultLocale: 'bg',
  localePrefix: 'as-needed',
});

export type Locale = (typeof routing.locales)[number];
