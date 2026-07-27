import type { ReactNode } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends HTMLMotionProps<'button'> {
  children: ReactNode;
  variant?: 'primary' | 'ghost';
}

/** Shared pill-shaped call-to-action button used across every screen. */
export function Button({ children, variant = 'primary', className = '', ...rest }: ButtonProps) {
  const base =
    'px-6 py-3 rounded-full font-semibold text-base transition-colors cursor-pointer';
  const variantStyles =
    variant === 'primary'
      ? 'bg-gradient-to-r from-lagoon to-ocean text-abyss shadow-lg shadow-ocean/40 hover:brightness-110'
      : 'bg-white/10 text-foam border border-white/25 hover:bg-white/20 backdrop-blur-sm';

  return (
    <motion.button
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      className={`${base} ${variantStyles} ${className}`}
      {...rest}
    >
      {children}
    </motion.button>
  );
}
