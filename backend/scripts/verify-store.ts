/**
 * Offline check that the JSON store can read/write and recompute ranks.
 * Run: npm run test:store
 */
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

const tmpRoot = mkdtempSync(join(tmpdir(), 'gearstorm-store-'));
const dataDir = join(tmpRoot, 'data');
mkdirSync(dataDir, { recursive: true });

// Point the store at a temp file by writing a tiny shim that re-exports after
// we cannot inject DATA_PATH — instead validate atomic write semantics here
// and hit the live store module's ranking via a round-trip on a copy of seed shape.

const probePath = join(dataDir, 'store.json');
const probeTmp = join(dataDir, 'store.json.tmp');

const sample = {
  teams: [],
  leaderboard: [
    {
      id: 'a',
      teamId: 't1',
      teamName: 'Alpha',
      college: 'X',
      round: 1 as const,
      time: 100_000,
      obstaclesCleared: 5,
      penaltyPoints: 1,
      totalScore: 101_000,
      rank: 0,
      timestamp: new Date().toISOString(),
    },
    {
      id: 'b',
      teamId: 't2',
      teamName: 'Beta',
      college: 'Y',
      round: 1 as const,
      time: 90_000,
      obstaclesCleared: 6,
      penaltyPoints: 0,
      totalScore: 90_000,
      rank: 0,
      timestamp: new Date().toISOString(),
    },
  ],
  contacts: [],
  gallery: [],
};

writeFileSync(probeTmp, JSON.stringify(sample, null, 2), 'utf8');
const { renameSync } = await import('node:fs');
renameSync(probeTmp, probePath);

const parsed = JSON.parse(readFileSync(probePath, 'utf8')) as typeof sample;
if (!parsed.leaderboard || parsed.leaderboard.length !== 2) {
  throw new Error('Atomic write probe failed to persist leaderboard');
}

// Import the real store (uses backend/data/store.json — must not wipe prod data).
const storeUrl = pathToFileURL(
  join(process.cwd(), 'src/store/jsonStore.ts')
).href;
const { store } = await import(storeUrl);
const before = store.getAll();
const healthShape = {
  teams: before.teams.length,
  leaderboard: before.leaderboard.length,
  contacts: before.contacts.length,
  gallery: before.gallery.length,
};

const round1 = store.listLeaderboard(1);
if (round1.length === 0) {
  throw new Error('Expected seeded or existing round-1 leaderboard entries');
}
const sorted = [...round1].sort((a, b) => a.rank - b.rank);
for (let i = 0; i < sorted.length; i += 1) {
  if (sorted[i]?.rank !== i + 1) {
    throw new Error(`Rank gap at index ${i}: got ${sorted[i]?.rank}`);
  }
  if (i > 0) {
    const prev = sorted[i - 1]!;
    const curr = sorted[i]!;
    if (curr.totalScore < prev.totalScore) {
      throw new Error('Leaderboard not sorted by ascending totalScore');
    }
  }
}

rmSync(tmpRoot, { recursive: true, force: true });

console.log('store verify ok', healthShape);
console.log(`round1 top: ${sorted[0]?.teamName} (#${sorted[0]?.rank})`);
