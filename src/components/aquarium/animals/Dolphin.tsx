import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import type { Group } from 'three';
import type { AnimalModelProps } from './types';

/** Procedural dolphin: a tapered capsule body with a dorsal fin, pectoral
 * fins, and a fluke that strokes vertically (the dolphin's distinguishing
 * motion versus a fish's side-to-side tail). */
export function Dolphin({ animalCase, animate = true, showDevice = false }: AnimalModelProps) {
  const fluke = useRef<Group>(null);
  const pectoralLeft = useRef<Group>(null);
  const pectoralRight = useRef<Group>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime * (animate ? animalCase.swimSpeed : 0);
    const stroke = Math.sin(t * 2.4);

    if (fluke.current) fluke.current.rotation.x = stroke * 0.42;
    if (pectoralLeft.current) pectoralLeft.current.rotation.z = 0.35 + stroke * 0.14;
    if (pectoralRight.current) pectoralRight.current.rotation.z = -0.35 - stroke * 0.14;
  });

  return (
    <group>
      {/* Body */}
      <mesh rotation={[Math.PI / 2, 0, 0]} scale={[1, 1, 0.75]}>
        <capsuleGeometry args={[0.34, 1.5, 6, 14]} />
        <meshStandardMaterial color={animalCase.color} roughness={0.5} />
      </mesh>

      {/* Pale underside */}
      <mesh position={[0, -0.12, 0.05]} rotation={[Math.PI / 2, 0, 0]} scale={[0.72, 0.8, 0.34]}>
        <capsuleGeometry args={[0.3, 1.25, 6, 12]} />
        <meshStandardMaterial color="#e8f1f7" roughness={0.6} />
      </mesh>

      {/* Beak */}
      <mesh position={[0, -0.04, 1.02]} rotation={[Math.PI / 2, 0, 0]} scale={[1, 1, 0.85]}>
        <coneGeometry args={[0.13, 0.38, 10]} />
        <meshStandardMaterial color={animalCase.color} roughness={0.5} />
      </mesh>

      {/* Eyes */}
      <mesh position={[-0.16, 0.08, 0.72]}>
        <sphereGeometry args={[0.045, 8, 8]} />
        <meshStandardMaterial color="#12232e" roughness={0.3} />
      </mesh>
      <mesh position={[0.16, 0.08, 0.72]}>
        <sphereGeometry args={[0.045, 8, 8]} />
        <meshStandardMaterial color="#12232e" roughness={0.3} />
      </mesh>

      {/* Dorsal fin, swept back */}
      <mesh position={[0, 0.38, -0.05]} rotation={[-0.6, 0, 0]} scale={[0.45, 1, 1]}>
        <coneGeometry args={[0.2, 0.52, 8]} />
        <meshStandardMaterial color={animalCase.accentColor} roughness={0.5} />
      </mesh>

      {/* Pectoral fins, angled back and down like real flippers */}
      <group ref={pectoralLeft} position={[-0.26, -0.1, 0.35]}>
        <mesh position={[-0.16, -0.1, -0.1]} rotation={[0.25, 0.5, 0.7]} scale={[1, 0.14, 0.42]}>
          <sphereGeometry args={[0.32, 8, 8]} />
          <meshStandardMaterial color={animalCase.accentColor} roughness={0.5} />
        </mesh>
      </group>
      <group ref={pectoralRight} position={[0.26, -0.1, 0.35]}>
        <mesh position={[0.16, -0.1, -0.1]} rotation={[0.25, -0.5, -0.7]} scale={[1, 0.14, 0.42]}>
          <sphereGeometry args={[0.32, 8, 8]} />
          <meshStandardMaterial color={animalCase.accentColor} roughness={0.5} />
        </mesh>
      </group>

      {/* Tail stock + fluke, pivoting at the base of the tail */}
      <group ref={fluke} position={[0, 0, -0.82]}>
        <mesh position={[0, 0, -0.16]} rotation={[Math.PI / 2, 0, 0]}>
          <coneGeometry args={[0.14, 0.36, 8]} />
          <meshStandardMaterial
            color={showDevice ? '#8fd3f4' : animalCase.color}
            roughness={0.5}
            emissive={showDevice ? '#2fb4c9' : '#000000'}
            emissiveIntensity={showDevice ? 0.45 : 0}
          />
        </mesh>
        <mesh position={[0, 0, -0.4]} scale={[1, 0.12, 0.42]}>
          <sphereGeometry args={[0.46, 10, 8]} />
          <meshStandardMaterial
            color={showDevice ? '#8fd3f4' : animalCase.accentColor}
            roughness={0.5}
            emissive={showDevice ? '#2fb4c9' : '#000000'}
            emissiveIntensity={showDevice ? 0.45 : 0}
          />
        </mesh>
      </group>
    </group>
  );
}
