import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import type { Group, Mesh } from 'three';
import type { AnimalModelProps } from './types';

/** Procedural copperband-style reef fish: a tall, laterally flattened body
 * with banded markings, a sweeping tail, and small fluttering pectoral fins. */
export function ReefFish({ animalCase, animate = true, showDevice = false }: AnimalModelProps) {
  const tail = useRef<Group>(null);
  const pectoral = useRef<Mesh>(null);
  const sling = useRef<Group>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime * (animate ? animalCase.swimSpeed : 0);

    if (tail.current) tail.current.rotation.y = Math.sin(t * 4.2) * 0.5;
    if (pectoral.current) pectoral.current.rotation.z = 0.4 + Math.sin(t * 7) * 0.35;
    if (sling.current) sling.current.position.y = Math.sin(t * 2) * 0.01;
  });

  return (
    <group>
      {/* Tall flattened body */}
      <mesh scale={[0.3, 0.78, 0.9]}>
        <sphereGeometry args={[0.6, 14, 12]} />
        <meshStandardMaterial color={animalCase.color} roughness={0.45} />
      </mesh>

      {/* Vertical bands */}
      {[-0.16, 0.06, 0.28].map((z, i) => (
        <mesh key={i} position={[0, 0.02, z]} scale={[0.32, 0.7, 0.06]}>
          <sphereGeometry args={[0.6, 10, 8]} />
          <meshStandardMaterial color={animalCase.accentColor} roughness={0.5} />
        </mesh>
      ))}

      {/* Snout */}
      <mesh position={[0, -0.04, 0.56]} rotation={[Math.PI / 2, 0, 0]} scale={[0.7, 1, 0.7]}>
        <coneGeometry args={[0.1, 0.28, 8]} />
        <meshStandardMaterial color={animalCase.accentColor} roughness={0.5} />
      </mesh>

      {/* Eyes */}
      <mesh position={[-0.14, 0.12, 0.38]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial color="#12232e" roughness={0.3} />
      </mesh>
      <mesh position={[0.14, 0.12, 0.38]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial color="#12232e" roughness={0.3} />
      </mesh>

      {/* Dorsal fin */}
      <mesh position={[0, 0.46, -0.05]} rotation={[-0.2, 0, 0]} scale={[0.16, 1, 1]}>
        <coneGeometry args={[0.22, 0.34, 6]} />
        <meshStandardMaterial color="#ffd166" roughness={0.5} />
      </mesh>

      {/* Pectoral fin */}
      <mesh ref={pectoral} position={[0.14, -0.06, 0.18]} scale={[0.5, 0.1, 0.35]}>
        <sphereGeometry args={[0.28, 8, 8]} />
        <meshStandardMaterial color="#ffd166" roughness={0.5} transparent opacity={0.9} />
      </mesh>

      {/* Tail fin */}
      <group ref={tail} position={[0, 0, -0.5]}>
        <mesh position={[0, 0, -0.14]} rotation={[Math.PI / 2, 0, 0]} scale={[0.18, 1, 1]}>
          <coneGeometry args={[0.3, 0.34, 6]} />
          <meshStandardMaterial color="#ffd166" roughness={0.5} />
        </mesh>
      </group>

      {/* Buoyancy sling, shown once fitted — a soft belly band with floats */}
      {showDevice && (
        <group ref={sling} position={[0, -0.38, 0]}>
          <mesh scale={[0.42, 0.16, 0.7]}>
            <sphereGeometry args={[0.5, 10, 8]} />
            <meshStandardMaterial
              color="#8fd3f4"
              roughness={0.4}
              emissive="#2fb4c9"
              emissiveIntensity={0.45}
            />
          </mesh>
          <mesh position={[-0.2, 0.04, 0]}>
            <sphereGeometry args={[0.11, 10, 8]} />
            <meshStandardMaterial color="#d7f6f9" roughness={0.3} />
          </mesh>
          <mesh position={[0.2, 0.04, 0]}>
            <sphereGeometry args={[0.11, 10, 8]} />
            <meshStandardMaterial color="#d7f6f9" roughness={0.3} />
          </mesh>
        </group>
      )}
    </group>
  );
}
