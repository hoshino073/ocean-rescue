import type { ProstheticDevice } from '../../types/animal';

interface AlignmentGuidesProps {
  device: ProstheticDevice;
  /** True once the device is inside the snap radius. */
  nearTarget: boolean;
  /** True once the device's angle is within tolerance. */
  angleOk: boolean;
}

/** The glowing target ring the player aims for, plus a tick showing the angle
 * the device should end up at. */
export function AlignmentGuides({ device, nearTarget, angleOk }: AlignmentGuidesProps) {
  return (
    <div
      className="pointer-events-none absolute"
      style={{
        left: `${device.attachPoint.x * 100}%`,
        top: `${device.attachPoint.y * 100}%`,
        transform: 'translate(-50%, -50%)',
      }}
      aria-hidden="true"
    >
      {/* Snap radius ring */}
      <div
        className={`rounded-full border-2 border-dashed transition-colors duration-200 ${
          nearTarget ? 'border-emerald-300/90 bg-emerald-300/15' : 'border-lagoon/70 bg-lagoon/10'
        }`}
        style={{ width: 132, height: 132, marginLeft: -66, marginTop: -66 }}
      />

      {/* Centre dot */}
      <div
        className={`absolute rounded-full ${nearTarget ? 'bg-emerald-300' : 'bg-lagoon'}`}
        style={{ width: 10, height: 10, left: -5, top: -5 }}
      />

      {/* Target-angle tick, pointing the way the device should face */}
      <div
        className="absolute origin-left"
        style={{
          left: 0,
          top: 0,
          transform: `rotate(${device.correctRotationDeg}deg)`,
        }}
      >
        <div
          className={`h-1 rounded-full transition-colors duration-200 ${
            angleOk ? 'bg-emerald-300' : 'bg-lagoon/80'
          }`}
          style={{ width: 66, marginTop: -2 }}
        />
      </div>
    </div>
  );
}
