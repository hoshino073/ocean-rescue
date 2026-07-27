import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import type { Group } from 'three';
import { damp, headingFrom, shortestAngleTo, wander } from '../../utils/motion';

interface SimpleFishProps {
  seed: number;
  speed: number;
  color: string;
  scale: number;
  bounds: { x: number; y: number; z: number; centerY: number };
}

/** One small low-poly fish that roams the tank on a smooth noise path and
 * wiggles its tail. It faces wherever it is heading, so turns look intentional
 * rather than like a fish sliding around a circle. */
function SimpleFish({ seed, speed, color, scale, bounds }: SimpleFishProps) {
  const group = useRef<Group>(null);
  const tail = useRef<Group>(null);
  const time = useRef(seed * 5.3);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;

    time.current += delta * speed;
    const t = time.current;

    const position = wander(t, seed, bounds);
    g.position.set(position.x, position.y, position.z);

    const ahead = wander(t + 0.15, seed, bounds);
    const { yaw, pitch } = headingFrom(position, ahead);

    const ease = damp(3, delta);
    g.rotation.y += shortestAngleTo(g.rotation.y, yaw) * ease;
    g.rotation.x += (-pitch - g.rotation.x) * ease;

    if (tail.current) {
      tail.current.rotation.y = Math.sin(state.clock.elapsedTime * 9 + seed) * 0.5;
    }
  });

  return (
    <group ref={group} scale={scale}>
      {/* Body: a stretched teardrop pointing along +Z, the travel direction. */}
      <mesh scale={[0.55, 0.8, 1.5]}>
        <sphereGeometry args={[0.2, 10, 8]} />
        <meshStandardMaterial color={color} roughness={0.5} />
      </mesh>
      {/* Tail: an upright fan on its own pivot, so the sweep is unambiguous. */}
      <group ref={tail} position={[0, 0, -0.28]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]} scale={[0.12, 1, 1]}>
          <coneGeometry args={[0.15, 0.24, 4]} />
          <meshStandardMaterial color={color} roughness={0.5} />
        </mesh>
      </group>
    </group>
  );
}

const COLORS = ['#ffd166', '#ef476f', '#ffd6a5', '#06d6a0', '#8ecae6'];

interface AmbientFishProps {
  count?: number;
  /** Tint override so damaged exhibits can hold duller, sparser life. */
  muted?: boolean;
}

/** A loose school of ambient fish roaming the tank. */
export function AmbientFish({ count = 12, muted = false }: AmbientFishProps) {
  const fish = Array.from({ length: count }, (_, i) => ({
    seed: 2.7 + i * 3.9,
    speed: 0.7 + ((i * 11) % 6) / 10,
    color: muted ? '#9aa79c' : COLORS[i % COLORS.length],
    scale: 0.75 + ((i * 3) % 5) / 10,
    bounds: {
      x: 4 + (i % 4) * 0.8,
      y: 0.9 + (i % 3) * 0.3,
      z: 2 + (i % 3) * 0.7,
      centerY: -0.4 + ((i * 7) % 5) * 0.35,
    },
  }));

  return (
    <group>
      {fish.map((f, i) => (
        <SimpleFish key={i} {...f} />
      ))}
    </group>
  );
}
