import { useScroll, useTransform, type MotionValue } from 'framer-motion';
import type { RefObject } from 'react';

/**
 * Progress value the assembly starts at, so the chassis is already dropping in
 * on first paint instead of leaving an empty canvas. Shared by the robot and
 * the progress caption so both agree.
 */
export const ASSEMBLY_START = 10;

/**
 * Maps scroll progress through a target element to an assembly progress value
 * between {@link ASSEMBLY_START} and 100.
 *
 * Progress is at its floor when the element's top reaches the viewport top and
 * 100 when its bottom reaches the viewport bottom.
 */
export const useScrollTrigger = (
  target: RefObject<HTMLElement>
): MotionValue<number> => {
  const { scrollYProgress } = useScroll({
    target,
    offset: ['start start', 'end end'],
  });

  return useTransform(scrollYProgress, [0, 1], [ASSEMBLY_START, 100]);
};
