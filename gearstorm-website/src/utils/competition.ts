/**
 * Flip to `true` when registrations should go live (header, CTAs, and form).
 */
export const REGISTRATION_OPEN = false;

/**
 * Official limits from the GearStorm 2.0 rulebook.
 */
export const COMPETITION = {
  maxBotSizeCm: 25,
  dimensionTolerancePct: 5,
  maxWeightKg: 3,
  weightTolerancePct: 5,
  maxWeightWithToleranceKg: 3.15,
  teamSizeMin: 2,
  teamSizeMax: 4,
  prizePoolLabel: '₹30K',
  beginnerFirst: '₹5,000',
  beginnerSecond: '₹3,000',
  beginnerThird: '₹2,000',
  advancedFirst: '₹10,000',
  advancedSecond: '₹7,000',
  advancedThird: '₹3,000',
  beginnerBudgetMax: 5000,
  beginnerBudgetCeiling: 5500,
  advancedBudgetMin: 5500,
  maxTeamsPerCategory: 15,
  maxTeamsTotal: 30,
  finalsPerCategory: 6,
  mergeIfBelow: 10,
  rounds: 2,
  battery: '3S Li-Po or 3S Li-ion (11.1 V nominal, 12.6 V max charged)',
  officialNotice:
    'The official rulebook is the source of truth. This site summarises the main points for teams.',
} as const;

/** Two official competitions. Same arena; separate rules, rankings, and prizes. */
export const CATEGORIES = {
  beginner: {
    id: 'beginner',
    name: 'Beginner',
    summary:
      'Lower budget, onboard control only. No dedicated RF or RC driving.',
    budget: `₹${COMPETITION.beginnerBudgetMax.toLocaleString('en-IN')} or less (up to ₹${COMPETITION.beginnerBudgetCeiling.toLocaleString('en-IN')} with tolerance)`,
    control:
      'No dedicated RF/RC remotes. Arduino, ESP32, or STM32 onboard is fine.',
    prizes: `${COMPETITION.beginnerFirst} / ${COMPETITION.beginnerSecond} / ${COMPETITION.beginnerThird}`,
  },
  advanced: {
    id: 'advanced',
    name: 'Advanced',
    summary:
      'Open budget. Manual, wireless, autonomous, or hybrid driving is allowed.',
    budget: `Above ₹${COMPETITION.advancedBudgetMin.toLocaleString('en-IN')}. No upper cap`,
    control:
      'Dedicated RF, Bluetooth, and Wi-Fi are allowed if they do not jam other teams.',
    prizes: `${COMPETITION.advancedFirst} / ${COMPETITION.advancedSecond} / ${COMPETITION.advancedThird}`,
  },
} as const;

export const RULEBOOK = {
  href: '/docs/gear-storm-2.0-rule-book.pdf',
  downloadName: 'GEAR-STORM-2.0-Rule-Book.pdf',
  version: '2.0',
  updatedLabel: '7 September 2026',
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
