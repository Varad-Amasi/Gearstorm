import { Alert } from '@/components/common/Alert';
import { Card } from '@/components/common/Card';
import { RegistrationForm } from '@/components/forms/RegistrationForm';
import { PageContainer } from '@/components/layout/PageContainer';
import { COMPETITION } from '@/utils/competition';

const RegisterPage = (): JSX.Element => (
  <PageContainer
    eyebrow="Entries Open"
    title="Team Registration"
    description={`Register a team of ${COMPETITION.teamSizeMin}–${COMPETITION.teamSizeMax} students from the same college.`}
  >
    <div className="mx-auto flex max-w-3xl flex-col gap-6">
      <Alert variant="info" title="Live API">
        Submissions POST to the GearStorm backend. Start it with{' '}
        <code className="text-text-light">cd backend && npm run dev</code> when
        developing locally.
      </Alert>
      <Card>
        <RegistrationForm />
      </Card>
    </div>
  </PageContainer>
);

export default RegisterPage;
