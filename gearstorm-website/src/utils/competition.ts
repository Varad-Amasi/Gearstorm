/**
 * Provisional competition limits used across Bot Specs, Rules, and Home.
 * Values mirror the published Home copy and are subject to organizer confirmation.
 */
export const COMPETITION = {
  maxBotSizeCm: 30,
  maxWeightKg: 3,
  teamSizeMin: 3,
  teamSizeMax: 5,
  prizePoolLabel: '₹15K',
  rounds: 2,
  provisionalNotice:
    'Specifications and scoring below are provisional and may be updated before the event. Final rules will be confirmed by IEEE RAS and ISTE, KLS GIT.',
} as const;

export const HOST_COLLEGE = 'KLS GIT' as const;

export const COLLEGE_CHOICES = [
  { value: HOST_COLLEGE, label: 'KLS GIT' },
  { value: 'Other', label: 'Other' },
] as const;

export type CollegeChoice = (typeof COLLEGE_CHOICES)[number]['value'];

export const ACADEMIC_YEARS = [
  '1st Year',
  '2nd Year',
  '3rd Year',
  '4th Year',
] as const;

export type AcademicYear = (typeof ACADEMIC_YEARS)[number];

/** UPI payment details shown on the registration page. */
export const PAYMENT = {
  upiId: 'gitupi@okaxis',
  qrSrc: '/upi-qr.jpg',
  qrAlt: 'UPI QR code for GearStorm 2.0 registration payment',
  note: 'Pay the registration fee via UPI, then enter the UTR and upload a payment screenshot below.',
} as const;

export const VENUE = {
  name: 'KLS Gogte Institute of Technology',
  city: 'Belagavi',
  state: 'Karnataka',
  country: 'India',
  /** Approximate campus coordinates for the map embed. */
  lat: 15.8497,
  lng: 74.4977,
  mapQuery: 'KLS+Gogte+Institute+of+Technology+Belagavi',
} as const;

export const SOCIAL_LINKS: readonly { label: string; href: string }[] = [
  // Add real chapter profiles before launch.
];
