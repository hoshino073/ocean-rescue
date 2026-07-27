import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import type { AnimalCase } from '../../types/animal';
import { Button } from '../common/Button';
import { AnimalCloseUp } from '../game/AnimalCloseUp';
import { useAllRescued, useProgressStore } from '../../store/useProgressStore';

interface ResultsScreenProps {
  animalCase: AnimalCase;
  score: number;
  attempts: number;
  onRetry: () => void;
  onChooseAnother: () => void;
  /** Every animal has now been helped at least once. */
  onAllRescued: () => void;
}

function gradeMessage(score: number): string {
  if (score >= 90) return 'Outstanding fit — textbook alignment.';
  if (score >= 70) return 'Strong fit. The device is comfortable and secure.';
  return 'Good work. The device is on and the swim test went well.';
}

/** Post-fitting summary: the animal swimming with its device, the score, how
 * it's doing, and one short educational fact. Once every animal has been
 * helped, this is also where the celebration is offered. */
export function ResultsScreen({
  animalCase,
  score,
  attempts,
  onRetry,
  onChooseAnother,
  onAllRescued,
}: ResultsScreenProps) {
  const recordScore = useProgressStore((s) => s.recordScore);
  const [isNewBest, setIsNewBest] = useState(false);
  const recorded = useRef(false);
  const allRescued = useAllRescued();

  // Save the result once per completed fitting, not on every re-render.
  useEffect(() => {
    if (recorded.current) return;
    recorded.current = true;
    setIsNewBest(recordScore(animalCase.id, score));
  }, [animalCase.id, score, recordScore]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto w-full max-w-3xl"
    >
      <div className="mb-5 h-[clamp(200px,32vh,320px)] w-full overflow-hidden rounded-3xl border border-white/15 shadow-2xl">
        <AnimalCloseUp animalCase={animalCase} swimming deviceFitted />
      </div>

      <div className="rounded-3xl border border-white/15 bg-abyss/70 p-6 backdrop-blur-xl">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs tracking-[0.25em] text-lagoon uppercase">Fitting complete</p>
            <h2 className="text-2xl font-bold text-foam">
              {animalCase.name} is swimming again
            </h2>
            <p className="mt-1 text-sm text-foam/70">{gradeMessage(score)}</p>
          </div>
          <div className="text-right">
            {isNewBest && (
              <p className="mb-1 inline-block rounded-full border border-emerald-300/40 bg-emerald-300/10 px-2.5 py-0.5 text-xs font-medium text-emerald-200">
                New personal best
              </p>
            )}
            <p className="text-5xl font-bold text-lagoon">{score}</p>
            <p className="text-xs text-foam/60">out of 100</p>
            <p className="mt-1 text-xs text-foam/50">
              {attempts} {attempts === 1 ? 'attempt' : 'attempts'}
            </p>
          </div>
        </div>

        <div className="mb-4 rounded-2xl border border-emerald-300/25 bg-emerald-300/10 p-4">
          <p className="text-xs tracking-[0.2em] text-emerald-200 uppercase">How they're doing</p>
          <p className="mt-1 text-sm leading-relaxed text-foam/85">{animalCase.recoveredNote}</p>
          <p className="mt-2 text-xs text-foam/55">
            {animalCase.name} has moved to the Rehabilitation Bay to keep recovering.
          </p>
        </div>

        <div className="mb-6 rounded-2xl border border-lagoon/30 bg-lagoon/10 p-4">
          <p className="text-xs tracking-[0.2em] text-lagoon uppercase">Did you know?</p>
          <p className="mt-1 text-sm leading-relaxed text-foam/85">{animalCase.educationalFact}</p>
        </div>

        {allRescued ? (
          <div className="rounded-2xl border border-amber-300/30 bg-amber-300/10 p-4">
            <p className="mb-3 text-sm font-semibold text-amber-100">
              🎉 You've now helped every animal in Ocean Rescue!
            </p>
            <div className="flex flex-wrap gap-3">
              <Button onClick={onAllRescued}>See the celebration</Button>
              <Button variant="ghost" onClick={onRetry}>
                Try Again
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap gap-3">
            <Button onClick={onChooseAnother}>Help Another Animal</Button>
            <Button variant="ghost" onClick={onRetry}>
              Try Again
            </Button>
          </div>
        )}

        <p className="mt-5 text-xs leading-relaxed text-foam/45">
          Real prosthetics for marine animals are designed by veterinary teams over
          weeks or months. This activity is a simplified, fictional simulation.
        </p>
      </div>
    </motion.div>
  );
}
