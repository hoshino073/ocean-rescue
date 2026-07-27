import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Vector3 } from 'three';
import type { Object3D } from 'three';
import { damp, fbmSin } from '../../utils/motion';

interface CameraRigProps {
  /** When set, the camera eases in to frame this object instead of idling. */
  focusTarget: Object3D | null;
  /** Holds the camera still while idling, for reduced-motion visitors. */
  stillIdle?: boolean;
}

const idlePos = new Vector3();
const idleLook = new Vector3();
const desiredPos = new Vector3();
const desiredLook = new Vector3();
const offset = new Vector3();

/** Drives the camera: a slow, wandering idle drift over the tank, easing to a
 * close-up when an animal is selected and back out when deselected. The idle
 * path uses layered noise so it never retraces the same arc. */
export function CameraRig({ focusTarget, stillIdle = false }: CameraRigProps) {
  const smoothedLook = useRef(new Vector3(0, 0.4, 0));

  useFrame((state, delta) => {
    const t = stillIdle ? 0 : state.clock.elapsedTime;

    idlePos.set(
      fbmSin(t * 0.12, 1.4, 2) * 2.4,
      1.6 + fbmSin(t * 0.09, 6.2, 2) * 0.45,
      9 + fbmSin(t * 0.07, 11.8, 2) * 0.8,
    );
    // Let the aim point roam a little too, so the framing keeps changing.
    idleLook.set(fbmSin(t * 0.06, 17.3, 2) * 0.9, 0.4 + fbmSin(t * 0.05, 22.1, 2) * 0.3, 0);

    if (focusTarget) {
      // Sit slightly above and in front of the animal, on the camera's side.
      focusTarget.getWorldPosition(desiredLook);
      offset.copy(desiredLook).setY(0);
      if (offset.lengthSq() < 1e-4) offset.set(0, 0, 1);
      offset.normalize().multiplyScalar(5.4);
      desiredPos.set(desiredLook.x + offset.x, desiredLook.y + 1.4, desiredLook.z + offset.z);
    } else {
      desiredPos.copy(idlePos);
      desiredLook.copy(idleLook);
    }

    const ease = damp(2.2, delta);
    state.camera.position.lerp(desiredPos, ease);
    smoothedLook.current.lerp(desiredLook, ease);
    state.camera.lookAt(smoothedLook.current);
  });

  return null;
}
