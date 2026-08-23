export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}

export type {
  GalleryImage,
  LeaderboardEntry,
  Team,
  TeamMember,
} from './models';
