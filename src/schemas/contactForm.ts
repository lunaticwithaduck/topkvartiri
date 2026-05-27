import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.email(),
  phone: z.string().min(6).max(32).optional(),
  message: z.string().min(10).max(2000),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;
