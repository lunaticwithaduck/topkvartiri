'use client';

import { MountainOrnament } from '@/design/Icon/icons';
import { Text } from '@/design/Text/Text';
import S from './SectionHeader.styles';

type SectionHeaderProps = {
  title: string;
  body?: string;
  showOrnament?: boolean;
  tone?: 'default' | 'inverse';
};

export function SectionHeader({
  title,
  body,
  showOrnament = true,
  tone = 'default',
}: SectionHeaderProps) {
  return (
    <S.Root>
      {showOrnament ? (
        <S.Ornament aria-hidden>
          <MountainOrnament size={48} tone="accent" strokeWidth={1.25} />
        </S.Ornament>
      ) : null}
      <Text
        as="h2"
        align="center"
        uppercase
        letterSpacing="wider"
        tone={tone === 'inverse' ? 'inverse' : 'default'}
      >
        {title}
      </Text>
      {body ? (
        <Text as="p" align="center" tone={tone === 'inverse' ? 'inverse' : 'muted'}>
          {body}
        </Text>
      ) : null}
    </S.Root>
  );
}
