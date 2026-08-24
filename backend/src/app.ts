import cors from 'cors';
import express from 'express';
import { errorHandler } from './middleware/errorHandler.js';
import { contactRouter } from './routes/contact.js';
import { galleryRouter, UPLOADS_DIR } from './routes/gallery.js';
import { leaderboardRouter } from './routes/leaderboard.js';
import { teamsRouter } from './routes/teams.js';

export const createApp = (): express.Express => {
  const app = express();
  const origin = process.env.CORS_ORIGIN ?? 'http://localhost:5173';

  app.use(
    cors({
      origin,
      methods: ['GET', 'POST', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'x-admin-key'],
    })
  );
  app.use(express.json({ limit: '1mb' }));
  app.use('/uploads', express.static(UPLOADS_DIR));

  app.get('/api/health', (_req, res) => {
    res.json({
      success: true,
      data: { status: 'ok', service: 'gearstorm-api' },
    });
  });

  app.use('/api/leaderboard', leaderboardRouter);
  app.use('/api/teams', teamsRouter);
  app.use('/api/contact', contactRouter);
  app.use('/api/gallery', galleryRouter);

  app.use(errorHandler);
  return app;
};
