import { COMPETITION, REGISTRATION_OPEN } from '@/utils/competition';

export const EVENT_TIMELINE = [
  {
    meta: 'Before the day',
    title: 'Register',
    description: REGISTRATION_OPEN
      ? 'Submit your team of 2–4 on this site, choose Beginner or Advanced, and start building against the published specs.'
      : 'Registration is not open yet. Build against the Beginner or Advanced rulebook in the meantime.',
  },
  {
    meta: 'Arrival',
    title: 'Report and desk check',
    description:
      'Arrive with a valid college ID. Late arrival can mean you miss inspection or your run slot.',
  },
  {
    meta: 'Inspection',
    title: 'Robot inspection',
    description:
      'Size, weight, battery, chassis, safety, and category (Beginner BOM or Advanced control) are checked before you can race.',
  },
  {
    meta: 'Briefing',
    title: 'Technical briefing',
    description:
      'Organisers confirm the arena, obstacles, and any last-minute operational notes. That briefing is official.',
  },
  {
    meta: 'Round 1',
    title: 'Qualifier run',
    description:
      'One official attempt on the shared arena. Lowest adjusted time in your category ranks higher.',
  },
  {
    meta: 'Finals',
    title: 'Final run',
    description: `The top ${COMPETITION.finalsPerCategory} teams from each category get one official Finals attempt. Round 1 times do not carry over.`,
  },
  {
    meta: 'Close',
    title: 'Results',
    description: `${COMPETITION.prizePoolLabel} prize pool across Beginner and Advanced. Places are announced on the day.`,
  },
] as const;

export const TIMELINE_FOOTNOTE = REGISTRATION_OPEN
  ? 'Clock times for each slot are sent after you register.'
  : 'Exact clock times will be posted when registration opens.';
