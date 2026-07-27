import { useMemo } from 'react';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ANIMAL_ORDER } from '../data/animals';
import type { AnimalId } from '../types/animal';

interface ProgressState {
  /** Best score achieved per animal, for animals that have been fitted. */
  bestScores: Partial<Record<AnimalId, number>>;
  /** Records a completed fitting. Returns true if it beat the previous best. */
  recordScore: (animalId: AnimalId, score: number) => boolean;
  resetProgress: () => void;
}

/** Local-only progress. Nothing leaves the browser; this exists so returning
 * visitors can see which animals they have already helped. */
export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      bestScores: {},

      recordScore: (animalId, score) => {
        const previous = get().bestScores[animalId];
        const isNewBest = previous === undefined || score > previous;

        if (isNewBest) {
          set((state) => ({ bestScores: { ...state.bestScores, [animalId]: score } }));
        }

        return isNewBest && previous !== undefined;
      },

      resetProgress: () => set({ bestScores: {} }),
    }),
    { name: 'ocean-rescue-progress' },
  ),
);

/** The set of animals successfully helped at least once. Memoised so the
 * reference stays stable between renders — components use it in dependency
 * arrays and to decide which exhibit each animal is in. */
export function useRescued(): ReadonlySet<AnimalId> {
  const bestScores = useProgressStore((s) => s.bestScores);
  return useMemo(() => new Set(Object.keys(bestScores) as AnimalId[]), [bestScores]);
}

/** True once every animal in the app has been helped. */
export function useAllRescued(): boolean {
  const rescued = useRescued();
  return rescued.size >= ANIMAL_ORDER.length;
}
