import { CATEGORIES, COMPETITION } from '@/utils/competition';

export const QUICK_REFERENCE: readonly string[] = [
  `Two competitions: ${CATEGORIES.beginner.name} and ${CATEGORIES.advanced.name}. Same arena; separate rankings and prizes.`,
  `Robot size: ${COMPETITION.maxBotSizeCm} cm × ${COMPETITION.maxBotSizeCm} cm × ${COMPETITION.maxBotSizeCm} cm, including antennas (±${COMPETITION.dimensionTolerancePct}%). No deployable extras.`,
  `Weight: ${COMPETITION.maxWeightKg} kg including battery (+${COMPETITION.weightTolerancePct}%, max ${COMPETITION.maxWeightWithToleranceKg} kg).`,
  `Power: one ${COMPETITION.battery}.`,
  `Team size: ${COMPETITION.teamSizeMin}–${COMPETITION.teamSizeMax} students from the same college.`,
  'Disqualifiers include: kits or ready-made chassis, cable pulling, parts left on the track, arena damage, extra skips after three, or unsafe batteries.',
] as const;

export const BEGINNER_RULES: readonly string[] = [
  `Budget: ${CATEGORIES.beginner.budget}. Submit a bill of materials. Robu.in prices are the usual reference.`,
  CATEGORIES.beginner.control,
  'Onboard sensing and autonomy are allowed. A dedicated FlySky, nRF24, 433 MHz, or similar RC link is not.',
  `Up to ${COMPETITION.maxTeamsPerCategory} teams. Top ${COMPETITION.finalsPerCategory} go to the Beginner Final.`,
  `Prizes: ${CATEGORIES.beginner.prizes}.`,
  `If fewer than ${COMPETITION.mergeIfBelow} Beginner teams register, organisers may merge the field — announced before racing.`,
] as const;

export const ADVANCED_RULES: readonly string[] = [
  `Budget: ${CATEGORIES.advanced.budget}.`,
  CATEGORIES.advanced.control,
  'Manual, wireless, autonomous, or hybrid driving is allowed.',
  `Up to ${COMPETITION.maxTeamsPerCategory} teams. Top ${COMPETITION.finalsPerCategory} go to the Advanced Final.`,
  `Prizes: ${CATEGORIES.advanced.prizes}.`,
  `If fewer than ${COMPETITION.mergeIfBelow} Advanced teams register, organisers may merge the field — announced before racing.`,
] as const;

export const ARENA_SPECS: readonly { label: string; value: string }[] = [
  {
    label: 'Layout',
    value:
      'Exact length, width, and final layout are published on the event day. Beginner and Advanced use the same official track.',
  },
  {
    label: 'Surface',
    value:
      'The course line and floor may have minor unevenness or non-uniform sections. Design for that.',
  },
  {
    label: 'Gradients',
    value:
      'Sudden climbs or drops may appear. No incline is steeper than 30° from the horizontal.',
  },
  {
    label: 'Obstacles',
    value:
      'May include a switch gate, speed breakers, marble pit, rotating disk, see-saw, ramps, and other mechanical challenges. Placement is announced on the day.',
  },
] as const;

export const SCORING_ROWS: readonly { item: string; detail: string }[] = [
  {
    item: 'Rankings',
    detail:
      'Beginner and Advanced are scored separately. Lowest adjusted time in your category ranks higher.',
  },
  {
    item: 'Adjusted time',
    detail: 'Recorded finish time + all time penalties.',
  },
  {
    item: 'Team touch',
    detail:
      '+5 s, then +8 s, +11 s, +14 s; each later touch adds 3 s more than the last. Restart from the last checkpoint.',
  },
  {
    item: 'Skipped obstacle',
    detail:
      '+15 s, +30 s, +45 s. A fourth skip is DNF. At most three skips per run.',
  },
  {
    item: 'DNF',
    detail:
      'Over time, more than three skips, a robot that cannot continue, or an invalid finish. DNF ranks below every completed run.',
  },
] as const;
