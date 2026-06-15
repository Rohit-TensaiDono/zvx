/**
 * Reusable Framer Motion variants.
 * Import the variant you need — don't re-declare in components.
 */

export const fadeUp = (delay = 0, duration = 0.7) => ({
  hidden:  { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0,
    transition: { duration, delay, ease: [0.25, 0.46, 0.45, 0.94] } },
});

export const fadeIn = (delay = 0) => ({
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, delay } },
});

export const scaleIn = (delay = 0) => ({
  hidden:  { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1,
    transition: { duration: 0.6, delay, ease: 'easeOut' } },
});

export const slideLeft = (delay = 0) => ({
  hidden:  { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0,
    transition: { duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] } },
});

export const slideRight = (delay = 0) => ({
  hidden:  { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0,
    transition: { duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] } },
});

/** Parent container — staggers children automatically */
export const stagger = (delay = 0, gap = 0.08) => ({
  hidden:  {},
  visible: { transition: { staggerChildren: gap, delayChildren: delay } },
});

/** Node "activation" — card emerging from mesh */
export const nodeReveal = (delay = 0) => ({
  hidden:  { opacity: 0, scale: 0.95, filter: 'blur(6px)' },
  visible: { opacity: 1, scale: 1,    filter: 'blur(0px)',
    transition: { duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] } },
});
