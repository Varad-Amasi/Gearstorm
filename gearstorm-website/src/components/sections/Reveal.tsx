import type { ReactNode } from 'react';

export interface RevealProps {
  children: ReactNode;
  /** Retained for API compatibility; no longer drives an animation. */
  delay?: number;
  className?: string;
}

/**
 * Plain content wrapper. Previously faded/slid every block into view on scroll,
 * which made the whole site read as a generated template. Content now renders
 * in place; the prop surface is kept so callers don't need to change.
 */
export const Reveal = ({ children, className }: RevealProps): JSX.Element =>
  className ? <div className={className}>{children}</div> : <>{children}</>;
