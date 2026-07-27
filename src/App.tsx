import { lazy, Suspense, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { HomeScreen } from './components/home/HomeScreen';
import { ScreenTransition } from './components/common/ScreenTransition';
import { LoadingSplash } from './components/common/LoadingSplash';
import { CelebrationScreen } from './components/celebration/CelebrationScreen';
import { ANIMALS } from './data/animals';
import type { AnimalId } from './types/animal';
import type { ExhibitId } from './types/exhibit';

// The 3D screens pull in Three.js, so they load only once the visitor dives in.
const AquariumScreen = lazy(() =>
  import('./components/aquarium/AquariumScreen').then((m) => ({ default: m.AquariumScreen })),
);
const FittingGame = lazy(() =>
  import('./components/game/FittingGame').then((m) => ({ default: m.FittingGame })),
);

type Screen = 'home' | 'aquarium' | 'game' | 'celebration';

function App() {
  const [screen, setScreen] = useState<Screen>('home');
  const [selectedId, setSelectedId] = useState<AnimalId | null>(null);
  const [exhibitId, setExhibitId] = useState<ExhibitId>('coral-garden');

  const goHome = () => {
    setSelectedId(null);
    setScreen('home');
  };

  return (
    <div className="relative min-h-screen w-full">
      <AnimatePresence mode="wait">
        {screen === 'home' && (
          <ScreenTransition key="home">
            <HomeScreen onStart={() => setScreen('aquarium')} />
          </ScreenTransition>
        )}

        {screen === 'aquarium' && (
          <ScreenTransition key="aquarium">
            <Suspense fallback={<LoadingSplash label="Filling the tank…" />}>
              <AquariumScreen
                exhibitId={exhibitId}
                onExhibitChange={setExhibitId}
                selectedId={selectedId}
                onSelect={setSelectedId}
                onDeselect={() => setSelectedId(null)}
                onBeginFitting={(id) => {
                  setSelectedId(id);
                  setScreen('game');
                }}
                onBack={goHome}
              />
            </Suspense>
          </ScreenTransition>
        )}

        {screen === 'game' && selectedId && (
          <ScreenTransition key="game">
            <Suspense fallback={<LoadingSplash label="Preparing the lab…" />}>
              <FittingGame
                animalCase={ANIMALS[selectedId]}
                onExit={() => setScreen('aquarium')}
                onGoHome={goHome}
                onAllRescued={() => setScreen('celebration')}
              />
            </Suspense>
          </ScreenTransition>
        )}

        {screen === 'celebration' && (
          <ScreenTransition key="celebration">
            <CelebrationScreen
              onViewRehabBay={() => {
                setSelectedId(null);
                setExhibitId('rehab-bay');
                setScreen('aquarium');
              }}
              onGoHome={goHome}
            />
          </ScreenTransition>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
