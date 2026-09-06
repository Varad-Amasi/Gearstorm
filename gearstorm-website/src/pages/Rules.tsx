import { Alert } from '@/components/common/Alert';
import { Badge } from '@/components/common/Badge';
import { Button } from '@/components/common/Button';
import { Card } from '@/components/common/Card';
import { PageContainer } from '@/components/layout/PageContainer';
import { ContentSection } from '@/components/sections/ContentSection';
import { InlineFAQ } from '@/components/sections/InlineFAQ';
import {
  DISQUALIFICATION,
  GENERAL_RULES,
  OBSTACLES,
  ROUND_DIFFERENCES,
  RULES_FAQS,
  SAFETY_RULES,
  SCORING_ROWS,
  SUBMISSION_PROCESS,
} from '@/data/rulesContent';
import { COMPETITION } from '@/utils/competition';

const roundLabel = (round: '1' | '2' | 'both'): string => {
  if (round === 'both') {
    return 'Both rounds';
  }
  return `Round ${round}`;
};

const RulesPage = (): JSX.Element => (
  <PageContainer
    eyebrow="Competition"
    title="Rules & Regulations"
    description="What counts. What costs time. What gets you pulled."
    className="print:max-w-none print:px-0"
  >
    <div className="flex flex-col gap-10 print:gap-6">
      <Alert variant="info" title="Provisional rules" className="print:hidden">
        {COMPETITION.provisionalNotice}
      </Alert>

      <ContentSection
        id="general"
        title={GENERAL_RULES.title}
        actions={
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="print:hidden"
            onClick={() => {
              window.print();
            }}
          >
            Print rules
          </Button>
        }
      >
        <Card>
          <ul className="list-disc space-y-2 pl-5 text-text-muted">
            {GENERAL_RULES.bullets?.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Card>
      </ContentSection>

      <ContentSection
        id="obstacles"
        title="Obstacle types"
        description="Illustrative set for briefing — final course maps are published at the venue."
      >
        <div className="grid gap-4 md:grid-cols-2">
          {OBSTACLES.map((obstacle) => (
            <Card key={obstacle.name} title={obstacle.name}>
              <div className="mb-3">
                <Badge variant="primary">{roundLabel(obstacle.round)}</Badge>
              </div>
              <p className="text-text-muted">{obstacle.description}</p>
            </Card>
          ))}
        </div>
      </ContentSection>

      <ContentSection
        id="scoring"
        title="Scoring system"
        description="Lower adjusted time wins. Penalties are added to the raw finish clock."
      >
        <Card className="overflow-x-auto p-0 md:p-0">
          <table className="w-full min-w-[28rem] text-left text-sm">
            <caption className="sr-only">
              Scoring items and how they affect adjusted time
            </caption>
            <thead className="border-b border-border bg-dark-900/60 font-heading text-text-light">
              <tr>
                <th scope="col" className="px-6 py-4">
                  Item
                </th>
                <th scope="col" className="px-6 py-4">
                  Detail
                </th>
              </tr>
            </thead>
            <tbody>
              {SCORING_ROWS.map((row) => (
                <tr key={row.item} className="border-b border-border/70">
                  <th
                    scope="row"
                    className="px-6 py-4 font-heading font-semibold text-accent"
                  >
                    {row.item}
                  </th>
                  <td className="px-6 py-4 text-text-muted">{row.detail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
        <p className="mt-4 text-sm text-text-subtle">
          Adjusted time = raw finish time + skip penalties + handling penalties.
        </p>
      </ContentSection>

      <ContentSection id="rounds" title={ROUND_DIFFERENCES.title}>
        <Card>
          {ROUND_DIFFERENCES.paragraphs?.map((paragraph) => (
            <p key={paragraph} className="mb-3 text-text-muted">
              {paragraph}
            </p>
          ))}
          <ul className="mt-2 list-disc space-y-2 pl-5 text-text-muted">
            {ROUND_DIFFERENCES.bullets?.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Card>
      </ContentSection>

      <ContentSection id="dq" title={DISQUALIFICATION.title}>
        <Card>
          <ul className="list-disc space-y-2 pl-5 text-text-muted">
            {DISQUALIFICATION.bullets?.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Card>
      </ContentSection>

      <ContentSection id="safety" title={SAFETY_RULES.title}>
        <Card>
          <ul className="list-disc space-y-2 pl-5 text-text-muted">
            {SAFETY_RULES.bullets?.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Card>
      </ContentSection>

      <ContentSection id="submission" title={SUBMISSION_PROCESS.title}>
        <Card>
          <ul className="list-disc space-y-2 pl-5 text-text-muted">
            {SUBMISSION_PROCESS.bullets?.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Card>
      </ContentSection>

      <div className="print:hidden">
        <ContentSection id="faq" title="Rules FAQ">
          <InlineFAQ title="Common rules questions" items={RULES_FAQS} />
        </ContentSection>
      </div>
    </div>
  </PageContainer>
);

export default RulesPage;
