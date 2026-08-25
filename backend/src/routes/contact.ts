import { Router } from 'express';
import { randomUUID } from 'node:crypto';
import { validateBody } from '../middleware/errorHandler.js';
import { rateLimit } from '../middleware/rateLimit.js';
import { contactSchema } from '../schemas/index.js';
import { store } from '../store/jsonStore.js';
import type { ContactRecord } from '../types.js';

export const contactRouter = Router();

const contactLimit = rateLimit({
  windowMs: 60_000,
  max: 10,
  keyPrefix: 'contact-post',
});

contactRouter.post(
  '/',
  contactLimit,
  validateBody(contactSchema),
  (req, res) => {
  const body = req.body as {
    name: string;
    email: string;
    subject: string;
    message: string;
  };

  const contact: ContactRecord = {
    id: randomUUID(),
    ...body,
    createdAt: new Date().toISOString(),
  };

  store.addContact(contact);
  console.info(
    `[contact] ${contact.name} <${contact.email}> — ${contact.subject}`
  );

  res.status(201).json({
    success: true,
    data: {
      id: contact.id,
      message: 'Message received. The organising team will follow up by email.',
    },
  });
  }
);
