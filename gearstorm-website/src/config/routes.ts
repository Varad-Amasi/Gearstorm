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

export const ORGANIZER = {
  society: 'IEEE Robotics & Automation Society',
  chapter: 'KLS Gogte Institute of Technology, Belagavi',
  email: 'gearstorm@klsgit.edu.in',
  /** Placeholder until organisers publish a public contact number. */
  phone: '+91 0831 240 5500',
} as const;
