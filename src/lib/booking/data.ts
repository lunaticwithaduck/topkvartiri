// Mock booking inventory for the scaffold. No backend — these drive the custom
// Quendoo-style funnel. Copy (names/descriptions) is localized in messages under
// the `Booking` namespace, keyed by id (e.g. Booking.rooms.maisonette.name).

export const ACCOMMODATION_IDS = ['maisonette', 'studio', 'house'] as const;
export type AccommodationId = (typeof ACCOMMODATION_IDS)[number];

export type Accommodation = {
  id: AccommodationId;
  image: string; // thumbnail used in the booking UI
  heroImage: string; // banner on the detail page
  gallery: string[]; // detail-page gallery (reuses existing /img assets)
  amenities: string[]; // amenity ids, localized via AccommodationDetail.amenities.<id>
  pricePerNight: number; // EUR
  capacity: number; // max guests
};

export const ACCOMMODATIONS: readonly Accommodation[] = [
  {
    id: 'maisonette',
    image: '/img/room-maisonette.jpg',
    heroImage: '/img/maisonette-1.jpg',
    gallery: [
      '/img/maisonette-1.jpg',
      '/img/maisonette-2.jpg',
      '/img/gallery-3.jpg',
      '/img/gallery-6.jpg',
      '/img/gallery-4.jpg',
    ],
    amenities: ['wifi', 'kitchen', 'terrace', 'ac', 'tv', 'parking'],
    pricePerNight: 180,
    capacity: 4,
  },
  {
    id: 'studio',
    image: '/img/room-studio.jpg',
    heroImage: '/img/studio-1.jpg',
    gallery: ['/img/studio-1.jpg', '/img/studio-2.jpg', '/img/gallery-2.jpg', '/img/gallery-7.jpg'],
    amenities: ['wifi', 'kitchen', 'ac', 'tv'],
    pricePerNight: 120,
    capacity: 2,
  },
  {
    id: 'house',
    image: '/img/room-house.jpg',
    heroImage: '/img/hero-house.jpg',
    gallery: [
      '/img/house-1.jpg',
      '/img/house-2.jpg',
      '/img/gallery-9.jpg',
      '/img/gallery-10.jpg',
      '/img/gallery-1.jpg',
    ],
    amenities: ['wifi', 'kitchen', 'parking', 'terrace', 'pool', 'heating', 'tv', 'petFriendly'],
    pricePerNight: 320,
    capacity: 6,
  },
];

export const EXTRA_IDS = ['breakfast', 'spa', 'lateCheckout', 'airportTransfer', 'cot'] as const;
export type ExtraId = (typeof EXTRA_IDS)[number];

export type Extra = {
  id: ExtraId;
  price: number; // EUR, flat per stay (0 = complimentary)
};

export const EXTRAS: readonly Extra[] = [
  { id: 'breakfast', price: 18 },
  { id: 'spa', price: 45 },
  { id: 'lateCheckout', price: 25 },
  { id: 'airportTransfer', price: 60 },
  { id: 'cot', price: 0 },
];

export function getAccommodation(id: string): Accommodation | undefined {
  return ACCOMMODATIONS.find((a) => a.id === id);
}

export function getExtra(id: string): Extra | undefined {
  return EXTRAS.find((e) => e.id === id);
}

// Whole nights between two ISO `yyyy-mm-dd` dates (0 if invalid/empty/non-positive).
export function nightsBetween(arrival: string, departure: string): number {
  if (!arrival || !departure) return 0;
  const a = Date.parse(arrival);
  const d = Date.parse(departure);
  if (Number.isNaN(a) || Number.isNaN(d)) return 0;
  const diff = Math.round((d - a) / 86_400_000);
  return diff > 0 ? diff : 0;
}

export function priceBreakdown(roomId: string, extraIds: string[], nights: number) {
  const room = getAccommodation(roomId);
  const roomTotal = room ? room.pricePerNight * nights : 0;
  const extrasTotal = extraIds.reduce((sum, id) => sum + (getExtra(id)?.price ?? 0), 0);
  return { roomTotal, extrasTotal, total: roomTotal + extrasTotal };
}

export function formatPrice(eur: number): string {
  return `€${eur.toLocaleString('en-US')}`;
}
