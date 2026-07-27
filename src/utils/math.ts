export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

/** Smallest absolute difference between two angles in degrees (0-180). */
export function angleDiffDeg(a: number, b: number): number {
  const raw = (((a - b) % 360) + 360) % 360;
  return raw > 180 ? 360 - raw : raw;
}

/** Wraps an angle into the 0-359 range. */
export function normalizeDeg(deg: number): number {
  return ((deg % 360) + 360) % 360;
}
