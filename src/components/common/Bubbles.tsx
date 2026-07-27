import { useMemo } from 'react';

interface BubblesProps {
  count?: number;
  className?: string;
}

/** A field of softly rising CSS bubbles. Pure CSS animation (cheap, GPU-friendly)
 * so it can safely run behind both the DOM home screen and 3D overlays. */
export function Bubbles({ count = 16, className = '' }: BubblesProps) {
  const bubbles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.round((i / count) * 100 + (Math.sin(i * 12.9) * 4)),
        size: 6 + ((i * 37) % 20),
        duration: 9 + ((i * 13) % 10),
        delay: -((i * 7) % 14),
        drift: ((i % 2 === 0 ? 1 : -1) * (8 + (i % 5) * 4)),
      })),
    [count],
  );

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {bubbles.map((b) => (
        <span
          key={b.id}
          className="absolute bottom-0 rounded-full bg-foam/40"
          style={{
            left: `${b.left}%`,
            width: b.size,
            height: b.size,
            animation: `bubble-rise ${b.duration}s linear infinite`,
            animationDelay: `${b.delay}s`,
            // @ts-expect-error custom property consumed by the bubble-rise keyframes
            '--drift': `${b.drift}px`,
          }}
        />
      ))}
    </div>
  );
}
