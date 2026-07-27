import { EXHIBITS, EXHIBIT_ORDER } from '../../data/exhibits';
import { ExhibitIcon } from './ExhibitIcon';
import type { ExhibitId } from '../../types/exhibit';

interface ExhibitSwitcherProps {
  activeId: ExhibitId;
  onChange: (id: ExhibitId) => void;
}

const ARROW_CLASS =
  'flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 bg-abyss/70 text-lg text-foam backdrop-blur-md transition-colors hover:bg-white/15';

/** Simple Back/Next paging between exhibits, wrapping around at each end.
 * The current exhibit is shown as a label in the middle — not a list of
 * clickable names — so moving between exhibits is a single obvious action
 * rather than a menu to read. */
export function ExhibitSwitcher({ activeId, onChange }: ExhibitSwitcherProps) {
  const currentIndex = EXHIBIT_ORDER.indexOf(activeId);
  const exhibit = EXHIBITS[activeId];

  const step = (delta: number) => {
    const nextIndex = (currentIndex + delta + EXHIBIT_ORDER.length) % EXHIBIT_ORDER.length;
    onChange(EXHIBIT_ORDER[nextIndex]);
  };

  return (
    <nav aria-label="Move between exhibits" className="mx-auto flex w-full max-w-md items-center gap-2.5">
      <button onClick={() => step(-1)} aria-label="Previous exhibit" className={ARROW_CLASS}>
        ←
      </button>

      <div className="flex flex-1 flex-col items-center gap-1.5 rounded-2xl border border-lagoon/40 bg-lagoon/15 px-4 py-2.5 backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-lagoon/25 text-lagoon">
            <ExhibitIcon exhibitId={activeId} className="h-[18px] w-[18px]" />
          </span>
          <span className="text-left">
            <span className="flex items-center gap-1.5 text-sm font-semibold whitespace-nowrap text-foam">
              {exhibit.name}
              {exhibit.isDamaged && (
                <span
                  aria-hidden="true"
                  title="Damaged habitat"
                  className="h-1.5 w-1.5 shrink-0 rounded-full bg-amber-300"
                />
              )}
            </span>
            <span className="block text-xs whitespace-nowrap text-foam/55">{exhibit.tagline}</span>
          </span>
        </div>

        {/* Position dots, purely visual — not individually clickable */}
        <div aria-hidden="true" className="flex gap-1.5">
          {EXHIBIT_ORDER.map((id) => (
            <span
              key={id}
              className={`h-1.5 w-1.5 rounded-full ${
                id === activeId ? 'bg-lagoon' : 'bg-white/25'
              }`}
            />
          ))}
        </div>
      </div>

      <button onClick={() => step(1)} aria-label="Next exhibit" className={ARROW_CLASS}>
        →
      </button>

      <p aria-live="polite" className="sr-only">
        Now viewing {exhibit.name}, exhibit {currentIndex + 1} of {EXHIBIT_ORDER.length}
      </p>
    </nav>
  );
}
