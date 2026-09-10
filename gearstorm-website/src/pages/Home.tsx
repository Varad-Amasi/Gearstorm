import { Link } from 'react-router-dom';
import { getButtonClasses } from '@/components/common/buttonStyles';
import { RegisterCta } from '@/components/common/RegisterCta';
import { HomeGallery } from '@/components/gallery/HomeGallery';
import { CategorySplit } from '@/components/sections/CategorySplit';
import { CTASection } from '@/components/sections/CTASection';
import { FAQSection } from '@/components/sections/FAQSection';
import { FeatureCard } from '@/components/sections/FeatureCard';
import { HeroSection } from '@/components/sections/HeroSection';
import { Reveal } from '@/components/sections/Reveal';
import { StatsSection } from '@/components/sections/StatsSection';
import { TimelineSection } from '@/components/sections/TimelineSection';
import { EVENT, ORGANIZER, ROUTES } from '@/config/routes';
import {
  CATEGORIES,
  COMPETITION,
  REGISTRATION_OPEN,
} from '@/utils/competition';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

const HIGHLIGHTS = [
  {
    title: 'Same arena, two rankings',
    description: `${CATEGORIES.beginner.name} and ${CATEGORIES.advanced.name} race the same track. Times, finals, and prizes stay in your category.`,
  },
  {
    title: 'You build the chassis',
    description:
      'Individual motors and sensors are fine. Ready-made robots, RC cars, kits, and commercial chassis are not.',
  },
  {
    title: 'Time is the score',
    description:
      'Lowest adjusted time wins. Touches and skipped obstacles add increasing seconds. One official run per round.',
  },
] as const;

const STATS = [
  { value: '2', label: 'Beginner · Advanced' },
  {
    value: `${COMPETITION.teamSizeMin}–${COMPETITION.teamSizeMax}`,
    label: 'Team size',
  },
  { value: `${COMPETITION.maxBotSizeCm} cm`, label: 'Max bot size' },
  { value: COMPETITION.prizePoolLabel, label: 'Prize pool' },
] as const;

const QUICK_RULES = [
  `The bot must stay inside a ${COMPETITION.maxBotSizeCm} cm cube (±${COMPETITION.dimensionTolerancePct}%), including antennas.`,
  `${COMPETITION.teamSizeMin}–${COMPETITION.teamSizeMax} students from the same college.`,
  'Team-built chassis. Kits and ready-made platforms are not allowed.',
  `${CATEGORIES.beginner.name}: ${CATEGORIES.beginner.summary}`,
  `${CATEGORIES.advanced.name}: ${CATEGORIES.advanced.summary}`,
  `Top ${COMPETITION.finalsPerCategory} in each category go to the Final.`,
] as const;

const TIMELINE = [
  {
    meta: '1',
    title: 'Register',
    description: REGISTRATION_OPEN
      ? 'Submit your team on this site, choose Beginner or Advanced, then start building.'
      : 'Registration is not open yet. Build against the Beginner or Advanced specs in the meantime.',
  },
  {
    meta: '2',
    title: 'Inspection',
    description:
      'Size, weight, battery, chassis, and category (Beginner BOM or Advanced control) are checked.',
  },
  {
    meta: '3',
    title: 'Round 1',
    description: 'One official attempt on the shared arena.',
  },
  {
    meta: '4',
    title: 'Finals',
    description: `Top ${COMPETITION.finalsPerCategory} teams from each category. One official attempt.`,
  },
  {
    meta: '5',
    title: 'Results',
    description: `${COMPETITION.prizePoolLabel} prize pool across Beginner and Advanced.`,
  },
] as const;

const FAQS = [
  {
    question: 'Who can take part?',
    answer: `Teams of ${COMPETITION.teamSizeMin}–${COMPETITION.teamSizeMax} students from the same college. Enter ${CATEGORIES.beginner.name} or ${CATEGORIES.advanced.name}. Any engineering campus can enter.`,
  },
  {
    question: 'What is the difference between Beginner and Advanced?',
    answer: `${CATEGORIES.beginner.name}: ${CATEGORIES.beginner.summary} ${CATEGORIES.advanced.name}: ${CATEGORIES.advanced.summary}`,
  },
  {
    question: 'Do we bring our own robot?',
    answer:
      'Yes. You design and build the chassis. Limits are on the Bot Specs page and in the rulebook.',
  },
  {
    question: 'Can we use a kit or RC car?',
    answer:
      'No. Individual parts are allowed. A ready-made robot, kit, or commercial chassis is not.',
  },
  {
    question: 'What if the bot gets stuck?',
    answer:
      'The Pilot or Pit member may touch it. Each touch adds more time, and you restart from the last checkpoint. Details are in the rulebook.',
  },
] as const;

