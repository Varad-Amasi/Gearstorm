import { Link } from 'react-router-dom';
import { Alert } from '@/components/common/Alert';
import { RegisterCta } from '@/components/common/RegisterCta';
import { Card } from '@/components/common/Card';
import { getButtonClasses } from '@/components/common/buttonStyles';
import { PageContainer } from '@/components/layout/PageContainer';
import {
  CategoryJump,
  CategorySplit,
} from '@/components/sections/CategorySplit';
import { ContentSection } from '@/components/sections/ContentSection';
import { InlineFAQ } from '@/components/sections/InlineFAQ';
import { SpecTable } from '@/components/sections/SpecTable';
import { ROUTES } from '@/config/routes';
import {
  ADVANCED_SPECS,
  ADVANCED_TIPS,
  BEGINNER_SPECS,
  BEGINNER_TIPS,
  BOT_SPEC_FAQS,
  ELECTRICAL_SPECS,
  PHYSICAL_SPECS,
  SHARED_DESIGN_TIPS,
  type SpecRow,
} from '@/data/botSpecs';
import { CATEGORIES, COMPETITION, RULEBOOK } from '@/utils/competition';

const SpecRows = ({ rows }: { rows: readonly SpecRow[] }): JSX.Element => (
  <dl className="divide-y divide-border">
    {rows.map((row) => (
      <div
        key={row.label}
        className="grid gap-1 py-3 first:pt-0 last:pb-0 sm:grid-cols-[7rem_1fr] sm:gap-4"
      >
        <dt className="font-mono text-sm font-semibold text-accent">
          {row.label}
        </dt>
        <dd className="font-mono text-sm text-text-light">{row.value}</dd>
      </div>
    ))}
  </dl>
);

const TipList = ({ items }: { items: readonly string[] }): JSX.Element => (
  <ul className="mt-5 list-disc space-y-2 pl-5 text-sm text-text-muted">
    {items.map((tip) => (
      <li key={tip}>{tip}</li>
    ))}
  </ul>
);

const BotSpecsPage = (): JSX.Element => (
  <PageContainer
    eyebrow="Build Guide"
    title="Bot Specifications"
    description={`Limits for both ${CATEGORIES.beginner.name} and ${CATEGORIES.advanced.name} from the official rulebook — confirmed at inspection.`}
  >
    <div className="flex flex-col gap-10">
      <CategoryJump idPrefix="specs-" />

      <Alert variant="info" title="Official specification">
        {COMPETITION.officialNotice} Size, weight, and battery are the same in
        both categories. Budget and control are not.{' '}
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
        className="border-0 pt-0"
      >
        <div className="space-y-4 text-text-muted">
          <p>
            Every Beginner and Advanced bot must fit a{' '}
            {COMPETITION.maxBotSizeCm} cm cube (including antennas), stay under{' '}
            {COMPETITION.maxWeightKg} kg (up to{' '}
            {COMPETITION.maxWeightWithToleranceKg} kg with tolerance), and use
            an approved 3S pack. The chassis must be designed and built by the
            team.
          </p>
          <p>
            You enter one category. Race-day scoring is summarised on{' '}
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

      <ContentSection
        id="categories"
        title="Beginner and Advanced builds"
        description="Shared envelope first. Category rules below."
      >
        <CategorySplit
          idPrefix="specs-"
          beginner={
            <>
              <SpecRows rows={BEGINNER_SPECS} />
              <TipList items={BEGINNER_TIPS} />
            </>
          }
          advanced={
            <>
              <SpecRows rows={ADVANCED_SPECS} />
              <TipList items={ADVANCED_TIPS} />
            </>
          }
        />
      </ContentSection>

      <div className="grid gap-6 lg:grid-cols-1">
        <SpecTable group={PHYSICAL_SPECS} />
        <SpecTable group={ELECTRICAL_SPECS} />
      </div>

      <ContentSection
        id="tips"
        title="Design constraints & tips"
        description="These apply to every robot, whichever category you enter."
      >
        <Card>
          <ul className="list-disc space-y-2 pl-5 text-text-muted">
            {SHARED_DESIGN_TIPS.map((tip) => (
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
