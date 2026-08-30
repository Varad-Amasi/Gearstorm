import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { Badge } from '@/components/common/Badge';
import { Card } from '@/components/common/Card';
import { Modal } from '@/components/common/Modal';
import { Tag } from '@/components/common/Tag';
import { GalleryUploadForm } from '@/components/forms/GalleryUploadForm';
import { PageContainer } from '@/components/layout/PageContainer';
import { GALLERY_CATEGORIES, GALLERY_ITEMS } from '@/data/galleryImages';
import { getErrorMessage } from '@/services/apiClient';
import { fetchGalleryImages, resolveMediaUrl } from '@/services/imageService';
import type { GalleryImageDto } from '@/types/api';

interface GalleryViewItem {
  id: string;
  src: string;
  alt: string;
  category: string;
  year: number;
  caption: string;
}

const toViewItem = (item: GalleryImageDto): GalleryViewItem => ({
  id: item.id,
  src: resolveMediaUrl(item.imageUrl),
  alt: item.alt,
  category: item.category,
  year: item.year,
  caption: item.caption,
});

const fallbackItems: GalleryViewItem[] = GALLERY_ITEMS.map((item) => ({
  id: item.id,
  src: item.src,
  alt: item.alt,
  category: item.category,
  year: item.year,
  caption: item.caption,
}));

const GalleryPage = (): JSX.Element => {
  const [category, setCategory] =
    useState<(typeof GALLERY_CATEGORIES)[number]>('All');
  const [year, setYear] = useState<string>('All');
  const [selected, setSelected] = useState<GalleryViewItem | null>(null);
  const [showUpload, setShowUpload] = useState(false);

  const galleryQuery = useQuery({
    queryKey: ['gallery'],
    queryFn: fetchGalleryImages,
    staleTime: 30_000,
    retry: 1,
  });

  const items = useMemo(() => {
    if (galleryQuery.isSuccess) {
      return galleryQuery.data.map(toViewItem);
    }
    if (galleryQuery.isError) {
      return fallbackItems;
    }
    return [];
  }, [galleryQuery.data, galleryQuery.isError, galleryQuery.isSuccess]);

  const yearOptions = useMemo(() => {
    const years = Array.from(
      new Set(items.map((item) => String(item.year)))
    ).sort((a, b) => b.localeCompare(a));
    return ['All', ...years];
  }, [items]);

  const filtered = useMemo(
    () =>
      items.filter((item) => {
        const categoryOk = category === 'All' || item.category === category;
        const yearOk = year === 'All' || String(item.year) === year;
        return categoryOk && yearOk;
      }),
    [category, items, year]
  );

  return (
    <PageContainer
      eyebrow="Past Events"
      title="Gallery"
      description="Photos from previous GearStorm runs, robot builds, and competition moments."
    >
      <div className="flex flex-col gap-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-text-subtle">
            {galleryQuery.isError
              ? `API offline (${getErrorMessage(galleryQuery.error)}) — showing local placeholders.`
              : galleryQuery.isSuccess
                ? galleryQuery.data.length === 0
                  ? 'API connected — no gallery images yet.'
                  : 'Loaded from the GearStorm API.'
                : 'Loading gallery…'}
          </p>
          {import.meta.env.DEV ? (
            <button
              type="button"
              className="font-heading text-sm font-semibold text-primary-500 hover:underline"
              onClick={() => {
                setShowUpload((open) => !open);
              }}
            >
              {showUpload ? 'Hide organiser upload' : 'Organiser upload'}
            </button>
          ) : null}
        </div>

        {showUpload && import.meta.env.DEV ? (
          <Card title="Upload to gallery">
            <GalleryUploadForm
              onUploaded={() => {
                void galleryQuery.refetch();
              }}
            />
          </Card>
        ) : null}

        <div className="flex flex-col gap-4">
          <div
            className="flex flex-wrap gap-2"
            role="group"
            aria-label="Filter by category"
          >
            {GALLERY_CATEGORIES.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => {
                  setCategory(option);
                }}
                className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                aria-pressed={category === option}
              >
                <Tag
                  className={
                    category === option
                      ? 'border-primary bg-primary/20 text-primary-500'
                      : undefined
                  }
                >
                  {option}
                </Tag>
              </button>
            ))}
          </div>
          <div
            className="flex flex-wrap gap-2"
            role="group"
            aria-label="Filter by year"
          >
            {yearOptions.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => {
                  setYear(option);
                }}
                className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                aria-pressed={year === option}
              >
                <Tag
                  className={
                    year === option
                      ? 'border-accent bg-accent/20 text-accent'
                      : undefined
                  }
                >
                  {option === 'All' ? 'All years' : option}
                </Tag>
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <p className="text-text-muted">No images match these filters.</p>
        ) : (
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => {
                    setSelected(item);
                  }}
                  className="group w-full overflow-hidden rounded-lg border border-border bg-dark-800 text-left transition-all duration-normal hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-purple focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    loading="lazy"
                    decoding="async"
                    width={800}
                    height={560}
                    className="aspect-[10/7] w-full object-cover transition-opacity duration-normal group-hover:opacity-90"
                  />
                  <div className="flex items-start justify-between gap-2 p-3">
                    <div className="min-w-0">
                      <p className="font-heading text-sm font-semibold text-text-light">
                        {item.caption}
                      </p>
                      <p className="mt-1 text-xs text-text-subtle">
                        {item.year}
                      </p>
                    </div>
                    <Badge variant="info" className="shrink-0">
                      {item.category}
                    </Badge>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <Modal
        open={selected !== null}
        onClose={() => {
          setSelected(null);
        }}
        title={selected?.caption ?? 'Gallery image'}
        description={
          selected ? `${selected.category} · ${selected.year}` : undefined
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
