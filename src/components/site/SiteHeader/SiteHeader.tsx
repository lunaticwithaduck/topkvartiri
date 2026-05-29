'use client';

import { useMotionValueEvent, useReducedMotion, useScroll } from 'motion/react';
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
  const [scrolled, setScrolled] = useState(false);
  const reduce = useReducedMotion();

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', (y) => {
    setScrolled(y > 64);
  });

  const logoScale = reduce ? 1 : scrolled ? 0.85 : 1;

  return (
    <S.Root
      $scrolled={scrolled}
      initial={reduce ? false : { y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 240, damping: 28 }}
    >
      <S.Inner $scrolled={scrolled}>
        <Link href="/" aria-label={t('brandLabel')}>
          <S.Brand animate={{ scale: logoScale }} transition={{ duration: 0.22, ease: 'easeOut' }}>
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
                  {isActive ? <S.Underline layoutId="nav-underline" /> : null}
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
          <S.ReserveWrap
            whileHover={reduce ? undefined : { scale: 1.04 }}
            whileTap={reduce ? undefined : { scale: 0.97 }}
          >
            <Button href="/book">{t('reserveLabel')}</Button>
          </S.ReserveWrap>
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
