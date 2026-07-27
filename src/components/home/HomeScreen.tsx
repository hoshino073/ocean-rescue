import { lazy, Suspense, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { OceanIntro } from './OceanIntro';
import { Button } from '../common/Button';
import { ANIMAL_ORDER } from '../../data/animals';
import { EXHIBIT_ORDER } from '../../data/exhibits';

// The 3D backdrop is an upgrade, not a requirement — the CSS ocean below it
// paints immediately and stands alone if this never arrives.
const HomeBackground3D = lazy(() =>
  import('./HomeBackground3D').then((m) => ({ default: m.HomeBackground3D })),
);

interface HomeScreenProps {
  onStart: () => void;
}

/** The app's landing screen: a layered ocean backdrop, the title, a short
 * pitch, and the single "Start Exploring" call to action. */
export function HomeScreen({ onStart }: HomeScreenProps) {
  const [showBackdrop, setShowBackdrop] = useState(false);

  // Hold the 3D layer back one tick so the hero paints first on a cold load.
  useEffect(() => {
    const id = requestAnimationFrame(() => setShowBackdrop(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div className="relative h-full min-h-screen w-full overflow-hidden">
      {/* Instant CSS ocean */}
      <OceanIntro />

      {/* 3D upgrade layer, faded in over the top once it loads */}
      {showBackdrop && (
        <Suspense fallback={null}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.4, ease: 'easeOut' }}
            className="absolute inset-0"
            aria-hidden="true"
          >
            <HomeBackground3D />
          </motion.div>
        </Suspense>
      )}

      {/* Depth vignette: enough contrast for the hero, light enough that the
          animals drifting behind it stay visible. */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-abyss/70 via-transparent to-abyss/30" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(4,27,45,0.65)_100%)]" />

      <div className="relative z-10 flex min-h-screen w-full flex-col items-center justify-center px-6 py-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="w-full max-w-2xl rounded-[1.75rem] border border-white/15 bg-abyss/55 px-6 py-10 shadow-2xl shadow-abyss/80 backdrop-blur-md sm:px-10"
        >
          <p className="mb-3 text-xs font-medium tracking-[0.4em] text-lagoon uppercase sm:text-sm">
            Ocean Rescue
          </p>

          <h1 className="mb-5 bg-gradient-to-b from-foam via-foam to-lagoon bg-clip-text text-4xl font-bold text-transparent sm:text-6xl">
            Marine Prosthetics Lab
          </h1>

          <p className="mx-auto mb-8 max-w-lg text-balance text-base leading-relaxed text-foam/80 sm:text-lg">
            Explore four ocean exhibits, meet six animals recovering from
            fictional injuries, and fit the device that gets each one swimming
            again.
          </p>

          {/* Stat row */}
          <dl className="mx-auto mb-9 flex max-w-xs flex-wrap items-stretch justify-center gap-3">
            <Stat value={ANIMAL_ORDER.length} label="animals" />
            <Stat value={EXHIBIT_ORDER.length} label="exhibits" />
          </dl>

          <Button onClick={onStart} className="w-full text-lg sm:w-auto sm:px-10">
            Start Exploring
          </Button>

          <p className="mx-auto mt-7 max-w-md text-xs leading-relaxed text-foam/50">
            An educational experience. Every animal and injury is fictional, and
            the fitting activity simplifies real veterinary care.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

function Stat({ value, label }: { value: number | string; label: string }) {
  return (
    <div className="min-w-[6rem] flex-1 rounded-2xl border border-white/12 bg-white/5 px-4 py-3">
      <dt className="sr-only">{label}</dt>
      <dd>
        <span className="block text-2xl font-bold text-lagoon">{value}</span>
        <span className="block text-xs tracking-wide text-foam/60 uppercase">{label}</span>
      </dd>
    </div>
  );
}
