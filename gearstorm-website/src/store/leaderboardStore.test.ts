import { beforeEach, describe, expect, it } from 'vitest';
import { useLeaderboardStore } from '@/store/leaderboardStore';
import type { LeaderboardEntryDto } from '@/types/api';

const entry = (
  id: string,
  overrides: Partial<LeaderboardEntryDto> = {}
): LeaderboardEntryDto => ({
  id,
  teamId: `team-${id}`,
  teamName: `Team ${id}`,
  college: 'KLS GIT',
  round: 1,
  time: 90_000,
  obstaclesCleared: 5,
  penaltyPoints: 0,
  totalScore: 90_000,
  rank: 1,
  timestamp: new Date().toISOString(),
  ...overrides,
});

describe('useLeaderboardStore', () => {
  beforeEach(() => {
    useLeaderboardStore.setState({
      selectedRound: 1,
      search: '',
      college: '',
      knownByKey: {},
    });
  });

  it('baselines known ids without marking newcomers', () => {
    const newcomers = useLeaderboardStore
      .getState()
      .rememberIds('1||', [entry('a'), entry('b')]);
    expect(newcomers).toEqual([]);
  });

  it('flags only new ids on later polls for the same key', () => {
    const { rememberIds } = useLeaderboardStore.getState();
    rememberIds('1||', [entry('a')]);
    const newcomers = rememberIds('1||', [entry('a'), entry('c')]);
    expect(newcomers).toEqual(['c']);
  });

  it('scopes known ids per filter key', () => {
    const { rememberIds } = useLeaderboardStore.getState();
    rememberIds('1||', [entry('a')]);
    const round2New = rememberIds('2||', [entry('a')]);
    expect(round2New).toEqual([]);
  });
});
