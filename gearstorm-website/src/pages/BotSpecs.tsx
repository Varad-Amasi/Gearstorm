import { Link } from 'react-router-dom';
import { Alert } from '@/components/common/Alert';
import { getButtonClasses } from '@/components/common/buttonStyles';
import { Card } from '@/components/common/Card';
import { PageContainer } from '@/components/layout/PageContainer';
import { BotPreview } from '@/components/sections/BotPreview';
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
import { COMPETITION } from '@/utils/competition';

const BotSpecsPage = (): JSX.Element => (
  <PageContainer
    eyebrow="Build Guide"
    title="Bot Specifications"
    description="Dimensions, weight limits, power options, and the components you are allowed to use."
  >
    <div className="flex flex-col gap-10">
      <Alert variant="info" title="Provisional specification">
        {COMPETITION.provisionalNotice}
      </Alert>

      <ContentSection
        id="overview"
        title="What is a GearStorm bot?"
        description="A self-contained mobile robot built by your team to clear the obstacle course as fast as possible."
      >
        <div className="grid items-start gap-8 lg:grid-cols-2">
          <div className="space-y-4 text-text-muted">
            <p>
              Bots must fit a {COMPETITION.maxBotSizeCm} cm cube at the start of
              each run, stay under {COMPETITION.maxWeightKg} kg, and remain safe
              for arena marshals to handle. Off-the-shelf motors and sensors are
              welcome — ready-made robot kits are not.
            </p>
            <p>
              Use this page as your build checklist before technical inspection.
              Race-day rules and scoring live on the{' '}
              <Link className="text-accent hover:underline" to={ROUTES.RULES}>
                Rules
              </Link>{' '}
              page.
            </p>
            <Link
              to={ROUTES.REGISTER}
              className={getButtonClasses('primary', 'md', 'inline-flex')}
            >
              Register your team
            </Link>
          </div>
          <div>
            <BotPreview />
            <p className="mt-3 text-sm text-text-subtle">
              Reference silhouette — your design does not need to match this
              layout.
            </p>
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
        description="Lessons that keep bots out of the inspection rejection pile."
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
