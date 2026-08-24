import { z } from 'zod';
import { COMPETITION } from '@/utils/competition';

const phoneSchema = z
  .string()
  .trim()
  .regex(/^[+]?[\d\s()-]{8,20}$/, 'Enter a valid phone number');

export const teamMemberSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Enter the member name')
    .max(80, 'Name is too long'),
  email: z.string().trim().email('Enter a valid email'),
  phone: phoneSchema,
  role: z.enum(['Lead', 'Member'], {
    message: 'Select a role',
  }),
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
    contactEmail: z.string().trim().email('Enter a valid contact email'),
    contactPhone: phoneSchema,
    members: z
      .array(teamMemberSchema)
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
    const leads = data.members.filter((member) => member.role === 'Lead');
    if (leads.length !== 1) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Exactly one team member must be marked as Lead',
        path: ['members'],
      });
    }
  });

export type RegistrationFormValues = z.infer<typeof registrationSchema>;
export type TeamMemberFormValues = z.infer<typeof teamMemberSchema>;

export const emptyMember = (): TeamMemberFormValues => ({
  name: '',
  email: '',
  phone: '',
  role: 'Member',
});
