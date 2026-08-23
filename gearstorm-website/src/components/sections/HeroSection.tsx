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
    className={clsx('container-page py-16 md:py-24', className)}
    aria-labelledby="hero-title"
  >
    <div
      className={clsx('grid items-center gap-12', media && 'lg:grid-cols-2')}
    >
      <div className="space-y-6">
        {eyebrow ? <Badge variant="accent">{eyebrow}</Badge> : null}
        <h1
          id="hero-title"
          className="font-heading text-4xl font-extrabold leading-tight tracking-tight md:text-6xl"
        >
          {title}
        </h1>
        <p className="max-w-xl text-lg text-text-muted md:text-xl">
          {description}
        </p>
        {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
      </div>
      {media}
    </div>
  </section>
);
