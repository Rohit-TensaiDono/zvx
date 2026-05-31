'use client';
/**
 * RevealSection — wraps any section with "node activation" scroll reveal.
 *
 * Concept: each section appears like a mesh node activating — it starts
 * blurred and scaled down, then sharp and full-size as it enters view.
 * Pair with nodeReveal animation variant from constants/animations.js.
 */
import { motion } from 'framer-motion';

export function RevealSection({ children, className = '', delay = 0, ...props }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.97, filter: 'blur(5px)' }}
      whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/** Stagger wrapper — children animate in sequence */
export function RevealGroup({ children, className = '', stagger = 0.08, delayChildren = 0 }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={{ visible: { transition: { staggerChildren: stagger, delayChildren } } }}
    >
      {children}
    </motion.div>
  );
}

/** Child item inside a RevealGroup */
export function RevealItem({ children, className = '' }) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden:  { opacity: 0, y: 28, filter: 'blur(4px)' },
        visible: { opacity: 1, y: 0,  filter: 'blur(0px)',
          transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
      }}
    >
      {children}
    </motion.div>
  );
}
