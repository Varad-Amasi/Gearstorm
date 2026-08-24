import { z } from 'zod';

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Enter your full name')
    .max(80, 'Name is too long'),
  email: z.string().trim().email('Enter a valid email address'),
  subject: z
    .string()
    .trim()
    .min(3, 'Add a short subject')
    .max(120, 'Subject is too long'),
  message: z
    .string()
    .trim()
    .min(20, 'Message should be at least 20 characters')
    .max(2000, 'Message is too long'),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
