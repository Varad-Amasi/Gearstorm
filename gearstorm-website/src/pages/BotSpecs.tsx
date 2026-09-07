import { Link } from 'react-router-dom';
import { Alert } from '@/components/common/Alert';
import { RegisterCta } from '@/components/common/RegisterCta';
import { Card } from '@/components/common/Card';
import { getButtonClasses } from '@/components/common/buttonStyles';
import { PageContainer } from '@/components/layout/PageContainer';
import { ContentSection } from '@/components/sections/ContentSection';
import { InlineFAQ } from '@/components/sections/InlineFAQ';
import { SpecTable } from '@/components/sections/SpecTable';
import { ROUTES } from '@/config/routes';
import {
  BOT_SPEC_FAQS,
  COMPONENT_SPECS,
  DESIGN_TIPS,
  ELECTRICAL_SPECS,
  PHYSICAL_SPECS,
} from '@/data/botSpecs';
import { COMPETITION, RULEBOOK } from '@/utils/competition';

const BotSpecsPage = (): JSX.Element => (
  <PageContainer
    eyebrow="Build Guide"
    title="Bot Specifications"
    description="Size, weight, power, and category limits from the official rulebook — confirmed at inspection."
  >
    <div className="flex flex-col gap-10">
      <Alert variant="info" title="Official specification">
        {COMPETITION.officialNotice}{' '}
        <a
          className="font-semibold text-accent underline-offset-4 hover:underline"
          href={RULEBOOK.href}
          download={RULEBOOK.downloadName}
        >
          Download the rulebook
        </a>
        .
      </Alert>

      <ContentSection
        id="overview"
        title="What is a GearStorm bot?"
        description="A team-built mobile robot that must clear the shared arena as fast as possible."
      >
        <div className="space-y-4 text-text-muted">
          <p>
            Every bot must fit a {COMPETITION.maxBotSizeCm} cm cube (including
            antennas), stay under {COMPETITION.maxWeightKg} kg (up to{' '}
            {COMPETITION.maxWeightWithToleranceKg} kg with tolerance), and use
            an approved 3S pack. The chassis must be designed and built by the
            team.
          </p>
          <p>
            Beginner and Advanced share the arena and the size/weight/battery
            limits. They differ on budget and how you may drive. Race-day
            scoring is summarised on{' '}
            <Link className="text-accent hover:underline" to={ROUTES.RULES}>
              Rules
            </Link>
            .
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <RegisterCta variant="primary" size="md" className="inline-flex">
              Register your team
            </RegisterCta>
            <a
              href={RULEBOOK.href}
              download={RULEBOOK.downloadName}
              className={getButtonClasses('ghost', 'md')}
            >
              Download rulebook
            </a>
          </div>
        </div>
      </ContentSection>

      <div className="grid gap-6 lg:grid-cols-1">
        <SpecTable group={PHYSICAL_SPECS} />
        <SpecTable group={ELECTRICAL_SPECS} />
        <SpecTable group={COMPONENT_SPECS} />
      </div>

      <ContentSection
        id="tips"
        title="Design constraints & tips"
        description="Points that keep bots out of the inspection rejection pile."
      >
        <Card>
          <ul className="list-disc space-y-2 pl-5 text-text-muted">
            {DESIGN_TIPS.map((tip) => (
              <li key={tip}>{tip}</li>
            ))}
          </ul>
        </Card>
      </ContentSection>

      <ContentSection id="faq" title="Bot Specs FAQ">
        <InlineFAQ title="Common build questions" items={BOT_SPEC_FAQS} />
      </ContentSection>
    </div>
  </PageContainer>
);

export default BotSpecsPage;
