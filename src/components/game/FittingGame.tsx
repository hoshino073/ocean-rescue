import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { AnimalCase } from '../../types/animal';
import { useFittingGameStore } from '../../store/useFittingGameStore';
import { useKeyboardNudge } from '../../hooks/useKeyboardNudge';
import { angleDiffDeg } from '../../utils/math';
import { DeviceSelect } from './DeviceSelect';
import { FittingSteps } from './FittingSteps';
import { FittingStage } from './FittingStage';
import { FittingControls } from './FittingControls';
import { SwimTest } from './SwimTest';
import { ResultsScreen } from '../results/ResultsScreen';
import { Button } from '../common/Button';
import { HomeIcon } from '../common/HomeIcon';

interface FittingGameProps {
  animalCase: AnimalCase;
  /** Back to the aquarium, still on the exhibit the player came from. */
  onExit: () => void;
  /** All the way back to the landing screen. */
  onGoHome: () => void;
  /** Every animal has now been helped at least once — show the celebration. */
  onAllRescued: () => void;
}

/** The Prosthetic Fitting Lab. One reusable flow — device choice, positioning,
 * fit check, swim test, results — driven entirely by the animal's case data. */
export function FittingGame({ animalCase, onExit, onGoHome, onAllRescued }: FittingGameProps) {
  const {
    phase,
    selectedDeviceId,
    position,
    rotationDeg,
    attempts,
    score,
    feedback,
    startGame,
    selectDevice,
    setPosition,
    nudgePosition,
    nudgeRotation,
    checkFit,
    finishSwimTest,
    retry,
  } = useFittingGameStore();

  // Start (or restart) the activity whenever the animal changes.
  useEffect(() => {
    startGame(animalCase);
  }, [animalCase, startGame]);

  const device = animalCase.deviceOptions.find((d) => d.id === selectedDeviceId) ?? null;

  const distance = device
    ? Math.hypot(position.x - device.attachPoint.x, position.y - device.attachPoint.y)
    : Infinity;
  const rotationError = device ? angleDiffDeg(rotationDeg, device.correctRotationDeg) : 180;
  const nearTarget = device ? distance <= device.snapRadius : false;
  const angleOk = device ? rotationError <= device.rotationToleranceDeg : false;

  useKeyboardNudge({
    enabled: phase === 'positioning',
    onNudge: nudgePosition,
    onRotate: nudgeRotation,
    onCheckFit: checkFit,
  });

  // Spoken guidance for players positioning the device without a pointer.
  const positionStatus = device
    ? `${nearTarget ? 'On the guide' : 'Away from the guide'}, angle ${
        angleOk ? 'aligned' : `${Math.round(rotationError)} degrees off`
      }.`
    : '';

  return (
    <div className="min-h-screen w-full overflow-y-auto bg-gradient-to-b from-deep via-ocean/60 to-abyss">
      <div className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 sm:py-10">
        {/* Header */}
        <header className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs tracking-[0.25em] text-lagoon uppercase">
              Prosthetic Fitting Lab
            </p>
            <h1 className="text-2xl font-bold text-foam">
              {animalCase.name} · {animalCase.speciesLabel}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" onClick={onExit}>
              Back to Aquarium
            </Button>
            <Button variant="ghost" onClick={onGoHome}>
              <span className="flex items-center gap-1.5">
                <HomeIcon />
                Home
              </span>
            </Button>
          </div>
        </header>

        <FittingSteps phase={phase} />

        {/* Live status for screen readers and sighted players alike */}
        <div aria-live="polite" className="min-h-[3.25rem]">
          <AnimatePresence mode="wait">
            {feedback && (
              <motion.p
                key={feedback.message}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`mb-4 rounded-2xl border px-4 py-3 text-sm ${
                  feedback.tone === 'success'
                    ? 'border-emerald-300/40 bg-emerald-300/10 text-emerald-100'
                    : feedback.tone === 'retry'
                      ? 'border-amber-300/40 bg-amber-300/10 text-amber-100'
                      : 'border-lagoon/40 bg-lagoon/10 text-foam/85'
                }`}
              >
                {feedback.message}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {phase === 'selecting' && (
          <div className="rounded-3xl border border-white/15 bg-abyss/60 p-6 backdrop-blur-md">
            <div className="mb-5 rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs tracking-[0.2em] text-lagoon uppercase">Case notes</p>
              <p className="mt-1 text-sm leading-relaxed text-foam/80">{animalCase.injury}</p>
            </div>
            <DeviceSelect animalCase={animalCase} onSelect={selectDevice} />
          </div>
        )}

        {phase === 'positioning' && device && (
          <div className="space-y-5">
            <FittingStage
              animalCase={animalCase}
              device={device}
              position={position}
              rotationDeg={rotationDeg}
              nearTarget={nearTarget}
              angleOk={angleOk}
              onPositionChange={setPosition}
            />
            <FittingControls
              onNudge={nudgePosition}
              onRotate={nudgeRotation}
              onCheckFit={checkFit}
            />
            <p aria-live="polite" className="sr-only">
              {positionStatus}
            </p>
            <p className="text-center text-xs text-foam/50">
              Drag the device, or use the buttons above. Keyboard: arrow keys to move,
              <kbd className="mx-1 rounded border border-white/20 px-1">[</kbd> and
              <kbd className="mx-1 rounded border border-white/20 px-1">]</kbd> to rotate,
              <kbd className="mx-1 rounded border border-white/20 px-1">Enter</kbd> to check the fit.
            </p>
          </div>
        )}

        {phase === 'testing' && (
          <SwimTest animalCase={animalCase} onComplete={finishSwimTest} />
        )}

        {phase === 'results' && score !== null && (
          <ResultsScreen
            animalCase={animalCase}
            score={score}
            attempts={attempts}
            onRetry={retry}
            onChooseAnother={onExit}
            onAllRescued={onAllRescued}
          />
        )}
      </div>
    </div>
  );
}
