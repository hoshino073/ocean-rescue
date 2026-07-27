interface RockConfig {
  position: [number, number, number];
  scale: [number, number, number];
  rotation: [number, number, number];
}

const ROCKS: RockConfig[] = [
  { position: [-5.5, -1.9, -2], scale: [1.4, 1, 1.2], rotation: [0.3, 0.2, 0.1] },
  { position: [-4.6, -2, -1], scale: [0.8, 0.6, 0.8], rotation: [0.1, 1.1, 0.4] },
  { position: [5.8, -1.85, -1.5], scale: [1.6, 1.1, 1.3], rotation: [0.2, 0.6, 0.2] },
  { position: [4.7, -2, -0.5], scale: [0.9, 0.7, 0.9], rotation: [0.4, 0.3, 0.6] },
  { position: [0.5, -2, -5], scale: [1.2, 0.9, 1], rotation: [0.1, 0.9, 0.3] },
];

/** A handful of scattered low-poly rocks anchored to the seafloor. */
export function Rocks({ color }: { color: string }) {
  return (
    <group>
      {ROCKS.map((rock, i) => (
        <mesh key={i} position={rock.position} scale={rock.scale} rotation={rock.rotation}>
          <icosahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color={color} roughness={0.9} flatShading />
        </mesh>
      ))}
    </group>
  );
}
