import { create } from 'zustand';
import type { LeaderboardEntryDto } from '@/types/api';

export type LeaderboardRound = 1 | 2;

interface LeaderboardState {
  selectedRound: LeaderboardRound;
  search: string;
  college: string;
  /**
   * Entry ids seen per query key (`round|search|college`), used to badge
   * newcomers without false positives when switching filters.
   */
  knownByKey: Record<string, string[]>;
  setSelectedRound: (round: LeaderboardRound) => void;
  setSearch: (search: string) => void;
  setCollege: (college: string) => void;
  rememberIds: (
    key: string,
    entries: readonly LeaderboardEntryDto[]
  ) => string[];
}

export const useLeaderboardStore = create<LeaderboardState>((set, get) => ({
  selectedRound: 1,
  search: '',
  college: '',
  knownByKey: {},
  setSelectedRound: (round) => set({ selectedRound: round }),
  setSearch: (search) => set({ search }),
  setCollege: (college) => set({ college }),
  rememberIds: (key, entries) => {
    const { knownByKey } = get();
    const knownIds = knownByKey[key] ?? [];
    const ids = entries.map((entry) => entry.id);

    if (knownIds.length === 0) {
      set({ knownByKey: { ...knownByKey, [key]: ids } });
      return [];
    }

    const newcomers = ids.filter((id) => !knownIds.includes(id));
    const merged = Array.from(new Set([...knownIds, ...ids])).slice(-200);
    set({ knownByKey: { ...knownByKey, [key]: merged } });
    return newcomers;
  },
}));
