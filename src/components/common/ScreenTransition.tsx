import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

/** Fades and slightly lifts a screen in/out. Wrap each top-level screen with
 * this (inside an AnimatePresence in App.tsx) for smooth navigation. */
export function ScreenTransition({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="absolute inset-0"
    >
      {children}
    </motion.div>
  );
}
