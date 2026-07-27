import { clamp } from './math';

export interface ScoreInput {
  /** Normalized distance from the device to its attach point. */
  distance: number;
  snapRadius: number;
  /** Absolute rotation error in degrees (0-180). */
  rotationError: number;
  rotationTolerance: number;
  /** 1-based count of fitting attempts made. */
  attempts: number;
}

export interface FitResult {
  score: number;
  alignmentOk: boolean;
  rotationOk: boolean;
}

const DEVICE_POINTS = 40;
const ALIGNMENT_POINTS = 35;
const ROTATION_POINTS = 25;
const MAX_ATTEMPT_PENALTY = 15;
const SCORE_FLOOR = 20;

/** Scores a fitting attempt made with the correct device. Deliberately
 * forgiving: choosing the right device already banks 40 points, and the
 * attempt penalty is small and capped so retrying never feels punishing. */
export function computeScore({
  distance,
  snapRadius,
  rotationError,
  rotationTolerance,
  attempts,
}: ScoreInput): FitResult {
  const alignmentAccuracy = clamp(1 - distance / snapRadius, 0, 1);
  const rotationAccuracy = clamp(1 - rotationError / rotationTolerance, 0, 1);

  const attemptPenalty = Math.min(MAX_ATTEMPT_PENALTY, (attempts - 1) * 5);

  const raw =
    DEVICE_POINTS +
    ALIGNMENT_POINTS * alignmentAccuracy +
    ROTATION_POINTS * rotationAccuracy -
    attemptPenalty;

  return {
    score: Math.round(clamp(raw, SCORE_FLOOR, 100)),
    alignmentOk: distance <= snapRadius,
    rotationOk: rotationError <= rotationTolerance,
  };
}
