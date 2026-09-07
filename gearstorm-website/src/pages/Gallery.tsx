import { useState } from 'react';
import { Badge } from '@/components/common/Badge';
import { GalleryMarquee } from '@/components/gallery/GalleryMarquee';
import { Modal } from '@/components/common/Modal';
import { PageContainer } from '@/components/layout/PageContainer';
import { GALLERY_ITEMS, GALLERY_RECAP } from '@/data/galleryImages';

const GalleryPage = (): JSX.Element => {
  const [selected, setSelected] = useState<
    (typeof GALLERY_ITEMS)[number] | typeof GALLERY_RECAP | null
  >(null);

  return (
    <PageContainer
      eyebrow="Past Events"
      title="Gallery"
      description="Photos from GearStorm 1.0 at KLS GIT: the course, the pits, and the closing group on stage."
    >
      <div className="flex flex-col gap-12">
        <section aria-labelledby="gs10-recap-heading">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div className="max-w-2xl">
              <p className="font-subhead text-sm font-semibold uppercase tracking-widest text-accent">
                Recap
              </p>
              <h2
                id="gs10-recap-heading"
                className="mt-1 font-heading text-2xl font-bold tracking-tight md:text-3xl"
              >
                GearStorm 1.0
              </h2>
              <p className="mt-2 font-sans leading-relaxed text-text-muted">
                The first edition at KLS GIT — bots on the floor, an LED course
                after dark, and the full house on stage at the close.
              </p>
            </div>
            <Badge variant="info">2025</Badge>
          </div>
          <button
            type="button"
            onClick={() => {
              setSelected(GALLERY_RECAP);
            }}
            className="group w-full overflow-hidden rounded-xl border border-border bg-dark-800 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
          >
            <img
              src={GALLERY_RECAP.src}
              alt={GALLERY_RECAP.alt}
              width={1600}
              height={900}
              className="aspect-[16/9] w-full object-cover transition-transform duration-slow group-hover:scale-[1.02]"
            />
            <div className="flex items-center justify-between gap-3 px-4 py-3">
              <p className="font-heading text-sm font-semibold text-text-light md:text-base">
                {GALLERY_RECAP.caption}
              </p>
              <span className="shrink-0 text-xs uppercase tracking-wide text-text-subtle">
                Open
              </span>
            </div>
          </button>
        </section>

        <section aria-labelledby="gs10-strip-heading">
          <h2 id="gs10-strip-heading" className="sr-only">
            Moving photos from GearStorm 1.0
          </h2>
          <GalleryMarquee items={GALLERY_ITEMS} onSelect={setSelected} />
        </section>
      </div>

      <Modal
        open={selected !== null}
        onClose={() => {
          setSelected(null);
        }}
        title={selected?.caption ?? 'Gallery image'}
        description={
          selected ? `${selected.category} · GearStorm 1.0` : undefined
        }
        size="lg"
      >
        {selected ? (
          <img
            src={selected.src}
            alt={selected.alt}
            className="w-full rounded-md"
          />
        ) : null}
      </Modal>
    </PageContainer>
  );
};

export default GalleryPage;
