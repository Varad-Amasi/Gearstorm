import { Alert } from '@/components/common/Alert';
import { Card } from '@/components/common/Card';
import { RegistrationForm } from '@/components/forms/RegistrationForm';
import { PageContainer } from '@/components/layout/PageContainer';
import { ContentSection } from '@/components/sections/ContentSection';
import { ORGANIZER, ROUTES } from '@/config/routes';
import { COMPETITION, PAYMENT, REGISTRATION_OPEN } from '@/utils/competition';
import { Link } from 'react-router-dom';

const STEPS = [
  {
    title: 'Fill team details',
    description: `Add your team name, college, and ${COMPETITION.teamSizeMin}–${COMPETITION.teamSizeMax} members. The first member is the Lead; the rest are Members.`,
  },
  {
    title: 'Pay the registration fee',
    description: `After the member details, scan the UPI QR or pay to ${PAYMENT.upiId}, then note your UTR / transaction ID.`,
  },
  {
    title: 'Submit UTR + payment screenshot',
    description:
      'Enter the UTR, upload a payment proof image, then submit. Organisers verify and confirm the entry.',
  },
] as const;

const RegisterPage = (): JSX.Element => {
  if (!REGISTRATION_OPEN) {
    return (
      <PageContainer
        eyebrow="Coming Soon"
        title="Team Registration"
        description={`Entries are not open yet. Teams of ${COMPETITION.teamSizeMin}–${COMPETITION.teamSizeMax} will register here when we flip the switch. Organised ${ORGANIZER.credit}.`}
      >
        <div className="mx-auto flex max-w-3xl flex-col gap-8">
          <Alert variant="info" title="Registration is closed">
            The form and payment QR are hidden so nobody pays early. Check back
            soon, or{' '}
            <Link className="text-accent hover:underline" to={ROUTES.CONTACT}>
              contact the organisers
            </Link>
            .
          </Alert>
          <p className="text-sm text-text-subtle">
            Meanwhile, read the{' '}
            <Link className="text-accent hover:underline" to={ROUTES.RULES}>
              Rules
            </Link>{' '}
            and{' '}
            <Link className="text-accent hover:underline" to={ROUTES.BOT_SPECS}>
              Bot Specs
            </Link>
            .
          </p>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer
      eyebrow="Entries Open"
      title="Team Registration"
      description={`${COMPETITION.teamSizeMin}–${COMPETITION.teamSizeMax} people. Same college. Pay, upload proof, you’re in. Organised ${ORGANIZER.credit}.`}
    >
      <div className="mx-auto flex max-w-3xl flex-col gap-10">
        {import.meta.env.DEV ? (
          <Alert variant="info" title="Local development">
            Start the API with{' '}
            <code className="text-text-light">cd backend && npm run dev</code>{' '}
            so submissions reach the server and Google Sheet.
          </Alert>
        ) : null}

        <ContentSection
          id="how-it-works"
          title="How registration works"
          className="border-0 pt-0"
        >
          <ol className="mt-4 flex flex-col gap-4">
            {STEPS.map((step, index) => (
              <li
                key={step.title}
                className="flex gap-4 rounded-lg border border-border bg-dark-800/60 p-4"
              >
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/20 font-heading text-sm font-bold text-primary-500"
                  aria-hidden="true"
                >
                  {index + 1}
                </span>
                <div>
                  <p className="font-heading font-semibold text-text-light">
                    {step.title}
                  </p>
                  <p className="mt-1 text-sm text-text-muted">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-4 text-sm text-text-subtle">
            Need the rulebook or bot limits first? See{' '}
            <Link className="text-accent hover:underline" to={ROUTES.RULES}>
              Rules
            </Link>{' '}
            and{' '}
            <Link className="text-accent hover:underline" to={ROUTES.BOT_SPECS}>
              Bot Specs
            </Link>
            .
          </p>
        </ContentSection>

        <Card>
          <RegistrationForm />
        </Card>

        <Alert variant="info" title="After you submit">
          Keep your team reference ID. Payment stays pending until organisers
          match your UTR and payment screenshot. Questions?{' '}
          <Link className="text-accent hover:underline" to={ROUTES.CONTACT}>
            Contact the organisers
          </Link>
          .
        </Alert>
      </div>
    </PageContainer>
  );
};

export default RegisterPage;
