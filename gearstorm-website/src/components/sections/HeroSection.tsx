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
 * Above-the-fold hero. On large screens the headline stacks over the robot
 * visual; on small screens it stays a single column with no overlap.
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
        'container-page relative overflow-x-clip py-10 sm:py-16 md:py-24',
        className
      )}
      aria-labelledby="hero-title"
    >
      <p
        aria-hidden="true"
        className="pointer-events-none absolute -left-4 top-6 hidden select-none font-display text-[18vw] font-extrabold leading-none text-vivid-purple/15 lg:block lg:text-[9rem] xl:text-[11rem]"
      >
        GS
      </p>

      <div
        className={clsx(
          'relative grid items-center gap-8 sm:gap-10',
          media && 'lg:grid-cols-12'
        )}
      >
        <div
          className={clsx(
            'relative z-20 min-w-0 space-y-6 [container-type:inline-size]',
            media && 'lg:col-span-7 lg:pr-8'
          )}
        >
          {eyebrow ? (
            <Badge
              variant="accent"
              className="relative z-20 max-w-full whitespace-normal lg:-mb-1"
            >
              {eyebrow}
            </Badge>
          ) : null}
          <h1
            id="hero-title"
            aria-label={title}
            className="relative whitespace-nowrap font-display font-extrabold uppercase leading-none tracking-tight text-white [font-size:clamp(1.65rem,11.2cqi,4.75rem)]"
          >
            <span className="whitespace-nowrap">{mainTitle}</span>
            {edition ? (
              <span className="gs-glitch ml-1.5 inline-block align-baseline font-accent text-[0.38em] text-neon-orange sm:ml-2">
                {edition}
              </span>
            ) : null}
          </h1>
          <p className="relative z-20 max-w-md font-sans text-base font-medium leading-snug text-text-light md:text-xl">
            {description}
          </p>
          {actions ? (
            <div className="relative z-20 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap">
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
