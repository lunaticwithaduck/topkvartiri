'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/design/Button/Button';
import S from './HomeHero.styles';

export function HomeHero() {
  const t = useTranslations('Home');

  return (
    <S.Section>
      <div>
        <S.Title
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {t('title')}
        </S.Title>
        <S.Subtitle>{t('subtitle')}</S.Subtitle>
        <Button>{t('cta')}</Button>
      </div>
    </S.Section>
  );
}
