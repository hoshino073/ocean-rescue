interface Ray {
  left: string;
  width: number;
  rotate: number;
  delay: number;
}

const RAYS: Ray[] = [
  { left: '10%', width: 120, rotate: 8, delay: 0 },
  { left: '32%', width: 90, rotate: -6, delay: 1.2 },
  { left: '58%', width: 140, rotate: 5, delay: 0.6 },
  { left: '78%', width: 100, rotate: -9, delay: 1.8 },
];

/** Soft, static light-ray shapes with a gentle opacity pulse — a cheap
 * stand-in for volumetric underwater lighting. */
export function LightRays() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {RAYS.map((ray, i) => (
        <div
          key={i}
          className="absolute -top-10 h-[140%] bg-gradient-to-b from-foam/40 via-foam/10 to-transparent"
          style={{
            left: ray.left,
            width: ray.width,
            transform: `rotate(${ray.rotate}deg)`,
            animation: `ray-pulse ${6 + i}s ease-in-out infinite`,
            animationDelay: `${ray.delay}s`,
            clipPath: 'polygon(30% 0%, 70% 0%, 100% 100%, 0% 100%)',
          }}
        />
      ))}
    </div>
  );
}
