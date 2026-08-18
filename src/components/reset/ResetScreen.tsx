import { motion } from 'framer-motion';
import { ANIMALS, ANIMAL_ORDER } from '../../data/animals';
import { useProgressStore, useRescued } from '../../store/useProgressStore';
import { Button } from '../common/Button';
import { Bubbles } from '../common/Bubbles';

interface ResetScreenProps {
  /** Clear every saved score and return to the start of the experience. */
  onConfirm: () => void;
  /** Leave progress untouched and go back where the player came from. */
  onCancel: () => void;
}

/** Confirmation screen for starting the whole experience over. It recaps the
 * progress that is about to be cleared, so wiping six saved fittings is always
 * a deliberate choice rather than a mis-tap. */
export function ResetScreen({ onConfirm, onCancel }: ResetScreenProps) {
  const bestScores = useProgressStore((s) => s.bestScores);
  const rescued = useRescued();
  const hasProgress = rescued.size > 0;

  return (
    <div className="relative min-h-screen w-full overflow-y-auto bg-gradient-to-b from-deep via-ocean/60 to-abyss">
      <div className="pointer-events-none absolute inset-0">
        <Bubbles count={18} />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-2xl flex-col items-center justify-center px-6 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="w-full rounded-[1.75rem] border border-white/15 bg-abyss/60 px-6 py-10 shadow-2xl backdrop-blur-xl sm:px-10"
        >
          <p className="mb-3 text-5xl" aria-hidden="true">
            🌊
          </p>
          <p className="mb-2 text-xs font-medium tracking-[0.35em] text-lagoon uppercase">
            Start over
          </p>
          <h1 className="mb-4 bg-gradient-to-b from-foam to-lagoon bg-clip-text text-3xl font-bold text-transparent sm:text-4xl">
            Release everyone back to the ocean?
          </h1>

          {hasProgress ? (
            <>
              <p className="mx-auto mb-7 max-w-lg text-balance text-base leading-relaxed text-foam/80">
                This clears your saved scores for{' '}
                <span className="font-semibold text-lagoon">
                  {rescued.size} of {ANIMAL_ORDER.length}
                </span>{' '}
                animals and sends every exhibit back to how it started. You can fit all
                the devices again from scratch.
              </p>

              <ul className="mb-8 grid grid-cols-2 gap-2 sm:grid-cols-3">
                {ANIMAL_ORDER.map((id) => {
                  const best = bestScores[id];
                  const helped = best !== undefined;

                  return (
                    <li
                      key={id}
                      className={`rounded-2xl border px-3 py-2.5 ${
                        helped
                          ? 'border-amber-300/30 bg-amber-300/10'
                          : 'border-white/10 bg-white/5'
                      }`}
                    >
                      <span className="block text-sm font-semibold text-foam">
                        {ANIMALS[id].name}
                      </span>
                      <span
                        className={`mt-0.5 block text-xs ${
                          helped ? 'text-amber-100/85' : 'text-foam/45'
                        }`}
                      >
                        {helped ? `Best ${best} · will clear` : 'Not yet helped'}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </>
          ) : (
            <p className="mx-auto mb-8 max-w-lg text-balance text-base leading-relaxed text-foam/80">
              There's no saved progress to clear yet — every animal is still waiting for
              a fitting. You can head back and start helping them.
            </p>
          )}

          <div className="flex flex-wrap justify-center gap-3">
            {hasProgress && (
              <Button onClick={onConfirm}>Clear progress and start again</Button>
            )}
            <Button variant="ghost" onClick={onCancel}>
              {hasProgress ? 'Keep my progress' : 'Go back'}
            </Button>
          </div>

          <p className="mx-auto mt-7 max-w-md text-xs leading-relaxed text-foam/50">
            Progress is stored only in this browser, so resetting here affects nothing
            else.{hasProgress && " Once cleared, it can't be brought back."}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
