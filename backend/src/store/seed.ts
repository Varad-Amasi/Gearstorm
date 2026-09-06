import type { StoreData } from '../types.js';

const now = (): string => new Date().toISOString();

/** Demo teams + gallery metadata so the UI works without a live sheet. */
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
  gallery: [
    {
      id: 'gal-1',
      imageUrl: '/gallery/build-01.svg',
      alt: 'Compact four-wheel competition bot on a workbench',
      category: 'Builds',
      year: 2025,
      caption: 'Prototype chassis ahead of technical inspection',
      uploadedAt: now(),
    },
    {
      id: 'gal-2',
      imageUrl: '/gallery/course-01.svg',
      alt: 'Obstacle course lane with gates and a ramp',
      category: 'Course',
      year: 2025,
      caption: 'Qualifier lane layout',
      uploadedAt: now(),
    },
    {
      id: 'gal-3',
      imageUrl: '/gallery/team-01.svg',
      alt: 'Student team gathered around their robot',
      category: 'Teams',
      year: 2025,
      caption: 'Pit-area strategy huddle',
      uploadedAt: now(),
    },
    {
      id: 'gal-4',
      imageUrl: '/gallery/awards-01.svg',
      alt: 'Trophy and medals on a presentation table',
      category: 'Awards',
      year: 2024,
      caption: 'Prize presentation',
      uploadedAt: now(),
    },
  ],
});
