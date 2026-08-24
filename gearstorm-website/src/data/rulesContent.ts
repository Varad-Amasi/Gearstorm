import { COMPETITION } from '@/utils/competition';

export interface RuleSection {
  id: string;
  title: string;
  paragraphs?: readonly string[];
  bullets?: readonly string[];
}

export interface ObstacleInfo {
  name: string;
  round: '1' | '2' | 'both';
  description: string;
}

export interface ScoringRow {
  item: string;
  detail: string;
}

export const GENERAL_RULES: RuleSection = {
  id: 'general',
  title: 'General rules',
  bullets: [
    `Teams of ${COMPETITION.teamSizeMin}–${COMPETITION.teamSizeMax} students from the same college.`,
    'The bot must be designed and built by the team — no ready-made robot kits.',
    `The bot must fit within a ${COMPETITION.maxBotSizeCm} cm cube at the start of each run.`,
    'Only registered team members may operate the bot during a run.',
    'Decisions of the referees and technical marshals are final.',
  ],
};

export const OBSTACLES: readonly ObstacleInfo[] = [
  {
    name: 'Line / path follow',
    round: '1',
    description:
      'Follow a marked path through the arena. Leaving the path may require a reset with a time penalty.',
  },
  {
    name: 'Gate / tunnel',
    round: '1',
    description:
      'Pass through a constrained opening without touching the frame. Contact may add a handling penalty.',
  },
  {
    name: 'Ramp',
    round: 'both',
    description:
      'Climb and descend a graded surface while remaining under control.',
  },
  {
    name: 'Pickup / place',
    round: '2',
    description:
      'Collect a lightweight object and deposit it in a marked zone. Missed placements count as skipped.',
  },
  {
    name: 'Precision stop',
    round: '2',
    description:
      'Halt fully within a finish box. Overshooting requires a reverse correction under the clock.',
  },
] as const;

export const SCORING_ROWS: readonly ScoringRow[] = [
  {
    item: 'Base score',
    detail: 'Elapsed time from start signal to finish (lower is better).',
  },
  {
    item: 'Obstacle skip',
    detail: '+15 s added to the recorded time per skipped obstacle.',
  },
  {
    item: 'Bot handling',
    detail:
      '+5 s each time a team member touches or repositions the bot mid-run.',
  },
  {
    item: 'Course completion',
    detail:
      'A DNF (did not finish) ranks below every finished run for that round.',
  },
] as const;

export const ROUND_DIFFERENCES: RuleSection = {
  id: 'rounds',
  title: 'Round 1 vs Round 2',
  paragraphs: [
    'Round 1 (Qualifiers) is open to every registered team on a standard obstacle set. Ranking is by adjusted time.',
    'Round 2 (Finals) invites the top qualifier teams onto a harder course with additional precision tasks. Only finals times decide the champion.',
  ],
  bullets: [
    'Each team gets a fixed number of official runs per round (announced at briefing).',
    'The best adjusted time in a round is kept.',
    'Finals seeding follows Round 1 rank; no carry-over of Round 1 times into the title.',
  ],
};

export const DISQUALIFICATION: RuleSection = {
  id: 'dq',
  title: 'Disqualification criteria',
  bullets: [
    'Failing technical inspection after the correction window closes.',
    'Using a pre-assembled robot kit or a bot built by non-team members.',
    'Unsafe electrical systems (exposed high current, missing kill switch).',
    'Deliberately interfering with another team’s bot or run.',
    'Unsportsmanlike conduct toward marshals, referees, or other teams.',
  ],
};

export const SAFETY_RULES: RuleSection = {
  id: 'safety',
  title: 'Safety rules',
  bullets: [
    'LiPo packs must be charged in fire-safe bags away from the arena floor.',
    'No open flames, projectiles, or compressed-gas thrusters.',
    'Marshals may abort a run if a bot becomes a hazard.',
    'Teams must obey arena barriers and spectator lines at all times.',
  ],
};

export const SUBMISSION_PROCESS: RuleSection = {
  id: 'submission',
  title: 'Submission & race-day process',
  bullets: [
    'Register online before the deadline and keep your contact details current.',
    'Arrive for technical inspection with the bot powered down and the kill switch accessible.',
    'Report to the staging area when your team is called; late arrivals forfeit that run slot.',
    'After each run, clear the course promptly so the next team can start.',
  ],
};

export const RULES_FAQS = [
  {
    question: 'How is the final ranking calculated?',
    answer:
      'Adjusted time = raw finish time + skip penalties + handling penalties. Lower adjusted time ranks higher. Unfinished runs rank below finished ones.',
  },
  {
    question: 'Can we practice on the official course?',
    answer:
      'Practice access, if any, is announced at the briefing. Unauthorised course entry before your run is not allowed.',
  },
  {
    question: 'What if two teams tie on adjusted time?',
    answer:
      'The team with fewer handling penalties ranks higher. If still tied, a single sudden-death run may be ordered by the chief referee.',
  },
] as const;
