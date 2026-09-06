import { z } from 'zod';
import { ACADEMIC_YEARS, COMPETITION, HOST_COLLEGE } from '@/utils/competition';

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

const academicYearSchema = z
  .string()
  .min(1, 'Select an academic year')
  .refine(
    (value): value is (typeof ACADEMIC_YEARS)[number] =>
      (ACADEMIC_YEARS as readonly string[]).includes(value),
    { message: 'Select an academic year' }
  );

const memberInputSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Enter the member name')
    .max(80, 'Name is too long'),
  email: z.string().trim().email('Enter a valid email'),
  phone: phoneSchema,
  academicYear: academicYearSchema,
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
    collegeChoice: z
      .string()
      .min(1, 'Select your college')
      .refine(
        (value): value is typeof HOST_COLLEGE | 'Other' =>
          value === HOST_COLLEGE || value === 'Other',
        { message: 'Select your college' }
      ),
    collegeOther: z.string().trim().max(120, 'College name is too long'),
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
  .superRefine((data, ctx) => {
    if (data.collegeChoice === 'Other' && data.collegeOther.length < 2) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Enter your college or institution',
        path: ['collegeOther'],
      });
    }
  })
  .transform((data) => ({
    teamName: data.teamName,
    college:
      data.collegeChoice === HOST_COLLEGE ? HOST_COLLEGE : data.collegeOther,
    paymentUtr: data.paymentUtr,
    paymentProof: data.paymentProof,
    members: data.members.map((member, index) => ({
      name: member.name,
      email: member.email,
      phone: member.phone,
      academicYear: member.academicYear,
      role: (index === 0 ? 'Lead' : 'Member') as 'Lead' | 'Member',
    })),
  }));

export type RegistrationFormValues = z.input<typeof registrationSchema>;
export type RegistrationPayload = z.output<typeof registrationSchema>;
export type TeamMemberFormValues = {
  name: string;
  email: string;
  phone: string;
  academicYear: (typeof ACADEMIC_YEARS)[number] | '';
  role: 'Lead' | 'Member';
};

export const emptyMember = (): TeamMemberFormValues => ({
  name: '',
  email: '',
  phone: '',
  academicYear: '',
  role: 'Member',
});

export const emptyLead = (): TeamMemberFormValues => ({
  ...emptyMember(),
  role: 'Lead',
});
