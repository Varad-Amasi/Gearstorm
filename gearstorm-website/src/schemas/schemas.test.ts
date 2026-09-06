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
    academicYear: '3rd Year' as const,
  };

  const paymentProof = (): File =>
    new File(['fake-proof'], 'upi-proof.jpg', { type: 'image/jpeg' });

  const paymentFields = {
    paymentUtr: '123456789012',
    paymentProof: paymentProof(),
  };

  it('accepts a valid 3-member team from KLS GIT', () => {
    const result = registrationSchema.safeParse({
      teamName: 'Circuit Breakers',
      collegeChoice: 'KLS GIT',
      collegeOther: '',
      ...paymentFields,
      members: [
        { ...validMember, name: 'Lead One' },
        { ...validMember, email: 'm2@example.com' },
        { ...validMember, email: 'm3@example.com' },
      ],
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.college).toBe('KLS GIT');
      expect(result.data.members[0]?.role).toBe('Lead');
      expect(result.data.members[0]?.academicYear).toBe('3rd Year');
      expect(result.data.members[1]?.role).toBe('Member');
    }
  });

  it('uses the custom college name when Other is selected', () => {
    const result = registrationSchema.safeParse({
      teamName: 'Visitors',
      collegeChoice: 'Other',
      collegeOther: 'RVCE Bengaluru',
      ...paymentFields,
      members: [
        validMember,
        { ...validMember, email: 'm2@example.com' },
        { ...validMember, email: 'm3@example.com' },
      ],
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.college).toBe('RVCE Bengaluru');
    }
  });

  it('rejects Other without a college name', () => {
    const result = registrationSchema.safeParse({
      teamName: 'Visitors',
      collegeChoice: 'Other',
      collegeOther: '',
      ...paymentFields,
      members: [
        validMember,
        { ...validMember, email: 'm2@example.com' },
        { ...validMember, email: 'm3@example.com' },
      ],
    });
    expect(result.success).toBe(false);
  });

  it('rejects when academic year is missing', () => {
    const result = registrationSchema.safeParse({
      teamName: 'Circuit Breakers',
      collegeChoice: 'KLS GIT',
      collegeOther: '',
      ...paymentFields,
      members: [
        {
          name: 'Lead One',
          email: 'lead@example.com',
          phone: '+91 90000 11111',
        },
        { ...validMember, email: 'm2@example.com' },
        { ...validMember, email: 'm3@example.com' },
      ],
    });
    expect(result.success).toBe(false);
  });

  it('rejects teams below the minimum size', () => {
    const result = registrationSchema.safeParse({
      teamName: 'Tiny',
      collegeChoice: 'KLS GIT',
      collegeOther: '',
      ...paymentFields,
      members: [validMember, validMember],
    });
    expect(result.success).toBe(false);
  });

  it('emptyMember / emptyLead return blank role rows', () => {
    expect(emptyMember()).toEqual({
      name: '',
      email: '',
      phone: '',
      academicYear: '',
      role: 'Member',
    });
    expect(emptyLead()).toEqual({
      name: '',
      email: '',
      phone: '',
      academicYear: '',
      role: 'Lead',
    });
  });
});
