import { useEffect } from 'react';

interface KeyboardNudgeOptions {
  enabled: boolean;
  onNudge: (dx: number, dy: number) => void;
  onRotate: (direction: 1 | -1) => void;
  onCheckFit: () => void;
}

/** Arrow keys move the device, [ and ] rotate it, Enter checks the fit.
 * Ignored while the player is typing in a field. */
export function useKeyboardNudge({ enabled, onNudge, onRotate, onCheckFit }: KeyboardNudgeOptions) {
  useEffect(() => {
    if (!enabled) return;

    const handler = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) return;

      switch (event.key) {
        case 'ArrowUp':
          onNudge(0, -1);
          break;
        case 'ArrowDown':
          onNudge(0, 1);
          break;
        case 'ArrowLeft':
          onNudge(-1, 0);
          break;
        case 'ArrowRight':
          onNudge(1, 0);
          break;
        case '[':
          onRotate(-1);
          break;
        case ']':
          onRotate(1);
          break;
        case 'Enter':
          // Let Enter activate a focused button instead of double-firing.
          if (target?.tagName === 'BUTTON') return;
          onCheckFit();
          break;
        default:
          return;
      }
      event.preventDefault();
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [enabled, onNudge, onRotate, onCheckFit]);
}
