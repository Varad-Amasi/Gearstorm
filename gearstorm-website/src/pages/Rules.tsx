import { Card } from '@/components/common/Card';
import { getButtonClasses } from '@/components/common/buttonStyles';
import { ArenaDiagram } from '@/components/rules/ArenaDiagram';
import { PageContainer } from '@/components/layout/PageContainer';
import {
  CategoryJump,
  CategorySplit,
} from '@/components/sections/CategorySplit';
import { ContentSection } from '@/components/sections/ContentSection';
import {
  ADVANCED_RULES,
  ARENA_SPECS,
  BEGINNER_RULES,
  QUICK_REFERENCE,
  SCORING_ROWS,
} from '@/data/rulesContent';
import { CATEGORIES, RULEBOOK } from '@/utils/competition';

const RuleList = ({ items }: { items: readonly string[] }): JSX.Element => (
  <ul className="list-disc space-y-3 pl-5 text-text-muted">
    {items.map((item) => (
      <li key={item}>{item}</li>
    ))}
  </ul>
);

const RulesPage = (): JSX.Element => (
  <PageContainer
    eyebrow="Competition"
    title="Rules"
    description={`GearStorm 2.0 is two competitions — ${CATEGORIES.beginner.name} and ${CATEGORIES.advanced.name} — on the same arena. This page is the short sheet; the full wording lives in the PDF.`}
  >
    <div className="flex flex-col gap-12">
      <CategoryJump idPrefix="rules-" />

      <ContentSection
        id="quick"
        title="Applies to both"
        description="Size, weight, battery, team size, and disqualifiers are the same in Beginner and Advanced."
        className="border-0 pt-0"
      >
        <Card>
          <RuleList items={QUICK_REFERENCE} />
        </Card>
      </ContentSection>

      <div className="flex flex-col items-start gap-2">
        <a
          href={RULEBOOK.href}
          download={RULEBOOK.downloadName}
          className={getButtonClasses('primary', 'md')}
        >
          Download Full Rulebook (PDF)
        </a>
        <p className="text-sm text-text-subtle">
          Official GearStorm {RULEBOOK.version} document
        </p>
      </div>

      <ContentSection
        id="categories"
        title="Beginner and Advanced"
        description="Pick one category at registration. Rankings and prizes stay separate."
      >
        <CategorySplit
          idPrefix="rules-"
          beginner={<RuleList items={BEGINNER_RULES} />}
          advanced={<RuleList items={ADVANCED_RULES} />}
        />
      </ContentSection>

      <ContentSection
        id="arena"
        title="Track and arena"
        description="Both categories race the same official track. Final measurements are given at the venue."
      >
        <div className="grid gap-6 lg:grid-cols-2">
          <dl className="divide-y divide-border rounded-xl border border-border bg-dark-800/80">
            {ARENA_SPECS.map((row) => (
              <div key={row.label} className="px-5 py-4">
                <dt className="font-heading text-sm font-semibold text-text-light">
                  {row.label}
                </dt>
                <dd className="mt-1 text-sm text-text-muted">{row.value}</dd>
              </div>
            ))}
          </dl>
          <ArenaDiagram />
        </div>
      </ContentSection>

      <ContentSection
        id="scoring"
        title="Scoring at a glance"
        description="Adjusted time decides the ranking in your category. Full penalty tables are in the PDF."
      >
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full min-w-[28rem] text-left text-sm">
            <caption className="sr-only">Scoring and penalty summary</caption>
            <thead className="border-b border-border bg-dark-900/60 font-heading text-text-light">
              <tr>
                <th scope="col" className="px-5 py-3">
                  Item
                </th>
                <th scope="col" className="px-5 py-3">
                  Detail
                </th>
              </tr>
            </thead>
            <tbody>
              {SCORING_ROWS.map((row) => (
                <tr
                  key={row.item}
                  className="border-b border-border/70 last:border-0"
                >
                  <th
                    scope="row"
                    className="px-5 py-3 font-heading font-semibold text-accent"
                  >
                    {row.item}
                  </th>
                  <td className="px-5 py-3 text-text-muted">{row.detail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ContentSection>

      <p className="text-sm text-text-subtle">
        Rulebook version {RULEBOOK.version} · Last updated{' '}
        {RULEBOOK.updatedLabel}
      </p>
    </div>
  </PageContainer>
);

export default RulesPage;
