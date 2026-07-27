import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import type { Group } from 'three';
import type { AnimalModelProps } from './types';

/** Procedural little blue penguin, posed horizontally as it would be
 * underwater: flippers beat like wings and the webbed feet trail behind,
 * steering like a pair of rudders. */
export function Penguin({ animalCase, animate = true, showDevice = false }: AnimalModelProps) {
  const flipperLeft = useRef<Group>(null);
  const flipperRight = useRef<Group>(null);
  const feet = useRef<Group>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime * (animate ? animalCase.swimSpeed : 0);
    const beat = Math.sin(t * 3.2);

    if (flipperLeft.current) flipperLeft.current.rotation.z = 0.25 + beat * 0.7;
    if (flipperRight.current) flipperRight.current.rotation.z = -0.25 - beat * 0.7;
    if (feet.current) feet.current.rotation.x = Math.sin(t * 2.1) * 0.2;
  });

  return (
    <group>
      {/* Body */}
      <mesh rotation={[Math.PI / 2, 0, 0]} scale={[1, 1, 0.85]}>
        <capsuleGeometry args={[0.28, 0.72, 6, 14]} />
        <meshStandardMaterial color={animalCase.color} roughness={0.6} />
      </mesh>

      {/* Pale belly */}
      <mesh position={[0, -0.1, 0.06]} rotation={[Math.PI / 2, 0, 0]} scale={[0.74, 0.8, 0.46]}>
        <capsuleGeometry args={[0.26, 0.66, 6, 12]} />
        <meshStandardMaterial color="#f2f7fa" roughness={0.7} />
      </mesh>

      {/* Head */}
      <mesh position={[0, 0.08, 0.58]}>
        <sphereGeometry args={[0.22, 12, 10]} />
        <meshStandardMaterial color={animalCase.color} roughness={0.6} />
      </mesh>

      {/* White cheeks */}
      <mesh position={[0, -0.02, 0.68]} scale={[0.85, 0.7, 0.7]}>
        <sphereGeometry args={[0.17, 10, 8]} />
        <meshStandardMaterial color="#f2f7fa" roughness={0.7} />
      </mesh>

      {/* Beak */}
      <mesh position={[0, 0.04, 0.82]} rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.06, 0.22, 8]} />
        <meshStandardMaterial color="#3a3f47" roughness={0.5} />
      </mesh>

      {/* Eyes */}
      <mesh position={[-0.11, 0.14, 0.7]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial color="#12232e" roughness={0.3} />
      </mesh>
      <mesh position={[0.11, 0.14, 0.7]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial color="#12232e" roughness={0.3} />
      </mesh>

      {/* Flippers */}
      <group ref={flipperLeft} position={[-0.24, 0, 0.1]}>
        <mesh position={[-0.18, -0.04, -0.08]} rotation={[0.2, 0.35, 0.6]} scale={[1, 0.12, 0.42]}>
          <sphereGeometry args={[0.32, 8, 8]} />
          <meshStandardMaterial color={animalCase.accentColor} roughness={0.6} />
        </mesh>
      </group>
      <group ref={flipperRight} position={[0.24, 0, 0.1]}>
        <mesh position={[0.18, -0.04, -0.08]} rotation={[0.2, -0.35, -0.6]} scale={[1, 0.12, 0.42]}>
          <sphereGeometry args={[0.32, 8, 8]} />
          <meshStandardMaterial color={animalCase.accentColor} roughness={0.6} />
        </mesh>
      </group>

      {/* Tail */}
      <mesh position={[0, -0.02, -0.6]} rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.14, 0.24, 6]} />
        <meshStandardMaterial color={animalCase.accentColor} roughness={0.6} />
      </mesh>

      {/* Webbed feet — the left one is where the swim boot fits */}
      <group ref={feet} position={[0, -0.2, -0.42]}>
        <mesh position={[-0.13, -0.04, -0.08]} scale={[0.6, 0.14, 1]}>
          <sphereGeometry args={[0.2, 8, 8]} />
          <meshStandardMaterial
            color={showDevice ? '#8fd3f4' : '#e08a4a'}
            roughness={0.6}
            emissive={showDevice ? '#2fb4c9' : '#000000'}
            emissiveIntensity={showDevice ? 0.45 : 0}
          />
        </mesh>
        <mesh position={[0.13, -0.04, -0.08]} scale={[0.6, 0.14, 1]}>
          <sphereGeometry args={[0.2, 8, 8]} />
          <meshStandardMaterial color="#e08a4a" roughness={0.6} />
        </mesh>
      </group>
    </group>
  );
}
