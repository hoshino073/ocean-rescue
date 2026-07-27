interface DeviceIconProps {
  deviceId: string;
  className?: string;
}

/** Simple inline SVG shapes for each prosthetic device — no external assets.
 * Shapes are drawn "pointing right" so rotation reads clearly. */
export function DeviceIcon({ deviceId, className = '' }: DeviceIconProps) {
  const common = {
    className,
    viewBox: '0 0 100 100',
    xmlns: 'http://www.w3.org/2000/svg',
    'aria-hidden': true as const,
  };

  switch (deviceId) {
    case 'flipper-support':
    case 'wide-paddle':
      return (
        <svg {...common}>
          <path
            d="M22 42c0-6 5-10 11-10h8c22 0 38 8 44 16 2 3 2 5 0 8-6 8-22 16-44 16h-8c-6 0-11-4-11-10z"
            fill="currentColor"
          />
          <rect x="14" y="38" width="14" height="24" rx="7" fill="currentColor" opacity="0.65" />
        </svg>
      );

    case 'tail-support':
      return (
        <svg {...common}>
          <path d="M26 34h30c4 0 7 3 7 7v18c0 4-3 7-7 7H26c-5 0-9-4-9-9V43c0-5 4-9 9-9z" fill="currentColor" />
          <path d="M63 30l22 20-22 20z" fill="currentColor" opacity="0.65" />
        </svg>
      );

    case 'rear-brace':
      return (
        <svg {...common}>
          <rect x="18" y="36" width="52" height="28" rx="12" fill="currentColor" />
          <rect x="30" y="24" width="10" height="52" rx="5" fill="currentColor" opacity="0.65" />
          <rect x="52" y="24" width="10" height="52" rx="5" fill="currentColor" opacity="0.65" />
        </svg>
      );

    case 'tail-brace':
      return (
        <svg {...common}>
          <rect x="14" y="30" width="64" height="40" rx="10" fill="currentColor" />
          <rect x="24" y="18" width="12" height="64" rx="6" fill="currentColor" opacity="0.6" />
        </svg>
      );

    case 'body-harness':
      return (
        <svg {...common}>
          <ellipse cx="50" cy="50" rx="36" ry="26" fill="currentColor" opacity="0.75" />
          <rect x="16" y="44" width="68" height="12" rx="6" fill="currentColor" />
          <rect x="44" y="18" width="12" height="64" rx="6" fill="currentColor" opacity="0.6" />
        </svg>
      );

    case 'flipper-cup':
      return (
        <svg {...common}>
          <path d="M30 32c14-6 30-6 40 4 4 4 4 24 0 28-10 10-26 10-40 4z" fill="currentColor" />
          <rect x="18" y="40" width="16" height="20" rx="8" fill="currentColor" opacity="0.65" />
        </svg>
      );

    case 'shell-patch':
      return (
        <svg {...common}>
          <path d="M20 58c0-18 14-30 30-30s30 12 30 30c0 4-3 6-7 6H27c-4 0-7-2-7-6z" fill="currentColor" />
          <path d="M50 28v36M32 44h36" stroke="currentColor" strokeWidth="4" opacity="0.5" />
        </svg>
      );

    case 'swim-boot':
      return (
        <svg {...common}>
          <path
            d="M28 30c0-4 3-7 7-7h8c4 0 7 3 7 7v18l19 8c4 2 6 5 6 9v3c0 3-2 5-5 5H34c-4 0-6-2-6-6z"
            fill="currentColor"
          />
          <path d="M30 60h44" stroke="currentColor" strokeWidth="4" opacity="0.5" />
        </svg>
      );

    case 'buoyancy-sling':
      return (
        <svg {...common}>
          <path d="M22 42c8 16 48 16 56 0v10c-8 18-48 18-56 0z" fill="currentColor" />
          <circle cx="20" cy="42" r="11" fill="currentColor" opacity="0.65" />
          <circle cx="80" cy="42" r="11" fill="currentColor" opacity="0.65" />
        </svg>
      );

    case 'printed-shell':
      return (
        <svg {...common}>
          <circle cx="46" cy="52" r="26" fill="currentColor" />
          <circle cx="60" cy="42" r="16" fill="currentColor" opacity="0.72" />
          <circle cx="70" cy="35" r="9" fill="currentColor" opacity="0.55" />
          <circle cx="76" cy="30" r="5" fill="currentColor" opacity="0.4" />
        </svg>
      );

    default:
      return (
        <svg {...common}>
          <circle cx="50" cy="50" r="28" fill="currentColor" />
        </svg>
      );
  }
}
