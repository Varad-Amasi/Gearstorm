import type { GalleryItem } from '@/data/galleryImages';

interface GalleryMarqueeProps {
  items: readonly GalleryItem[];
  onSelect: (item: GalleryItem) => void;
}

/**
 * Seamless horizontal strip. Duplicate the row so the loop has no seam.
 */
export const GalleryMarquee = ({
  items,
  onSelect,
}: GalleryMarqueeProps): JSX.Element => {
  const loop = [...items, ...items];

  return (
    <div className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-dark-950 to-transparent md:w-16"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-dark-950 to-transparent md:w-16"
        aria-hidden="true"
      />
      <ul className="gallery-marquee flex w-max gap-4 py-1">
        {loop.map((item, index) => {
          const isClone = index >= items.length;
          return (
            <li
              key={`${item.id}-${index}`}
              className="w-[min(78vw,20rem)] shrink-0"
              aria-hidden={isClone || undefined}
            >
              <button
                type="button"
                tabIndex={isClone ? -1 : undefined}
                onClick={() => {
                  onSelect(item);
                }}
                className="group w-full overflow-hidden rounded-lg border border-border bg-dark-800 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
              >
                <img
                  src={item.src}
                  alt={isClone ? '' : item.alt}
                  loading="lazy"
                  decoding="async"
                  width={640}
                  height={400}
                  className="aspect-[8/5] w-full object-cover transition-transform duration-slow group-hover:scale-[1.04]"
                />
                <div className="px-3 py-2">
                  <p className="truncate font-heading text-sm font-semibold text-text-light">
                    {item.caption}
                  </p>
                  <p className="text-xs text-text-subtle">{item.category}</p>
                </div>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
