import {
  existsSync,
  mkdirSync,
  readFileSync,
  renameSync,
  writeFileSync,
} from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import type {
  ContactRecord,
  GalleryRecord,
  LeaderboardRecord,
  StoreData,
  TeamRecord,
} from '../types.js';
import { createSeedData } from './seed.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dirname, '../../data');
const DATA_PATH = join(DATA_DIR, 'store.json');
const DATA_TMP_PATH = join(DATA_DIR, 'store.json.tmp');

const rankRound = (
  entries: LeaderboardRecord[],
  round: 1 | 2
): LeaderboardRecord[] => {
  const ranked = entries
    .filter((entry) => entry.round === round)
    .sort((a, b) => {
      if (a.totalScore !== b.totalScore) {
        return a.totalScore - b.totalScore;
      }
      if (a.time !== b.time) {
        return a.time - b.time;
      }
      return a.teamName.localeCompare(b.teamName);
    })
    .map((entry, index) => ({ ...entry, rank: index + 1 }));

  const others = entries.filter((entry) => entry.round !== round);
  return [...others, ...ranked];
};

const recomputeRanks = (data: StoreData): StoreData => ({
  ...data,
  leaderboard: rankRound(rankRound(data.leaderboard, 1), 2),
});

const readStore = (): StoreData => {
  if (!existsSync(DATA_PATH)) {
    const seeded = recomputeRanks(createSeedData());
    writeStore(seeded);
    return seeded;
  }

  try {
    const raw = readFileSync(DATA_PATH, 'utf8');
    return recomputeRanks(JSON.parse(raw) as StoreData);
  } catch (error) {
    console.error('[store] Corrupt store.json — reseeding', error);
    const seeded = recomputeRanks(createSeedData());
    writeStore(seeded);
    return seeded;
  }
};

/** Atomic write so a crash mid-write cannot leave a half-written store. */
const writeStore = (data: StoreData): void => {
  mkdirSync(DATA_DIR, { recursive: true });
  writeFileSync(DATA_TMP_PATH, JSON.stringify(data, null, 2), 'utf8');
  renameSync(DATA_TMP_PATH, DATA_PATH);
};

const mutate = (updater: (data: StoreData) => StoreData): StoreData => {
  const next = recomputeRanks(updater(readStore()));
  writeStore(next);
  return next;
};

export const store = {
  getAll: (): StoreData => readStore(),

  listLeaderboard: (round: 1 | 2): LeaderboardRecord[] =>
    readStore()
      .leaderboard.filter((entry) => entry.round === round)
      .sort((a, b) => a.rank - b.rank),

  getLeaderboardByTeam: (teamId: string): LeaderboardRecord[] =>
    readStore().leaderboard.filter((entry) => entry.teamId === teamId),

  addLeaderboardEntry: (
    entry: Omit<LeaderboardRecord, 'rank' | 'totalScore'> & {
      totalScore?: number;
    }
  ): LeaderboardRecord => {
    const totalScore =
      entry.totalScore ?? entry.time + entry.penaltyPoints * 1000;
    let created: LeaderboardRecord | null = null;

    mutate((data) => {
      created = { ...entry, totalScore, rank: 0 };
      return {
        ...data,
        leaderboard: [
          ...data.leaderboard.filter(
            (row) => !(row.teamId === entry.teamId && row.round === entry.round)
          ),
          created,
        ],
      };
    });

    const saved = store
      .listLeaderboard(entry.round)
      .find((row) => row.teamId === entry.teamId);

    if (!saved) {
      throw new Error('Failed to persist leaderboard entry');
    }
    return saved;
  },

  listTeams: (college?: string): TeamRecord[] => {
    const teams = readStore().teams;
    if (!college) {
      return teams;
    }
    const needle = college.toLowerCase();
    return teams.filter((team) => team.college.toLowerCase().includes(needle));
  },

  getTeam: (teamId: string): TeamRecord | undefined =>
    readStore().teams.find((team) => team.id === teamId),

  addTeam: (team: TeamRecord): TeamRecord => {
    mutate((data) => ({ ...data, teams: [...data.teams, team] }));
    return team;
  },

  addContact: (contact: ContactRecord): ContactRecord => {
    mutate((data) => ({
      ...data,
      contacts: [contact, ...data.contacts],
    }));
    return contact;
  },

  listGallery: (): GalleryRecord[] =>
    [...readStore().gallery].sort((a, b) =>
      b.uploadedAt.localeCompare(a.uploadedAt)
    ),

  addGalleryItem: (item: GalleryRecord): GalleryRecord => {
    mutate((data) => ({
      ...data,
      gallery: [item, ...data.gallery],
    }));
    return item;
  },
};
