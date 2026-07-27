import { Seafloor } from './Seafloor';
import { Rocks } from './Rocks';
import { Coral } from './Coral';
import { Kelp } from './Kelp';
import { DebrisField } from './DebrisField';
import { RehabProps } from './RehabProps';
import type { ExhibitTheme } from '../../../types/exhibit';

/** Composes the static parts of the aquarium — sand, rocks, coral, kelp, and
 * whichever prop set the current exhibit calls for. All of it is driven by the
 * theme, so the four exhibits share one set of components. */
export function SceneEnvironment({ theme }: { theme: ExhibitTheme }) {
  return (
    <group>
      <Seafloor color={theme.sandColor} />
      {/* A clinical pool has no boulders in it. */}
      {theme.propSet !== 'rehab' && <Rocks color={theme.rockColor} />}
      <Coral palette={theme.coralPalette} weakened={theme.kelpDensity < 0.5} />
      <Kelp color={theme.kelpColor} density={theme.kelpDensity} />

      {theme.propSet === 'debris' && <DebrisField />}
      {theme.propSet === 'rehab' && <RehabProps />}
    </group>
  );
}
