import { useEffect, useState } from 'react';

export interface QualitySettings {
  /** Fewer particles and fish on small screens. */
  fishCount: number;
  bubbleCount: number;
  /** Device pixel ratio ceiling for the 3D canvas. */
  maxDpr: number;
  /** True when the visitor asked the OS to reduce motion. */
  reducedMotion: boolean;
}

function read(): QualitySettings {
  const small = window.matchMedia('(max-width: 768px)').matches;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return {
    fishCount: small ? 6 : 12,
    bubbleCount: small ? 14 : 28,
    maxDpr: small ? 1.25 : 1.5,
    reducedMotion,
  };
}

/** Scales the 3D scene down on small screens and respects reduced-motion. */
export function useQualitySettings(): QualitySettings {
  const [settings, setSettings] = useState<QualitySettings>(read);

  useEffect(() => {
    const sizeQuery = window.matchMedia('(max-width: 768px)');
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setSettings(read());

    sizeQuery.addEventListener('change', update);
    motionQuery.addEventListener('change', update);
    return () => {
      sizeQuery.removeEventListener('change', update);
      motionQuery.removeEventListener('change', update);
    };
  }, []);

  return settings;
}
