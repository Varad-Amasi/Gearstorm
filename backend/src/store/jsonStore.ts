import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readFileSync,
  renameSync,
  unlinkSync,
  writeFileSync,
} from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import type {
  ContactRecord,
  GalleryRecord,
  StoreData,
  TeamRecord,
} from '../types.js';
import { createSeedData } from './seed.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dirname, '../../data');
const DATA_PATH = join(DATA_DIR, 'store.json');
const DATA_TMP_PATH = join(DATA_DIR, 'store.json.tmp');

const normalizeStore = (raw: unknown): StoreData => {
  const data = (raw ?? {}) as Partial<StoreData> & { leaderboard?: unknown };
  return {
    teams: Array.isArray(data.teams) ? data.teams : [],
    contacts: Array.isArray(data.contacts) ? data.contacts : [],
    gallery: Array.isArray(data.gallery) ? data.gallery : [],
  };
};

const hasLegacyKeys = (raw: unknown): boolean =>
  Boolean(
    raw &&
      typeof raw === 'object' &&
      !Array.isArray(raw) &&
      Object.prototype.hasOwnProperty.call(raw, 'leaderboard')
  );

const readStore = (): StoreData => {
  if (!existsSync(DATA_PATH)) {
    const seeded = createSeedData();
    writeStore(seeded);
    return seeded;
  }

  try {
    const raw = readFileSync(DATA_PATH, 'utf8');
    const parsed: unknown = JSON.parse(raw);
    const normalized = normalizeStore(parsed);
    // Drop removed collections (e.g. legacy leaderboard) from disk once.
    if (hasLegacyKeys(parsed)) {
      writeStore(normalized);
    }
    return normalized;
  } catch (error) {
    console.error('[store] Corrupt store.json — reseeding', error);
    const seeded = createSeedData();
    writeStore(seeded);
    return seeded;
  }
};

/**
 * Atomic-ish write so a crash mid-write cannot leave a half-written store.
 * On Windows, `rename` cannot overwrite an existing destination — fall back to
 * copy + unlink after writing the temp file.
 */
const writeStore = (data: StoreData): void => {
  mkdirSync(DATA_DIR, { recursive: true });
  writeFileSync(DATA_TMP_PATH, JSON.stringify(data, null, 2), 'utf8');
  try {
    renameSync(DATA_TMP_PATH, DATA_PATH);
  } catch {
    copyFileSync(DATA_TMP_PATH, DATA_PATH);
    unlinkSync(DATA_TMP_PATH);
  }
};

const mutate = (updater: (data: StoreData) => StoreData): StoreData => {
  const next = updater(readStore());
  writeStore(next);
  return next;
};

export const store = {
  getAll: (): StoreData => readStore(),

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
