import { clsx } from 'clsx';
import type { ReactNode } from 'react';
import { Reveal } from './Reveal';

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQSectionProps {
  title: string;
  items: readonly FAQItem[];
  /** Rendered after the list, e.g. a link to the contact page. */
  footer?: ReactNode;
  className?: string;
}

/**
 * Accordion FAQ list built on native `<details>` for free keyboard and
 * screen-reader support.
 */
export const FAQSection = ({
  title,
  items,
  footer,
  className,
}: FAQSectionProps): JSX.Element => (
  <section
    className={clsx('container-page py-16', className)}
    aria-labelledby="faq-title"
  >
    <Reveal>
      <h2
        id="faq-title"
        className="font-heading text-2xl font-bold md:text-3xl"
      >
        {title}
      </h2>
    </Reveal>
    <div className="mt-8 flex max-w-3xl flex-col gap-3">
      {items.map((item, index) => (
        <Reveal key={item.question} delay={index * 0.06}>
          <details className="group rounded-md border border-border bg-dark-800/80 transition-colors duration-normal open:border-accent/40 hover:border-border">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-3 px-4 py-4 font-heading font-semibold text-text-light sm:items-center sm:px-6 [&::-webkit-details-marker]:hidden">
              {item.question}
              <span
                aria-hidden="true"
                className="shrink-0 text-xl text-primary-500 transition-transform duration-normal group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="px-4 pb-5 text-text-muted sm:px-6">{item.answer}</p>
          </details>
        </Reveal>
      ))}
    </div>
    {footer ? <div className="mt-8">{footer}</div> : null}
  </section>
);
