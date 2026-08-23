import { PageContainer } from '@/components/layout/PageContainer';

const BotSpecsPage = (): JSX.Element => (
  <PageContainer
    eyebrow="Build Guide"
    title="Bot Specifications"
    description="Dimensions, weight limits, power options, and the components you are allowed to use."
  >
    <p className="text-text-muted">
      Detailed specifications land in Phase 5 once organizers confirm the exact
      limits.
    </p>
  </PageContainer>
);

export default BotSpecsPage;
