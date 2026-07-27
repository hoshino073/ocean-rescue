import { Button } from '../common/Button';

interface FittingControlsProps {
  onNudge: (dx: number, dy: number) => void;
  onRotate: (direction: 1 | -1) => void;
  onCheckFit: () => void;
}

const ARROW_CLASS =
  'flex h-11 w-11 items-center justify-center rounded-xl border border-white/20 bg-white/5 text-lg text-foam transition-colors hover:bg-white/20';

/** Button-based alternative to dragging, so the activity is completable
 * without a pointer. These write the same store state the drag does. */
export function FittingControls({ onNudge, onRotate, onCheckFit }: FittingControlsProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-6">
      {/* Directional pad */}
      <div className="flex flex-col items-center gap-2">
        <p className="text-xs tracking-[0.2em] text-foam/60 uppercase">Move</p>
        <div className="grid grid-cols-3 gap-1">
          <span />
          <button className={ARROW_CLASS} onClick={() => onNudge(0, -1)} aria-label="Move device up">
            ↑
          </button>
          <span />
          <button className={ARROW_CLASS} onClick={() => onNudge(-1, 0)} aria-label="Move device left">
            ←
          </button>
          <span />
          <button className={ARROW_CLASS} onClick={() => onNudge(1, 0)} aria-label="Move device right">
            →
          </button>
          <span />
          <button className={ARROW_CLASS} onClick={() => onNudge(0, 1)} aria-label="Move device down">
            ↓
          </button>
          <span />
        </div>
      </div>

      {/* Rotation */}
      <div className="flex flex-col items-center gap-2">
        <p className="text-xs tracking-[0.2em] text-foam/60 uppercase">Rotate</p>
        <div className="flex gap-1">
          <button
            className={ARROW_CLASS}
            onClick={() => onRotate(-1)}
            aria-label="Rotate device counter-clockwise"
          >
            ↺
          </button>
          <button className={ARROW_CLASS} onClick={() => onRotate(1)} aria-label="Rotate device clockwise">
            ↻
          </button>
        </div>
      </div>

      <Button onClick={onCheckFit}>Check Fit</Button>
    </div>
  );
}
