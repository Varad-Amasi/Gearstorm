import { ORGANIZER } from '@/config/routes';
import { PageContainer } from '@/components/layout/PageContainer';

const ContactPage = (): JSX.Element => (
  <PageContainer
    eyebrow="Get In Touch"
    title="Contact"
    description="Questions about rules, specs, or registration? Reach the organizing team."
  >
    <address className="not-italic text-text-muted">
      <p className="font-heading font-semibold text-text-light">
        {ORGANIZER.society}
      </p>
      <p>{ORGANIZER.chapter}</p>
      <p className="mt-4">
        <a
          className="text-accent hover:underline"
          href={`mailto:${ORGANIZER.email}`}
        >
          {ORGANIZER.email}
        </a>
      </p>
    </address>
    <p className="mt-6 text-text-muted">
      The contact form and map embed arrive in Phase 5.
    </p>
  </PageContainer>
);

export default ContactPage;
