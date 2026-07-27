import { create } from 'zustand';
import type { AnimalCase, ProstheticDevice } from '../types/animal';
import type { Feedback, GamePhase } from '../types/game';
import { angleDiffDeg, clamp, normalizeDeg } from '../utils/math';
import { computeScore } from '../utils/scoring';

/** How far one keyboard nudge moves the device, in normalized stage units. */
const NUDGE_STEP = 0.03;
/** How far one keyboard rotate press turns the device, in degrees. */
const ROTATE_STEP = 15;

interface FittingGameState {
  animalCase: AnimalCase | null;
  phase: GamePhase;
  selectedDeviceId: string | null;
  /** Device position, normalized to the fitting stage (0-1 on both axes). */
  position: { x: number; y: number };
  rotationDeg: number;
  attempts: number;
  score: number | null;
  feedback: Feedback | null;

  startGame: (animalCase: AnimalCase) => void;
  selectDevice: (deviceId: string) => void;
  setPosition: (position: { x: number; y: number }) => void;
  nudgePosition: (dx: number, dy: number) => void;
  setRotation: (deg: number) => void;
  /** Rotates by one keyboard step; direction is +1 (clockwise) or -1. */
  nudgeRotation: (direction: 1 | -1) => void;
  checkFit: () => void;
  finishSwimTest: () => void;
  retry: () => void;
  reset: () => void;
}

/** Where the device starts before the player moves it — bottom-left of the stage. */
const START_POSITION = { x: 0.18, y: 0.82 };

function activeDevice(state: FittingGameState): ProstheticDevice | null {
  if (!state.animalCase || !state.selectedDeviceId) return null;
  return state.animalCase.deviceOptions.find((d) => d.id === state.selectedDeviceId) ?? null;
}

/** Shared state for the Prosthetic Fitting Lab. Mouse dragging and the
 * keyboard controls both write these same fields, so scoring and the
 * alignment guides never need to know which input the player used. */
export const useFittingGameStore = create<FittingGameState>((set, get) => ({
  animalCase: null,
  phase: 'selecting',
  selectedDeviceId: null,
  position: { ...START_POSITION },
  rotationDeg: 0,
  attempts: 0,
  score: null,
  feedback: null,

  startGame: (animalCase) =>
    set({
      animalCase,
      phase: 'selecting',
      selectedDeviceId: null,
      position: { ...START_POSITION },
      rotationDeg: 0,
      attempts: 0,
      score: null,
      feedback: null,
    }),

  selectDevice: (deviceId) => {
    const { animalCase } = get();
    if (!animalCase) return;

    const device = animalCase.deviceOptions.find((d) => d.id === deviceId);
    if (!device) return;

    if (!device.isCorrect) {
      // Wrong device costs an attempt but never scores — the player simply
      // gets an encouraging nudge and picks again.
      set((state) => ({
        attempts: state.attempts + 1,
        feedback: {
          tone: 'retry',
          message: `The ${device.name.toLowerCase()} isn't the right shape for ${animalCase.name}. Try another device.`,
        },
      }));
      return;
    }

    set({
      selectedDeviceId: deviceId,
      phase: 'positioning',
      position: { ...START_POSITION },
      rotationDeg: 0,
      feedback: {
        tone: 'info',
        message: 'Good choice. Now move the device onto the highlighted guide and line up its angle.',
      },
    });
  },

  setPosition: (position) =>
    set({
      position: {
        x: clamp(position.x, 0, 1),
        y: clamp(position.y, 0, 1),
      },
    }),

  nudgePosition: (dx, dy) =>
    set((state) => ({
      position: {
        x: clamp(state.position.x + dx * NUDGE_STEP, 0, 1),
        y: clamp(state.position.y + dy * NUDGE_STEP, 0, 1),
      },
    })),

  setRotation: (deg) => set({ rotationDeg: normalizeDeg(deg) }),

  nudgeRotation: (direction) =>
    set((state) => ({ rotationDeg: normalizeDeg(state.rotationDeg + direction * ROTATE_STEP) })),

  checkFit: () => {
    const state = get();
    const device = activeDevice(state);
    if (!device) return;

    const distance = Math.hypot(
      state.position.x - device.attachPoint.x,
      state.position.y - device.attachPoint.y,
    );
    const rotationError = angleDiffDeg(state.rotationDeg, device.correctRotationDeg);
    const attempts = state.attempts + 1;

    const result = computeScore({
      distance,
      snapRadius: device.snapRadius,
      rotationError,
      rotationTolerance: device.rotationToleranceDeg,
      attempts,
    });

    if (!result.alignmentOk) {
      set({
        attempts,
        feedback: {
          tone: 'retry',
          message: 'Almost there. Move the device closer to the glowing guide.',
        },
      });
      return;
    }

    if (!result.rotationOk) {
      set({
        attempts,
        feedback: {
          tone: 'retry',
          message: 'Nearly right. Rotate the device slightly so it matches the guide’s angle.',
        },
      });
      return;
    }

    // Snap cleanly into place, then run the swim test.
    set({
      attempts,
      score: result.score,
      position: { ...device.attachPoint },
      rotationDeg: device.correctRotationDeg,
      phase: 'testing',
      feedback: {
        tone: 'success',
        message: 'Great fit! The device is aligned correctly — starting the swimming test.',
      },
    });
  },

  finishSwimTest: () => set({ phase: 'results', feedback: null }),

  retry: () => {
    const { animalCase } = get();
    if (animalCase) get().startGame(animalCase);
  },

  reset: () =>
    set({
      animalCase: null,
      phase: 'selecting',
      selectedDeviceId: null,
      position: { ...START_POSITION },
      rotationDeg: 0,
      attempts: 0,
      score: null,
      feedback: null,
    }),
}));
