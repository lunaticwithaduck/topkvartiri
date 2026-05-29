'use client';

import { MountainOrnament } from '@/design/Icon/icons';
import { Text } from '@/design/Text/Text';
import S from './SectionHeader.styles';

type SectionHeaderProps = {
  title: string;
  body?: string;
  /** Editorial index, e.g. "01". When set, replaces the ornament with a numbered hairline rule. */
  index?: string;
  align?: 'center' | 'left';
  showOrnament?: boolean;
  tone?: 'default' | 'inverse';
};

export function SectionHeader({
  title,
  body,
  index,
  align = 'center',
  showOrnament = true,
  tone = 'default',
}: SectionHeaderProps) {
  const inverse = tone === 'inverse';
  const editorial = Boolean(index);

  return (
    <S.Root $align={align}>
      {editorial ? (
        <S.IndexRow>
          <Text size="sm" weight="medium" tone="accent" letterSpacing="wider">
            {index}
          </Text>
        </S.IndexRow>
      ) : showOrnament ? (
        <S.Ornament aria-hidden>
          <MountainOrnament size={48} tone="accent" strokeWidth={1.25} />
        </S.Ornament>
      ) : null}
      <Text
        as="h2"
        size={editorial ? 'display' : undefined}
        weight="light"
        align={align}
        uppercase
        letterSpacing="wide"
        lineHeight="tight"
        tone={inverse ? 'inverse' : 'default'}
      >
        {title}
      </Text>
      {body ? (
        <Text as="p" size="lg" align={align} tone={inverse ? 'inverse' : 'muted'}>
          {body}
        </Text>
      ) : null}
    </S.Root>
  );
}
