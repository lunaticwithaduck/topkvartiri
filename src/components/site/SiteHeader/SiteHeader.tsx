'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';
import { Button } from '@/design/Button/Button';
import { Close, Menu } from '@/design/Icon/icons';
import { Image } from '@/design/Image/Image';
import { Link, usePathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import S from './SiteHeader.styles';

const NAV_ITEMS: { key: string; href: string }[] = [
  { key: 'home', href: '/' },
  { key: 'accommodation', href: '/accommodation' },
  { key: 'services', href: '/services' },
  { key: 'activities', href: '/activities' },
  { key: 'prices', href: '/prices' },
  { key: 'gallery', href: '/gallery' },
  { key: 'contacts', href: '/contacts' },
];

export function SiteHeader() {
  const t = useTranslations('SiteHeader');
  const locale = useLocale();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <S.Root>
      <S.Inner>
        <Link href="/" aria-label={t('brandLabel')}>
          <S.Brand>
            <Image
              src="/logo-light.png"
              alt={t('brandLabel')}
              width={58}
              height={51}
              fit="contain"
              priority
            />
          </S.Brand>
        </Link>
        <S.Nav $open={open} aria-label={t('navLabel')}>
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.key} href={item.href} onClick={() => setOpen(false)}>
                <S.NavItem as="span" aria-current={isActive ? 'page' : undefined}>
                  {t(`nav.${item.key}`)}
                </S.NavItem>
              </Link>
            );
          })}
        </S.Nav>
        <S.LangSwitch>
          {routing.locales.map((l) => (
            <Link key={l} href={pathname} locale={l}>
              <S.LangLink as="span" $active={l === locale}>
                {l}
              </S.LangLink>
            </Link>
          ))}
        </S.LangSwitch>
        <S.Actions>
          <Button href={t('reserveHref')} external>
            {t('reserveLabel')}
          </Button>
          <S.MenuButton
            type="button"
            aria-label={t(open ? 'closeMenuLabel' : 'openMenuLabel')}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <Close size={24} tone="inverse" /> : <Menu size={24} tone="inverse" />}
          </S.MenuButton>
        </S.Actions>
      </S.Inner>
    </S.Root>
  );
}
