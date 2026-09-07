import { Card } from '@/components/common/Card';
import { CampusMap } from '@/components/contact/CampusMap';
import { PageContainer } from '@/components/layout/PageContainer';
import { ContentSection } from '@/components/sections/ContentSection';
import { ORGANIZER } from '@/config/routes';
import { SOCIAL_LINKS, VENUE } from '@/utils/competition';

const ContactPage = (): JSX.Element => (
  <PageContainer
    eyebrow="Get In Touch"
    title="Contact"
    description="IEEE RAS and ISTE at KLS GIT Belagavi. Questions about Beginner or Advanced? Email is the fastest way to reach us."
  >
    <div className="mx-auto flex max-w-2xl flex-col gap-8">
      <ContentSection
        id="info"
        title="Organiser details"
        className="border-0 pt-0"
      >
        <Card>
          <address className="not-italic text-text-muted">
            <p className="font-heading font-semibold text-text-light">
              {ORGANIZER.societiesJoined}
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              {ORGANIZER.societies.map((society) => (
                <li key={society.short}>{society.full}</li>
              ))}
            </ul>
            <p className="mt-3">{ORGANIZER.chapter}</p>
            <p className="mt-4">
              <a
                className="text-accent hover:underline"
                href={`mailto:${ORGANIZER.email}`}
              >
                {ORGANIZER.email}
              </a>
            </p>
            <p className="mt-2">
              <a
                className="text-accent hover:underline"
                href={`tel:${ORGANIZER.phone.replace(/\s/g, '')}`}
              >
                {ORGANIZER.phone}
              </a>
            </p>
            <p className="mt-4">
              {VENUE.name}
              <br />
              {VENUE.city}, {VENUE.state}, {VENUE.country}
            </p>
          </address>

          {SOCIAL_LINKS.length > 0 ? (
            <div className="mt-6 flex flex-wrap gap-3">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-heading text-sm font-semibold text-primary-500 hover:underline"
                >
                  {link.label}
                </a>
              ))}
            </div>
          ) : null}
        </Card>
      </ContentSection>

      <ContentSection id="map" title="Campus location">
        <CampusMap />
      </ContentSection>
    </div>
  </PageContainer>
);

export default ContactPage;
