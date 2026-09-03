export interface TeamMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'Lead' | 'Member';
}

export interface Team {
  id: string;
  name: string;
  college: string;
  members: TeamMember[];
  registrationDate: Date;
  paymentStatus: 'pending' | 'completed';
  contactEmail: string;
  contactPhone: string;
}

export interface GalleryImage {
  id: string;
  imageUrl: string;
  alt: string;
  category: string;
  year: number;
  uploadedAt: Date;
}
