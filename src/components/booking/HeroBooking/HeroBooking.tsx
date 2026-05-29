'use client';

import { Hero } from '@/components/sections/Hero/Hero';
import { BookingSearch } from '../BookingSearch/BookingSearch';
import S from './HeroBooking.styles';

type HeroBookingProps = {
  imageSrc: string;
  imageAlt: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  priority?: boolean;
};

export function HeroBooking({
  imageSrc,
  imageAlt,
  eyebrow,
  title,
  subtitle,
  priority,
}: HeroBookingProps) {
  return (
    <S.Root>
      <Hero
        imageSrc={imageSrc}
        imageAlt={imageAlt}
        eyebrow={eyebrow}
        title={title}
        subtitle={subtitle}
        priority={priority}
      >
        <S.WidgetWrap>
          <BookingSearch />
        </S.WidgetWrap>
      </Hero>
    </S.Root>
  );
}
