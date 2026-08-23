import { clsx } from 'clsx';
import { Reveal } from './Reveal';

export interface TimelineItem {
  title: string;
  description: string;
  /** Small label above the title, e.g. a date or step number. */
  meta?: string;
}

export interface TimelineSectionProps {
  title: string;
  items: readonly TimelineItem[];
  /** Note rendered under the timeline, e.g. "dates announced soon". */
  footnote?: string;
  className?: string;
}

/**
 * Vertical event timeline with a connecting line and stage markers.
 */
export const TimelineSection = ({
  title,
  items,
  footnote,
  className,
}: TimelineSectionProps): JSX.Element => (
  <section
    className={clsx('container-page py-16', className)}
    aria-labelledby="timeline-title"
  >
    <Reveal>
      <h2
        id="timeline-title"
        className="font-heading text-2xl font-bold md:text-3xl"
      >
        {title}
      </h2>
    </Reveal>
    <ol className="ml-3 mt-10 border-l border-border">
      {items.map((item, index) => (
        <li key={item.title} className="relative pb-10 pl-8 last:pb-0">
          <span
            aria-hidden="true"
            className="absolute -left-2 top-1 h-4 w-4 rounded-full border-2 border-primary-500 bg-dark-950"
          />
          <Reveal delay={index * 0.08}>
            {item.meta ? (
              <p className="font-heading text-xs font-semibold uppercase tracking-widest text-accent">
                {item.meta}
              </p>
            ) : null}
            <h3 className="mt-1 font-heading text-lg font-bold text-text-light">
              {item.title}
            </h3>
            <p className="mt-1 max-w-xl text-text-muted">{item.description}</p>
          </Reveal>
        </li>
      ))}
    </ol>
    {footnote ? (
      <p className="mt-8 text-sm text-text-subtle">{footnote}</p>
    ) : null}
  </section>
);
