import { z } from 'zod';

const phoneSchema = z
  .string()
  .trim()
  .regex(/^[+]?[\d\s()-]{8,20}$/, 'Enter a valid phone number');

const ACADEMIC_YEARS = [
  '1st Year',
  '2nd Year',
  '3rd Year',
  '4th Year',
] as const;

export const teamMemberSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email(),
  phone: phoneSchema,
  academicYear: z.enum(ACADEMIC_YEARS),
  // Role is forced by member order on transform; accept anything valid or missing.
  role: z.enum(['Lead', 'Member']).optional().default('Member'),
});

/** Keep in sync with frontend `COMPETITION.teamSizeMin/Max`. */
const TEAM_SIZE_MIN = 3;
const TEAM_SIZE_MAX = 5;

export const registerTeamSchema = z
  .object({
    teamName: z.string().trim().min(2).max(60),
    college: z.string().trim().min(2).max(120),
    contactEmail: z.string().trim().email(),
    contactPhone: phoneSchema,
    paymentUtr: z
      .string()
      .trim()
      .min(8, 'Enter the UTR / UPI transaction ID')
      .max(64)
      .regex(/^[A-Za-z0-9/-]+$/, 'Invalid UTR format'),
    members: z.array(teamMemberSchema).min(TEAM_SIZE_MIN).max(TEAM_SIZE_MAX),
  })
  .transform((data) => {
    const members = data.members.map((member, index) => ({
      name: member.name,
      email: member.email,
      phone: member.phone,
      academicYear: member.academicYear,
      role: (index === 0 ? 'Lead' : 'Member') as 'Lead' | 'Member',
    }));
    const lead = members[0]!;
    return {
      ...data,
      members,
      contactEmail: lead.email,
      contactPhone: lead.phone,
    };
  });

export const contactSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email(),
  subject: z.string().trim().min(3).max(120),
  message: z.string().trim().min(20).max(2000),
});

export const galleryMetaSchema = z.object({
  alt: z.string().trim().min(3).max(160),
  category: z.string().trim().min(2).max(40),
  year: z.coerce.number().int().min(2020).max(2100),
  caption: z.string().trim().min(3).max(160),
});
