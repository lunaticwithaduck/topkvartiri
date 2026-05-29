'use client';

import { Hero } from '@/components/sections/Hero/Hero';
import { BookingSearch } from '../BookingSearch/BookingSearch';
import S from './HeroBooking.styles';

type HeroBookingProps = {
  imageSrc: string;
  imageAlt: string;
  title?: string;
  subtitle?: string;
  priority?: boolean;
};

export function HeroBooking({ imageSrc, imageAlt, title, subtitle, priority }: HeroBookingProps) {
  return (
    <S.Root>
      <Hero
        imageSrc={imageSrc}
        imageAlt={imageAlt}
        title={title}
        subtitle={subtitle}
        priority={priority}
      />
      <S.WidgetWrap>
        <BookingSearch />
      </S.WidgetWrap>
    </S.Root>
  );
}
