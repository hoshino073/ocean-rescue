import { useRef } from 'react';
import type { PointerEvent as ReactPointerEvent } from 'react';
import type { AnimalCase, ProstheticDevice } from '../../types/animal';
import { AnimalCloseUp } from './AnimalCloseUp';
import { AlignmentGuides } from './AlignmentGuides';
import { DeviceIcon } from './DeviceIcon';

interface FittingStageProps {
  animalCase: AnimalCase;
  device: ProstheticDevice;
  position: { x: number; y: number };
  rotationDeg: number;
  nearTarget: boolean;
  angleOk: boolean;
  onPositionChange: (position: { x: number; y: number }) => void;
}

/** The play area: a fixed 3D close-up of the animal with a draggable device
 * layered on top. Dragging writes the same normalized coordinates the
 * keyboard controls do, so both inputs are equivalent. */
export function FittingStage({
  animalCase,
  device,
  position,
  rotationDeg,
  nearTarget,
  angleOk,
  onPositionChange,
}: FittingStageProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const updateFromPointer = (event: ReactPointerEvent<HTMLElement>) => {
    const stage = stageRef.current;
    if (!stage) return;
    const rect = stage.getBoundingClientRect();
    onPositionChange({
      x: (event.clientX - rect.left) / rect.width,
      y: (event.clientY - rect.top) / rect.height,
    });
  };

  // The fixed aspect ratio keeps normalized attach points lined up with the
  // 3D model at every viewport size.
  return (
    <div
      ref={stageRef}
      style={{ maxWidth: 'calc(48vh * 1.6)' }}
      className="relative mx-auto aspect-[16/10] w-full touch-none overflow-hidden rounded-3xl border border-white/15 bg-deep shadow-2xl"
    >
      <AnimalCloseUp animalCase={animalCase} />

      <AlignmentGuides device={device} nearTarget={nearTarget} angleOk={angleOk} />

      {/* Draggable device */}
      <button
        type="button"
        aria-label={`${device.name} — drag to position, or use the controls below`}
        onPointerDown={(e) => {
          dragging.current = true;
          e.currentTarget.setPointerCapture(e.pointerId);
          updateFromPointer(e);
        }}
        onPointerMove={(e) => {
          if (dragging.current) updateFromPointer(e);
        }}
        onPointerUp={(e) => {
          dragging.current = false;
          e.currentTarget.releasePointerCapture(e.pointerId);
        }}
        onPointerCancel={() => {
          dragging.current = false;
        }}
        className="absolute cursor-grab touch-none active:cursor-grabbing"
        style={{
          left: `${position.x * 100}%`,
          top: `${position.y * 100}%`,
          transform: `translate(-50%, -50%) rotate(${rotationDeg}deg)`,
        }}
      >
        <span
          className={`flex h-24 w-24 items-center justify-center rounded-2xl border-2 backdrop-blur-sm transition-colors ${
            nearTarget && angleOk
              ? 'border-emerald-300 bg-emerald-300/25 text-emerald-100'
              : 'border-lagoon/70 bg-abyss/50 text-lagoon'
          }`}
        >
          <DeviceIcon deviceId={device.id} className="h-16 w-16" />
        </span>
      </button>
    </div>
  );
}
