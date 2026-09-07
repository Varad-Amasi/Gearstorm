import { useEffect, useState } from 'react';
import { GalleryMarquee } from '@/components/gallery/GalleryMarquee';
import { Modal } from '@/components/common/Modal';
import { GALLERY_ITEMS, GALLERY_RECAP } from '@/data/galleryImages';

const HOME_VIDEO_SRC = '/video/gearstorm-recap.mp4';
const MARQUEE_ITEMS = [GALLERY_RECAP, ...GALLERY_ITEMS];

/**
 * GearStorm 1.0 photos (moving strip) and a recap video slot.
 * Drop an MP4 at public/video/gearstorm-recap.mp4 to enable playback.
 */
export const HomeGallery = (): JSX.Element => {
  const [selected, setSelected] = useState<
    (typeof MARQUEE_ITEMS)[number] | null
  >(null);
  const [hasVideo, setHasVideo] = useState(false);

  useEffect(() => {
    let cancelled = false;
    void fetch(HOME_VIDEO_SRC, { method: 'HEAD' })
      .then((response) => {
        const type = response.headers.get('content-type') ?? '';
        if (!cancelled && response.ok && type.includes('video')) {
          setHasVideo(true);
        }
      })
      .catch(() => {
        /* Missing file or blocked HEAD — keep the coming-soon slot. */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="py-16" aria-labelledby="from-1-0">
      <div className="container-page mb-8">
        <p className="font-subhead text-sm font-semibold uppercase tracking-widest text-accent">
          Last year
        </p>
        <h2
          id="from-1-0"
          className="mt-1 scroll-mt-24 font-heading text-2xl font-bold tracking-tight md:text-3xl"
        >
          GearStorm 1.0
        </h2>
        <p className="mt-2 max-w-2xl font-sans leading-relaxed text-text-muted">
          Photos from the first edition at KLS GIT, plus a recap video when it
          is ready.
        </p>
      </div>

      <GalleryMarquee items={MARQUEE_ITEMS} onSelect={setSelected} />

      <div className="container-page mt-10">
        {hasVideo ? (
          <video
            className="aspect-video w-full rounded-xl border border-border bg-dark-900 object-cover"
            controls
            playsInline
            preload="metadata"
            poster={GALLERY_RECAP.src}
          >
            <source src={HOME_VIDEO_SRC} type="video/mp4" />
          </video>
        ) : (
          <div
            className="flex aspect-video w-full items-center justify-center rounded-xl border border-dashed border-border bg-dark-800/80 px-6 text-center"
            role="status"
          >
            <p className="max-w-md font-heading text-lg font-semibold text-text-light">
              Recap video coming soon
            </p>
          </div>
        )}
      </div>

      <Modal
        open={selected !== null}
        onClose={() => {
          setSelected(null);
        }}
        title={selected?.caption ?? 'Photo'}
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
    </section>
  );
};
