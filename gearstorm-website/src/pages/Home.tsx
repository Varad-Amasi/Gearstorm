import { clsx } from 'clsx';
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
import { REGISTRATION_OPEN } from '@/utils/competition';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { useInView } from '@/hooks/useInView';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { useScrollTrigger } from '@/hooks/useScrollTrigger';
import type { RobotMode } from '@/components/robot/RobotModel';

/** Keeps Three.js (~150KB gzip) out of the initial bundle. */
const Robot3D = lazy(() => import('@/components/robot/Robot3D'));

const HIGHLIGHTS = [
  {
    title: 'Two rounds. No mercy.',
    description: 'Qualifiers first. Finals hit harder. Top times only.',
    variant: 'featured' as const,
    className: 'md:col-span-4 lg:-rotate-1 lg:-translate-y-1',
  },
  {
    title: 'Speed is the meta.',
    description: 'Clock wins. Touches and skips cost you.',
    variant: 'gradient' as const,
    className: 'md:col-span-2 md:mt-6 lg:mt-10 lg:rotate-2',
  },
  {
    title: 'You build it.',
    description: 'No kits. Your bot, your run, your problem.',
    variant: 'standard' as const,
    className:
      'md:col-span-3 md:col-start-2 lg:col-start-3 lg:-mt-6 lg:-rotate-1',
  },
] as const;

const STATS = [
  { value: '2', label: 'Rounds' },
  { value: '3-5', label: 'Team Size' },
  { value: '30 cm', label: 'Max Bot Size' },
  { value: '₹15K', label: 'Prize Pool' },
] as const;

const QUICK_RULES = [
  '30 cm cube. Start of the run. No exceptions.',
  '3–5 students. Same college. That’s the squad.',
  'You build it. Kits are out.',
  'Time wins. Touches and skips add seconds.',
  'Top qualifier times get the harder finals course.',
] as const;

const TIMELINE = [
  {
    meta: '01',
    title: 'Lock your team',
    description: REGISTRATION_OPEN
      ? 'Register here. Then start building.'
      : 'Registration opens soon. Then start building.',
  },
  {
    meta: '02',
    title: 'Inspection',
    description: 'Size, weight, safety. Pass or you don’t run.',
  },
  {
    meta: '03',
    title: 'Qualifiers',
    description: 'Standard course. Against the clock.',
  },
  {
    meta: '04',
    title: 'Finals',
    description: 'Harder track. Fastest clean run takes it.',
  },
  {
    meta: '05',
    title: 'Podium',
    description: '₹15K on the line. Names get called.',
  },
] as const;

const FAQS = [
  {
    question: 'Who can run?',
    answer:
      '3–5 students from the same college. Any engineering campus. That’s it.',
  },
  {
    question: 'Do we bring our own bot?',
    answer:
      'Yes. You design it, you build it, you race it. Specs live on the Bot Specs page.',
  },
  {
    question: 'Can we use a kit?',
    answer: 'No. Motors and sensors are fine. A pre-built kit is not.',
  },
  {
    question: 'Stuck mid-run?',
    answer:
      'You can touch it. Every touch costs time. Skip an obstacle and it costs more.',
  },
] as const;

const HomePage = (): JSX.Element => {
  useDocumentTitle(
    undefined,
    `${EVENT.name} is an inter-college robotics competition organised ${ORGANIZER.credit}.`
  );

  const reducedMotion = usePrefersReducedMotion();
  /** Matches the `lg` breakpoint, where the hero becomes a two-column grid. */
  const isWide = useMediaQuery('(min-width: 1024px)');
  const heroTrackRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const progress = useScrollTrigger(heroTrackRef);
  const canvasInView = useInView(canvasRef);

  /**
   * Only wide screens have room to pin the hero and drive assembly by scroll.
   * Narrower layouts would push the robot below the fold, so it plays through
   * on its own instead.
   */
  const pinned = !reducedMotion && isWide;
  const robotMode: RobotMode = reducedMotion
    ? 'static'
    : pinned
      ? 'scroll'
      : 'auto';

  /** Background orbs drift slower than the content for a parallax feel. */
  const orbNearY = useTransform(progress, [0, 100], [0, 220]);
  const orbFarY = useTransform(progress, [0, 100], [0, 90]);

  const robotMedia = (
    <div className="relative w-full">
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
      {/* Tall track: the hero stays pinned while scroll drives the robot
          assembly. Collapses to normal flow when not pinned. */}
      <div
        ref={heroTrackRef}
        className={pinned ? 'relative h-[240vh]' : 'relative'}
      >
        {!reducedMotion ? (
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
            description="Build it. Race it. Don’t stall."
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
                  The rulebook
                </Link>
              </>
            }
            media={robotMedia}
          />
        </div>
      </div>

      <StatsSection stats={STATS} title="The numbers" />

      <section
        className="container-page relative py-16"
        aria-labelledby="highlights"
      >
        <p
          aria-hidden="true"
          className="pointer-events-none absolute left-4 top-4 hidden select-none font-display text-7xl font-extrabold uppercase leading-none text-vivid-purple/15 md:block"
        >
          RUN
        </p>
        <Reveal>
          <h2
            id="highlights"
            className="relative z-10 font-heading text-2xl font-bold md:text-3xl"
          >
            The format
          </h2>
        </Reveal>
        <div className="mt-8 grid items-stretch gap-5 overflow-x-clip md:grid-cols-6">
          {HIGHLIGHTS.map((highlight, index) => (
            <Reveal
              key={highlight.title}
              delay={index * 0.1}
              className={clsx('h-full min-w-0', highlight.className)}
            >
              <FeatureCard
                title={highlight.title}
                description={highlight.description}
                variant={highlight.variant}
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
              The short version
            </h2>
            <p className="mt-4 max-w-md text-text-muted">
              Enough to start building. The rulebook has the rest.
            </p>
            <Link
              to={ROUTES.RULES}
              className={getButtonClasses('ghost', 'md', 'mt-6')}
            >
              Full rules
            </Link>
          </Reveal>
          <ul className="flex flex-col gap-4">
            {QUICK_RULES.map((rule, index) => (
              <li key={rule}>
                <Reveal
                  delay={index * 0.06}
                  className="flex items-start gap-3 rounded-lg border border-border bg-dark-800/80 p-4 transition-colors duration-normal hover:border-accent/40"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="#D91E63"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="mt-0.5 shrink-0"
                  >
                    <path d="M4 10.5l4 4 8-9" />
                  </svg>
                  <span className="text-text-light">{rule}</span>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <TimelineSection
        title="How it goes down"
        items={TIMELINE}
        footnote={
          REGISTRATION_OPEN
            ? 'Dates drop here and in your inbox once you register.'
            : 'Dates drop here once registration opens.'
        }
      />

      <FAQSection
        title="Quick answers"
        items={FAQS}
        footer={
          <p className="text-text-muted">
            Still stuck?{' '}
            <Link
              to={ROUTES.CONTACT}
              className="font-semibold text-accent underline-offset-4 hover:underline"
            >
              Ping the organisers
            </Link>
            .
          </p>
        }
      />

      <CTASection
        title="Your bot. Your run."
        description="Squads of 3–5. Deadline hits whether you’re ready or not."
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
