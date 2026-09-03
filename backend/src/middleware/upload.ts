import { randomUUID } from 'node:crypto';
import { mkdirSync } from 'node:fs';
import { dirname, extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import multer from 'multer';
import type { RequestHandler } from 'express';

const __dirname = dirname(fileURLToPath(import.meta.url));
export const UPLOADS_DIR = join(__dirname, '../../uploads');

mkdirSync(UPLOADS_DIR, { recursive: true });

const ALLOWED_MIME = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
]);

const EXT_BY_MIME: Record<string, string> = {
  'image/jpeg': '.jpg',
  'image/png': '.png',
  'image/webp': '.webp',
  'image/gif': '.gif',
};

const imageUpload = multer({
  storage: multer.diskStorage({
    destination: UPLOADS_DIR,
    filename: (_req, file, cb) => {
      const fromMime = EXT_BY_MIME[file.mimetype];
      const fromName = extname(file.originalname).toLowerCase();
      const safeExt =
        fromMime ??
        (['.jpg', '.jpeg', '.png', '.webp', '.gif'].includes(fromName)
          ? fromName
          : '.bin');
      cb(null, `${Date.now()}_${randomUUID()}${safeExt}`);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (!ALLOWED_MIME.has(file.mimetype)) {
      cb(new Error('Only JPEG, PNG, WebP, or GIF images are allowed'));
      return;
    }
    cb(null, true);
  },
});

/** Single-image multipart field (JPEG/PNG/WebP/GIF, max 5 MB). */
export const singleImageUpload = (fieldName: string): RequestHandler =>
  imageUpload.single(fieldName);
