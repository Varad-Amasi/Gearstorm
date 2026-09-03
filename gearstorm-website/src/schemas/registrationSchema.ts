import { z } from 'zod';
import { COMPETITION } from '@/utils/competition';

const phoneSchema = z
  .string()
  .trim()
  .regex(/^[+]?[\d\s()-]{8,20}$/, 'Enter a valid phone number');

const MAX_PROOF_BYTES = 5 * 1024 * 1024;
const PROOF_MIME_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
]);

const memberInputSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Enter the member name')
    .max(80, 'Name is too long'),
  email: z.string().trim().email('Enter a valid email'),
  phone: phoneSchema,
  // Fixed by position on transform; keep optional so UI need not bind role inputs.
  role: z.enum(['Lead', 'Member']).optional(),
});

export const registrationSchema = z
  .object({
    teamName: z
      .string()
      .trim()
      .min(2, 'Enter a team name')
      .max(60, 'Team name is too long'),
    college: z
      .string()
      .trim()
      .min(2, 'Enter your college or institution')
      .max(120, 'College name is too long'),
    paymentUtr: z
      .string()
      .trim()
      .min(8, 'Enter the UTR / UPI transaction ID from your payment')
      .max(64, 'UTR looks too long')
      .regex(
        /^[A-Za-z0-9/-]+$/,
        'Use only letters, numbers, / or - from your UPI receipt'
      ),
    paymentProof: z
      .custom<File>((value) => value instanceof File, {
        message: 'Upload a screenshot of your UPI payment',
      })
      .refine((file) => PROOF_MIME_TYPES.has(file.type), {
        message: 'Payment proof must be JPEG, PNG, WebP, or GIF',
      })
      .refine((file) => file.size > 0 && file.size <= MAX_PROOF_BYTES, {
        message: 'Payment proof must be 5 MB or smaller',
      }),
    members: z
      .array(memberInputSchema)
      .min(
        COMPETITION.teamSizeMin,
        `Add at least ${COMPETITION.teamSizeMin} members`
      )
      .max(
        COMPETITION.teamSizeMax,
        `Teams are limited to ${COMPETITION.teamSizeMax} members`
      ),
  })
  .transform((data) => ({
    ...data,
    members: data.members.map((member, index) => ({
      name: member.name,
      email: member.email,
      phone: member.phone,
      role: (index === 0 ? 'Lead' : 'Member') as 'Lead' | 'Member',
    })),
  }));

export type RegistrationFormValues = z.input<typeof registrationSchema>;
export type RegistrationPayload = z.output<typeof registrationSchema>;
export type TeamMemberFormValues = z.infer<typeof memberInputSchema> & {
  role: 'Lead' | 'Member';
};

export const emptyMember = (): TeamMemberFormValues => ({
  name: '',
  email: '',
  phone: '',
  role: 'Member',
});

export const emptyLead = (): TeamMemberFormValues => ({
  ...emptyMember(),
  role: 'Lead',
});
