export const ROUTES = {
  HOME: '/',
  BOT_SPECS: '/bot-specs',
  RULES: '/rules',
  LEADERBOARD: '/leaderboard',
  REGISTER: '/register',
  GALLERY: '/gallery',
  CONTACT: '/contact',
  /** Development-only component reference; not registered in production builds. */
  STYLEGUIDE: '/styleguide',
} as const;

export interface NavLinkItem {
  label: string;
  path: string;
}

/** Order drives both the header navigation and the footer link column. */
export const NAV_LINKS: readonly NavLinkItem[] = [
  { label: 'Home', path: ROUTES.HOME },
  { label: 'Rules', path: ROUTES.RULES },
  { label: 'Bot Specs', path: ROUTES.BOT_SPECS },
  { label: 'Leaderboard', path: ROUTES.LEADERBOARD },
  { label: 'Gallery', path: ROUTES.GALLERY },
  { label: 'Contact', path: ROUTES.CONTACT },
] as const;

/** Public event branding — keep UI copy wired to these strings. */
export const EVENT = {
  name: 'GearStorm 2.0',
  shortName: 'GearStorm',
} as const;

export const ORGANIZER = {
  /** Short badge / eyebrow line. */
  byline: 'IEEE RAS & ISTE · KLS GIT Belagavi',
  /** Societies collaborating on the event. */
  societies: [
    {
      short: 'IEEE RAS',
      full: 'IEEE Robotics & Automation Society (RAS)',
    },
    {
      short: 'ISTE',
      full: 'Indian Society for Technical Education (ISTE)',
    },
  ],
  /** e.g. “IEEE RAS and ISTE”. */
  societiesJoined: 'IEEE RAS and ISTE',
  chapter: 'KLS Gogte Institute of Technology, Belagavi',
  chapterShort: 'KLS GIT Belagavi',
  email: 'gearstorm@klsgit.edu.in',
  /** Placeholder until organisers publish a public contact number. */
  phone: '+91 0831 240 5500',
  /** Sentence fragment for meta / footer copy. */
  credit: 'in collaboration with IEEE RAS and ISTE of KLS GIT Belagavi',
} as const;
