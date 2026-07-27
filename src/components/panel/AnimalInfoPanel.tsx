import { useEffect } from 'react';
import { motion } from 'framer-motion';
import type { AnimalCase } from '../../types/animal';
import { Button } from '../common/Button';

interface AnimalInfoPanelProps {
  animalCase: AnimalCase;
  /** Previous best score, if this animal has already been helped. */
  bestScore?: number;
  onClose: () => void;
  onBeginFitting: () => void;
}

/** Slide-in panel describing an animal's fictional rehabilitation case, with
 * the entry point into the fitting activity. */
export function AnimalInfoPanel({
  animalCase,
  bestScore,
  onClose,
  onBeginFitting,
}: AnimalInfoPanelProps) {
  const device = animalCase.deviceOptions.find((d) => d.id === animalCase.correctDeviceId);

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
      aria-label={`${animalCase.name}, ${animalCase.speciesLabel} — rehabilitation case`}
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 40 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      /* Sits clear of both the top HUD and the bottom animal/exhibit bar, so
         those controls stay reachable while the panel is open. */
      className="pointer-events-auto absolute inset-x-3 bottom-[9.5rem] top-32 overflow-y-auto rounded-3xl border border-white/15 bg-abyss/85 p-6 shadow-2xl backdrop-blur-xl sm:left-auto sm:right-6 sm:top-28 sm:w-[26rem]"
    >
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs tracking-[0.25em] text-lagoon uppercase">Patient</p>
          <h2 className="text-2xl font-bold text-foam">{animalCase.name}</h2>
          <p className="text-sm text-foam/60">{animalCase.speciesLabel}</p>
        </div>
        <button
          onClick={onClose}
          aria-label="Close information panel"
          className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-sm text-foam/80 transition-colors hover:bg-white/15"
        >
          Close
        </button>
      </div>

      <Section title="What happened">{animalCase.injury}</Section>
      <Section title="How rehab helps">{animalCase.rehabStory}</Section>

      {device && (
        <div className="mb-5 rounded-2xl border border-lagoon/30 bg-lagoon/10 p-4">
          <p className="text-xs tracking-[0.2em] text-lagoon uppercase">Recommended device</p>
          <p className="mt-1 font-semibold text-foam">{device.name}</p>
          <p className="mt-1 text-sm leading-relaxed text-foam/70">{device.description}</p>
        </div>
      )}

      <Button onClick={onBeginFitting} className="w-full">
        {bestScore !== undefined ? 'Fit Again' : 'Begin Fitting'}
      </Button>

      {bestScore !== undefined && (
        <p className="mt-3 text-center text-xs text-emerald-200">
          Already helped — your best fit scored {bestScore}/100.
        </p>
      )}

      <p className="mt-4 text-xs leading-relaxed text-foam/45">
        This is a fictional case. The game simplifies real veterinary care, which
        involves a trained team, medical imaging, and custom-built devices.
      </p>
    </motion.aside>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <h3 className="mb-1 text-sm font-semibold text-lagoon">{title}</h3>
      <p className="text-sm leading-relaxed text-foam/80">{children}</p>
    </div>
  );
}
