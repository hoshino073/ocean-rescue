import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import type { Group } from 'three';
import { fbmSin } from '../../../utils/motion';

/** A floating lane rope, the kind used to divide a rehabilitation pool. */
function LaneRope({ z, seed }: { z: number; seed: number }) {
  const ref = useRef<Group>(null);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.position.y = 1.6 + fbmSin(state.clock.elapsedTime * 0.5, seed, 2) * 0.06;
  });

  const floats = Array.from({ length: 14 }, (_, i) => -6.5 + i);

  return (
    <group ref={ref} position={[0, 1.6, z]}>
      {floats.map((x, i) => (
        <mesh key={i} position={[x, 0, 0]}>
          <sphereGeometry args={[0.12, 8, 8]} />
          <meshStandardMaterial color={i % 2 === 0 ? '#ffd166' : '#2fb4c9'} roughness={0.5} />
        </mesh>
      ))}
    </group>
  );
}

/** Pool furniture for the Rehabilitation Bay: a tiled floor grid, lane ropes,
 * and a submerged rest platform. Clean and clinical, no coral or kelp. */
export function RehabProps() {
  const tiles: React.ReactNode[] = [];
  for (let x = -4; x <= 4; x++) {
    for (let z = -4; z <= 2; z++) {
      // Checkerboard, drawn as thin plates just above the floor.
      if ((x + z) % 2 !== 0) continue;
      tiles.push(
        <mesh key={`${x}-${z}`} position={[x * 1.4, -2.08, z * 1.4]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[1.3, 1.3]} />
          <meshStandardMaterial color="#b6d6e6" roughness={0.85} />
        </mesh>,
      );
    }
  }

  return (
    <group>
      {tiles}

      <LaneRope z={-4.5} seed={2.1} />
      <LaneRope z={2.5} seed={7.8} />

      {/* Submerged rest platform */}
      <group position={[4.6, -1.6, -1.4]}>
        <mesh>
          <boxGeometry args={[2.4, 0.18, 1.8]} />
          <meshStandardMaterial color="#dbeaf2" roughness={0.7} />
        </mesh>
        {[
          [-1, -0.5, -0.7],
          [1, -0.5, -0.7],
          [-1, -0.5, 0.7],
          [1, -0.5, 0.7],
        ].map((p, i) => (
          <mesh key={i} position={p as [number, number, number]}>
            <cylinderGeometry args={[0.07, 0.07, 0.85, 8]} />
            <meshStandardMaterial color="#9fbccb" roughness={0.7} />
          </mesh>
        ))}
      </group>

      {/* Depth markers on the back wall */}
      {[-3, 0, 3].map((x, i) => (
        <mesh key={i} position={[x, -0.6, -6.4]}>
          <boxGeometry args={[0.5, 0.08, 0.05]} />
          <meshStandardMaterial color="#2fb4c9" roughness={0.5} />
        </mesh>
      ))}
    </group>
  );
}
