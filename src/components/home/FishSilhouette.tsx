import { motion, useReducedMotion } from 'framer-motion';

interface FishSilhouetteProps {
  top: string;
  duration: number;
  delay: number;
  scale?: number;
  flip?: boolean;
}

/** A single simple swimming-fish silhouette that drifts across the screen.
 * Used as ambient decoration on the home screen background. */
export function FishSilhouette({ top, duration, delay, scale = 1, flip = false }: FishSilhouetteProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.svg
      viewBox="0 0 64 32"
      width={64 * scale}
      height={32 * scale}
      className="absolute text-lagoon/25"
      style={{ top, transform: flip ? 'scaleX(-1)' : undefined }}
      fill="currentColor"
      aria-hidden="true"
      initial={{ x: '-15vw' }}
      animate={prefersReducedMotion ? { x: '-15vw' } : { x: '115vw' }}
      transition={
        prefersReducedMotion
          ? undefined
          : { duration, delay, repeat: Infinity, ease: 'linear' }
      }
    >
      <path d="M2 16c10-10 30-14 42-8-4 2-6 6-6 8s2 6 6 8C32 30 12 26 2 16Z" />
      <path d="M44 12l14-6-4 10 4 10-14-6z" />
      <circle cx="14" cy="14" r="1.6" className="text-abyss/60" fill="currentColor" />
    </motion.svg>
  );
}
