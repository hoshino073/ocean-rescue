import type { AnimalCase, AnimalId } from '../types/animal';
import type { ExhibitId } from '../types/exhibit';

/** Fictional rehabilitation cases. Every animal, injury, and device here is
 * invented for this teaching game and simplifies real veterinary care.
 * The species facts in `educationalFact` are accurate.
 *
 * `attachPoint` values are derived from the fitting stage's fixed camera —
 * see the projection helper in the scratchpad, not eyeballed. */
export const ANIMALS: Record<AnimalId, AnimalCase> = {
  turtle: {
    id: 'turtle',
    name: 'Shelly',
    speciesLabel: 'Green Sea Turtle',
    homeExhibitId: 'coral-garden',
    color: '#4b8f6d',
    accentColor: '#2f6b4f',
    injury:
      'Shelly has trouble pushing water with her left front flipper, so she keeps drifting in circles instead of swimming straight.',
    rehabStory:
      'A lightweight supportive flipper slips over the limb and gives her the surface area she is missing. With it fitted, her care team can rebuild her strength one short swim at a time.',
    recoveredNote:
      'Shelly swims in a straight line again and is building up her distance a little more each day.',
    educationalFact:
      'Sea turtles steer mostly with their front flippers, so even a little extra surface area can restore a straight, steady glide.',
    correctDeviceId: 'flipper-support',
    modelScale: 1,
    swimSpeed: 1,
    closeUpDistance: 5.2,
    deviceOptions: [
      {
        id: 'flipper-support',
        name: 'Supportive Flipper',
        description: 'A light, flexible paddle sized for a turtle’s front limb.',
        isCorrect: true,
        correctRotationDeg: 30,
        attachPoint: { x: 0.582, y: 0.621 },
        snapRadius: 0.18,
        rotationToleranceDeg: 25,
      },
      {
        id: 'tail-brace',
        name: 'Tail Brace',
        description: 'A stiff brace built to steady a large tail section.',
        isCorrect: false,
        correctRotationDeg: 0,
        attachPoint: { x: 0.582, y: 0.621 },
        snapRadius: 0.18,
        rotationToleranceDeg: 40,
      },
      {
        id: 'body-harness',
        name: 'Full Body Harness',
        description: 'A large floatation harness meant for a much bigger animal.',
        isCorrect: false,
        correctRotationDeg: 0,
        attachPoint: { x: 0.582, y: 0.621 },
        snapRadius: 0.18,
        rotationToleranceDeg: 40,
      },
    ],
  },

  reeffish: {
    id: 'reeffish',
    name: 'Bubbles',
    speciesLabel: 'Copperband Butterflyfish',
    homeExhibitId: 'coral-garden',
    color: '#f5d78e',
    accentColor: '#e08a3c',
    injury:
      'Bubbles struggles to hold her depth. She sinks toward the sand whenever she stops swimming, which tires her out quickly.',
    rehabStory:
      'A soft buoyancy sling with two small floats sits under her belly and holds her level, so she can rest and feed normally while her swim bladder settles.',
    recoveredNote:
      'Bubbles can hold her depth and rest without sinking, so she is feeding properly again.',
    educationalFact:
      'Most bony fish control their depth with a gas-filled swim bladder. When it stops working, a padded sling can hold a fish level while it recovers.',
    correctDeviceId: 'buoyancy-sling',
    modelScale: 1.4,
    swimSpeed: 1.4,
    closeUpDistance: 3.2,
    deviceOptions: [
      {
        id: 'buoyancy-sling',
        name: 'Buoyancy Sling',
        description: 'A soft belly band with two small floats that keeps a fish level.',
        isCorrect: true,
        correctRotationDeg: 0,
        attachPoint: { x: 0.5, y: 0.747 },
        snapRadius: 0.17,
        rotationToleranceDeg: 25,
      },
      {
        id: 'flipper-support',
        name: 'Supportive Flipper',
        description: 'A paddle for a limbed animal — a fish has no flipper to fit it to.',
        isCorrect: false,
        correctRotationDeg: 0,
        attachPoint: { x: 0.5, y: 0.747 },
        snapRadius: 0.17,
        rotationToleranceDeg: 40,
      },
      {
        id: 'printed-shell',
        name: 'Printed Shell',
        description: 'A hard shell for an animal that carries one. Far too heavy here.',
        isCorrect: false,
        correctRotationDeg: 0,
        attachPoint: { x: 0.5, y: 0.747 },
        snapRadius: 0.17,
        rotationToleranceDeg: 40,
      },
    ],
  },

  hermitcrab: {
    id: 'hermitcrab',
    name: 'Nimbus',
    speciesLabel: 'Hermit Crab',
    homeExhibitId: 'bleached-reef',
    color: '#d4705a',
    accentColor: '#a94f3d',
    injury:
      'Nimbus’s borrowed shell has cracked, and this bleached stretch of reef has no empty shells left for him to move into.',
    rehabStory:
      'A smooth 3D-printed shell, sized and weighted like a real one, gives him somewhere safe to tuck away again while the reef recovers.',
    recoveredNote:
      'Nimbus has tucked straight into his new shell and is out exploring the reef again.',
    educationalFact:
      'Hermit crabs do not grow their own shells — they borrow empty snail shells and must trade up as they grow. Researchers have tested printed shells where natural ones are scarce.',
    correctDeviceId: 'printed-shell',
    // A hermit crab is tiny next to a dolphin, so it gets scaled up in the
    // tank to stay readable from the idle camera distance.
    modelScale: 1.9,
    swimSpeed: 1.1,
    closeUpDistance: 2.8,
    deviceOptions: [
      {
        id: 'printed-shell',
        name: 'Printed Shell',
        description: 'A smooth spiral shell, printed to match the size he has outgrown.',
        isCorrect: true,
        correctRotationDeg: 45,
        attachPoint: { x: 0.419, y: 0.536 },
        snapRadius: 0.17,
        rotationToleranceDeg: 30,
      },
      {
        id: 'buoyancy-sling',
        name: 'Buoyancy Sling',
        description: 'A float harness for a fish. A crab walks the seabed — it needs no lift.',
        isCorrect: false,
        correctRotationDeg: 0,
        attachPoint: { x: 0.419, y: 0.536 },
        snapRadius: 0.17,
        rotationToleranceDeg: 40,
      },
    ],
  },

  penguin: {
    id: 'penguin',
    name: 'Pip',
    speciesLabel: 'Little Blue Penguin',
    homeExhibitId: 'plastic-cove',
    color: '#4a6fa5',
    accentColor: '#2f4d78',
    injury:
      'Pip got tangled in drifting debris and has a sore left foot. He can still swim, but he cannot push off cleanly or steer the way he used to.',
    rehabStory:
      'A 3D-printed swim boot cushions the foot and spreads his weight evenly, so he can practise short swims while it heals.',
    recoveredNote:
      'Pip pushes off cleanly now and is steering well on his practice swims.',
    educationalFact:
      'Little blue penguins are the smallest penguins in the world. They power along with their flippers and steer with their feet like a pair of rudders.',
    correctDeviceId: 'swim-boot',
    modelScale: 1,
    swimSpeed: 1.3,
    closeUpDistance: 3.8,
    deviceOptions: [
      {
        id: 'swim-boot',
        name: 'Swim Boot',
        description: 'A cushioned printed boot shaped around a webbed penguin foot.',
        isCorrect: true,
        correctRotationDeg: 330,
        attachPoint: { x: 0.397, y: 0.679 },
        snapRadius: 0.17,
        rotationToleranceDeg: 30,
      },
      {
        id: 'tail-support',
        name: 'Tail Support',
        description: 'A sleeve built for a powerful swimming tail, which a penguin lacks.',
        isCorrect: false,
        correctRotationDeg: 0,
        attachPoint: { x: 0.397, y: 0.679 },
        snapRadius: 0.17,
        rotationToleranceDeg: 40,
      },
      {
        id: 'body-harness',
        name: 'Full Body Harness',
        description: 'A bulky harness that would slow a small penguin right down.',
        isCorrect: false,
        correctRotationDeg: 0,
        attachPoint: { x: 0.397, y: 0.679 },
        snapRadius: 0.17,
        rotationToleranceDeg: 40,
      },
    ],
  },

  dolphin: {
    id: 'dolphin',
    name: 'Echo',
    speciesLabel: 'Bottlenose Dolphin',
    homeExhibitId: 'plastic-cove',
    color: '#7fa8c9',
    accentColor: '#4d7b9e',
    injury:
      'Echo’s tail area is healing and cannot yet make the strong up-and-down stroke he needs to swim at full speed.',
    rehabStory:
      'A simplified tail-support device cushions the area and helps carry the force of each stroke. Short, gentle swim sessions let him rebuild the motion safely.',
    recoveredNote:
      'Echo’s stroke is smooth and even again, and he is slowly picking up speed.',
    educationalFact:
      'Dolphins power forward with an up-and-down tail stroke, unlike fish, which sweep their tails side to side.',
    correctDeviceId: 'tail-support',
    modelScale: 1,
    swimSpeed: 1.2,
    closeUpDistance: 5.2,
    deviceOptions: [
      {
        id: 'tail-support',
        name: 'Tail Support',
        description: 'A cushioned sleeve that supports the tail through each stroke.',
        isCorrect: true,
        correctRotationDeg: 315,
        attachPoint: { x: 0.323, y: 0.597 },
        snapRadius: 0.18,
        rotationToleranceDeg: 30,
      },
      {
        id: 'flipper-cup',
        name: 'Flipper Cup',
        description: 'A small cup shaped for a front flipper, not a tail.',
        isCorrect: false,
        correctRotationDeg: 0,
        attachPoint: { x: 0.323, y: 0.597 },
        snapRadius: 0.18,
        rotationToleranceDeg: 40,
      },
      {
        id: 'shell-patch',
        name: 'Shell Patch',
        description: 'A curved patch designed to sit on a hard shell.',
        isCorrect: false,
        correctRotationDeg: 0,
        attachPoint: { x: 0.323, y: 0.597 },
        snapRadius: 0.18,
        rotationToleranceDeg: 40,
      },
    ],
  },

  seal: {
    id: 'seal',
    name: 'Pebble',
    speciesLabel: 'Harbour Seal',
    homeExhibitId: 'bleached-reef',
    color: '#9aa5b1',
    accentColor: '#6b7681',
    injury:
      'Pebble is recovering from a strained rear flipper and needs gentle support while the muscles regain strength.',
    rehabStory:
      'A soft temporary brace holds the flipper in a comfortable position so she can practise short swims without overworking it. The brace comes off once she is stronger.',
    recoveredNote:
      'Pebble is moving comfortably and will not need the brace for much longer.',
    educationalFact:
      'Seals swim by sweeping their rear flippers side to side, and steer with the small front flippers they also use to haul out on land.',
    correctDeviceId: 'rear-brace',
    modelScale: 1,
    swimSpeed: 0.9,
    closeUpDistance: 5.2,
    deviceOptions: [
      {
        id: 'rear-brace',
        name: 'Support Brace',
        description: 'A soft, temporary brace sized for a seal’s rear flipper.',
        isCorrect: true,
        correctRotationDeg: 60,
        attachPoint: { x: 0.346, y: 0.597 },
        snapRadius: 0.18,
        rotationToleranceDeg: 30,
      },
      {
        id: 'wide-paddle',
        name: 'Wide Paddle',
        description: 'A broad paddle built for a turtle’s flipper stroke.',
        isCorrect: false,
        correctRotationDeg: 90,
        attachPoint: { x: 0.346, y: 0.597 },
        snapRadius: 0.18,
        rotationToleranceDeg: 40,
      },
    ],
  },
};

/** Stable display order across the app. */
export const ANIMAL_ORDER: AnimalId[] = [
  'turtle',
  'reeffish',
  'hermitcrab',
  'penguin',
  'dolphin',
  'seal',
];

/** Where an animal is right now. Once it has been successfully helped it
 * moves out of the wild exhibit it was found in and into the Rehabilitation
 * Bay, so the bay fills up as the player works through the rescues. */
export function currentExhibitOf(animal: AnimalCase, rescued: ReadonlySet<AnimalId>): ExhibitId {
  return rescued.has(animal.id) ? 'rehab-bay' : animal.homeExhibitId;
}

/** The animals currently in a given exhibit, in display order. */
export function animalsInExhibit(
  exhibitId: ExhibitId,
  rescued: ReadonlySet<AnimalId>,
): AnimalCase[] {
  return ANIMAL_ORDER.map((id) => ANIMALS[id]).filter(
    (a) => currentExhibitOf(a, rescued) === exhibitId,
  );
}
