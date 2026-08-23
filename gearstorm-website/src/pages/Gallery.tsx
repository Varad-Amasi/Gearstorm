import { PageContainer } from '@/components/layout/PageContainer';

const GalleryPage = (): JSX.Element => (
  <PageContainer
    eyebrow="Past Events"
    title="Gallery"
    description="Photos from previous GearStorm runs, robot builds, and competition moments."
  >
    <p className="text-text-muted">
      The image grid and lightbox arrive in Phase 5 once event photos are
      supplied.
    </p>
  </PageContainer>
);

export default GalleryPage;
