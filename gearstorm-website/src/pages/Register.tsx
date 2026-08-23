import { PageContainer } from '@/components/layout/PageContainer';

const RegisterPage = (): JSX.Element => (
  <PageContainer
    eyebrow="Entries Open"
    title="Team Registration"
    description="Register your team, add members, and track your entry status."
  >
    <p className="text-text-muted">
      The validated registration form arrives in Phase 5, wired to the backend
      in Phase 6.
    </p>
  </PageContainer>
);

export default RegisterPage;
