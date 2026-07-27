interface CoralClusterProps {
  position: [number, number, number];
  color: string;
  scale?: number;
  /** Bleached clusters sit lower and tilt, reading as brittle and weakened. */
  tilt?: number;
}

/** One coral cluster: a rounded base with a few branch cones fanning outward.
 * Purely procedural primitives, no external assets. */
function CoralCluster({ position, color, scale = 1, tilt = 0 }: CoralClusterProps) {
  const branches = [
    { pos: [0, 0.6, 0] as const, rot: [0, 0, 0] as const, size: 0.9 },
    { pos: [0.35, 0.4, 0.1] as const, rot: [0, 0, -0.5] as const, size: 0.6 },
    { pos: [-0.3, 0.45, -0.15] as const, rot: [0, 0, 0.45] as const, size: 0.65 },
    { pos: [0.1, 0.3, 0.35] as const, rot: [0.5, 0, 0.1] as const, size: 0.5 },
  ];

  return (
    <group position={position} scale={scale} rotation={[tilt * 0.4, 0, tilt]}>
      <mesh>
        <sphereGeometry args={[0.4, 10, 8]} />
        <meshStandardMaterial color={color} roughness={0.7} />
      </mesh>
      {branches.map((b, i) => (
        <mesh key={i} position={b.pos} rotation={b.rot}>
          <coneGeometry args={[0.16, b.size, 8]} />
          <meshStandardMaterial color={color} roughness={0.7} />
        </mesh>
      ))}
    </group>
  );
}

const LAYOUT: { position: [number, number, number]; scale: number }[] = [
  { position: [-2.2, -2.1, -3], scale: 1.1 },
  { position: [-1.4, -2.1, -3.4], scale: 0.75 },
  { position: [2.6, -2.1, -3.2], scale: 1 },
  { position: [1.8, -2.1, -3.6], scale: 0.6 },
  { position: [0, -2.1, -4.2], scale: 0.85 },
  { position: [-3.6, -2.1, -2.4], scale: 0.7 },
  { position: [3.8, -2.1, -2.6], scale: 0.8 },
];

interface CoralProps {
  /** Colours to cycle through. An empty palette renders no coral at all. */
  palette: string[];
  /** Tilts and lowers the clusters, for bleached/damaged exhibits. */
  weakened?: boolean;
}

/** All coral clusters in the tank, coloured by the current exhibit theme. */
export function Coral({ palette, weakened = false }: CoralProps) {
  if (palette.length === 0) return null;

  return (
    <group>
      {LAYOUT.map((c, i) => (
        <CoralCluster
          key={i}
          position={c.position}
          scale={c.scale * (weakened ? 0.85 : 1)}
          color={palette[i % palette.length]}
          tilt={weakened ? (i % 2 === 0 ? 0.18 : -0.14) : 0}
        />
      ))}
    </group>
  );
}
