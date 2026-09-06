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
  academicYear: string;
  role: 'Lead' | 'Member';
}

export interface TeamRecord {
  id: string;
  name: string;
  college: string;
  members: TeamMemberRecord[];
  registrationDate: string;
  paymentStatus: 'pending' | 'completed';
  /** UTR / UPI transaction reference from the registrant. */
  paymentUtr: string;
  /** Stored screenshot path served from `/uploads/...`. */
  paymentProofUrl: string;
  contactEmail: string;
  contactPhone: string;
}

export interface ContactRecord {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

export interface StoreData {
  teams: TeamRecord[];
  contacts: ContactRecord[];
}
