import { describe, expect, it } from 'vitest';
import { contactSchema } from '@/schemas/contactSchema';
import {
  emptyLead,
  emptyMember,
  registrationSchema,
} from '@/schemas/registrationSchema';

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
  };

  const paymentProof = (): File =>
    new File(['fake-proof'], 'upi-proof.jpg', { type: 'image/jpeg' });

  const paymentFields = {
    paymentUtr: '123456789012',
    paymentProof: paymentProof(),
  };

  it('accepts a valid 3-member team and forces first Lead', () => {
    const result = registrationSchema.safeParse({
      teamName: 'Circuit Breakers',
      college: 'KLS GIT',
      ...paymentFields,
      members: [
        { ...validMember, name: 'Lead One' },
        { ...validMember, email: 'm2@example.com' },
        { ...validMember, email: 'm3@example.com' },
      ],
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.members[0]?.role).toBe('Lead');
      expect(result.data.members[1]?.role).toBe('Member');
      expect(result.data.members[2]?.role).toBe('Member');
    }
  });

  it('forces Lead on first member even if marked Member', () => {
    const result = registrationSchema.safeParse({
      teamName: 'Forced Lead',
      college: 'KLS GIT',
      ...paymentFields,
      members: [
        { ...validMember, role: 'Member' as const },
        {
          ...validMember,
          email: 'm2@example.com',
          role: 'Lead' as const,
        },
        { ...validMember, email: 'm3@example.com' },
      ],
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.members.map((member) => member.role)).toEqual([
        'Lead',
        'Member',
        'Member',
      ]);
    }
  });

  it('rejects teams below the minimum size', () => {
    const result = registrationSchema.safeParse({
      teamName: 'Tiny',
      college: 'KLS GIT',
      ...paymentFields,
      members: [validMember, validMember],
    });
    expect(result.success).toBe(false);
  });

  it('rejects when payment proof is missing', () => {
    const result = registrationSchema.safeParse({
      teamName: 'Circuit Breakers',
      college: 'KLS GIT',
      paymentUtr: '123456789012',
      members: [
        { ...validMember, name: 'Lead One' },
        { ...validMember, email: 'm2@example.com' },
        { ...validMember, email: 'm3@example.com' },
      ],
    });
    expect(result.success).toBe(false);
  });

  it('emptyMember / emptyLead return blank role rows', () => {
    expect(emptyMember()).toEqual({
      name: '',
      email: '',
      phone: '',
      role: 'Member',
    });
    expect(emptyLead()).toEqual({
      name: '',
      email: '',
      phone: '',
      role: 'Lead',
    });
  });
});
