import { Bubbles } from '../common/Bubbles';
import { LightRays } from './LightRays';
import { FishSilhouette } from './FishSilhouette';

/** Full-screen animated ocean backdrop for the home screen: a gradient
 * "water column", light rays, rising bubbles, and drifting fish silhouettes.
 * Pure DOM/CSS/SVG — no 3D canvas — so the home screen loads instantly. */
export function OceanIntro() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-b from-deep via-ocean to-abyss">
      <LightRays />
      <FishSilhouette top="18%" duration={26} delay={0} scale={1.1} />
      <FishSilhouette top="62%" duration={34} delay={4} scale={0.8} flip />
      <FishSilhouette top="40%" duration={22} delay={9} scale={1.4} />
      <FishSilhouette top="78%" duration={30} delay={2} scale={0.9} />
      <Bubbles count={20} />
      <div className="absolute inset-0 bg-gradient-to-t from-abyss via-transparent to-transparent" />
    </div>
  );
}
