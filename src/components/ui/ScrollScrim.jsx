'use client';
/**
 * ScrollScrim — fixed vignette overlays that give the page depth.
 * Lives in layout.jsx so it covers every route.
 *
 * - Top edge: darker at top (nav area), fades to transparent
 * - Sides: subtle radial darkening for cinematic framing
 * - These are FIXED and never scroll, adding persistent depth cues
 */
import { useScroll, useTransform, motion } from 'framer-motion';

export default function ScrollScrim() {
  const { scrollYProgress } = useScroll();

  // Top edge fades lighter once user leaves hero (hero has its own vignette)
  const topOpacity = useTransform(scrollYProgress, [0, 0.08, 0.2], [0.55, 0.3, 0.18]);

  return (
    <>
      {/* Top vignette — bleeds into navbar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-28 pointer-events-none z-[2]"
        style={{
          opacity: topOpacity,
          background: 'linear-gradient(to bottom, rgba(11,11,12,1) 0%, transparent 100%)',
        }}
      />
      {/* Cinematic side/corner darkening */}
      <div
        className="fixed inset-0 pointer-events-none z-[2]"
        style={{
          background:
            'radial-gradient(ellipse 90% 80% at 50% 40%, transparent 45%, rgba(11,11,12,0.38) 100%)',
        }}
      />
    </>
  );
}
