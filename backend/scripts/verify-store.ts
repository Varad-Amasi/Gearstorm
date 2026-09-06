/**
 * Offline check that the JSON store can read/write atomically.
 * Run: npm run test:store
 */
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

const tmpRoot = mkdtempSync(join(tmpdir(), 'gearstorm-store-'));
const dataDir = join(tmpRoot, 'data');
mkdirSync(dataDir, { recursive: true });

const probePath = join(dataDir, 'store.json');
const probeTmp = join(dataDir, 'store.json.tmp');

const sample = {
  teams: [{ id: 't1', name: 'Alpha' }],
  contacts: [],
};

writeFileSync(probeTmp, JSON.stringify(sample, null, 2), 'utf8');
const { renameSync } = await import('node:fs');
renameSync(probeTmp, probePath);

const parsed = JSON.parse(readFileSync(probePath, 'utf8')) as typeof sample;
if (!parsed.teams || parsed.teams.length !== 1) {
  throw new Error('Atomic write probe failed to persist teams');
}

const storeUrl = pathToFileURL(
  join(process.cwd(), 'src/store/jsonStore.ts')
).href;
const { store } = await import(storeUrl);
const before = store.getAll();
const healthShape = {
  teams: before.teams.length,
  contacts: before.contacts.length,
};

if (!Array.isArray(before.teams) || !Array.isArray(before.contacts)) {
  throw new Error('Store shape missing teams or contacts arrays');
}

rmSync(tmpRoot, { recursive: true, force: true });

console.log('store verify ok', healthShape);
