import { useMotionValue } from 'framer-motion';
import { lazy, Suspense, useRef } from 'react';
import { RobotFallback } from '@/components/robot/RobotFallback';
import { useInView } from '@/hooks/useInView';

const Robot3D = lazy(() => import('@/components/robot/Robot3D'));

/**
 * Static 3D preview of a fully assembled bot for the Bot Specs page.
 */
export const BotPreview = (): JSX.Element => {
  const progress = useMotionValue(100);
  const frameRef = useRef<HTMLDivElement>(null);
  const inView = useInView(frameRef);

  return (
    <div
      ref={frameRef}
      className="h-64 overflow-hidden rounded-xl border border-primary/30 bg-dark-900/60 shadow-purple sm:h-80"
    >
      <Suspense fallback={<RobotFallback loading />}>
        <Robot3D progress={progress} mode="static" active={inView} />
      </Suspense>
    </div>
  );
};
