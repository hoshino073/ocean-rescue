import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import type { Group } from 'three';
import { fbmSin } from '../../../utils/motion';

interface KelpStrandProps {
  position: [number, number, number];
  height: number;
  seed: number;
  color: string;
  /** 0-1 health; unhealthy strands are shorter, thinner and duller. */
  vigor: number;
}

/** A single swaying kelp strand: a tall blade pivoted at its base. The sway
 * uses layered noise so neighbouring strands drift out of step, the way a
 * real kelp bed moves, rather than pulsing in unison. */
function KelpStrand({ position, height, seed, color, vigor }: KelpStrandProps) {
  const ref = useRef<Group>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.z = fbmSin(t * 0.55, seed, 2) * 0.22;
    ref.current.rotation.x = fbmSin(t * 0.4, seed + 5.5, 2) * 0.1;
  });

  const h = height * (0.6 + vigor * 0.4);

  return (
    <group position={position} ref={ref}>
      {/* Flattened cones make blades that taper toward the tip, which reads
          far more like kelp than a plain rectangle. */}
      <mesh position={[0, h / 2, 0]} scale={[1, 1, 0.07]}>
        <coneGeometry args={[0.22 * (0.6 + vigor * 0.4), h, 4]} />
        <meshStandardMaterial
          color={color}
          side={2}
          transparent
          opacity={0.6 + vigor * 0.35}
          roughness={0.55}
        />
      </mesh>
      <mesh
        position={[0.14, h * 0.34, 0.05]}
        rotation={[0, 0.7, 0.22]}
        scale={[1, 1, 0.07]}
      >
        <coneGeometry args={[0.16 * (0.6 + vigor * 0.4), h * 0.66, 4]} />
        <meshStandardMaterial
          color={color}
          side={2}
          transparent
          opacity={0.55 + vigor * 0.35}
          roughness={0.55}
        />
      </mesh>
    </group>
  );
}

const BED: { position: [number, number, number]; height: number; seed: number }[] = [
  { position: [-6.2, -2.4, -2.5], height: 3.4, seed: 0.4 },
  { position: [-5.7, -2.4, -3], height: 2.6, seed: 3.1 },
  { position: [6.4, -2.4, -2], height: 3.8, seed: 6.8 },
  { position: [6, -2.4, -3.2], height: 2.8, seed: 9.2 },
  { position: [-0.5, -2.4, -6], height: 3, seed: 12.5 },
  { position: [-4.4, -2.4, -4.4], height: 2.4, seed: 15.7 },
  { position: [4.9, -2.4, -4.6], height: 2.9, seed: 18.3 },
  { position: [1.6, -2.4, -5.6], height: 2.2, seed: 21.9 },
];

interface KelpProps {
  color: string;
  /** 0-1. Scales both how many strands appear and how lush each one is. */
  density: number;
}

/** The kelp bed lining the back and sides of the tank. */
export function Kelp({ color, density }: KelpProps) {
  if (density <= 0) return null;

  const count = Math.max(1, Math.round(BED.length * density));

  return (
    <group>
      {BED.slice(0, count).map((k, i) => (
        <KelpStrand key={i} {...k} color={color} vigor={density} />
      ))}
    </group>
  );
}
