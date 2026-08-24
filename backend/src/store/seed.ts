import type { LeaderboardRecord, StoreData } from '../types.js';

const now = (): string => new Date().toISOString();

const entry = (
  partial: Omit<LeaderboardRecord, 'totalScore' | 'rank' | 'timestamp' | 'id'> & {
    id: string;
  }
): LeaderboardRecord => ({
  ...partial,
  totalScore: partial.time + partial.penaltyPoints * 1000,
  rank: 0,
  timestamp: now(),
});

/** Demo leaderboard + gallery metadata so the UI works without Firebase. */
export const createSeedData = (): StoreData => {
  const round1 = [
    entry({
      id: 'lb-r1-1',
      teamId: 'team-seed-1',
      teamName: 'Circuit Breakers',
      college: 'KLS GIT',
      round: 1,
      time: 92400,
      obstaclesCleared: 6,
      penaltyPoints: 5,
    }),
    entry({
      id: 'lb-r1-2',
      teamId: 'team-seed-2',
      teamName: 'Gear Heads',
      college: 'BVBCET',
      round: 1,
      time: 88100,
      obstaclesCleared: 6,
      penaltyPoints: 10,
    }),
    entry({
      id: 'lb-r1-3',
      teamId: 'team-seed-3',
      teamName: 'Volt Racers',
      college: 'SDMCET',
      round: 1,
      time: 101200,
      obstaclesCleared: 5,
      penaltyPoints: 0,
    }),
    entry({
      id: 'lb-r1-4',
      teamId: 'team-seed-4',
      teamName: 'Torque Titans',
      college: 'KLE Tech',
      round: 1,
      time: 110500,
      obstaclesCleared: 5,
      penaltyPoints: 15,
    }),
    entry({
      id: 'lb-r1-5',
      teamId: 'team-seed-5',
      teamName: 'Pixel Pilots',
      college: 'KLS GIT',
      round: 1,
      time: 97500,
      obstaclesCleared: 6,
      penaltyPoints: 5,
    }),
  ];

  const round2 = [
    entry({
      id: 'lb-r2-1',
      teamId: 'team-seed-1',
      teamName: 'Circuit Breakers',
      college: 'KLS GIT',
      round: 2,
      time: 112300,
      obstaclesCleared: 7,
      penaltyPoints: 5,
    }),
    entry({
      id: 'lb-r2-2',
      teamId: 'team-seed-2',
      teamName: 'Gear Heads',
      college: 'BVBCET',
      round: 2,
      time: 108900,
      obstaclesCleared: 7,
      penaltyPoints: 10,
    }),
    entry({
      id: 'lb-r2-3',
      teamId: 'team-seed-5',
      teamName: 'Pixel Pilots',
      college: 'KLS GIT',
      round: 2,
      time: 121000,
      obstaclesCleared: 6,
      penaltyPoints: 0,
    }),
  ];

  return {
    teams: [
      {
        id: 'team-seed-1',
        name: 'Circuit Breakers',
        college: 'KLS GIT',
        contactEmail: 'circuit@example.com',
        contactPhone: '+91 98765 43210',
        paymentStatus: 'completed',
        registrationDate: now(),
        members: [
          {
            id: 'm1',
            name: 'Asha Kulkarni',
            email: 'asha@example.com',
            phone: '+91 98765 43210',
            role: 'Lead',
          },
          {
            id: 'm2',
            name: 'Rohit Patil',
            email: 'rohit@example.com',
            phone: '+91 98765 43211',
            role: 'Member',
          },
          {
            id: 'm3',
            name: 'Neha Desai',
            email: 'neha@example.com',
            phone: '+91 98765 43212',
            role: 'Member',
          },
        ],
      },
    ],
    leaderboard: [...round1, ...round2],
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
  };
};
