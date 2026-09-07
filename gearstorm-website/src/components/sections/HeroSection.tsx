import { clsx } from 'clsx';
import type { ReactNode } from 'react';
import { Badge } from '@/components/common/Badge';

export interface HeroSectionProps {
  title: string;
  description: string;
  eyebrow?: string;
  actions?: ReactNode;
  media?: ReactNode;
  className?: string;
}

/**
 * Above-the-fold intro: title, short description, and optional photo.
 */
export const HeroSection = ({
  title,
  description,
  eyebrow,
  actions,
  media,
  className,
}: HeroSectionProps): JSX.Element => {
  const [mainTitle, edition] = title.includes('2.0')
    ? [title.replace(/\s*2\.0\s*$/, ''), '2.0']
    : [title, null];

  return (
    <section
      className={clsx(
        'container-page relative py-10 sm:py-16 md:py-20',
        className
      )}
      aria-labelledby="hero-title"
    >
      <div
        className={clsx(
          'relative grid items-center gap-8 sm:gap-10',
          media && 'lg:grid-cols-12'
        )}
      >
        <div
          className={clsx(
            'relative z-20 min-w-0 space-y-6',
            media && 'lg:col-span-7 lg:pr-8'
          )}
        >
          {eyebrow ? (
            <Badge variant="accent" className="max-w-full whitespace-normal">
              {eyebrow}
            </Badge>
          ) : null}
          <h1
            id="hero-title"
            aria-label={title}
            className="font-display text-4xl font-extrabold uppercase leading-none tracking-tight text-text-light sm:text-5xl md:text-6xl"
          >
            <span>{mainTitle.trim()}</span>
            {edition ? (
              <span className="ml-2 font-accent text-[0.38em] text-accent">
                {edition}
              </span>
            ) : null}
          </h1>
          <p className="max-w-xl font-sans text-base leading-relaxed text-text-muted md:text-lg">
            {description}
          </p>
          {actions ? (
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap">
              {actions}
            </div>
          ) : null}
        </div>
        {media ? (
          <div className="relative z-10 lg:col-span-6 lg:col-start-7 lg:-mt-4">
            {media}
          </div>
        ) : null}
      </div>
    </section>
  );
};
