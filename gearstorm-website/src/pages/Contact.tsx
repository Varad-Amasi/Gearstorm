import { Card } from '@/components/common/Card';
import { ContactForm } from '@/components/forms/ContactForm';
import { PageContainer } from '@/components/layout/PageContainer';
import { ContentSection } from '@/components/sections/ContentSection';
import { ORGANIZER } from '@/config/routes';
import { SOCIAL_LINKS, VENUE } from '@/utils/competition';

const mapSrc = `https://maps.google.com/maps?q=${VENUE.mapQuery}&z=15&output=embed`;

const ContactPage = (): JSX.Element => (
  <PageContainer
    eyebrow="Get In Touch"
    title="Contact"
    description="Questions about rules, specs, or registration? Reach the organising team."
  >
    <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
      <ContentSection
        id="form"
        title="Send a message"
        description="Validated on the client and submitted to the GearStorm API."
        className="border-0 pt-0"
      >
        <Card>
          <ContactForm />
        </Card>
      </ContentSection>

      <div className="flex flex-col gap-8">
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
    </div>
  </PageContainer>
);

export default ContactPage;
