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
    'Every bot is measured at technical inspection before it can race.',
  rows: [
    {
      label: 'Max envelope',
      value: `${COMPETITION.maxBotSizeCm} cm × ${COMPETITION.maxBotSizeCm} cm × ${COMPETITION.maxBotSizeCm} cm cube at the start of each run`,
    },
    {
      label: 'Max weight',
      value: `${COMPETITION.maxWeightKg} kg including battery`,
    },
    {
      label: 'Allowed materials',
      value:
        'Acrylic, 3D-printed PLA/PETG, aluminium sections, wood, and similar hobby materials',
    },
    {
      label: 'Prohibited materials',
      value: 'Glass edges, exposed sharp metal, liquid ballast, explosives',
    },
  ],
};

export const ELECTRICAL_SPECS: SpecGroup = {
  id: 'electrical',
  title: 'Electrical specifications',
  description: 'Power systems must be safe to handle on the course.',
  rows: [
    {
      label: 'Battery',
      value: 'Li-ion / LiPo / NiMH packs up to 12 V nominal',
    },
    {
      label: 'Onboard voltage',
      value: 'Maximum 12 V DC on any rail; no AC mains power',
    },
    {
      label: 'Kill switch',
      value: 'A clearly marked, reachable kill switch is mandatory',
    },
    {
      label: 'Wiring',
      value: 'Insulated, strain-relieved, and secured to the chassis',
    },
  ],
};

export const COMPONENT_SPECS: SpecGroup = {
  id: 'components',
  title: 'Component specifications',
  description: 'Off-the-shelf parts are fine. Pre-built robot kits are not.',
  rows: [
    {
      label: 'Microcontrollers',
      value: 'Arduino, ESP32, Raspberry Pi Pico, STM32, and similar boards',
    },
    {
      label: 'Motors',
      value: 'DC geared, stepper, or servo motors within the weight limit',
    },
    {
      label: 'Sensors',
      value: 'Ultrasonic, IR, line, IMU, encoders, cameras — all allowed',
    },
    {
      label: 'Gripper / actuator',
      value: 'Optional. Must retract inside the size cube at the start line',
    },
  ],
};

export const DESIGN_TIPS: readonly string[] = [
  'Design for the size cube first, then add capability — oversize bots fail inspection.',
  'Keep the centre of mass low; tall sensor masts tip on ramps.',
  'Protect wiring from the ground and from gripper motion.',
  'Practice starts and recoveries — bot-handling penalties add up fast.',
  'Label the kill switch and battery polarity so marshals can inspect quickly.',
] as const;

export const BOT_SPEC_FAQS = [
  {
    question: 'Does the gripper count toward the size limit?',
    answer:
      'Yes. The entire bot, including any gripper or mast, must fit inside the size cube at the start of a run. Mechanisms may extend after the run begins.',
  },
  {
    question: 'Can we swap batteries between runs?',
    answer:
      'Yes, as long as the replacement pack stays within the voltage and weight limits and is installed before your next call.',
  },
  {
    question: 'Are wireless controllers allowed?',
    answer:
      'Yes. Bluetooth, Wi-Fi, and RF controllers are allowed. Autonomous modes are also welcome.',
  },
  {
    question: 'What if our bot is slightly over weight at inspection?',
    answer:
      'You will be asked to modify it before racing. There is no grace period once the course opens for your slot.',
  },
] as const;
