import {
  motion,
  useMotionValueEvent,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import { useState } from 'react';

export interface AssemblyProgressProps {
  /** Assembly progress, 0-100. */
  progress: MotionValue<number>;
}

const STAGES: readonly { from: number; label: string }[] = [
  { from: 95, label: 'Boot-up' },
  { from: 80, label: 'Electronics' },
  { from: 60, label: 'Gripper' },
  { from: 40, label: 'Sensors' },
  { from: 20, label: 'Wheels' },
  { from: 0, label: 'Chassis' },
];

const labelFor = (value: number): string =>
  STAGES.find((stage) => value >= stage.from)?.label ?? 'Chassis';

/**
 * Caption and progress bar under the 3D robot showing the current assembly
 * stage as the user scrolls.
 */
export const AssemblyProgress = ({
  progress,
}: AssemblyProgressProps): JSX.Element => {
  const [label, setLabel] = useState(() => labelFor(progress.get()));
  const [complete, setComplete] = useState(false);

  useMotionValueEvent(progress, 'change', (value) => {
    setLabel(labelFor(value));
    setComplete(value >= 99.5);
  });

  // Maps the raw progress value, so the bar starts slightly filled to match
  // the chassis already dropping in rather than reading as "nothing yet".
  const scaleX = useTransform(progress, [0, 100], [0, 1]);

  return (
    <div className="mt-4" aria-hidden="true">
      <div className="flex items-center justify-between font-heading text-xs uppercase tracking-widest text-text-subtle">
        <span>{complete ? 'Systems online' : `Assembling: ${label}`}</span>
        {complete ? null : <span>Scroll &darr;</span>}
      </div>
      <div className="mt-2 h-1 overflow-hidden rounded-full bg-dark-800">
        <motion.div
          className="h-full origin-left rounded-full bg-gradient-to-r from-primary-500 to-accent"
          style={{ scaleX }}
        />
      </div>
    </div>
  );
};
