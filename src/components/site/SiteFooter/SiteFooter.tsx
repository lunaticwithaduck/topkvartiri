'use client';

import { useTranslations } from 'next-intl';
import { Facebook, Instagram, Mail, Phone } from '@/design/Icon/icons';
import { Image } from '@/design/Image/Image';
import { Text } from '@/design/Text/Text';
import S from './SiteFooter.styles';

export function SiteFooter() {
  const t = useTranslations('SiteFooter');

  return (
    <S.Root>
      <S.Inner>
        <S.Column>
          <S.Brand>
            <Image
              src="/logo-light.png"
              alt={t('brandLabel')}
              width={102}
              height={90}
              fit="contain"
            />
          </S.Brand>
          <Text size="sm" tone="inverse">
            {t('tagline')}
          </Text>
        </S.Column>

        <S.Column>
          <Text as="h2" size="lg" tone="inverse" uppercase letterSpacing="wider" weight="medium">
            {t('contactsHeading')}
          </Text>
          <S.InfoList>
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
          </S.InfoList>
          <S.Socials>
            <a href={t('facebookHref')} aria-label="Facebook" rel="noopener noreferrer">
              <Facebook size={22} tone="accent" />
            </a>
            <a href={t('instagramHref')} aria-label="Instagram" rel="noopener noreferrer">
              <Instagram size={22} tone="accent" />
            </a>
          </S.Socials>
        </S.Column>

        <S.Column>
          <Text as="h2" size="lg" tone="inverse" uppercase letterSpacing="wider" weight="medium">
            {t('policiesHeading')}
          </Text>
          <S.InfoList>
            <S.InfoItem>
              <S.PolicyLink href="/privacy">
                <Text size="sm" tone="inverse">
                  {t('privacyPolicy')}
                </Text>
              </S.PolicyLink>
            </S.InfoItem>
            <S.InfoItem>
              <S.PolicyLink href="/terms">
                <Text size="sm" tone="inverse">
                  {t('stayPolicy')}
                </Text>
              </S.PolicyLink>
            </S.InfoItem>
          </S.InfoList>
        </S.Column>
      </S.Inner>
    </S.Root>
  );
}
