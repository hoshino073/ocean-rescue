import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import type { Group } from 'three';
import type { AnimalModelProps } from './types';

/** Procedural sea turtle: a domed shell over a flattened body, with four
 * flippers that row out of phase. Front flippers sweep on Z, rear on X. */
export function SeaTurtle({ animalCase, animate = true, showDevice = false }: AnimalModelProps) {
  const frontLeft = useRef<Group>(null);
  const frontRight = useRef<Group>(null);
  const rearLeft = useRef<Group>(null);
  const rearRight = useRef<Group>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime * (animate ? animalCase.swimSpeed : 0);
    const stroke = Math.sin(t * 1.8);

    if (frontLeft.current) frontLeft.current.rotation.z = 0.3 + stroke * 0.5;
    if (frontRight.current) frontRight.current.rotation.z = -0.3 - stroke * 0.5;
    if (rearLeft.current) rearLeft.current.rotation.z = 0.2 + stroke * 0.22;
    if (rearRight.current) rearRight.current.rotation.z = -0.2 - stroke * 0.22;
  });

  return (
    <group>
      {/* Body */}
      <mesh scale={[1, 0.45, 1.25]}>
        <sphereGeometry args={[0.75, 16, 12]} />
        <meshStandardMaterial color={animalCase.accentColor} roughness={0.7} />
      </mesh>

      {/* Shell */}
      <mesh position={[0, 0.16, 0]} scale={[1.05, 0.5, 1.3]}>
        <sphereGeometry args={[0.78, 16, 12]} />
        <meshStandardMaterial color={animalCase.color} roughness={0.6} flatShading />
      </mesh>

      {/* Head */}
      <mesh position={[0, 0.05, 1.02]}>
        <sphereGeometry args={[0.26, 12, 10]} />
        <meshStandardMaterial color={animalCase.accentColor} roughness={0.7} />
      </mesh>

      {/* Front flippers (pivoted at the shoulder) */}
      <group ref={frontLeft} position={[-0.62, 0, 0.45]}>
        <mesh position={[-0.42, 0, 0]} rotation={[0, 0, 0.2]} scale={[1, 0.18, 0.55]}>
          <sphereGeometry args={[0.5, 10, 8]} />
          <meshStandardMaterial
            color={showDevice ? '#8fd3f4' : animalCase.accentColor}
            roughness={0.6}
            emissive={showDevice ? '#2fb4c9' : '#000000'}
            emissiveIntensity={showDevice ? 0.45 : 0}
          />
        </mesh>
      </group>
      <group ref={frontRight} position={[0.62, 0, 0.45]}>
        <mesh position={[0.42, 0, 0]} rotation={[0, 0, -0.2]} scale={[1, 0.18, 0.55]}>
          <sphereGeometry args={[0.5, 10, 8]} />
          <meshStandardMaterial color={animalCase.accentColor} roughness={0.6} />
        </mesh>
      </group>

      {/* Rear flippers */}
      <group ref={rearLeft} position={[-0.5, -0.05, -0.7]}>
        <mesh position={[-0.22, 0, 0]} scale={[1, 0.2, 0.6]}>
          <sphereGeometry args={[0.26, 8, 8]} />
          <meshStandardMaterial color={animalCase.accentColor} roughness={0.7} />
        </mesh>
      </group>
      <group ref={rearRight} position={[0.5, -0.05, -0.7]}>
        <mesh position={[0.22, 0, 0]} scale={[1, 0.2, 0.6]}>
          <sphereGeometry args={[0.26, 8, 8]} />
          <meshStandardMaterial color={animalCase.accentColor} roughness={0.7} />
        </mesh>
      </group>
    </group>
  );
}
