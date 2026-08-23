import { PageContainer } from '@/components/layout/PageContainer';

const LeaderboardPage = (): JSX.Element => (
  <PageContainer
    eyebrow="Live Results"
    title="Leaderboard"
    description="Rankings for both rounds with times, obstacles cleared, penalties, and total score."
  >
    <p className="text-text-muted">
      The sortable, filterable leaderboard table arrives in Phase 6 alongside
      the backend.
    </p>
  </PageContainer>
);

export default LeaderboardPage;
