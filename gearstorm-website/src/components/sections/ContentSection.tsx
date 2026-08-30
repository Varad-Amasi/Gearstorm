import { clsx } from 'clsx';
import type { ReactNode } from 'react';

export interface ContentSectionProps {
  id?: string;
  title: string;
  description?: string;
  children: ReactNode;
  /** Extra actions aligned with the heading (e.g. Print). */
  actions?: ReactNode;
  className?: string;
}

/**
 * Standard heading + body block for long-form content pages.
 */
export const ContentSection = ({
  id,
  title,
  description,
  children,
  actions,
  className,
}: ContentSectionProps): JSX.Element => (
  <section
    id={id}
    className={clsx('scroll-mt-24 border-t border-border pt-10', className)}
  >
    {' '}
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div className="max-w-3xl">
        <h2 className="font-heading text-2xl font-bold tracking-tight [letter-spacing:-0.01em] md:text-3xl">
          {title}
        </h2>
        {description ? (
          <p className="mt-2 font-sans leading-relaxed text-text-muted">
            {description}
          </p>
        ) : null}
      </div>
      {actions}
    </div>
    <div className="mt-6">{children}</div>
  </section>
);
