import type { StoreData } from '../types.js';

const now = (): string => new Date().toISOString();

/** Demo team so the API has a shape to show without a live sheet. */
export const createSeedData = (): StoreData => ({
  teams: [
    {
      id: 'team-seed-1',
      name: 'Circuit Breakers',
      college: 'KLS GIT',
      contactEmail: 'circuit@example.com',
      contactPhone: '+91 98765 43210',
      paymentStatus: 'completed',
      paymentUtr: 'SEED-UTR-0001',
      paymentProofUrl: '/uploads/seed-payment-proof.jpg',
      registrationDate: now(),
      members: [
        {
          id: 'm1',
          name: 'Asha Kulkarni',
          email: 'asha@example.com',
          phone: '+91 98765 43210',
          academicYear: '4th Year',
          role: 'Lead',
        },
        {
          id: 'm2',
          name: 'Rohit Patil',
          email: 'rohit@example.com',
          phone: '+91 98765 43211',
          academicYear: '3rd Year',
          role: 'Member',
        },
        {
          id: 'm3',
          name: 'Neha Desai',
          email: 'neha@example.com',
          phone: '+91 98765 43212',
          academicYear: '3rd Year',
          role: 'Member',
        },
      ],
    },
  ],
  contacts: [],
});
