import { useEffect } from 'react';
import { motion } from 'framer-motion';
import type { AnimalCase } from '../../types/animal';
import { AnimalCloseUp } from './AnimalCloseUp';

interface SwimTestProps {
  animalCase: AnimalCase;
  onComplete: () => void;
}

const TEST_DURATION_MS = 3200;

/** A short swimming test played immediately after a successful fit, before
 * the score is revealed. */
export function SwimTest({ animalCase, onComplete }: SwimTestProps) {
  useEffect(() => {
    const timer = setTimeout(onComplete, TEST_DURATION_MS);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mx-auto w-full max-w-3xl">
      <div className="h-[clamp(240px,40vh,400px)] w-full overflow-hidden rounded-3xl border border-white/15 shadow-2xl">
        <AnimalCloseUp animalCase={animalCase} swimming deviceFitted />
      </div>

      <div className="mt-5 rounded-2xl border border-emerald-300/30 bg-emerald-300/10 p-5 text-center">
        <p className="text-sm font-semibold text-emerald-200">
          Nice work! {animalCase.name} is taking a test swim…
        </p>
        <div className="mx-auto mt-3 h-1.5 w-56 overflow-hidden rounded-full bg-white/15">
          <motion.div
            className="h-full rounded-full bg-emerald-300"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: TEST_DURATION_MS / 1000, ease: 'linear' }}
          />
        </div>
      </div>
    </motion.div>
  );
}
