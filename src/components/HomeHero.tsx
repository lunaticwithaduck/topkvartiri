'use client';

import styled from '@emotion/styled';
import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { Button } from './Button';

const Section = styled.section`
  min-height: 80vh;
  display: grid;
  place-items: center;
  padding: ${({ theme }) => theme.space(16)} ${({ theme }) => theme.space(6)};
  text-align: center;
`;

const Title = styled(motion.h1)`
  font-size: clamp(2rem, 6vw, 4rem);
  font-weight: 500;
  letter-spacing: -0.02em;
  margin: 0 0 ${({ theme }) => theme.space(4)};
`;

const Subtitle = styled.p`
  font-size: 1.125rem;
  color: ${({ theme }) => theme.colors.muted};
  margin: 0 0 ${({ theme }) => theme.space(8)};
`;

export function HomeHero() {
  const t = useTranslations('Home');

  return (
    <Section>
      <div>
        <Title
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {t('title')}
        </Title>
        <Subtitle>{t('subtitle')}</Subtitle>
        <Button>{t('cta')}</Button>
      </div>
    </Section>
  );
}
