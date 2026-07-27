import { motion } from 'framer-motion';
import { ANIMALS, ANIMAL_ORDER } from '../../data/animals';
import { useProgressStore } from '../../store/useProgressStore';
import { Button } from '../common/Button';
import { HomeIcon } from '../common/HomeIcon';
import { Bubbles } from '../common/Bubbles';

interface CelebrationScreenProps {
  onViewRehabBay: () => void;
  onGoHome: () => void;
}

/** Shown once every animal has been fitted at least once — a simple thank-you
 * screen that recaps the whole team and their best scores. */
export function CelebrationScreen({ onViewRehabBay, onGoHome }: CelebrationScreenProps) {
  const bestScores = useProgressStore((s) => s.bestScores);
  const average = Math.round(
    ANIMAL_ORDER.reduce((sum, id) => sum + (bestScores[id] ?? 0), 0) / ANIMAL_ORDER.length,
  );

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-deep via-ocean/60 to-abyss">
      <div className="pointer-events-none absolute inset-0">
        <Bubbles count={26} />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-3xl flex-col items-center justify-center px-6 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="w-full rounded-[1.75rem] border border-white/15 bg-abyss/60 px-6 py-10 shadow-2xl backdrop-blur-xl sm:px-10"
        >
          <p className="mb-3 text-5xl">🎉</p>
          <p className="mb-2 text-xs font-medium tracking-[0.35em] text-lagoon uppercase">
            Every animal rescued
          </p>
          <h1 className="mb-4 bg-gradient-to-b from-foam to-lagoon bg-clip-text text-3xl font-bold text-transparent sm:text-4xl">
            The whole team is back in the water
          </h1>
          <p className="mx-auto mb-8 max-w-xl text-balance text-base leading-relaxed text-foam/80">
            You fitted a device for all {ANIMAL_ORDER.length} animals in Ocean Rescue. They're all
            recovering together in the Rehabilitation Bay now — average fitting score{' '}
            <span className="font-semibold text-lagoon">{average}/100</span>.
          </p>

          <ul className="mb-9 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {ANIMAL_ORDER.map((id) => {
              const animal = ANIMALS[id];
              return (
                <li
                  key={id}
                  className="rounded-2xl border border-emerald-300/25 bg-emerald-300/10 px-3 py-3"
                >
                  <span className="mb-1 block text-emerald-300" aria-hidden="true">
                    ✓
                  </span>
                  <span className="block text-sm font-semibold text-foam">{animal.name}</span>
                  <span className="block text-xs text-foam/60">{animal.speciesLabel}</span>
                  <span className="mt-1 block text-xs font-medium text-lagoon">
                    Best {bestScores[id]}
                  </span>
                </li>
              );
            })}
          </ul>

          <div className="flex flex-wrap justify-center gap-3">
            <Button onClick={onViewRehabBay}>Visit the Rehabilitation Bay</Button>
            <Button variant="ghost" onClick={onGoHome}>
              <span className="flex items-center gap-1.5">
                <HomeIcon />
                Home
              </span>
            </Button>
          </div>

          <p className="mx-auto mt-7 max-w-md text-xs leading-relaxed text-foam/50">
            Every animal and injury in Ocean Rescue is fictional, created to teach how
            supportive devices can help wildlife during recovery.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
