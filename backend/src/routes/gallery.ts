import { Router } from 'express';
import { randomUUID } from 'node:crypto';
import { mkdirSync } from 'node:fs';
import { dirname, extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import multer from 'multer';
import { HttpError, requireAdmin } from '../middleware/errorHandler.js';
import { galleryMetaSchema } from '../schemas/index.js';
import { store } from '../store/jsonStore.js';
import type { GalleryRecord } from '../types.js';

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

const upload = multer({
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

export const galleryRouter = Router();

galleryRouter.get('/', (_req, res) => {
  res.json({ success: true, data: store.listGallery() });
});

galleryRouter.post(
  '/',
  requireAdmin,
  (req, res, next) => {
    upload.single('image')(req, res, (err: unknown) => {
      if (err) {
        next(
          new HttpError(
            400,
            err instanceof Error ? err.message : 'Upload failed'
          )
        );
        return;
      }
      next();
    });
  },
  (req, res) => {
    if (!req.file) {
      throw new HttpError(400, 'Image file is required (field name: image)');
    }

    const parsed = galleryMetaSchema.safeParse(req.body);
    if (!parsed.success) {
      throw new HttpError(400, 'Validation failed', parsed.error.flatten());
    }

    const item: GalleryRecord = {
      id: randomUUID(),
      imageUrl: `/uploads/${req.file.filename}`,
      alt: parsed.data.alt,
      category: parsed.data.category,
      year: parsed.data.year,
      caption: parsed.data.caption,
      uploadedAt: new Date().toISOString(),
    };

    store.addGalleryItem(item);
    res.status(201).json({ success: true, data: item });
  }
);
