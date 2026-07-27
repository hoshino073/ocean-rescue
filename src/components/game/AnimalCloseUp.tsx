import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import type { Group } from 'three';
import type { AnimalCase } from '../../types/animal';
import { AnimalModel } from '../aquarium/animals/AnimalModel';
import { damp, fbmSin } from '../../utils/motion';

interface PosedAnimalProps {
  animalCase: AnimalCase;
  swimming: boolean;
  deviceFitted: boolean;
}

/** Holds the animal side-on for the fitting view, or drives a loose, wandering
 * swim during the swimming test. */
function PosedAnimal({ animalCase, swimming, deviceFitted }: PosedAnimalProps) {
  const group = useRef<Group>(null);

  useFrame((state, delta) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    const g = group.current;

    if (swimming) {
      // Layered noise keeps the test swim from looking like a metronome.
      g.position.x = fbmSin(t * 0.5, 3.1) * 1.5;
      g.position.y = fbmSin(t * 0.42, 8.6, 2) * 0.28;
      g.rotation.y = Math.PI / 2 + fbmSin(t * 0.45, 3.1) * 0.5;
      g.rotation.z = fbmSin(t * 0.6, 14.2, 2) * 0.12;
    } else {
      // Idle: settle side-on with a slow, uneven bob.
      const ease = damp(3, delta);
      g.position.x += (0 - g.position.x) * ease;
      g.position.y = fbmSin(t * 0.5, 5.4, 2) * 0.07;
      g.rotation.y += (Math.PI / 2 - g.rotation.y) * ease;
      g.rotation.z += (0 - g.rotation.z) * ease;
    }
  });

  return (
    <group ref={group} rotation={[0, Math.PI / 2, 0]}>
      <AnimalModel animalCase={animalCase} animate showDevice={deviceFitted} />
    </group>
  );
}

interface AnimalCloseUpProps {
  animalCase: AnimalCase;
  swimming?: boolean;
  deviceFitted?: boolean;
}

/** Fixed-camera 3D close-up of the animal, used as the backdrop for the
 * fitting stage and the swimming test. The camera never moves, so the HTML
 * drag layer above it maps cleanly to screen space. Distance is per-animal so
 * a hermit crab and a dolphin both fill a similar amount of the frame. */
export function AnimalCloseUp({
  animalCase,
  swimming = false,
  deviceFitted = false,
}: AnimalCloseUpProps) {
  const distance = animalCase.closeUpDistance;

  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, distance * 0.08, distance], fov: 45 }}
      gl={{ antialias: true }}
    >
      <color attach="background" args={['#07354d']} />
      <hemisphereLight args={['#ffffff', '#20303a', 0.6]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 5, 4]} intensity={0.9} />
      <PosedAnimal animalCase={animalCase} swimming={swimming} deviceFitted={deviceFitted} />
    </Canvas>
  );
}
