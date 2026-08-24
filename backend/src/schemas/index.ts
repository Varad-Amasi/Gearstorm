import { z } from 'zod';

const phoneSchema = z
  .string()
  .trim()
  .regex(/^[+]?[\d\s()-]{8,20}$/, 'Enter a valid phone number');

export const teamMemberSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email(),
  phone: phoneSchema,
  role: z.enum(['Lead', 'Member']),
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
    members: z.array(teamMemberSchema).min(TEAM_SIZE_MIN).max(TEAM_SIZE_MAX),
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

export const contactSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email(),
  subject: z.string().trim().min(3).max(120),
  message: z.string().trim().min(20).max(2000),
});

export const leaderboardSubmitSchema = z.object({
  teamId: z.string().trim().min(1),
  teamName: z.string().trim().min(2),
  college: z.string().trim().min(2),
  round: z.union([z.literal(1), z.literal(2)]),
  time: z.number().int().positive(),
  obstaclesCleared: z.number().int().min(0),
  penaltyPoints: z.number().int().min(0),
});

export const galleryMetaSchema = z.object({
  alt: z.string().trim().min(3).max(160),
  category: z.string().trim().min(2).max(40),
  year: z.coerce.number().int().min(2020).max(2100),
  caption: z.string().trim().min(3).max(160),
});
