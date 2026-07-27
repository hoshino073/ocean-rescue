import type { Exhibit, ExhibitId } from '../types/exhibit';

/** The four exhibits. Environmental descriptions here are accurate and
 * general; the individual animal rehabilitation cases remain fictional. */
export const EXHIBITS: Record<ExhibitId, Exhibit> = {
  'coral-garden': {
    id: 'coral-garden',
    name: 'Coral Garden',
    tagline: 'A healthy reef',
    isDamaged: false,
    summary: 'A thriving reef, full of colour and life.',
    description:
      'Healthy coral reefs are built by tiny animals called polyps living alongside colourful algae. Reefs cover a small fraction of the ocean floor but shelter roughly a quarter of all marine species.',
    whatHelps:
      'Clean water, stable temperatures, and protected areas give reefs the conditions they need to keep growing.',
    theme: {
      waterColor: '#052a3f',
      fogNear: 8,
      fogFar: 19,
      ambientIntensity: 0.4,
      directionalIntensity: 0.85,
      lightColor: '#ffffff',
      sandColor: '#f2ddb0',
      rockColor: '#5d7080',
      coralPalette: ['#ff8a65', '#ff6f91', '#ffb677', '#f77f9a', '#ffa25c'],
      kelpColor: '#4fbf7f',
      kelpDensity: 1,
      fishDensity: 1,
      propSet: 'none',
    },
  },

  'bleached-reef': {
    id: 'bleached-reef',
    name: 'Bleached Reef',
    tagline: 'Warming water',
    isDamaged: true,
    summary: 'The same kind of reef, drained of colour by heat stress.',
    description:
      'When water stays too warm for too long, coral expels the algae living inside it and turns bone white. Bleached coral is not dead yet, but it is weakened and hungry, and fewer animals can find food or shelter here.',
    whatHelps:
      'Coral can recover if the water cools in time. Reducing heat stress and protecting reefs from extra pressures gives them that chance.',
    theme: {
      waterColor: '#0e3444',
      fogNear: 6,
      fogFar: 15,
      ambientIntensity: 0.5,
      directionalIntensity: 0.7,
      lightColor: '#e8f4f2',
      sandColor: '#ded4bd',
      rockColor: '#77817f',
      coralPalette: ['#f3f0ea', '#e6e2da', '#d9d5cb', '#efece6', '#cfcabf'],
      kelpColor: '#8f9c72',
      kelpDensity: 0.4,
      fishDensity: 0.35,
      propSet: 'none',
    },
  },

  'plastic-cove': {
    id: 'plastic-cove',
    name: 'Plastic Cove',
    tagline: 'Marine debris',
    isDamaged: true,
    summary: 'A sheltered cove where currents collect drifting litter.',
    description:
      'Currents gather floating plastic into quiet bays like this one. Bags and packaging are easily mistaken for food, and lost fishing gear — called ghost gear — keeps drifting and tangling long after it is dropped.',
    whatHelps:
      'Cutting single-use plastic, recovering lost fishing gear, and organised beach and seabed clean-ups all reduce what ends up here.',
    theme: {
      waterColor: '#123a35',
      fogNear: 5,
      fogFar: 13,
      ambientIntensity: 0.36,
      directionalIntensity: 0.55,
      lightColor: '#cfe3cf',
      sandColor: '#b9b394',
      rockColor: '#4c5850',
      coralPalette: ['#8d9a7e', '#a2a08a', '#7f8b78', '#96917c', '#6f7d6e'],
      kelpColor: '#3c7355',
      kelpDensity: 0.6,
      fishDensity: 0.3,
      propSet: 'debris',
    },
  },

  'rehab-bay': {
    id: 'rehab-bay',
    name: 'Rehabilitation Bay',
    tagline: 'Recovery pool',
    isDamaged: false,
    summary: 'A calm, clean pool where recovering animals build strength.',
    description:
      'Rehabilitation pools are kept shallow, clean, and quiet so recovering animals can rest and practise swimming safely. Care teams watch each short session and adjust support as the animal gets stronger.',
    whatHelps:
      'Patience. Most animals need weeks or months of small, gradual sessions before they are ready to return to open water.',
    theme: {
      waterColor: '#0a4f6b',
      fogNear: 10,
      fogFar: 24,
      ambientIntensity: 0.62,
      directionalIntensity: 0.95,
      lightColor: '#ffffff',
      sandColor: '#cfe4ee',
      rockColor: '#8fa8b8',
      coralPalette: [],
      kelpColor: '#4fbf7f',
      kelpDensity: 0,
      fishDensity: 0,
      propSet: 'rehab',
    },
  },
};

/** Display order for the exhibit switcher — tells the conservation story. */
export const EXHIBIT_ORDER: ExhibitId[] = [
  'coral-garden',
  'bleached-reef',
  'plastic-cove',
  'rehab-bay',
];
