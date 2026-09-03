import { Router } from 'express';
import { randomUUID } from 'node:crypto';
import { HttpError, requireAdmin } from '../middleware/errorHandler.js';
import { singleImageUpload, UPLOADS_DIR } from '../middleware/upload.js';
import { galleryMetaSchema } from '../schemas/index.js';
import { store } from '../store/jsonStore.js';
import type { GalleryRecord } from '../types.js';

export { UPLOADS_DIR };

export const galleryRouter = Router();

galleryRouter.get('/', (_req, res) => {
  res.json({ success: true, data: store.listGallery() });
});

galleryRouter.post(
  '/',
  requireAdmin,
  (req, res, next) => {
    singleImageUpload('image')(req, res, (err: unknown) => {
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
