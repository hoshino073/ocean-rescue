import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import type { Group } from 'three';
import { ANIMALS } from '../../data/animals';
import { AnimalModel } from '../aquarium/animals/AnimalModel';
import { Bubbles3D } from '../aquarium/Bubbles3D';
import { AmbientFish } from '../aquarium/AmbientFish';
import { damp, fbmSin, headingFrom, shortestAngleTo, wander } from '../../utils/motion';
import type { AnimalId } from '../../types/animal';
import { useQualitySettings } from '../../hooks/useQualitySettings';

interface DrifterProps {
  animalId: AnimalId;
  seed: number;
  scale: number;
  bounds: { x: number; y: number; z: number; centerY: number };
  speed: number;
  /** Lateral lane. Keeps each animal roaming near a visible edge of the
   * screen instead of disappearing behind the hero card in the middle. */
  offsetX: number;
}

/** One animal drifting through the home-screen backdrop. Rendered dark and
 * unlit-looking so it reads as a silhouette rather than competing with the
 * hero card in front of it. */
function Drifter({ animalId, seed, scale, bounds, speed, offsetX }: DrifterProps) {
  const group = useRef<Group>(null);
  const time = useRef(seed * 2.3);

  useFrame((_, delta) => {
    const g = group.current;
    if (!g) return;

    time.current += delta * speed;
    const t = time.current;

    const position = wander(t, seed, bounds);
    g.position.set(position.x + offsetX, position.y, position.z);

    // Heading comes from the un-offset path, since the lane is a constant.
    const ahead = wander(t + 0.15, seed, bounds);
    const { yaw, pitch } = headingFrom(position, ahead);

    const ease = damp(2, delta);
    g.rotation.y += shortestAngleTo(g.rotation.y, yaw) * ease;
    g.rotation.x += (-pitch - g.rotation.x) * ease;
  });

  return (
    <group ref={group} scale={scale}>
      <AnimalModel animalCase={ANIMALS[animalId]} animate />
    </group>
  );
}

/** Slow forward-and-back camera drift, so the water feels alive without ever
 * pulling focus from the title. */
function DriftCamera({ still }: { still: boolean }) {
  useFrame((state) => {
    const t = still ? 0 : state.clock.elapsedTime;
    state.camera.position.x = fbmSin(t * 0.08, 2.2, 2) * 1.6;
    state.camera.position.y = 0.6 + fbmSin(t * 0.06, 9.4, 2) * 0.5;
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

/** The 3D layer behind the home screen hero. Loaded lazily so the CSS ocean
 * paints instantly and this fades in on top once Three.js has arrived. */
export function HomeBackground3D() {
  const quality = useQualitySettings();

  return (
    <Canvas
      dpr={[1, Math.min(1.25, quality.maxDpr)]}
      camera={{ position: [0, 0.6, 12], fov: 55 }}
      gl={{ antialias: true, powerPreference: 'low-power' }}
      // Purely decorative: never steal pointer events from the hero card.
      style={{ pointerEvents: 'none' }}
    >
      <color attach="background" args={['#062f47']} />
      <fog attach="fog" args={['#062f47', 11, 30]} />

      {/* Cool, moody lighting — dim enough to sit behind the hero card, bright
          enough that the animals actually read. */}
      <ambientLight intensity={0.62} color="#a8dff2" />
      <directionalLight position={[2, 6, 3]} intensity={0.75} color="#d6f2ff" />
      <hemisphereLight args={['#bfe9ff', '#04283d', 0.5]} />

      <DriftCamera still={quality.reducedMotion} />

      {/* Each animal roams a lane near a visible edge, so they read clearly
          instead of spending most of their time behind the hero card. */}
      <Drifter
        animalId="turtle"
        seed={3.4}
        scale={1.5}
        speed={0.5}
        offsetX={-5.6}
        bounds={{ x: 1.6, y: 0.8, z: 1.6, centerY: -1.7 }}
      />
      <Drifter
        animalId="dolphin"
        seed={11.2}
        scale={1.35}
        speed={0.7}
        offsetX={5.8}
        bounds={{ x: 1.8, y: 0.7, z: 1.8, centerY: 1.9 }}
      />
      <Drifter
        animalId="penguin"
        seed={19.6}
        scale={1.3}
        speed={0.85}
        offsetX={5.2}
        bounds={{ x: 1.7, y: 0.9, z: 1.6, centerY: -2.2 }}
      />

      <AmbientFish count={quality.reducedMotion ? 4 : 8} />
      <Bubbles3D count={quality.bubbleCount} />
    </Canvas>
  );
}
