import { motion, useTransform } from 'framer-motion';
import { lazy, Suspense, useRef } from 'react';
import { Link } from 'react-router-dom';
import { getButtonClasses } from '@/components/common/buttonStyles';
import { RegisterCta } from '@/components/common/RegisterCta';
import { AssemblyProgress } from '@/components/robot/AssemblyProgress';
import { RobotFallback } from '@/components/robot/RobotFallback';
import { CTASection } from '@/components/sections/CTASection';
import { FAQSection } from '@/components/sections/FAQSection';
import { FeatureCard } from '@/components/sections/FeatureCard';
import { HeroSection } from '@/components/sections/HeroSection';
import { Reveal } from '@/components/sections/Reveal';
import { StatsSection } from '@/components/sections/StatsSection';
import { TimelineSection } from '@/components/sections/TimelineSection';
import { EVENT, ORGANIZER, ROUTES } from '@/config/routes';
import { COMPETITION, REGISTRATION_OPEN } from '@/utils/competition';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { useInView } from '@/hooks/useInView';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { useScrollTrigger } from '@/hooks/useScrollTrigger';
import { useTheme } from '@/theme/ThemeProvider';
import type { RobotMode } from '@/components/robot/RobotModel';

/** Keeps Three.js (~150KB gzip) out of the initial bundle. */
const Robot3D = lazy(() => import('@/components/robot/Robot3D'));

const HIGHLIGHTS = [
  {
    title: 'Two rounds',
    description:
      'Everyone runs the qualifier course. The fastest clean times go through to a harder finals track.',
  },
  {
    title: 'You build the bot',
    description:
      'Teams design and assemble their own robot. Off-the-shelf motors and sensors are fine. Ready-made kits are not.',
  },
  {
    title: 'Time is the score',
    description:
      'The clock decides the ranking. Touching the bot or skipping an obstacle adds seconds.',
  },
] as const;

const STATS = [
  { value: '2', label: 'Rounds' },
  { value: '3–5', label: 'Team size' },
  { value: '30 cm', label: 'Max bot size' },
  { value: '₹15K', label: 'Prize pool' },
] as const;

const QUICK_RULES = [
  `The bot must fit a ${COMPETITION.maxBotSizeCm} cm cube at the start of a run.`,
  `${COMPETITION.teamSizeMin}–${COMPETITION.teamSizeMax} students, all from the same college.`,
  'You build the robot. Kits are not allowed.',
  'Fastest time wins. Touches and skipped obstacles add seconds.',
  'Top qualifier times move on to the finals course.',
] as const;

const TIMELINE = [
  {
    meta: '1',
    title: 'Register',
    description: REGISTRATION_OPEN
      ? 'Submit your team on this site, then start building.'
      : 'Registration is not open yet. Build against the published specs in the meantime.',
  },
  {
    meta: '2',
    title: 'Inspection',
    description: 'Size, weight, and safety are checked before you can run.',
  },
  {
    meta: '3',
    title: 'Qualifiers',
    description: 'A standard obstacle course, timed.',
  },
  {
    meta: '4',
    title: 'Finals',
    description: 'A harder course for the fastest qualifier times.',
  },
  {
    meta: '5',
    title: 'Results',
    description: `${COMPETITION.prizePoolLabel} prize pool. Places are announced on the day.`,
  },
] as const;

const FAQS = [
  {
    question: 'Who can take part?',
    answer:
      'Teams of 3–5 students from the same college. Any engineering campus can enter.',
  },
  {
    question: 'Do we bring our own robot?',
    answer:
      'Yes. You design it and build it. Limits are on the Bot Specs page.',
  },
  {
    question: 'Can we use a kit?',
    answer:
      'No. Individual motors and sensors are allowed. A pre-built kit robot is not.',
  },
  {
    question: 'What if the bot gets stuck?',
    answer:
      'You may touch it. Each touch adds time. Skipping an obstacle adds more.',
  },
] as const;

