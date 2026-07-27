import { SeaTurtle } from './SeaTurtle';
import { Dolphin } from './Dolphin';
import { Seal } from './Seal';
import { Penguin } from './Penguin';
import { ReefFish } from './ReefFish';
import { HermitCrab } from './HermitCrab';
import type { AnimalModelProps } from './types';

/** Renders the correct procedural model for an animal case. */
export function AnimalModel(props: AnimalModelProps) {
  switch (props.animalCase.id) {
    case 'turtle':
      return <SeaTurtle {...props} />;
    case 'dolphin':
      return <Dolphin {...props} />;
    case 'seal':
      return <Seal {...props} />;
    case 'penguin':
      return <Penguin {...props} />;
    case 'reeffish':
      return <ReefFish {...props} />;
    case 'hermitcrab':
      return <HermitCrab {...props} />;
  }
}
