import { clsx } from 'clsx';
import type { ReactNode } from 'react';
import { Badge } from '@/components/common/Badge';

export interface HeroSectionProps {
  title: string;
  description: string;
  eyebrow?: string;
  /** Call-to-action buttons or links. */
  actions?: ReactNode;
  /** Visual shown beside the copy; the 3D robot canvas lands here in Phase 4. */
  media?: ReactNode;
  className?: string;
}

/**
 * Above-the-fold hero with headline copy on the left and an optional visual on
 * the right. Collapses to a single column on mobile.
 */
export const HeroSection = ({
  title,
  description,
  eyebrow,
  actions,
  media,
  className,
}: HeroSectionProps): JSX.Element => (
  <section
    className={clsx('container-page py-10 sm:py-16 md:py-24', className)}
    aria-labelledby="hero-title"
  >
    <div
      className={clsx(
        'grid items-center gap-8 sm:gap-12',
        media && 'lg:grid-cols-2'
      )}
    >
      <div className="space-y-6">
        {eyebrow ? (
          <Badge variant="accent" className="max-w-full whitespace-normal">
            {eyebrow}
          </Badge>
        ) : null}
        <h1
          id="hero-title"
          className="font-brand text-4xl font-bold leading-tight tracking-tight text-white [letter-spacing:-0.02em] sm:text-5xl md:text-7xl"
        >
          {title}
        </h1>
        <p className="max-w-xl font-sans text-base font-normal leading-relaxed text-text-light [line-height:1.8] md:text-lg">
          {description}
        </p>
        {actions ? (
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap">
            {actions}
          </div>
        ) : null}
      </div>
      {media}
    </div>
  </section>
);
