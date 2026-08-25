export interface InlineFAQItem {
  question: string;
  answer: string;
}

export interface InlineFAQProps {
  title?: string;
  items: readonly InlineFAQItem[];
}

/**
 * Compact FAQ accordion for use inside {@link PageContainer} (no outer
 * container padding of its own).
 */
export const InlineFAQ = ({
  title = 'Frequently asked questions',
  items,
}: InlineFAQProps): JSX.Element => (
  <div>
    <h3 className="font-heading text-2xl font-bold md:text-3xl">{title}</h3>
    <div className="mt-6 flex max-w-3xl flex-col gap-3">
      {items.map((item) => (
        <details
          key={item.question}
          className="group rounded-lg border border-border bg-dark-800 transition-colors duration-normal open:border-primary/50 hover:border-primary/50"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-heading font-semibold text-text-light [&::-webkit-details-marker]:hidden">
            {item.question}
            <span
              aria-hidden="true"
              className="shrink-0 text-xl text-primary-500 transition-transform duration-normal group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="px-5 pb-4 text-text-muted">{item.answer}</p>
        </details>
      ))}
    </div>
  </div>
);
