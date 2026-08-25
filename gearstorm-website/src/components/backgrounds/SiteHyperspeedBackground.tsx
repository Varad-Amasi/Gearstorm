import { lazy, Suspense, useEffect, useState } from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { isWebGLAvailable } from '@/utils/webgl';

const Hyperspeed = lazy(
  () => import('@/components/backgrounds/Hyperspeed/Hyperspeed')
);

/**
 * Tuned for GearStorm branding: darker road, magenta/cyan traffic lights.
 * Density is reduced so it can sit under the full UI (and Home’s robot) without
 * melting mid-range GPUs.
 */
const GEARSTORM_HYPERSPEED = {
  distortion: 'turbulentDistortion' as const,
  length: 400,
  roadWidth: 10,
  islandWidth: 2,
  lanesPerRoad: 3,
  fov: 90,
  fovSpeedUp: 150,
  speedUp: 2,
  carLightsFade: 0.45,
  totalSideLightSticks: 14,
  lightPairsPerRoadWay: 22,
  shoulderLinesWidthPercentage: 0.05,
  brokenLinesWidthPercentage: 0.1,
  brokenLinesLengthPercentage: 0.5,
  lightStickWidth: [0.12, 0.45] as [number, number],
  lightStickHeight: [1.2, 1.6] as [number, number],
  movingAwaySpeed: [55, 75] as [number, number],
  movingCloserSpeed: [-110, -150] as [number, number],
  carLightsLength: [12, 70] as [number, number],
  carLightsRadius: [0.05, 0.12] as [number, number],
  carWidthPercentage: [0.3, 0.5] as [number, number],
  carShiftX: [-0.6, 0.6] as [number, number],
  carFloorSeparation: [0, 4] as [number, number],
  colors: {
    roadColor: 0x0a0a14,
    islandColor: 0x0f0f1e,
    background: 0x0f0f1e,
    shoulderLines: 0x1a1a2e,
    brokenLines: 0x1a1a2e,
    leftCars: [0xd91e63, 0x6b3a8c, 0xc247ac],
    rightCars: [0x00d9ff, 0x0e5ea5, 0x3b82f6],
    sticks: 0x00d9ff,
  },
};

/**
 * Fixed full-viewport Hyperspeed backdrop for the whole site.
 * Decorative only — pointer events are disabled so forms/nav keep working.
 */
export const SiteHyperspeedBackground = (): JSX.Element | null => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [webglOk, setWebglOk] = useState(false);

  useEffect(() => {
    setWebglOk(isWebGLAvailable());
  }, []);

  if (prefersReducedMotion || !webglOk) {
    return null;
  }

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden print:hidden"
      aria-hidden="true"
    >
      <Suspense fallback={null}>
        <Hyperspeed effectOptions={GEARSTORM_HYPERSPEED} />
      </Suspense>
      {/* Keep copy readable over the moving lights */}
      <div className="absolute inset-0 bg-dark-950/75" />
    </div>
  );
};
