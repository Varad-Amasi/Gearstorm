import { COMPETITION } from '@/utils/competition';

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
  title: 'Physical specifications',
  description:
    'Measured at inspection. Full wording is in the official rulebook (section 2).',
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
  title: 'Electrical specifications',
  description: 'Battery rules from rulebook section 2.3–2.4.',
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

export const COMPONENT_SPECS: SpecGroup = {
  id: 'components',
  title: 'Control & construction',
  description: 'Beginner and Advanced share the size/weight/battery limits.',
  rows: [
    {
      label: 'Wired or wireless',
      value:
        'Both are allowed. A wired cable must stay slack — pulling it to help the robot is a DQ.',
    },
    {
      label: 'Beginner control',
      value:
        'No dedicated RF/RC driving (FlySky, nRF24, 433 MHz remotes, and similar). Arduino / ESP32 / STM32 onboard is fine for sensing and autonomy.',
    },
    {
      label: 'Advanced control',
      value:
        'Manual, wireless, autonomous, or hybrid. Dedicated RF, Bluetooth, and Wi-Fi are allowed if they do not jam other teams.',
    },
    {
      label: 'Beginner budget',
      value: `Reference value ₹${COMPETITION.beginnerBudgetMax.toLocaleString('en-IN')} or less (up to ₹${COMPETITION.beginnerBudgetCeiling.toLocaleString('en-IN')} with tolerance). Submit a BOM. Robu.in prices are the usual reference.`,
    },
    {
      label: 'Advanced budget',
      value: `Reference value above ₹${COMPETITION.advancedBudgetMin.toLocaleString('en-IN')}. No upper cap.`,
    },
  ],
};

export const DESIGN_TIPS: readonly string[] = [
  'Fit the 25 cm cube with antennas on, then add capability.',
  'Beginner teams: keep a BOM with names, quantities, and reference prices.',
  'Do not plan to unfold or extend past the size limit after the start.',
  'Charge Li-Po/Li-ion only where marshals allow, in a fire-safe way.',
  'Label the pack and keep terminals insulated for a fast inspection.',
] as const;

export const BOT_SPEC_FAQS = [
  {
    question: 'Do antennas count in the size check?',
    answer:
      'Yes. Everything attached to the robot counts. Deployable parts that grow the robot during the run are not allowed.',
  },
  {
    question: 'Can we use a ready-made chassis?',
    answer:
      'No. The chassis must be designed and built by the team. Individual motors, wheels, and boards are allowed.',
  },
  {
    question: 'What battery can we use?',
    answer:
      'A single 3S Li-Po or 3S Li-ion pack (11.1 V nominal, 12.6 V fully charged), unless the organisers approve something else in writing.',
  },
  {
    question: 'Can Beginner teams use a FlySky or nRF remote?',
    answer:
      'No. Dedicated RF/RC driving is an Advanced-only option. See the rulebook section 6.',
  },
] as const;
