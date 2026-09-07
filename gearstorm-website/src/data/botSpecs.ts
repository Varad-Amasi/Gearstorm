import { CATEGORIES, COMPETITION } from '@/utils/competition';

export interface SpecRow {
  label: string;
  value: string;
}

export interface SpecGroup {
  id: string;
  title: string;
  description: string;
  rows: readonly SpecRow[];
}

export const PHYSICAL_SPECS: SpecGroup = {
  id: 'physical',
  title: 'Shared physical specifications',
  description:
    'Beginner and Advanced are measured the same way at inspection. Full wording is in the official rulebook (section 2).',
  rows: [
    {
      label: 'Max envelope',
      value: `${COMPETITION.maxBotSizeCm} cm × ${COMPETITION.maxBotSizeCm} cm × ${COMPETITION.maxBotSizeCm} cm, including antennas. ±${COMPETITION.dimensionTolerancePct}% per side. The robot must stay inside this size for the whole race — no deployable extras.`,
    },
    {
      label: 'Max weight',
      value: `${COMPETITION.maxWeightKg} kg including battery. +${COMPETITION.weightTolerancePct}% allowed (${COMPETITION.maxWeightWithToleranceKg} kg absolute max).`,
    },
    {
      label: 'Chassis',
      value:
        'Designed and built by the team. Ready-made robots, RC cars, kits, and commercial chassis are not allowed. Individual parts (motors, wheels, boards, sensors) are fine.',
    },
    {
      label: 'Track safety',
      value:
        'Nothing that can cut, scratch, or damage the arena. A part left on the track is a disqualification.',
    },
  ],
};

export const ELECTRICAL_SPECS: SpecGroup = {
  id: 'electrical',
  title: 'Shared electrical specifications',
  description:
    'Battery rules apply to both Beginner and Advanced (rulebook section 2.3–2.4).',
  rows: [
    {
      label: 'Battery',
      value: COMPETITION.battery,
    },
    {
      label: 'Packs',
      value:
        'One pack during a run. Series/parallel extra packs need organiser approval. Li-ion packs need protection/BMS. Charge only in designated areas.',
    },
    {
      label: 'Other chemistries',
      value: 'Any other battery type needs prior organiser approval.',
    },
  ],
};

export const BEGINNER_SPECS: readonly SpecRow[] = [
  {
    label: 'Budget',
    value: `${CATEGORIES.beginner.budget}. Submit a BOM with names, quantities, and reference prices.`,
  },
  {
    label: 'Control',
    value: CATEGORIES.beginner.control,
  },
  {
    label: 'Not allowed',
    value:
      'Dedicated RF/RC driving (FlySky, nRF24, 433 MHz remotes, and similar).',
  },
  {
    label: 'Allowed',
    value:
      'Onboard Arduino / ESP32 / STM32 for sensing and autonomy. Wired control if the cable stays slack.',
  },
] as const;

export const ADVANCED_SPECS: readonly SpecRow[] = [
  {
    label: 'Budget',
    value: CATEGORIES.advanced.budget,
  },
  {
    label: 'Control',
    value: CATEGORIES.advanced.control,
  },
  {
    label: 'Allowed',
    value:
      'Manual, wireless, autonomous, or hybrid. Dedicated RF, Bluetooth, and Wi-Fi if they do not jam other teams.',
  },
  {
    label: 'Wired cable',
    value: 'Allowed, but pulling the cable to help the robot is a DQ.',
  },
] as const;

export const SHARED_DESIGN_TIPS: readonly string[] = [
  'Fit the 25 cm cube with antennas on, then add capability.',
  'Do not plan to unfold or extend past the size limit after the start.',
  'Charge Li-Po/Li-ion only where marshals allow, in a fire-safe way.',
  'Label the pack and keep terminals insulated for a fast inspection.',
] as const;

export const BEGINNER_TIPS: readonly string[] = [
  'Keep a BOM with names, quantities, and Robu.in-style reference prices.',
  'Plan autonomy or slack wired control — a FlySky pack will fail inspection.',
] as const;

export const ADVANCED_TIPS: readonly string[] = [
  'If you use wireless, bring a spare bind and stay off other teams’ channels.',
  'There is no upper budget cap, but the size, weight, and battery limits still apply.',
] as const;

export const BOT_SPEC_FAQS = [
  {
    question: 'Do antennas count in the size check?',
    answer:
      'Yes. Everything attached to the robot counts, in both Beginner and Advanced. Deployable parts that grow the robot during the run are not allowed.',
  },
  {
    question: 'Can we use a ready-made chassis?',
    answer:
      'No. In both categories the chassis must be designed and built by the team. Individual motors, wheels, and boards are allowed.',
  },
  {
    question: 'What battery can we use?',
    answer:
      'A single 3S Li-Po or 3S Li-ion pack (11.1 V nominal, 12.6 V fully charged), unless the organisers approve something else in writing. Same rule for Beginner and Advanced.',
  },
  {
    question: 'Can Beginner teams use a FlySky or nRF remote?',
    answer:
      'No. Dedicated RF/RC driving is Advanced only. See the rulebook section 6.',
  },
] as const;
