import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import type { Group } from 'three';
import type { AnimalCase } from '../../../types/animal';
import { AnimalModel } from './AnimalModel';
import { damp, headingFrom, shortestAngleTo, wander, type WanderBounds } from '../../../utils/motion';
import { clamp } from '../../../utils/math';

interface SwimmingAnimalProps {
  animalCase: AnimalCase;
  /** The volume this animal roams within. */
  bounds: WanderBounds;
  /** Offsets this animal's noise so no two follow the same path. */
  seed: number;
  /** Freezes forward travel (used when this animal is selected). */
  paused: boolean;
  selected: boolean;
  /** Highlights the fitted limb — used for animals already rescued. */
  showDevice?: boolean;
  onSelect: () => void;
  /** Hands the underlying Object3D up so the camera rig can frame it. */
  onRegister: (object: Group | null) => void;
}

/** Moves one animal along a smooth wandering path and makes it clickable.
 *
 * The path comes from layered sine noise rather than a circle, so the animal
 * drifts, turns, and changes depth without ever visibly repeating a lap. It
 * banks into its turns by facing wherever it is actually heading. When paused
 * it eases to a stop and turns to face the camera. */
export function SwimmingAnimal({
  animalCase,
  bounds,
  seed,
  paused,
  selected,
  showDevice = false,
  onSelect,
  onRegister,
}: SwimmingAnimalProps) {
  const group = useRef<Group>(null);
  const pathTime = useRef(seed * 3.7);
  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;

    if (!paused) {
      pathTime.current += delta * animalCase.swimSpeed;
    }
    const t = pathTime.current;

    const position = wander(t, seed, bounds);
    g.position.set(position.x, position.y, position.z);

    // Sample a moment ahead to work out which way the animal is travelling.
    const ahead = wander(t + 0.12, seed, bounds);
    const { yaw, pitch } = headingFrom(position, ahead);

    const targetYaw = selected
      ? Math.atan2(state.camera.position.x - position.x, state.camera.position.z - position.z)
      : yaw;

    const ease = damp(2.5, delta);

    // How far off-heading we are this frame doubles as the turn rate, which
    // is what the bank angle should follow.
    const yawError = shortestAngleTo(g.rotation.y, targetYaw);
    const targetRoll = selected ? 0 : clamp(-yawError * 1.4, -0.45, 0.45);

    g.rotation.y += yawError * ease;
    g.rotation.x += ((selected ? 0 : -pitch) - g.rotation.x) * ease;
    g.rotation.z += (targetRoll - g.rotation.z) * ease;

    const targetScale = (hovered && !selected ? 1.08 : 1) * animalCase.modelScale;
    g.scale.setScalar(g.scale.x + (targetScale - g.scale.x) * damp(5, delta));
  });

  return (
    <group
      ref={(node) => {
        group.current = node;
        onRegister(node);
      }}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = 'auto';
      }}
    >
      <AnimalModel animalCase={animalCase} animate={!paused} showDevice={showDevice} />

      {!selected && (
        <Html center distanceFactor={9} position={[0, 1.1, 0]} zIndexRange={[10, 0]}>
          <div className="pointer-events-none flex select-none items-center gap-1 whitespace-nowrap rounded-full border border-white/25 bg-abyss/70 px-3 py-1 text-xs font-medium text-foam backdrop-blur-sm">
            {showDevice && (
              <span aria-hidden="true" className="text-emerald-300">
                ✓
              </span>
            )}
            {animalCase.name}
          </div>
        </Html>
      )}
    </group>
  );
}