const HomePage = (): JSX.Element => {
  useDocumentTitle(
    undefined,
    `${EVENT.name} is an inter-college robotics competition organised ${ORGANIZER.credit}.`
  );

  const reducedMotion = usePrefersReducedMotion();
  const { theme } = useTheme();
  const isWide = useMediaQuery('(min-width: 1024px)');
  const heroTrackRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const progress = useScrollTrigger(heroTrackRef);
  const canvasInView = useInView(canvasRef);

  const pinned = !reducedMotion && isWide;
  const robotMode: RobotMode = reducedMotion
    ? 'static'
    : pinned
      ? 'scroll'
      : 'auto';

  const orbNearY = useTransform(progress, [0, 100], [0, 220]);
  const orbFarY = useTransform(progress, [0, 100], [0, 90]);

  const robotMedia = (
    <div className="robot-stage relative w-full">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -left-2 top-4 z-20 hidden rotate-[-8deg] rounded-md border border-accent/50 bg-dark-950/80 px-3 py-1 font-accent text-xs text-accent shadow-magenta sm:block lg:-left-6 lg:top-8"
      >
        LIVE BUILD
      </span>
      <div
        ref={canvasRef}
        className="h-56 overflow-hidden rounded-xl border border-vivid-purple/40 bg-dark-900/60 shadow-purple sm:h-72 lg:h-[25rem]"
      >
        <Suspense fallback={<RobotFallback loading />}>
          <Robot3D progress={progress} mode={robotMode} active={canvasInView} />
        </Suspense>
      </div>
      <p className="sr-only">
        Animated 3D illustration of the {EVENT.name} competition robot: a
        four-wheeled chassis with a sensor mast, gripper arm, and an electronics
        deck.
      </p>
      {pinned ? <AssemblyProgress progress={progress} /> : null}
    </div>
  );

  return (
    <div className="animate-fade-in">
      <div
        ref={heroTrackRef}
        className={pinned ? 'relative h-[240vh]' : 'relative'}
      >
        {!reducedMotion && theme === 'dark' ? (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 overflow-hidden"
          >
            <motion.div
              style={{ y: orbNearY }}
              className="absolute -top-16 right-[-10%] h-40 w-40 rounded-full bg-primary/20 blur-xl sm:-top-20 sm:right-[8%] sm:h-64 sm:w-64"
            />
            <motion.div
              style={{ y: orbFarY }}
              className="absolute left-[-8%] top-[40%] h-32 w-32 rounded-full bg-neon-orange/20 blur-xl sm:left-[4%] sm:top-[35%] sm:h-52 sm:w-52"
            />
          </div>
        ) : null}

        <div
          className={
            pinned
              ? 'sticky top-16 flex min-h-[calc(100vh-4rem)] items-center'
              : undefined
          }
        >
          <HeroSection
            eyebrow={ORGANIZER.byline}
            title={EVENT.name}
            description="Inter-college robotics at KLS Gogte Institute of Technology, Belagavi. Teams build a robot and race it on a live obstacle course."
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
                  className={getButtonClasses(
                    'ghost',
                    'lg',
                    'w-full sm:w-auto'
                  )}
                >
                  Rules
                </Link>
              </>
            }
            media={robotMedia}
          />
        </div>
      </div>

      <section
        className="container-page relative py-16"
        aria-labelledby="about-event"
      >
        <Reveal>
          <p className="font-subhead text-sm font-semibold uppercase tracking-widest text-accent">
            About
          </p>
          <h2
            id="about-event"
            className="mt-2 font-heading text-2xl font-bold md:text-3xl"
          >
            What is GearStorm?
          </h2>
        </Reveal>
        <div className="mt-6 grid gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <div className="space-y-4 font-sans text-base leading-relaxed text-text-muted md:text-lg">
              <p>
                GearStorm is run by {ORGANIZER.societiesJoined} at{' '}
                {ORGANIZER.chapter}. It is a timed robotics race: squads of{' '}
                {COMPETITION.teamSizeMin}–{COMPETITION.teamSizeMax} students
                bring a robot they built, clear a physical course, and try to
                post the lowest time.
              </p>
              <p>
                Qualifiers use one course. Finals use a harder layout. The
                published rules cover size limits, inspection, and how touches
                are scored.
              </p>
              <p>
                2.0 is the next edition. Last year’s event (1.0) was held on
                campus in 2025 — photos are in the gallery.
              </p>
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                to={ROUTES.GALLERY}
                className={getButtonClasses('ghost', 'md', 'w-full sm:w-auto')}
              >
                GearStorm 1.0 photos
              </Link>
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
                  value: 'Build a robot, race two rounds against the clock',
                },
                {
                  label: 'Organised by',
                  value: ORGANIZER.societiesJoined,
                },
              ].map((item) => (
                <li
                  key={item.label}
                  className="rounded-md border border-border bg-dark-800/80 px-4 py-3"
                >
                  <p className="font-subhead text-xs font-semibold uppercase tracking-widest text-text-muted">
                    {item.label}
                  </p>
                  <p className="mt-1 text-text-light">{item.value}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

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
              The points teams ask about first. The full document is on the
              Rules page.
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
        description={`${COMPETITION.teamSizeMin}–${COMPETITION.teamSizeMax} students from the same college. Registration opens on this site.`}
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
