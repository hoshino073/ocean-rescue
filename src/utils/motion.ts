/** Smooth pseudo-random motion helpers.
 *
 * Everything here is built from layered sine waves at deliberately
 * incommensurate frequencies. Summing octaves that never line up produces a
 * path that reads as organic wandering rather than a visible loop, while
 * staying perfectly smooth, cheap, and deterministic (no per-frame state, no
 * physics, and identical on every machine). */

/** Fractal sine noise in roughly [-1, 1]. Frequencies use irrational-ish
 * ratios so the octaves take a very long time to repeat together. */
export function fbmSin(t: number, seed: number, octaves = 3): number {
  let value = 0;
  let amplitude = 1;
  let frequency = 1;
  let norm = 0;

  for (let i = 0; i < octaves; i++) {
    value += Math.sin(t * frequency + seed * (i + 1) * 2.399963) * amplitude;
    norm += amplitude;
    amplitude *= 0.5;
    // 1.713 keeps successive octaves out of phase far longer than doubling.
    frequency *= 1.713;
  }

  return value / norm;
}

export interface WanderBounds {
  /** Half-extent of the roaming volume on each axis. */
  x: number;
  y: number;
  z: number;
  /** Vertical centre of the roaming volume. */
  centerY: number;
}

export interface WanderPoint {
  x: number;
  y: number;
  z: number;
}

/** A smooth wandering position inside `bounds`. Each axis uses its own seed
 * offset and its own slightly different rate, so the result drifts around the
 * volume instead of tracing a circle or a figure-eight. */
export function wander(t: number, seed: number, bounds: WanderBounds, speed = 1): WanderPoint {
  const s = t * speed;
  return {
    x: fbmSin(s * 0.31, seed + 1.7) * bounds.x,
    y: bounds.centerY + fbmSin(s * 0.23, seed + 11.3, 2) * bounds.y,
    z: fbmSin(s * 0.27, seed + 23.9) * bounds.z,
  };
}

/** Heading (yaw) and pitch implied by travelling from `prev` to `next`.
 * Used so a creature always faces the way it is actually moving. */
export function headingFrom(prev: WanderPoint, next: WanderPoint) {
  const dx = next.x - prev.x;
  const dy = next.y - prev.y;
  const dz = next.z - prev.z;
  const horizontal = Math.hypot(dx, dz);

  return {
    yaw: Math.atan2(dx, dz),
    pitch: horizontal > 1e-5 ? Math.atan2(dy, horizontal) : 0,
  };
}

/** Shortest signed angular distance from `current` to `target`, in radians. */
export function shortestAngleTo(current: number, target: number): number {
  let diff = target - current;
  while (diff > Math.PI) diff -= Math.PI * 2;
  while (diff < -Math.PI) diff += Math.PI * 2;
  return diff;
}

/** Frame-rate independent easing factor for lerping toward a target. */
export function damp(rate: number, delta: number): number {
  return 1 - Math.exp(-rate * delta);
}
