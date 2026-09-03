import { Router } from 'express';
import { randomUUID } from 'node:crypto';
import { HttpError, requireAdmin, validateBody } from '../middleware/errorHandler.js';
import { rateLimit } from '../middleware/rateLimit.js';
import { registerTeamSchema } from '../schemas/index.js';
import { appendRegistrationToSheet } from '../services/googleSheets.js';
import { store } from '../store/jsonStore.js';
import type { TeamMemberRecord, TeamRecord } from '../types.js';

export const teamsRouter = Router();

const registrationLimit = rateLimit({
  windowMs: 60_000,
  max: 8,
  keyPrefix: 'teams-post',
});

/** Public team shape — no emails/phones. */
const toPublicTeam = (team: TeamRecord) => ({
  id: team.id,
  name: team.name,
  college: team.college,
  paymentStatus: team.paymentStatus,
  registrationDate: team.registrationDate,
  memberCount: team.members.length,
});

teamsRouter.get('/', (req, res) => {
  const college =
    typeof req.query.college === 'string' ? req.query.college : undefined;
  res.json({
    success: true,
    data: store.listTeams(college).map(toPublicTeam),
  });
});

/** Full team record (PII) — organisers only. Must be registered before `/:teamId`. */
teamsRouter.get('/:teamId/full', requireAdmin, (req, res) => {
  const team = store.getTeam(req.params.teamId ?? '');
  if (!team) {
    throw new HttpError(404, 'Team not found');
  }
  res.json({ success: true, data: team });
});

teamsRouter.get('/:teamId', (req, res) => {
  const team = store.getTeam(req.params.teamId ?? '');
  if (!team) {
    throw new HttpError(404, 'Team not found');
  }
  res.json({ success: true, data: toPublicTeam(team) });
});

teamsRouter.post(
  '/',
  registrationLimit,
  validateBody(registerTeamSchema),
  (req, res) => {
    const body = req.body as {
      teamName: string;
      college: string;
      contactEmail: string;
      contactPhone: string;
      members: Array<{
        name: string;
        email: string;
        phone: string;
        role: 'Lead' | 'Member';
      }>;
    };

    const duplicate = store
      .listTeams()
      .some((team) => team.name.toLowerCase() === body.teamName.toLowerCase());
    if (duplicate) {
      throw new HttpError(409, 'A team with that name is already registered');
    }

    const members: TeamMemberRecord[] = body.members.map((member) => ({
      id: randomUUID(),
      ...member,
    }));

    const team: TeamRecord = {
      id: randomUUID(),
      name: body.teamName,
      college: body.college,
      contactEmail: body.contactEmail,
      contactPhone: body.contactPhone,
      paymentStatus: 'pending',
      registrationDate: new Date().toISOString(),
      members,
    };

    store.addTeam(team);

    // SMTP not configured — log only; do not claim a real email was sent.
    console.info(
      `[email:stub] Registration saved for ${team.contactEmail} (team ${team.name})`
    );

    void appendRegistrationToSheet(team).catch((error: unknown) => {
      console.error('[sheets] Failed to append registration', error);
    });

    res.status(201).json({
      success: true,
      data: {
        team: toPublicTeam(team),
        emailQueued: false,
        message:
          'Team registered. Organisers will confirm by email once SMTP is configured.',
      },
    });
  }
);
