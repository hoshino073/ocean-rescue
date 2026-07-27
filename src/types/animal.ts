import type { ExhibitId } from './exhibit';

/** The rescuable animals. Each is housed in exactly one exhibit. */
export type AnimalId = 'turtle' | 'dolphin' | 'seal' | 'penguin' | 'reeffish' | 'hermitcrab';

/** A prosthetic/supportive device the player can offer an animal. Exactly one
 * option per animal has `isCorrect: true`; the rest are gentle distractors. */
export interface ProstheticDevice {
  id: string;
  name: string;
  description: string;
  isCorrect: boolean;
  /** Target orientation for a correct fit, in degrees (0-360). */
  correctRotationDeg: number;
  /** Where the device must be dragged to, normalized to the fitting stage (0-1, 0-1). */
  attachPoint: { x: number; y: number };
  /** Normalized distance from attachPoint still counted as "close enough". */
  snapRadius: number;
  /** Degrees of rotation error still counted as "aligned". */
  rotationToleranceDeg: number;
}

/** A fictional rehabilitation case for one animal, driving both the info
 * panel and the fitting game. All rehabilitation content here is fictional and
 * simplified for education, not real veterinary guidance. */
export interface AnimalCase {
  id: AnimalId;
  name: string;
  speciesLabel: string;
  /** Where this animal is found before it has been helped. Once rescued it
   * moves to the Rehabilitation Bay — see `currentExhibitOf`. */
  homeExhibitId: ExhibitId;
  /** Primary body color used by the procedural 3D model and its UI accents. */
  color: string;
  accentColor: string;
  injury: string;
  rehabStory: string;
  /** How this animal is doing once its device has been fitted. */
  recoveredNote: string;
  educationalFact: string;
  deviceOptions: ProstheticDevice[];
  correctDeviceId: string;
  modelScale: number;
  swimSpeed: number;
  /** Camera distance for the fitting-stage close-up; small animals need less. */
  closeUpDistance: number;
}
