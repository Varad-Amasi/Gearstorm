export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}

export type { Team, TeamMember } from './models';
