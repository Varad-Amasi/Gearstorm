export interface RobotFallbackProps {
  /** True while the 3D bundle is still downloading. */
  loading?: boolean;
}

/**
 * Static stand-in for the 3D robot, used while the Three.js chunk loads and
 * on devices without WebGL.
 */
export const RobotFallback = ({
  loading = false,
}: RobotFallbackProps): JSX.Element => (
  <div
    className="flex h-full w-full items-center justify-center"
    role={loading ? 'status' : undefined}
    aria-hidden={loading ? undefined : true}
  >
    <div className="text-center">
      <svg
        width="120"
        height="96"
        viewBox="0 0 120 96"
        fill="none"
        aria-hidden="true"
        className="mx-auto"
      >
        <rect x="20" y="28" width="80" height="32" rx="6" fill="#6B3A8C" />
        <rect x="16" y="56" width="88" height="8" rx="3" fill="#1A1A2E" />
        <circle cx="34" cy="72" r="10" fill="#111827" />
        <circle cx="34" cy="72" r="4" fill="#D91E63" />
        <circle cx="86" cy="72" r="10" fill="#111827" />
        <circle cx="86" cy="72" r="4" fill="#D91E63" />
        <rect x="70" y="12" width="20" height="12" rx="3" fill="#1A1A2E" />
        <circle cx="86" cy="18" r="2.5" fill="#00D9FF" />
        <rect x="78" y="22" width="4" height="8" fill="#374151" />
        <rect x="100" y="38" width="14" height="6" rx="2" fill="#6B7280" />
      </svg>
      <p className="mt-3 font-heading text-xs uppercase tracking-widest text-text-subtle">
        {loading ? 'Loading 3D robot…' : 'GearStorm 2.0 bot'}
      </p>
    </div>
  </div>
);
