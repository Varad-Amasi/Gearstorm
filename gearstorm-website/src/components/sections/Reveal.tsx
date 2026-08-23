import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

export interface RevealProps {
  children: ReactNode;
  /** Seconds to wait before animating, for staggering siblings. */
  delay?: number;
  className?: string;
}

/**
 * Fades and slides content up the first time it scrolls into view. Respects
 * the user's reduced-motion preference via the app-level MotionConfig.
 */
export const Reveal = ({
  children,
  delay = 0,
  className,
}: RevealProps): JSX.Element => (
  <motion.div
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.6, ease: 'easeOut', delay }}
    {...(className ? { className } : {})}
  >
    {children}
  </motion.div>
);
