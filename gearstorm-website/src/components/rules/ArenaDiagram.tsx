/**
 * Illustrative course sketch. Final obstacle placement is announced on the day.
 */
export const ArenaDiagram = (): JSX.Element => (
  <figure className="overflow-hidden rounded-xl border border-border bg-dark-800/80 p-4">
    <svg
      viewBox="0 0 640 280"
      className="h-auto w-full"
      role="img"
      aria-labelledby="arena-diagram-title arena-diagram-desc"
    >
      <title id="arena-diagram-title">Illustrative GearStorm arena</title>
      <desc id="arena-diagram-desc">
        Start on the left, finish on the right, with labelled example obstacles
        along a centre line.
      </desc>
      <rect
        x="8"
        y="8"
        width="624"
        height="264"
        rx="12"
        fill="#12121f"
        stroke="#374151"
        strokeWidth="2"
      />
      <path
        d="M56 140 H120 C160 140 170 70 220 70 C270 70 280 210 340 210 C400 210 410 90 470 90 C520 90 540 140 584 140"
        fill="none"
        stroke="#d91e63"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <rect x="36" y="118" width="40" height="44" rx="4" fill="#d91e63" />
      <text
        x="56"
        y="250"
        textAnchor="middle"
        fill="#e8e4ee"
        fontSize="12"
        fontFamily="inherit"
      >
        Start
      </text>
      <rect x="200" y="48" width="40" height="28" rx="3" fill="#6b3a8c" />
      <text
        x="220"
        y="36"
        textAnchor="middle"
        fill="#9ca3af"
        fontSize="11"
        fontFamily="inherit"
      >
        Gate
      </text>
      <rect x="250" y="188" width="52" height="16" rx="2" fill="#d946ef" />
      <text
        x="276"
        y="226"
        textAnchor="middle"
        fill="#9ca3af"
        fontSize="11"
        fontFamily="inherit"
      >
        Breakers
      </text>
      <circle cx="340" cy="210" r="16" fill="#b44cff" />
      <text
        x="340"
        y="248"
        textAnchor="middle"
        fill="#9ca3af"
        fontSize="11"
        fontFamily="inherit"
      >
        Disk
      </text>
      <path d="M430 70 L510 70 L490 110 L410 110 Z" fill="#ff4d1a" />
      <text
        x="470"
        y="56"
        textAnchor="middle"
        fill="#9ca3af"
        fontSize="11"
        fontFamily="inherit"
      >
        Ramp / see-saw
      </text>
      <rect x="564" y="118" width="40" height="44" rx="4" fill="#d91e63" />
      <text
        x="584"
        y="250"
        textAnchor="middle"
        fill="#e8e4ee"
        fontSize="12"
        fontFamily="inherit"
      >
        Finish
      </text>
    </svg>
    <figcaption className="mt-3 text-sm text-text-subtle">
      Example path only. Switch gate, speed breakers, marble pit, rotating disk,
      see-saw, and ramps may appear in any order.
    </figcaption>
  </figure>
);
