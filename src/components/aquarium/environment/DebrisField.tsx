import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import type { Group } from 'three';
import { fbmSin } from '../../../utils/motion';

interface DriftingProps {
  position: [number, number, number];
  seed: number;
  children: React.ReactNode;
}

/** Wraps a piece of litter so it drifts and tumbles slowly on the current. */
function Drifting({ position, seed, children }: DriftingProps) {
  const ref = useRef<Group>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.position.x = position[0] + fbmSin(t * 0.18, seed, 2) * 0.5;
    ref.current.position.y = position[1] + fbmSin(t * 0.14, seed + 4.2, 2) * 0.35;
    ref.current.rotation.x = fbmSin(t * 0.2, seed + 8.1, 2) * 0.6;
    ref.current.rotation.z = fbmSin(t * 0.16, seed + 12.4, 2) * 0.6;
  });

  return (
    <group ref={ref} position={position}>
      {children}
    </group>
  );
}

const PLASTIC = '#cfd8d3';

/** Drifting litter for the Plastic Cove exhibit: bottles, a bag, a six-pack
 * ring, and a panel of abandoned "ghost" net. Deliberately reads as tidy,
 * generic litter rather than anything distressing. */
export function DebrisField() {
  return (
    <group>
      {/* Bottles */}
      {[
        { pos: [-3.4, 0.6, -1.6] as [number, number, number], seed: 1.2 },
        { pos: [2.9, 1.4, -2.4] as [number, number, number], seed: 5.6 },
        { pos: [0.8, -0.4, -1.2] as [number, number, number], seed: 9.1 },
      ].map((b, i) => (
        <Drifting key={`bottle-${i}`} position={b.pos} seed={b.seed}>
          <mesh>
            <cylinderGeometry args={[0.11, 0.11, 0.42, 10]} />
            <meshStandardMaterial color={PLASTIC} transparent opacity={0.65} roughness={0.25} />
          </mesh>
          <mesh position={[0, 0.28, 0]}>
            <cylinderGeometry args={[0.05, 0.09, 0.14, 8]} />
            <meshStandardMaterial color="#8fb3a8" transparent opacity={0.75} roughness={0.3} />
          </mesh>
        </Drifting>
      ))}

      {/* Carrier bag — a rippling sheet */}
      <Drifting position={[-1.8, 1.2, -2.8]} seed={14.3}>
        <mesh>
          <planeGeometry args={[0.7, 0.8, 3, 3]} />
          <meshStandardMaterial
            color={PLASTIC}
            side={2}
            transparent
            opacity={0.45}
            roughness={0.2}
          />
        </mesh>
      </Drifting>

      {/* Six-pack ring */}
      <Drifting position={[3.6, 0.2, -1.4]} seed={18.7}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.22, 0.03, 6, 16]} />
          <meshStandardMaterial color={PLASTIC} transparent opacity={0.7} roughness={0.3} />
        </mesh>
      </Drifting>

      {/* Ghost net: a sparse grid of thin strands snagged on the rocks */}
      <group position={[-5.2, -0.9, -3.2]} rotation={[0, 0.5, 0.15]}>
        {Array.from({ length: 6 }, (_, i) => (
          <mesh key={`v-${i}`} position={[-0.75 + i * 0.3, 0, 0]}>
            <boxGeometry args={[0.015, 1.8, 0.015]} />
            <meshStandardMaterial color="#7d8f86" roughness={0.8} />
          </mesh>
        ))}
        {Array.from({ length: 6 }, (_, i) => (
          <mesh key={`h-${i}`} position={[0, -0.75 + i * 0.3, 0]}>
            <boxGeometry args={[1.8, 0.015, 0.015]} />
            <meshStandardMaterial color="#7d8f86" roughness={0.8} />
          </mesh>
        ))}
      </group>
    </group>
  );
}
