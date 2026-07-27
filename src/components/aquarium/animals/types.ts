import type { AnimalCase } from '../../../types/animal';

/** Shared props for every procedural animal model. */
export interface AnimalModelProps {
  animalCase: AnimalCase;
  /** When false the swim cycle freezes (used while an info panel is open). */
  animate?: boolean;
  /** Highlights the limb where the prosthetic attaches, after a successful fit. */
  showDevice?: boolean;
}
