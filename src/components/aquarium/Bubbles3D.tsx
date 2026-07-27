import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { InstancedMesh, Object3D } from 'three';
import { fbmSin } from '../../utils/motion';

interface BubbleSeed {
  x: number;
  z: number;
  baseY: number;
  speed: number;
  wobble: number;
  scale: number;
  seed: number;
}

interface Bubbles3DProps {
  count?: number;
}

/** A field of rising bubbles rendered as one InstancedMesh — a single draw
 * call regardless of count. Each bubble drifts on its own noise offsets, so
 * the field looks like it is being pushed around by the water rather than
 * marching straight up in formation. */
export function Bubbles3D({ count = 30 }: Bubbles3DProps) {
  const meshRef = useRef<InstancedMesh>(null);
  const dummy = useMemo(() => new Object3D(), []);

  const seeds = useMemo<BubbleSeed[]>(
    () =>
      Array.from({ length: count }, (_, i) => ({
        x: (Math.sin(i * 12.9) * 0.5 + 0.5) * 16 - 8,
        z: (Math.cos(i * 7.3) * 0.5 + 0.5) * 6 - 5,
        baseY: (i / count) * 8,
        speed: 0.4 + ((i * 13) % 10) / 20,
        wobble: 0.25 + (i % 5) * 0.12,
        scale: 0.04 + ((i * 37) % 10) / 100,
        seed: i * 4.7,
      })),
    [count],
  );

  useFrame((state) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const t = state.clock.elapsedTime;

    seeds.forEach((b, i) => {
      // Rise steadily, but drift sideways and fore/aft on separate noise.
      const y = ((b.baseY + t * b.speed) % 8) - 2.4;
      const x = b.x + fbmSin(t * 0.6, b.seed, 2) * b.wobble;
      const z = b.z + fbmSin(t * 0.5, b.seed + 30, 2) * b.wobble * 0.7;

      dummy.position.set(x, y, z);
      dummy.scale.setScalar(b.scale);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    });

    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshStandardMaterial color="#d7f6f9" transparent opacity={0.45} roughness={0.1} />
    </instancedMesh>
  );
}
