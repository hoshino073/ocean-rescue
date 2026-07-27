import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExhibitIcon } from './ExhibitIcon';
import type { Exhibit } from '../../types/exhibit';

interface ExhibitCardProps {
  exhibit: Exhibit;
  onClose: () => void;
}

/** Explains the current exhibit — what this place is, what is happening to it,
 * and what helps. Environmental content here is factual, unlike the fictional
 * animal cases. */
export function ExhibitCard({ exhibit, onClose }: ExhibitCardProps) {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  return (
    <motion.aside
      role="dialog"
      aria-label={`About the ${exhibit.name} exhibit`}
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      /* Bounded above the bottom bar so the exhibit tabs stay clickable. */
      className="pointer-events-auto absolute inset-x-3 top-32 bottom-[9.5rem] overflow-y-auto rounded-3xl border border-white/15 bg-abyss/90 p-6 shadow-2xl backdrop-blur-xl sm:inset-x-auto sm:left-6 sm:top-36 sm:w-[24rem]"
    >
      <div className="mb-4 flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-lagoon/20 text-lagoon">
            <ExhibitIcon exhibitId={exhibit.id} className="h-5 w-5" />
          </span>
          <div>
            <p className="text-xs tracking-[0.25em] text-lagoon uppercase">Exhibit</p>
            <h2 className="text-2xl font-bold text-foam">{exhibit.name}</h2>
            {exhibit.isDamaged && (
              <span className="mt-2 inline-block rounded-full border border-amber-300/40 bg-amber-300/10 px-2.5 py-0.5 text-xs text-amber-200">
                Needs help
              </span>
            )}
          </div>
        </div>
        <button
          onClick={onClose}
          aria-label="Close exhibit information"
          className="shrink-0 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-sm text-foam/80 transition-colors hover:bg-white/15"
        >
          Close
        </button>
      </div>

      <p className="mb-4 text-sm leading-relaxed text-foam/80">{exhibit.description}</p>

      <div className="rounded-2xl border border-lagoon/30 bg-lagoon/10 p-4">
        <p className="text-xs tracking-[0.2em] text-lagoon uppercase">What helps</p>
        <p className="mt-1 text-sm leading-relaxed text-foam/85">{exhibit.whatHelps}</p>
      </div>
    </motion.aside>
  );
}
