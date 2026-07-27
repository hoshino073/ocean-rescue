import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import type { Group } from 'three';
import type { AnimalModelProps } from './types';

/** Procedural harbour seal: a rounded capsule body with a whiskered head,
 * small front flippers, and rear flippers that sweep side to side. */
export function Seal({ animalCase, animate = true, showDevice = false }: AnimalModelProps) {
  const rearFlippers = useRef<Group>(null);
  const frontLeft = useRef<Group>(null);
  const frontRight = useRef<Group>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime * (animate ? animalCase.swimSpeed : 0);
    const stroke = Math.sin(t * 2);

    if (rearFlippers.current) rearFlippers.current.rotation.y = stroke * 0.45;
    if (frontLeft.current) frontLeft.current.rotation.z = 0.4 + stroke * 0.12;
    if (frontRight.current) frontRight.current.rotation.z = -0.4 - stroke * 0.12;
  });

  return (
    <group>
      {/* Body */}
      <mesh rotation={[Math.PI / 2, 0, 0]} scale={[1, 1, 0.85]}>
        <capsuleGeometry args={[0.42, 1.2, 6, 14]} />
        <meshStandardMaterial color={animalCase.color} roughness={0.75} />
      </mesh>

      {/* Head */}
      <mesh position={[0, 0.12, 0.92]}>
        <sphereGeometry args={[0.34, 12, 10]} />
        <meshStandardMaterial color={animalCase.color} roughness={0.75} />
      </mesh>

      {/* Muzzle */}
      <mesh position={[0, 0.02, 1.16]}>
        <sphereGeometry args={[0.19, 10, 8]} />
        <meshStandardMaterial color={animalCase.accentColor} roughness={0.8} />
      </mesh>

      {/* Eyes */}
      <mesh position={[-0.15, 0.2, 1.12]}>
        <sphereGeometry args={[0.055, 8, 8]} />
        <meshStandardMaterial color="#12232e" roughness={0.3} />
      </mesh>
      <mesh position={[0.15, 0.2, 1.12]}>
        <sphereGeometry args={[0.055, 8, 8]} />
        <meshStandardMaterial color="#12232e" roughness={0.3} />
      </mesh>

      {/* Front flippers */}
      <group ref={frontLeft} position={[-0.36, -0.1, 0.42]}>
        <mesh position={[-0.18, -0.08, 0]} rotation={[0, 0, 0.5]} scale={[1, 0.16, 0.45]}>
          <sphereGeometry args={[0.3, 8, 8]} />
          <meshStandardMaterial color={animalCase.accentColor} roughness={0.7} />
        </mesh>
      </group>
      <group ref={frontRight} position={[0.36, -0.1, 0.42]}>
        <mesh position={[0.18, -0.08, 0]} rotation={[0, 0, -0.5]} scale={[1, 0.16, 0.45]}>
          <sphereGeometry args={[0.3, 8, 8]} />
          <meshStandardMaterial color={animalCase.accentColor} roughness={0.7} />
        </mesh>
      </group>

      {/* Rear flippers, pivoting together at the hips */}
      <group ref={rearFlippers} position={[0, 0, -0.78]}>
        <mesh position={[-0.16, 0, -0.28]} rotation={[0, -0.35, 0]} scale={[0.5, 0.16, 1]}>
          <sphereGeometry args={[0.42, 8, 8]} />
          <meshStandardMaterial
            color={showDevice ? '#8fd3f4' : animalCase.accentColor}
            roughness={0.7}
            emissive={showDevice ? '#2fb4c9' : '#000000'}
            emissiveIntensity={showDevice ? 0.45 : 0}
          />
        </mesh>
        <mesh position={[0.16, 0, -0.28]} rotation={[0, 0.35, 0]} scale={[0.5, 0.16, 1]}>
          <sphereGeometry args={[0.42, 8, 8]} />
          <meshStandardMaterial
            color={showDevice ? '#8fd3f4' : animalCase.accentColor}
            roughness={0.7}
            emissive={showDevice ? '#2fb4c9' : '#000000'}
            emissiveIntensity={showDevice ? 0.45 : 0}
          />
        </mesh>
      </group>
    </group>
  );
}
