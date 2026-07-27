import type { ExhibitId } from '../../types/exhibit';

interface ExhibitIconProps {
  exhibitId: ExhibitId;
  className?: string;
}

/** A simple, at-a-glance symbol for each exhibit, so the switcher reads
 * instantly instead of relying on players to parse the exhibit name. */
export function ExhibitIcon({ exhibitId, className = 'h-4 w-4' }: ExhibitIconProps) {
  const common = {
    className,
    viewBox: '0 0 24 24',
    fill: 'none',
    xmlns: 'http://www.w3.org/2000/svg',
    'aria-hidden': true as const,
  };

  switch (exhibitId) {
    case 'coral-garden':
      // A small coral sprig — the healthy-reef exhibit.
      return (
        <svg {...common}>
          <path
            d="M12 21v-7m0 0c0-3 2-4 2-7s-2-4-2-4-2 1-2 4 2 4 2 7zm0 0c2-1 3-3 3-5m-3 5c-2-1-3-3-3-5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    case 'bleached-reef':
      // A thermometer — warming water is the cause of bleaching.
      return (
        <svg {...common}>
          <path
            d="M12 14.5V5a2 2 0 1 0-4 0v9.5a4 4 0 1 0 4 0Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <circle cx="10" cy="17" r="1.4" fill="currentColor" />
        </svg>
      );

    case 'plastic-cove':
      // A drifting bottle shape — marine debris.
      return (
        <svg {...common}>
          <path
            d="M10 3h4v2.5l1.2 1.6a2 2 0 0 1 .8 1.6V19a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V8.7a2 2 0 0 1 .8-1.6L10 5.5Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path d="M9 12h6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      );

    case 'rehab-bay':
      // A heart with a small pulse — care and recovery.
      return (
        <svg {...common}>
          <path
            d="M12 20s-7-4.4-9.3-9A5 5 0 0 1 12 6a5 5 0 0 1 9.3 5c-2.3 4.6-9.3 9-9.3 9Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path
            d="M6 12h2.5l1.2-2 1.6 3.5L12.5 11l1 1h4"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
  }
}
