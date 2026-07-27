/** The sandy tank bottom. A single flattened cylinder keeps the geometry cheap. */
export function Seafloor({ color }: { color: string }) {
  return (
    <mesh position={[0, -2.4, 0]}>
      <cylinderGeometry args={[19, 19.5, 0.6, 40]} />
      <meshStandardMaterial color={color} roughness={1} />
    </mesh>
  );
}
