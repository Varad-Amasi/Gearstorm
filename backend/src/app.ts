import cors from 'cors';
import express from 'express';
import {
  createCorsOriginChecker,
  parseCorsOrigins,
} from './middleware/corsOrigin.js';
import { errorHandler } from './middleware/errorHandler.js';
import { contactRouter } from './routes/contact.js';
import { galleryRouter, UPLOADS_DIR } from './routes/gallery.js';
import { leaderboardRouter } from './routes/leaderboard.js';
import { teamsRouter } from './routes/teams.js';
import { store } from './store/jsonStore.js';

export const createApp = (): express.Express => {
  const app = express();
  const allowedOrigins = parseCorsOrigins(process.env.CORS_ORIGIN);

  app.use(
    cors({
      origin: createCorsOriginChecker(allowedOrigins),
      methods: ['GET', 'POST', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'x-admin-key'],
    })
  );
  app.use(express.json({ limit: '1mb' }));
  app.use('/uploads', express.static(UPLOADS_DIR));

  app.get('/api/health', (_req, res) => {
    const data = store.getAll();
    res.json({
      success: true,
      data: {
        status: 'ok',
        service: 'gearstorm-api',
        persistence: 'json-file',
        counts: {
          teams: data.teams.length,
          leaderboard: data.leaderboard.length,
          contacts: data.contacts.length,
          gallery: data.gallery.length,
        },
      },
    });
  });

  app.use('/api/leaderboard', leaderboardRouter);
  app.use('/api/teams', teamsRouter);
  app.use('/api/contact', contactRouter);
  app.use('/api/gallery', galleryRouter);

  app.use(errorHandler);
  return app;
};
