import { API_ENDPOINTS } from '@/config/api';
import { apiClient, unwrap } from '@/services/apiClient';
import type {
  ApiResponse,
  LeaderboardEntryDto,
  LeaderboardListDto,
} from '@/types/api';

export interface LeaderboardQuery {
  round: 1 | 2;
  limit?: number;
  search?: string;
  college?: string;
}

export const fetchLeaderboard = async (
  query: LeaderboardQuery
): Promise<LeaderboardListDto> => {
  const { data } = await apiClient.get<ApiResponse<LeaderboardListDto>>(
    API_ENDPOINTS.LEADERBOARD,
    {
      params: {
        round: query.round,
        limit: query.limit ?? 50,
        ...(query.search ? { search: query.search } : {}),
        ...(query.college ? { college: query.college } : {}),
      },
    }
  );
  return unwrap(data);
};

export const fetchTeamScores = async (
  teamId: string
): Promise<LeaderboardEntryDto[]> => {
  const { data } = await apiClient.get<ApiResponse<LeaderboardEntryDto[]>>(
    `${API_ENDPOINTS.LEADERBOARD}/${teamId}`
  );
  return unwrap(data);
};
