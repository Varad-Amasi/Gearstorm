import { clsx } from 'clsx';
import type { ReactNode } from 'react';

export interface HeroSectionProps {
  title: string;
  description: string;
  eyebrow?: string;
  eyebrowDetail?: string;
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
  eyebrowDetail,
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
            media ? 'lg:col-span-7 lg:pr-8' : 'max-w-5xl'
          )}
        >
          {eyebrow ? (
            <p className="font-heading text-xl font-semibold tracking-tight text-accent sm:text-2xl md:text-3xl">
              {eyebrow}
              {eyebrowDetail ? (
                <span className="mt-1 block font-subhead text-base font-medium text-text-muted sm:text-lg">
                  {eyebrowDetail}
                </span>
              ) : null}
            </p>
          ) : null}
          <h1
            id="hero-title"
            aria-label={title}
            className="font-display text-5xl font-extrabold uppercase leading-[0.9] tracking-tight text-text-light sm:text-6xl md:text-7xl lg:text-8xl"
          >
            <span>{mainTitle.trim()}</span>
            {edition ? (
              <span className="ml-2 font-accent text-[0.45em] text-accent sm:text-[0.5em]">
                {edition}
              </span>
            ) : null}
          </h1>
          <p className="max-w-2xl font-sans text-base leading-relaxed text-text-muted md:text-xl">
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
