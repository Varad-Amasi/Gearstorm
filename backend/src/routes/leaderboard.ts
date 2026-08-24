import { Router } from 'express';
import { randomUUID } from 'node:crypto';
import {
  HttpError,
  requireAdmin,
  validateBody,
} from '../middleware/errorHandler.js';
import { leaderboardSubmitSchema } from '../schemas/index.js';
import { store } from '../store/jsonStore.js';

export const leaderboardRouter = Router();

leaderboardRouter.get('/', (req, res) => {
  const roundParam = req.query.round;
  const round =
    roundParam === '2' ? 2 : roundParam === '1' ? 1 : Number.NaN;
  if (round !== 1 && round !== 2) {
    throw new HttpError(400, 'Query param "round" must be 1 or 2');
  }

  const limit = Math.min(
    Math.max(Number(req.query.limit ?? 50) || 50, 1),
    100
  );
  const college =
    typeof req.query.college === 'string' ? req.query.college.trim() : '';
  const search =
    typeof req.query.search === 'string'
      ? req.query.search.trim().toLowerCase()
      : '';

  let entries = store.listLeaderboard(round);
  if (college) {
    const needle = college.toLowerCase();
    entries = entries.filter((entry) =>
      entry.college.toLowerCase().includes(needle)
    );
  }
  if (search) {
    entries = entries.filter((entry) =>
      entry.teamName.toLowerCase().includes(search)
    );
  }

  res.json({
    success: true,
    data: {
      round,
      entries: entries.slice(0, limit),
      total: entries.length,
      updatedAt: new Date().toISOString(),
    },
  });
});

leaderboardRouter.get('/:teamId', (req, res) => {
  const teamId = req.params.teamId ?? '';
  const entries = store.getLeaderboardByTeam(teamId);
  if (entries.length === 0) {
    throw new HttpError(404, 'No scores found for that team');
  }
  res.json({ success: true, data: entries });
});

leaderboardRouter.post(
  '/',
  requireAdmin,
  validateBody(leaderboardSubmitSchema),
  (req, res) => {
    const body = req.body as {
      teamId: string;
      teamName: string;
      college: string;
      round: 1 | 2;
      time: number;
      obstaclesCleared: number;
      penaltyPoints: number;
    };

    const saved = store.addLeaderboardEntry({
      id: randomUUID(),
      ...body,
      timestamp: new Date().toISOString(),
    });

    res.status(201).json({ success: true, data: saved });
  }
);
