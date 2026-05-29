import { z } from 'zod';
import { ACCOMMODATION_IDS } from './data';

// Cross-field rule: departure must be strictly after arrival. Returns true when
// either side is empty so the per-field "required" check owns that case instead.
const departureAfterArrival = (d: { arrival?: string; departure?: string }) =>
  !d.arrival || !d.departure || d.departure > d.arrival;

// Shared search fields (used by both the hero widget and the wizard).
const searchFields = z.object({
  accommodation: z.enum(ACCOMMODATION_IDS),
  arrival: z.string().min(1),
  departure: z.string().min(1),
  adults: z.number().int().min(1).max(10),
  children: z.number().int().min(0).max(10),
});

export const searchSchema = searchFields.refine(departureAfterArrival, {
  path: ['departure'],
  message: 'departureAfterArrival',
});

export const bookingSchema = searchFields
  .extend({
    roomId: z.enum(ACCOMMODATION_IDS),
    extras: z.array(z.string()),
    firstName: z.string().min(2),
    lastName: z.string().min(2),
    email: z.email(),
    phone: z.string().min(6),
    country: z.string().min(1),
    notes: z.string().max(1000).optional(),
    consent: z.literal(true),
  })
  .refine(departureAfterArrival, {
    path: ['departure'],
    message: 'departureAfterArrival',
  });

export type SearchValues = z.infer<typeof searchSchema>;
export type BookingValues = z.infer<typeof bookingSchema>;

// Fields gated at each wizard step (used with RHF `trigger` before advancing).
export const STEP_FIELDS = {
  dates: ['accommodation', 'arrival', 'departure', 'adults', 'children'],
  room: ['roomId'],
  extras: ['extras'],
  confirm: ['firstName', 'lastName', 'email', 'phone', 'country', 'consent'],
} as const satisfies Record<string, readonly (keyof BookingValues)[]>;
