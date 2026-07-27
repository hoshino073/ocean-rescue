import { Canvas } from '@react-three/fiber';
import { Suspense, useState } from 'react';
import type { Group } from 'three';
import { SceneEnvironment } from './environment/SceneEnvironment';
import { AmbientFish } from './AmbientFish';
import { Bubbles3D } from './Bubbles3D';
import { CameraRig } from './CameraRig';
import { Animals } from './animals/Animals';
import { useQualitySettings } from '../../hooks/useQualitySettings';
import type { AnimalId } from '../../types/animal';
import type { Exhibit } from '../../types/exhibit';

interface AquariumSceneProps {
  exhibit: Exhibit;
  rescued: ReadonlySet<AnimalId>;
  selectedId: AnimalId | null;
  onSelect: (id: AnimalId) => void;
  onDeselect: () => void;
}

/** The 3D aquarium canvas. Lighting, water colour, environment, and wildlife
 * density all come from the current exhibit's theme. */
export function AquariumScene({
  exhibit,
  rescued,
  selectedId,
  onSelect,
  onDeselect,
}: AquariumSceneProps) {
  const [focusObject, setFocusObject] = useState<Group | null>(null);
  const quality = useQualitySettings();
  const { theme } = exhibit;

  // A density of 0 means no wild fish at all (the rehabilitation pool).
  const fishCount = Math.round(quality.fishCount * theme.fishDensity);

  return (
    <Canvas
      dpr={[1, quality.maxDpr]}
      camera={{ position: [0, 1.6, 9], fov: 50 }}
      gl={{ antialias: true, powerPreference: 'high-performance' }}
      onPointerMissed={onDeselect}
    >
      <color attach="background" args={[theme.waterColor]} />
      <fog attach="fog" args={[theme.waterColor, theme.fogNear, theme.fogFar]} />
      <hemisphereLight args={[theme.lightColor, '#20303a', 0.5]} />
      <ambientLight intensity={theme.ambientIntensity} color={theme.lightColor} />
      <directionalLight
        position={[4, 8, 4]}
        intensity={theme.directionalIntensity}
        color={theme.lightColor}
      />

      <CameraRig focusTarget={focusObject} stillIdle={quality.reducedMotion} />

      <Suspense fallback={null}>
        {/* Keying on the exhibit rebuilds props cleanly when the theme swaps. */}
        <SceneEnvironment key={exhibit.id} theme={theme} />
        {fishCount > 0 && <AmbientFish count={fishCount} muted={exhibit.isDamaged} />}
        <Bubbles3D count={quality.bubbleCount} />
        <Animals
          exhibitId={exhibit.id}
          rescued={rescued}
          selectedId={selectedId}
          onSelect={onSelect}
          onFocusObjectChange={setFocusObject}
        />
      </Suspense>
    </Canvas>
  );
}
