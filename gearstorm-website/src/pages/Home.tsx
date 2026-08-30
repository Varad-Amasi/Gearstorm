import { motion, useTransform } from 'framer-motion';
import { lazy, Suspense, useRef } from 'react';
import { Link } from 'react-router-dom';
import { getButtonClasses } from '@/components/common/buttonStyles';
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
    title: 'Two Rounds',
    description:
      'Qualifiers open the field, finals raise the difficulty for the top teams.',
  },
  {
    title: 'Time-Based Scoring',
    description:
      'Fastest clean run wins. Skipped obstacles and bot handling add penalties.',
  },
  {
    title: 'Build Your Own Bot',
    description:
      'Design within the spec, then prove it on the course against every college.',
  },
] as const;

const STATS = [
  { value: '2', label: 'Rounds' },
  { value: '3-5', label: 'Team Size' },
  { value: '30 cm', label: 'Max Bot Size' },
  { value: '₹15K', label: 'Prize Pool' },
] as const;

const QUICK_RULES = [
  'Bot must fit within a 30 cm cube at the start of each run.',
  'Teams of 3-5 students, all from the same college.',
  'The bot must be designed and built by the team - no ready-made kits.',
  'Scoring is time-based, with penalties for skipped obstacles and bot handling.',
  'Top qualifier teams advance to a harder finals course.',
] as const;

const TIMELINE = [
  {
    meta: 'Step 1',
    title: 'Registrations open',
    description: 'Sign your team up on this site and start building your bot.',
  },
  {
    meta: 'Step 2',
    title: 'Technical inspection',
    description:
      'Bots are checked against the size, weight, and safety spec before racing.',
  },
  {
    meta: 'Step 3',
    title: 'Round 1 - Qualifiers',
    description:
      'Every team runs the standard obstacle course against the clock.',
  },
  {
    meta: 'Step 4',
    title: 'Round 2 - Finals',
    description:
      'Top teams face the harder course. The fastest clean run takes the title.',
  },
  {
    meta: 'Step 5',
    title: 'Awards ceremony',
    description: 'The ₹15K prize pool is awarded and finalists are recognised.',
  },
] as const;

const FAQS = [
  {
    question: 'Who can participate?',
    answer:
      'Any team of 3-5 students from the same engineering college. GearStorm 2.0 is inter-college, so teams from any institution are welcome.',
  },
  {
    question: 'Do we need to bring our own bot?',
    answer:
      'Yes. Each team designs and builds its own bot within the published specification. Check the Bot Specs page for dimensions, weight, and allowed components.',
  },
  {
    question: 'Can we use a ready-made robot kit?',
    answer:
      'No. The bot must be built by the team. Off-the-shelf components like motors and sensors are fine, but pre-assembled kits are not allowed.',
  },
  {
    question: 'What happens if our bot gets stuck mid-run?',
    answer:
      'You may handle the bot to free it, but each touch adds a time penalty. Skipping an obstacle entirely adds a larger penalty.',
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
    <div className="w-full">
      <div
        ref={canvasRef}
        className="h-56 overflow-hidden rounded-xl border border-primary/30 bg-dark-900/60 shadow-purple sm:h-72 lg:h-[25rem]"
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
              className="absolute -top-16 right-[-10%] h-56 w-56 rounded-full bg-primary/20 blur-3xl sm:-top-20 sm:right-[8%] sm:h-96 sm:w-96"
            />
            <motion.div
              style={{ y: orbFarY }}
              className="absolute left-[-8%] top-[40%] h-44 w-44 rounded-full bg-accent/10 blur-3xl sm:left-[4%] sm:top-[35%] sm:h-72 sm:w-72"
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
            description="An inter-college robotics competition where teams build custom bots and race them through an obstacle course. Fastest clean run takes the title."
            className="w-full"
            actions={
              <>
                <Link
                  to={ROUTES.REGISTER}
                  className={getButtonClasses(
                    'primary',
                    'lg',
                    'w-full sm:w-auto'
                  )}
                >
                  Register Now
                </Link>
                <Link
                  to={ROUTES.RULES}
                  className={getButtonClasses(
                    'ghost',
                    'lg',
                    'w-full sm:w-auto'
                  )}
                >
                  Learn More
                </Link>
              </>
            }
            media={robotMedia}
          />
        </div>
      </div>

      <StatsSection stats={STATS} title="Competition at a glance" />

      <section className="container-page py-16" aria-labelledby="highlights">
        <Reveal>
          <h2
            id="highlights"
            className="font-heading text-2xl font-bold md:text-3xl"
          >
            Event Highlights
          </h2>
        </Reveal>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {HIGHLIGHTS.map((highlight, index) => (
            <Reveal
              key={highlight.title}
              delay={index * 0.1}
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
              Rules at a Glance
            </h2>
            <p className="mt-4 max-w-md text-text-muted">
              The essentials every team should know before building. The full
              rulebook covers scoring, penalties, and disqualification in
              detail.
            </p>
            <Link
              to={ROUTES.RULES}
              className={getButtonClasses('ghost', 'md', 'mt-6')}
            >
              Read the Full Rules
            </Link>
          </Reveal>
          <ul className="flex flex-col gap-4">
            {QUICK_RULES.map((rule, index) => (
              <li key={rule}>
                <Reveal
                  delay={index * 0.06}
                  className="flex items-start gap-3 rounded-lg border border-border bg-dark-800 p-4"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="#00FF88"
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
        title="Event Timeline"
        items={TIMELINE}
        footnote="Exact dates will be announced on this page and to registered teams."
      />

      <FAQSection
        title="Frequently Asked Questions"
        items={FAQS}
        footer={
          <p className="text-text-muted">
            Have another question?{' '}
            <Link
              to={ROUTES.CONTACT}
              className="font-semibold text-primary-500 underline-offset-4 hover:underline"
            >
              Contact the organisers
            </Link>
            .
          </p>
        }
      />

      <CTASection
        title="Ready to compete?"
        description="Registration is open to all engineering colleges. Lock in your team before the deadline."
        actions={
          <>
            <Link
              to={ROUTES.REGISTER}
              className={getButtonClasses('primary', 'lg', 'w-full sm:w-auto')}
            >
              Register Your Team
            </Link>
            <Link
              to={ROUTES.BOT_SPECS}
              className={getButtonClasses('ghost', 'lg', 'w-full sm:w-auto')}
            >
              Read Bot Specs
            </Link>
          </>
        }
      />
    </div>
  );
};

export default HomePage;
