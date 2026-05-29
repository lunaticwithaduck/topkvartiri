'use client';

import { Text } from '@/design/Text/Text';
import S from './PricingTable.styles';

type PricingCard = {
  title: string;
  priceLabel: string;
  priceNote?: string;
  features: string[];
};

type PricingTableProps = {
  cards: PricingCard[];
};

export function PricingTable({ cards }: PricingTableProps) {
  return (
    <S.Root>
      {cards.map((card) => (
        <S.Card key={card.title}>
          <S.CardHeading>
            <Text as="h3" size="lg" tone="inverse" uppercase letterSpacing="wider">
              {card.title}
            </Text>
          </S.CardHeading>
          <S.CardBody>
            <S.PriceRow>
              <Text size="3xl" weight="light" tone="accent">
                {card.priceLabel}
              </Text>
              {card.priceNote ? (
                <Text size="sm" tone="muted">
                  {card.priceNote}
                </Text>
              ) : null}
            </S.PriceRow>
            <S.FeatureList>
              {card.features.map((feat) => (
                <S.FeatureItem key={feat}>
                  <Text size="sm" tone="muted">
                    {feat}
                  </Text>
                </S.FeatureItem>
              ))}
            </S.FeatureList>
          </S.CardBody>
        </S.Card>
      ))}
    </S.Root>
  );
}
