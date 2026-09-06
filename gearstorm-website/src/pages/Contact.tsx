import { Card } from '@/components/common/Card';
import { PageContainer } from '@/components/layout/PageContainer';
import { ContentSection } from '@/components/sections/ContentSection';
import { ORGANIZER } from '@/config/routes';
import { SOCIAL_LINKS, VENUE } from '@/utils/competition';

const mapSrc = `https://maps.google.com/maps?q=${VENUE.mapQuery}&z=15&output=embed`;

const ContactPage = (): JSX.Element => (
  <PageContainer
    eyebrow="Get In Touch"
    title="Contact"
    description="Organiser details for GearStorm 2.0. More contacts coming soon."
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
        <div className="overflow-hidden rounded-lg border border-border">
          <iframe
            title={`Map of ${VENUE.name}`}
            src={mapSrc}
            className="h-64 w-full border-0 bg-dark-900 md:h-80"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </ContentSection>
    </div>
  </PageContainer>
);

export default ContactPage;
