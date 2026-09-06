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

export interface TeamMemberDto {
  id: string;
  name: string;
  email: string;
  phone: string;
  academicYear: string;
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
  paymentUtr: string;
  paymentProofUrl: string;
}
