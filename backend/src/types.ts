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

export interface TeamMemberRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'Lead' | 'Member';
}

export interface TeamRecord {
  id: string;
  name: string;
  college: string;
  members: TeamMemberRecord[];
  registrationDate: string;
  paymentStatus: 'pending' | 'completed';
  contactEmail: string;
  contactPhone: string;
}

export interface LeaderboardRecord {
  id: string;
  teamId: string;
  teamName: string;
  college: string;
  round: 1 | 2;
  /** Raw finish time in milliseconds. */
  time: number;
  obstaclesCleared: number;
  /** Penalty seconds added to the clock. */
  penaltyPoints: number;
  /** Adjusted time in ms (time + penaltyPoints * 1000). Lower ranks better. */
  totalScore: number;
  rank: number;
  timestamp: string;
}

export interface ContactRecord {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

export interface GalleryRecord {
  id: string;
  imageUrl: string;
  alt: string;
  category: string;
  year: number;
  caption: string;
  uploadedAt: string;
}

export interface StoreData {
  teams: TeamRecord[];
  leaderboard: LeaderboardRecord[];
  contacts: ContactRecord[];
  gallery: GalleryRecord[];
}
