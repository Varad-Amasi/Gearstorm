export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}

export type { GalleryImage, Team, TeamMember } from './models';
