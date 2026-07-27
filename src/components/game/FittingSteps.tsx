import type { GamePhase } from '../../types/game';

interface FittingStepsProps {
  phase: GamePhase;
}

const STEPS: { phase: GamePhase; label: string }[] = [
  { phase: 'selecting', label: 'Choose device' },
  { phase: 'positioning', label: 'Fit it in place' },
  { phase: 'testing', label: 'Swim test' },
];

/** A plain-language "you are here" tracker for the fitting activity, so a
 * first-time player always knows what step they're on and what's next. */
export function FittingSteps({ phase }: FittingStepsProps) {
  // Results counts as "done" for every step; testing and positioning are
  // both mid-flow steps in progress order.
  const stepIndex = STEPS.findIndex((s) => s.phase === phase);
  const currentIndex = phase === 'results' ? STEPS.length : stepIndex;

  return (
    <ol className="mb-5 flex items-center justify-center gap-2 sm:gap-4">
      {STEPS.map((step, i) => {
        const done = i < currentIndex;
        const active = i === currentIndex;

        return (
          <li key={step.phase} className="flex items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-2">
              <span
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                  done
                    ? 'bg-emerald-300 text-abyss'
                    : active
                      ? 'bg-lagoon text-abyss'
                      : 'bg-white/10 text-foam/50'
                }`}
              >
                {done ? '✓' : i + 1}
              </span>
              <span
                className={`hidden text-sm sm:inline ${
                  active ? 'font-semibold text-foam' : 'text-foam/55'
                }`}
              >
                {step.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <span aria-hidden="true" className="h-px w-4 bg-white/15 sm:w-8" />
            )}
          </li>
        );
      })}
    </ol>
  );
}
