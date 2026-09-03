import { Router } from 'express';
import { randomUUID } from 'node:crypto';
import { unlink } from 'node:fs/promises';
import { HttpError, requireAdmin } from '../middleware/errorHandler.js';
import { rateLimit } from '../middleware/rateLimit.js';
import { singleImageUpload } from '../middleware/upload.js';
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

/** Public team shape — no emails/phones/proof URLs. */
const toPublicTeam = (team: TeamRecord) => ({
  id: team.id,
  name: team.name,
  college: team.college,
  paymentStatus: team.paymentStatus,
  registrationDate: team.registrationDate,
  memberCount: team.members.length,
});

const parseMembersField = (raw: unknown): unknown => {
  if (typeof raw !== 'string') {
    return raw;
  }
  try {
    return JSON.parse(raw) as unknown;
  } catch {
    throw new HttpError(400, 'members must be a valid JSON array');
  }
};

const removeUploadedFile = (file: Express.Multer.File | undefined): void => {
  if (!file?.path) {
    return;
  }
  void unlink(file.path).catch((error: unknown) => {
    console.error('[upload] Failed to remove orphaned file', file.path, error);
  });
};

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
  (req, res, next) => {
    singleImageUpload('paymentProof')(req, res, (err: unknown) => {
      if (err) {
        next(
          new HttpError(
            400,
            err instanceof Error ? err.message : 'Payment proof upload failed'
          )
        );
        return;
      }
      next();
    });
  },
  (req, res) => {
    if (!req.file) {
      throw new HttpError(
        400,
        'Payment proof image is required (field name: paymentProof)'
      );
    }

    const parsed = registerTeamSchema.safeParse({
      ...req.body,
      members: parseMembersField(req.body.members),
    });
    if (!parsed.success) {
      removeUploadedFile(req.file);
      throw new HttpError(400, 'Validation failed', parsed.error.flatten());
    }

    const body = parsed.data;

    const duplicate = store
      .listTeams()
      .some((team) => team.name.toLowerCase() === body.teamName.toLowerCase());
    if (duplicate) {
      removeUploadedFile(req.file);
      throw new HttpError(409, 'A team with that name is already registered');
    }

    const members: TeamMemberRecord[] = body.members.map((member) => ({
      id: randomUUID(),
      ...member,
    }));

    const lead = members[0];
    if (!lead) {
      removeUploadedFile(req.file);
      throw new HttpError(400, 'Team lead is required');
    }

    const team: TeamRecord = {
      id: randomUUID(),
      name: body.teamName,
      college: body.college,
      contactEmail: body.contactEmail,
      contactPhone: body.contactPhone,
      paymentUtr: body.paymentUtr,
      paymentProofUrl: `/uploads/${req.file.filename}`,
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
          'Team registered. Organisers will confirm payment using UTR and proof.',
      },
    });
  }
);
