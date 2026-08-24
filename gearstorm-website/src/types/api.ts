export interface ApiSuccess<T> {
  success: true;
  data: T;
}

export interface ApiFailure {
  success: false;
  error: string;
  details?: unknown;
}

export type ApiResponse<T> = ApiSuccess<T> | ApiFailure;

export interface LeaderboardEntryDto {
  id: string;
  teamId: string;
  teamName: string;
  college: string;
  round: 1 | 2;
  time: number;
  obstaclesCleared: number;
  penaltyPoints: number;
  totalScore: number;
  rank: number;
  timestamp: string;
}

export interface LeaderboardListDto {
  round: 1 | 2;
  entries: LeaderboardEntryDto[];
  total: number;
  updatedAt: string;
}

export interface TeamMemberDto {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'Lead' | 'Member';
}

/** Public team summary returned by unauthenticated team endpoints. */
export interface PublicTeamDto {
  id: string;
  name: string;
  college: string;
  paymentStatus: 'pending' | 'completed';
  registrationDate: string;
  memberCount: number;
}

/** Full team record (admin-only). */
export interface TeamDto extends PublicTeamDto {
  members: TeamMemberDto[];
  contactEmail: string;
  contactPhone: string;
}

export interface GalleryImageDto {
  id: string;
  imageUrl: string;
  alt: string;
  category: string;
  year: number;
  caption: string;
  uploadedAt: string;
}
