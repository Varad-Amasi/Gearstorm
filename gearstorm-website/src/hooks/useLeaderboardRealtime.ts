import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { fetchLeaderboard } from '@/services/leaderboardService';
import {
  useLeaderboardStore,
  type LeaderboardRound,
} from '@/store/leaderboardStore';
import type { LeaderboardListDto } from '@/types/api';

const POLL_MS = 30_000;

export type LeaderboardRealtimeResult = UseQueryResult<
  LeaderboardListDto,
  Error
> & {
  newIds: string[];
};

/**
 * Loads leaderboard data for a round and refreshes every 30s (plan risk
 * mitigation vs. costly Firestore listeners).
 */
export const useLeaderboardRealtime = (
  round: LeaderboardRound,
  search: string,
  college: string
): LeaderboardRealtimeResult => {
  const rememberIds = useLeaderboardStore((state) => state.rememberIds);
  const [newIds, setNewIds] = useState<string[]>([]);
  const queryKey = `${round}|${search}|${college}`;

  const query = useQuery({
    queryKey: ['leaderboard', round, search, college],
    queryFn: () =>
      fetchLeaderboard({
        round,
        search: search || undefined,
        college: college || undefined,
        limit: 50,
      }),
    refetchInterval: POLL_MS,
    staleTime: 10_000,
  });

  useEffect(() => {
    if (query.data?.entries) {
      setNewIds(rememberIds(queryKey, query.data.entries));
    } else {
      setNewIds([]);
    }
  }, [query.data, queryKey, rememberIds]);

  return {
    ...query,
    newIds,
  };
};
