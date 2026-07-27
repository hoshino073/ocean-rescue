import { useEffect, useRef } from 'react';
import type { Group } from 'three';
import { ANIMALS, animalsInExhibit } from '../../../data/animals';
import type { AnimalId } from '../../../types/animal';
import type { ExhibitId } from '../../../types/exhibit';
import type { WanderBounds } from '../../../utils/motion';
import { SwimmingAnimal } from './SwimmingAnimal';

/** Roaming volume per animal. Bottom-dwellers get a shallow volume near the
 * sand; open swimmers get the full water column. */
const ROAM: Record<AnimalId, WanderBounds> = {
  turtle: { x: 4.2, y: 0.8, z: 2.4, centerY: -0.7 },
  dolphin: { x: 5.4, y: 1.0, z: 2.8, centerY: 0.8 },
  seal: { x: 4.6, y: 0.9, z: 2.6, centerY: -0.2 },
  penguin: { x: 5.0, y: 1.1, z: 2.6, centerY: 0.4 },
  // Kept high and forward so it does not swim through the turtle below it.
  reeffish: { x: 3.6, y: 0.7, z: 1.8, centerY: 1.2 },
  // A hermit crab walks the seabed, so it barely leaves the sand.
  hermitcrab: { x: 2.6, y: 0.05, z: 1.6, centerY: -1.75 },
};

/** Seeds are arbitrary but fixed, so each animal keeps its own path. */
const SEEDS: Record<AnimalId, number> = {
  turtle: 1.3,
  dolphin: 4.7,
  seal: 8.2,
  penguin: 12.9,
  reeffish: 17.4,
  hermitcrab: 21.1,
};

interface AnimalsProps {
  exhibitId: ExhibitId;
  rescued: ReadonlySet<AnimalId>;
  selectedId: AnimalId | null;
  onSelect: (id: AnimalId) => void;
  /** Called whenever the focused animal's Object3D changes, for the camera rig. */
  onFocusObjectChange: (object: Group | null) => void;
}

/** Renders the animals currently in this exhibit and keeps the camera's focus
 * target in sync with the current selection. Rescued animals have already
 * moved to the Rehabilitation Bay, so they only show up there. */
export function Animals({
  exhibitId,
  rescued,
  selectedId,
  onSelect,
  onFocusObjectChange,
}: AnimalsProps) {
  const objects = useRef<Partial<Record<AnimalId, Group | null>>>({});
  const residents = animalsInExhibit(exhibitId, rescued);

  const register = (id: AnimalId) => (object: Group | null) => {
    objects.current[id] = object;
  };

  useEffect(() => {
    onFocusObjectChange(selectedId ? objects.current[selectedId] ?? null : null);
  }, [selectedId, exhibitId, onFocusObjectChange]);

  return (
    <group>
      {residents.map((animal) => (
        <SwimmingAnimal
          key={animal.id}
          animalCase={ANIMALS[animal.id]}
          bounds={ROAM[animal.id]}
          seed={SEEDS[animal.id]}
          paused={selectedId === animal.id}
          selected={selectedId === animal.id}
          showDevice={rescued.has(animal.id)}
          onSelect={() => onSelect(animal.id)}
          onRegister={register(animal.id)}
        />
      ))}
    </group>
  );
}
