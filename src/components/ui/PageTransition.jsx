'use client';
/**
 * PageTransition — page fade-in + anchor registry reset on navigation.
 *
 * Fixes two bugs:
 *   1. Black flash: content at opacity:0 briefly before whileInView fires.
 *      Fixed by fading in the whole page smoothly (0.32s ease).
 *   2. Anchors not re-triggering on back-navigation because the global
 *      Set still has them marked as "fired". Reset on each route change.
 */
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { resetAnchorRegistry } from './RevealSection';

export function PageTransition({ children }) {
  const path = usePathname();

  // Reset the global anchor-fired registry whenever the route changes
  // so sections re-animate properly when user navigates back
  useEffect(() => {
    resetAnchorRegistry();
  }, [path]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={path}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.32, ease: 'easeOut' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
