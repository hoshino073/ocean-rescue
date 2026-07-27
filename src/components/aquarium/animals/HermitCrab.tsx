import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import type { Group } from 'three';
import type { AnimalModelProps } from './types';

/** Procedural hermit crab: a borrowed spiral shell riding on a small body,
 * with claws and scuttling legs. The shell is the "device" here — when one is
 * fitted it renders as a clean printed shell instead of the cracked one. */
export function HermitCrab({ animalCase, animate = true, showDevice = false }: AnimalModelProps) {
  const legsLeft = useRef<Group>(null);
  const legsRight = useRef<Group>(null);
  const clawLeft = useRef<Group>(null);
  const clawRight = useRef<Group>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime * (animate ? animalCase.swimSpeed : 0);
    const step = Math.sin(t * 5);

    // Legs alternate so the crab reads as scuttling.
    if (legsLeft.current) legsLeft.current.rotation.z = step * 0.22;
    if (legsRight.current) legsRight.current.rotation.z = -step * 0.22;
    if (clawLeft.current) clawLeft.current.rotation.y = 0.3 + Math.sin(t * 2.3) * 0.25;
    if (clawRight.current) clawRight.current.rotation.y = -0.3 - Math.sin(t * 2.7) * 0.25;
  });

  const shellColor = showDevice ? '#8fd3f4' : '#c9a227';

  return (
    <group>
      {/* Borrowed shell — a stack of shrinking spheres reads as a spiral */}
      <group position={[0, 0.14, -0.3]}>
        {[
          { p: [0, 0, 0] as const, r: 0.34 },
          { p: [0.02, 0.1, -0.2] as const, r: 0.24 },
          { p: [0.03, 0.16, -0.36] as const, r: 0.15 },
          { p: [0.03, 0.19, -0.47] as const, r: 0.08 },
        ].map((seg, i) => (
          <mesh key={i} position={seg.p}>
            <sphereGeometry args={[seg.r, 12, 10]} />
            <meshStandardMaterial
              color={shellColor}
              roughness={showDevice ? 0.35 : 0.65}
              emissive={showDevice ? '#2fb4c9' : '#000000'}
              emissiveIntensity={showDevice ? 0.4 : 0}
              flatShading={!showDevice}
            />
          </mesh>
        ))}
      </group>

      {/* Body */}
      <mesh position={[0, -0.02, 0.06]} scale={[1, 0.85, 1]}>
        <sphereGeometry args={[0.2, 12, 10]} />
        <meshStandardMaterial color={animalCase.color} roughness={0.6} />
      </mesh>

      {/* Eye stalks */}
      {[-0.07, 0.07].map((x, i) => (
        <group key={i} position={[x, 0.12, 0.18]}>
          <mesh rotation={[0.3, 0, 0]}>
            <cylinderGeometry args={[0.015, 0.015, 0.14, 6]} />
            <meshStandardMaterial color={animalCase.accentColor} roughness={0.6} />
          </mesh>
          <mesh position={[0, 0.09, 0.02]}>
            <sphereGeometry args={[0.035, 8, 8]} />
            <meshStandardMaterial color="#12232e" roughness={0.3} />
          </mesh>
        </group>
      ))}

      {/* Claws */}
      <group ref={clawLeft} position={[-0.18, -0.06, 0.2]}>
        <mesh rotation={[0, 0, 0.3]} scale={[1, 0.7, 1.3]}>
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshStandardMaterial color={animalCase.accentColor} roughness={0.6} />
        </mesh>
      </group>
      <group ref={clawRight} position={[0.18, -0.06, 0.2]}>
        <mesh rotation={[0, 0, -0.3]} scale={[1, 0.7, 1.3]}>
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshStandardMaterial color={animalCase.accentColor} roughness={0.6} />
        </mesh>
      </group>

      {/* Legs */}
      <group ref={legsLeft} position={[-0.14, -0.1, 0.02]}>
        {[0, 1, 2].map((i) => (
          <mesh key={i} position={[-0.06, -0.06, 0.06 - i * 0.11]} rotation={[0, 0, 0.9]}>
            <cylinderGeometry args={[0.018, 0.018, 0.22, 6]} />
            <meshStandardMaterial color={animalCase.accentColor} roughness={0.7} />
          </mesh>
        ))}
      </group>
      <group ref={legsRight} position={[0.14, -0.1, 0.02]}>
        {[0, 1, 2].map((i) => (
          <mesh key={i} position={[0.06, -0.06, 0.06 - i * 0.11]} rotation={[0, 0, -0.9]}>
            <cylinderGeometry args={[0.018, 0.018, 0.22, 6]} />
            <meshStandardMaterial color={animalCase.accentColor} roughness={0.7} />
          </mesh>
        ))}
      </group>
    </group>
  );
}