const HomePage = (): JSX.Element => {
  useDocumentTitle(
    undefined,
    `${EVENT.name} is an inter-college robotics competition with Beginner and Advanced categories, organised ${ORGANIZER.credit}.`
  );

  return (
    <div className="animate-fade-in">
      <HeroSection
        eyebrow={`${ORGANIZER.societies[0].short} and ${ORGANIZER.societies[1].short}`}
        eyebrowDetail={ORGANIZER.chapter}
        title={EVENT.name}
        description="An inter-college robotics race at KLS Gogte Institute of Technology, Belagavi. Build a line-and-obstacle bot, run the arena, and post the lowest adjusted time. Enter as Beginner or Advanced."
        className="w-full"
        actions={
          <>
            <RegisterCta
              variant="primary"
              size="lg"
              className="w-full sm:w-auto"
            >
              Register your team
            </RegisterCta>
            <Link
              to={ROUTES.RULES}
              className={getButtonClasses('ghost', 'lg', 'w-full sm:w-auto')}
            >
              Rules
            </Link>
          </>
        }
      />

      <section
        className="container-page relative py-16"
        aria-labelledby="about-event"
      >
        <Reveal>
          <h2
            id="about-event"
            className="font-heading text-2xl font-bold md:text-3xl"
          >
            What is GearStorm?
          </h2>
        </Reveal>
        <div className="mt-6 grid gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <div className="space-y-4 font-sans text-base leading-relaxed text-text-muted md:text-lg">
              <p>
                GearStorm is run by {ORGANIZER.societiesJoined} at{' '}
                {ORGANIZER.chapter}. Squads of {COMPETITION.teamSizeMin}–
                {COMPETITION.teamSizeMax} students bring a robot they built and
                try for the lowest adjusted time on a live course.
              </p>
              <p>
                There are two competitions — {CATEGORIES.beginner.name} and{' '}
                {CATEGORIES.advanced.name} — on the same arena, with separate
                rankings and prizes. Round 1 is open to every registered team.
                The top {COMPETITION.finalsPerCategory} in each category go to
                that category’s Final.
              </p>
              <p>
                2.0 is the next edition. Last year’s event (1.0) was held on
                campus in 2025 — photos and a recap video are below.
              </p>
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href="#from-1-0"
                className={getButtonClasses('ghost', 'md', 'w-full sm:w-auto')}
              >
                GearStorm 1.0
              </a>
              <Link
                to={ROUTES.RULES}
                className={getButtonClasses('ghost', 'md', 'w-full sm:w-auto')}
              >
                Scoring and rules
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.08} className="lg:col-span-5">
            <ul className="flex flex-col gap-3">
              {[
                {
                  label: 'Who',
                  value: `${COMPETITION.teamSizeMin}–${COMPETITION.teamSizeMax} students, same college`,
                },
                {
                  label: 'Where',
                  value: ORGANIZER.chapter,
                },
                {
                  label: 'Format',
                  value: `${CATEGORIES.beginner.name} and ${CATEGORIES.advanced.name}, two rounds, same arena`,
                },
                {
                  label: 'Organised by',
                  value: ORGANIZER.societiesJoined,
                },
              ].map((item) => (
                <li
                  key={item.label}
                  className="flex flex-col gap-1 rounded-md border border-border bg-dark-800/80 px-4 py-3 sm:flex-row sm:items-baseline sm:gap-3"
                >
                  <p className="w-24 shrink-0 font-subhead text-sm font-semibold text-text-muted">
                    {item.label}
                  </p>
                  <p className="text-text-light">{item.value}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section
        className="container-page relative py-16"
        aria-labelledby="two-competitions"
      >
        <Reveal>
          <h2
            id="two-competitions"
            className="font-heading text-2xl font-bold md:text-3xl"
          >
            Two categories, one arena
          </h2>
          <p className="mt-3 max-w-2xl text-text-muted">
            Beginner and Advanced share the same size, weight, battery, and
            track. The budget, control rules, rankings, and prizes are what
            differ. You pick one when you register.
          </p>
        </Reveal>
        <div className="mt-8">
          <CategorySplit
            idPrefix="home-"
            beginner={
              <ul className="list-disc space-y-2 pl-5 text-sm text-text-muted">
                <li>{CATEGORIES.beginner.budget}</li>
                <li>{CATEGORIES.beginner.control}</li>
                <li>Prizes: {CATEGORIES.beginner.prizes}</li>
              </ul>
            }
            advanced={
              <ul className="list-disc space-y-2 pl-5 text-sm text-text-muted">
                <li>{CATEGORIES.advanced.budget}</li>
                <li>{CATEGORIES.advanced.control}</li>
                <li>Prizes: {CATEGORIES.advanced.prizes}</li>
              </ul>
            }
          />
        </div>
        <div className="mt-6">
          <Link to={ROUTES.RULES} className={getButtonClasses('ghost', 'md')}>
            Category rules
          </Link>
        </div>
      </section>

      <HomeGallery />

      <StatsSection stats={STATS} title="Competition snapshot" />

      <section
        className="container-page relative py-16"
        aria-labelledby="highlights"
      >
        <Reveal>
          <h2
            id="highlights"
            className="font-heading text-2xl font-bold md:text-3xl"
          >
            Format
          </h2>
        </Reveal>
        <div className="mt-8 grid items-stretch gap-5 md:grid-cols-3">
          {HIGHLIGHTS.map((highlight, index) => (
            <Reveal
              key={highlight.title}
              delay={index * 0.08}
              className="h-full"
            >
              <FeatureCard
                title={highlight.title}
                description={highlight.description}
                className="h-full"
              />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-page py-16" aria-labelledby="quick-rules">
        <div className="grid items-start gap-10 lg:grid-cols-2">
          <Reveal>
            <h2
              id="quick-rules"
              className="font-heading text-2xl font-bold md:text-3xl"
            >
              Before you build
            </h2>
            <p className="mt-4 max-w-md text-text-muted">
              The points teams ask about first, including the Beginner and
              Advanced split. Download the full rulebook from the Rules page.
            </p>
            <Link
              to={ROUTES.RULES}
              className={getButtonClasses('ghost', 'md', 'mt-6')}
            >
              Full rules
            </Link>
          </Reveal>
          <ul className="flex flex-col gap-3">
            {QUICK_RULES.map((rule, index) => (
              <li key={rule}>
                <Reveal
                  delay={index * 0.05}
                  className="rounded-md border border-border bg-dark-800/80 p-4 text-text-light"
                >
                  {rule}
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <TimelineSection
        title="How the day is structured"
        items={TIMELINE}
        footnote={
          REGISTRATION_OPEN
            ? 'Exact dates are sent after you register.'
            : 'Dates will be posted here when registration opens.'
        }
      />
      <div className="container-page -mt-8 pb-8">
        <Link to={ROUTES.TIMELINE} className={getButtonClasses('ghost', 'md')}>
          Full timeline
        </Link>
      </div>

      <FAQSection
        title="Questions"
        items={FAQS}
        footer={
          <p className="text-text-muted">
            Something else?{' '}
            <Link
              to={ROUTES.CONTACT}
              className="font-semibold text-accent underline-offset-4 hover:underline"
            >
              Contact the organisers
            </Link>
            .
          </p>
        }
      />

      <CTASection
        title="Enter as a team"
        description={`${COMPETITION.teamSizeMin}–${COMPETITION.teamSizeMax} students from the same college. Enter ${CATEGORIES.beginner.name} or ${CATEGORIES.advanced.name}. Registration opens on this site.`}
        actions={
          <>
            <RegisterCta
              variant="primary"
              size="lg"
              className="w-full sm:w-auto"
            >
              Register your team
            </RegisterCta>
            <Link
              to={ROUTES.BOT_SPECS}
              className={getButtonClasses('ghost', 'lg', 'w-full sm:w-auto')}
            >
              Bot specs
            </Link>
          </>
        }
      />
    </div>
  );
};

export default HomePage;
