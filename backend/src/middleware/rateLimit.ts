import type { NextFunction, Request, Response } from 'express';
import { HttpError } from './errorHandler.js';

interface Bucket {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, Bucket>();

/**
 * Simple in-memory rate limiter for public POST endpoints.
 * Suitable for a single Node process (Railway/VPS). Not shared across replicas.
 */
export const rateLimit = (
  options: { windowMs: number; max: number; keyPrefix: string }
) => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const ip =
      (typeof req.headers['x-forwarded-for'] === 'string'
        ? req.headers['x-forwarded-for'].split(',')[0]?.trim()
        : undefined) ||
      req.socket.remoteAddress ||
      'unknown';
    const key = `${options.keyPrefix}:${ip}`;
    const now = Date.now();
    const existing = buckets.get(key);

    if (!existing || existing.resetAt <= now) {
      buckets.set(key, { count: 1, resetAt: now + options.windowMs });
      next();
      return;
    }

    if (existing.count >= options.max) {
      next(
        new HttpError(
          429,
          'Too many requests. Please wait a minute and try again.'
        )
      );
      return;
    }

    existing.count += 1;
    next();
  };
};
