import { describe, expect, it } from 'vitest';
import { contactSchema } from '@/schemas/contactSchema';
import { emptyMember, registrationSchema } from '@/schemas/registrationSchema';

describe('contactSchema', () => {
  it('accepts a valid message', () => {
    const result = contactSchema.safeParse({
      name: 'Asha Kulkarni',
      email: 'asha@example.com',
      subject: 'Rules question',
      message: 'This message is long enough to pass validation.',
    });
    expect(result.success).toBe(true);
  });

  it('rejects short messages and invalid emails', () => {
    const result = contactSchema.safeParse({
      name: 'A',
      email: 'not-an-email',
      subject: 'Hi',
      message: 'Too short',
    });
    expect(result.success).toBe(false);
  });
});

describe('registrationSchema', () => {
  const validMember = {
    name: 'Member Name',
    email: 'member@example.com',
    phone: '+91 90000 11111',
    role: 'Member' as const,
  };

  it('accepts a valid 3-member team with one Lead', () => {
    const result = registrationSchema.safeParse({
      teamName: 'Circuit Breakers',
      college: 'KLS GIT',
      contactEmail: 'lead@example.com',
      contactPhone: '+91 90000 11111',
      members: [
        { ...validMember, name: 'Lead One', role: 'Lead' },
        { ...validMember, email: 'm2@example.com' },
        { ...validMember, email: 'm3@example.com' },
      ],
    });
    expect(result.success).toBe(true);
  });

  it('rejects teams without exactly one Lead', () => {
    const result = registrationSchema.safeParse({
      teamName: 'No Lead',
      college: 'KLS GIT',
      contactEmail: 'lead@example.com',
      contactPhone: '+91 90000 11111',
      members: [validMember, validMember, validMember],
    });
    expect(result.success).toBe(false);
  });

  it('rejects teams below the minimum size', () => {
    const result = registrationSchema.safeParse({
      teamName: 'Tiny',
      college: 'KLS GIT',
      contactEmail: 'lead@example.com',
      contactPhone: '+91 90000 11111',
      members: [{ ...validMember, role: 'Lead' }, validMember],
    });
    expect(result.success).toBe(false);
  });

  it('emptyMember returns a Member-shaped blank row', () => {
    expect(emptyMember()).toEqual({
      name: '',
      email: '',
      phone: '',
      role: 'Member',
    });
  });
});
