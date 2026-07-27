import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AquariumScene } from './AquariumScene';
import { LightRays } from '../home/LightRays';
import { Button } from '../common/Button';
import { HomeIcon } from '../common/HomeIcon';
import { AnimalInfoPanel } from '../panel/AnimalInfoPanel';
import { ExhibitSwitcher } from './ExhibitSwitcher';
import { ExhibitCard } from './ExhibitCard';
import { ExhibitIcon } from './ExhibitIcon';
import { ANIMALS, ANIMAL_ORDER, animalsInExhibit } from '../../data/animals';
import { EXHIBITS } from '../../data/exhibits';
import { useProgressStore, useRescued } from '../../store/useProgressStore';
import type { AnimalId } from '../../types/animal';
import type { ExhibitId } from '../../types/exhibit';

interface AquariumScreenProps {
  exhibitId: ExhibitId;
  onExhibitChange: (id: ExhibitId) => void;
  selectedId: AnimalId | null;
  onSelect: (id: AnimalId) => void;
  onDeselect: () => void;
  onBeginFitting: (id: AnimalId) => void;
  onBack: () => void;
}

/** The main aquarium screen: the 3D exhibit, a HUD, the exhibit switcher, and
 * the animal info panel. */
export function AquariumScreen({
  exhibitId,
  onExhibitChange,
  selectedId,
  onSelect,
  onDeselect,
  onBeginFitting,
  onBack,
}: AquariumScreenProps) {
  const [showExhibitCard, setShowExhibitCard] = useState(false);
  const [fading, setFading] = useState(false);
  const bestScores = useProgressStore((s) => s.bestScores);
  const rescued = useRescued();

  const exhibit = EXHIBITS[exhibitId];
  // Animals move to the Rehabilitation Bay once they've been helped, so this
  // list already reflects who is currently here — not just who started here.
  const residents = animalsInExhibit(exhibitId, rescued);

  // Brief crossfade when the exhibit changes, so the water colour swap reads
  // as moving between rooms rather than a jump cut.
  useEffect(() => {
    setFading(true);
    const timer = setTimeout(() => setFading(false), 260);
    return () => clearTimeout(timer);
  }, [exhibitId]);

  const changeExhibit = (id: ExhibitId) => {
    if (id === exhibitId) return;
    onDeselect();
    setShowExhibitCard(false);
    onExhibitChange(id);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-abyss">
      <AquariumScene
        exhibit={exhibit}
        rescued={rescued}
        selectedId={selectedId}
        onSelect={onSelect}
        onDeselect={onDeselect}
      />

      <div className="pointer-events-none absolute inset-0">
        <LightRays />
      </div>

      {/* Exhibit crossfade veil */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{ background: exhibit.theme.waterColor }}
        animate={{ opacity: fading ? 1 : 0 }}
        transition={{ duration: 0.26, ease: 'easeInOut' }}
      />

      {/* Top HUD */}
      <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-4 sm:p-6">
        <div className="pointer-events-auto flex max-w-[70%] items-start gap-3 rounded-2xl border border-white/15 bg-abyss/70 px-4 py-3 backdrop-blur-md">
          <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-lagoon/20 text-lagoon">
            <ExhibitIcon exhibitId={exhibitId} className="h-[18px] w-[18px]" />
          </span>
          <div>
            <p className="text-xs tracking-[0.25em] text-lagoon uppercase">{exhibit.name}</p>
            <p className="text-sm text-foam/80">{exhibit.summary}</p>
            <button
              onClick={() => setShowExhibitCard((v) => !v)}
              className="mt-1 text-xs font-medium text-lagoon underline underline-offset-2 transition-colors hover:text-foam"
            >
              {showExhibitCard ? 'Hide details' : 'Learn more'}
            </button>
          </div>
        </div>

        <div className="pointer-events-auto flex items-center gap-2">
          <span className="hidden items-center gap-1.5 rounded-full border border-white/15 bg-abyss/70 px-3 py-1.5 text-xs text-foam/80 backdrop-blur-md sm:flex">
            <span aria-hidden="true" className="text-emerald-300">
              ✓
            </span>
            {rescued.size} of {ANIMAL_ORDER.length} rescued
          </span>
          <Button variant="ghost" onClick={onBack}>
            <span className="flex items-center gap-1.5">
              <HomeIcon />
              Home
            </span>
          </Button>
        </div>
      </div>

      {/* Damaged-habitat notice, hidden whenever a panel would cover it */}
      {exhibit.isDamaged && !showExhibitCard && !selectedId && (
        <div className="pointer-events-none absolute inset-x-0 top-28 flex justify-center px-4 sm:top-24">
          <p className="rounded-full border border-amber-300/40 bg-amber-300/10 px-4 py-1.5 text-center text-xs text-amber-100 backdrop-blur-md">
            This habitat needs help — {exhibit.tagline.toLowerCase()}
          </p>
        </div>
      )}

      {/* Empty-bay hint before any animal has been rescued yet */}
      {exhibitId === 'rehab-bay' && residents.length === 0 && !showExhibitCard && (
        <div className="pointer-events-none absolute inset-x-0 top-28 flex justify-center px-4 sm:top-24">
          <p className="rounded-full border border-white/15 bg-abyss/70 px-4 py-1.5 text-center text-xs text-foam/70 backdrop-blur-md">
            Animals move here once you've helped them — this bay is waiting for its first patient.
          </p>
        </div>
      )}

      {/* Bottom controls: residents, then exhibits */}
      <div className="pointer-events-auto absolute inset-x-0 bottom-0 space-y-2 p-3 sm:p-5">
        {residents.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2">
            {residents.map((animal) => {
              const active = selectedId === animal.id;
              const best = bestScores[animal.id];

              return (
                <button
                  key={animal.id}
                  onClick={() => onSelect(animal.id)}
                  aria-pressed={active}
                  className={`rounded-2xl border px-3.5 py-2 text-left backdrop-blur-md transition-colors ${
                    active
                      ? 'border-lagoon bg-lagoon/25 text-foam'
                      : 'border-white/15 bg-abyss/70 text-foam/80 hover:bg-white/15'
                  }`}
                >
                  <span className="flex items-center gap-1.5 text-sm font-semibold">
                    {best !== undefined && (
                      <span aria-hidden="true" className="text-emerald-300">
                        ✓
                      </span>
                    )}
                    {animal.name}
                  </span>
                  <span className="block text-xs text-foam/55">
                    {best !== undefined ? `Recovered · best ${best}` : animal.speciesLabel}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        <ExhibitSwitcher activeId={exhibitId} onChange={changeExhibit} />
      </div>

      <AnimatePresence>
        {showExhibitCard && (
          <ExhibitCard
            key={exhibitId}
            exhibit={exhibit}
            onClose={() => setShowExhibitCard(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedId && (
          <AnimalInfoPanel
            key={selectedId}
            animalCase={ANIMALS[selectedId]}
            bestScore={bestScores[selectedId]}
            onClose={onDeselect}
            onBeginFitting={() => onBeginFitting(selectedId)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
