'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/design/Button/Button';
import { Facebook, Instagram, Mail, Phone } from '@/design/Icon/icons';
import { Text } from '@/design/Text/Text';
import { Link } from '@/i18n/navigation';
import S from './SiteFooter.styles';

const EXPLORE = [
  { key: 'accommodation', href: '/accommodation' },
  { key: 'services', href: '/services' },
  { key: 'activities', href: '/activities' },
  { key: 'gallery', href: '/gallery' },
] as const;

export function SiteFooter() {
  const t = useTranslations('SiteFooter');
  const tNav = useTranslations('SiteHeader');
  const year = new Date().getFullYear();

  return (
    <S.Root>
      <S.Card>
        <S.Fluid />
        <S.Inner>
          <S.Lead>
            <Text as="span" size="display" weight="light" tone="inverse" letterSpacing="wide">
              {t('brandLabel')}
            </Text>
            <Text size="sm" tone="inverse">
              {t('tagline')}
            </Text>
            <S.CtaRow>
              <Button href="/book">{t('ctaLabel')}</Button>
            </S.CtaRow>
          </S.Lead>

          <S.Column>
            <Text as="h2" size="sm" tone="accent" uppercase letterSpacing="wider" weight="medium">
              {t('exploreHeading')}
            </Text>
            <S.LinkList>
              {EXPLORE.map((item) => (
                <Link key={item.key} href={item.href}>
                  <S.NavLink as="span">{tNav(`nav.${item.key}`)}</S.NavLink>
                </Link>
              ))}
            </S.LinkList>
          </S.Column>

          <S.Column>
            <Text as="h2" size="sm" tone="accent" uppercase letterSpacing="wider" weight="medium">
              {t('contactsHeading')}
            </Text>
            <S.LinkList>
              <S.InfoItem>
                <Phone size={18} tone="accent" />
                <Text size="sm" tone="inverse">
                  {t('phone')}
                </Text>
              </S.InfoItem>
              <S.InfoItem>
                <Mail size={18} tone="accent" />
                <Text size="sm" tone="inverse">
                  {t('email')}
                </Text>
              </S.InfoItem>
            </S.LinkList>
            <S.Socials>
              <S.SocialLink
                href={t('facebookHref')}
                aria-label="Facebook"
                rel="noopener noreferrer"
              >
                <Facebook size={22} tone="accent" />
              </S.SocialLink>
              <S.SocialLink
                href={t('instagramHref')}
                aria-label="Instagram"
                rel="noopener noreferrer"
              >
                <Instagram size={22} tone="accent" />
              </S.SocialLink>
            </S.Socials>
          </S.Column>

          <S.Column>
            <Text as="h2" size="sm" tone="accent" uppercase letterSpacing="wider" weight="medium">
              {t('policiesHeading')}
            </Text>
            <S.LinkList>
              <Link href="/privacy">
                <S.NavLink as="span">{t('privacyPolicy')}</S.NavLink>
              </Link>
              <Link href="/terms">
                <S.NavLink as="span">{t('stayPolicy')}</S.NavLink>
              </Link>
            </S.LinkList>
          </S.Column>
        </S.Inner>

        <S.BottomBar>
          <Text size="xs" tone="inverse">
            {t('rights', { year })}
          </Text>
        </S.BottomBar>
      </S.Card>
    </S.Root>
  );
}
