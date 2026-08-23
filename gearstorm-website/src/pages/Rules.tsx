import { PageContainer } from '@/components/layout/PageContainer';

const RulesPage = (): JSX.Element => (
  <PageContainer
    eyebrow="Competition"
    title="Rules & Regulations"
    description="General rules, obstacle descriptions, the scoring formula, and disqualification criteria."
  >
    <p className="text-text-muted">
      Full rules content lands in Phase 5 once organizers confirm obstacle and
      scoring details.
    </p>
  </PageContainer>
);

export default RulesPage;
