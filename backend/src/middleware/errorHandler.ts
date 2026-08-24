import type { NextFunction, Request, Response } from 'express';
import type { ZodSchema } from 'zod';
import type { ApiFailure } from '../types.js';

export class HttpError extends Error {
  status: number;
  details?: unknown;

  constructor(status: number, message: string, details?: unknown) {
    super(message);
    this.status = status;
    this.details = details;
  }
}

/**
 * Admin routes require `x-admin-key`.
 * - Development: falls back to `dev-admin-key` if unset (local convenience).
 * - Production: fails closed when `ADMIN_API_KEY` is missing.
 */
export const requireAdmin = (
  req: Request,
  _res: Response,
  next: NextFunction
): void => {
  const configured = process.env.ADMIN_API_KEY?.trim();
  const isProd = process.env.NODE_ENV === 'production';

  if (!configured) {
    if (isProd) {
      next(
        new HttpError(
          500,
          'ADMIN_API_KEY is not configured on the server'
        )
      );
      return;
    }
  }

  const expected = configured || 'dev-admin-key';
  const provided = req.header('x-admin-key');
  if (provided !== expected) {
    next(new HttpError(401, 'Admin API key required'));
    return;
  }
  next();
};

export const validateBody =
  <T>(schema: ZodSchema<T>) =>
  (req: Request, _res: Response, next: NextFunction): void => {
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
      next(new HttpError(400, 'Validation failed', parsed.error.flatten()));
      return;
    }
    req.body = parsed.data;
    next();
  };

export const errorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  if (err instanceof HttpError) {
    const body: ApiFailure = {
      success: false,
      error: err.message,
      ...(err.details !== undefined ? { details: err.details } : {}),
    };
    res.status(err.status).json(body);
    return;
  }

  console.error('[API]', err);
  const body: ApiFailure = {
    success: false,
    error: 'Internal server error',
  };
  res.status(500).json(body);
};
