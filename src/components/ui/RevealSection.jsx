'use client';
/**
 * RevealSection — node-to-card transformation system.
 *
 * RevealItem takes a nodeColor prop that matches the corresponding
 * anchor node in Three.js. On reveal, the card:
 *   1. Starts as a tiny glowing square (same as a mesh node)
 *   2. Spring-expands to full size (stiffness 260, slight bounce)
 *   3. The nodeColor glow fades out as the card settles
 *
 * This creates the illusion that mesh nodes ARE the cards —
 * they flash bright (anchPulse in ScrollMesh) then expand into cards.
 *
 * GLOBAL REGISTRY: window.__zvxFiredAnchors prevents multiple
 * RevealGroups on the same section firing mesh-navigate repeatedly.
 */
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

function hasAnchorFired(a) {
  if (typeof window === 'undefined') return false;
  window.__zvxFiredAnchors = window.__zvxFiredAnchors || new Set();
  return window.__zvxFiredAnchors.has(a);
}
function markAnchorFired(a) {
  if (typeof window === 'undefined') return;
  window.__zvxFiredAnchors = window.__zvxFiredAnchors || new Set();
  window.__zvxFiredAnchors.add(a);
}
export function resetAnchorRegistry() {
  if (typeof window !== 'undefined') window.__zvxFiredAnchors = new Set();
}

/* Shared hook */
function useMeshReveal(anchor) {
  const ref     = useRef(null);
  const timerRef = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || !anchor) return;

    if (hasAnchorFired(anchor)) { setShow(true); return; }

    const reveal = () => {
      clearTimeout(timerRef.current);
      setShow(true);
    };

    const onArrived = e => {
      if (e.detail?.anchor === anchor) reveal();
    };
    window.addEventListener('mesh-arrived', onArrived);

    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasAnchorFired(anchor)) {
        markAnchorFired(anchor);
        window.dispatchEvent(new CustomEvent('mesh-navigate', { detail: { anchor } }));
        // Fallback: if mesh-arrived doesn't fire within 2.5s, show anyway
        // Prevents content being invisible if Three.js is slow or on low-end devices
        timerRef.current = setTimeout(reveal, 2500);
      }
    }, { threshold: 0.06, rootMargin: '-36px' });
    obs.observe(el);

    return () => {
      window.removeEventListener('mesh-arrived', onArrived);
      clearTimeout(timerRef.current);
      obs.disconnect();
    };
  }, [anchor]);

  return { ref, show };
}

/* ─────────────────────────────────────────────────────────────────
   RevealItem — the core node→card transformation.
   nodeColor must match the anchor node color in ANCHOR_NODES.
   ───────────────────────────────────────────────────────────────── */
export function RevealItem({ children, className = '', nodeColor = '#F0C85A' }) {
  return (
    <motion.div
      className={`relative ${className}`}
      variants={{
        hidden: {
          scale: 0.04,
          opacity: 0,
          filter: 'blur(10px)',
        },
        visible: {
          scale: 1,
          opacity: 1,
          filter: 'blur(0px)',
          transition: {
            scale: {
              type: 'spring',
              stiffness: 260,
              damping: 22,
              mass: 0.85,
            },
            opacity: { duration: 0.38, ease: 'easeOut' },
            filter:  { duration: 0.42, ease: 'easeOut' },
          },
        },
      }}
    >
      {/* Node glow — bright at t=0, fades out as card expands.
          This IS the mesh node transforming into the card.       */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-30 rounded-[inherit]"
        variants={{
          hidden: {
            opacity: 1,
            boxShadow: [
              `0 0 0 2px ${nodeColor}`,
              `0 0 40px 8px ${nodeColor}99`,
              `inset 0 0 24px ${nodeColor}55`,
            ].join(', '),
          },
          visible: {
            opacity: 0,
            boxShadow: `0 0 0 0px ${nodeColor}00, 0 0 0px ${nodeColor}00`,
            transition: { duration: 0.65, delay: 0.12, ease: 'easeOut' },
          },
        }}
      />
      {children}
    </motion.div>
  );
}

/* ─── RevealGroup ─────────────────────────────────────────────── */
export function RevealGroup({
  children,
  className = '',
  anchor    = '',
  stagger   = 0.08,
}) {
  const { ref, show } = useMeshReveal(anchor);
  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={show ? 'visible' : 'hidden'}
      variants={{
        visible: { transition: { staggerChildren: stagger, delayChildren: 0 } },
      }}
    >
      {children}
    </motion.div>
  );
}

/* ─── RevealSection ───────────────────────────────────────────── */
export function RevealSection({
  children,
  className = '',
  anchor    = '',
  delay     = 0,
}) {
  const { ref, show } = useMeshReveal(anchor);
  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={show ? 'visible' : 'hidden'}
      variants={{
        hidden:  { opacity: 0, y: 26, filter: 'blur(3px)' },
        visible: {
          opacity: 1, y: 0, filter: 'blur(0px)',
          transition: { duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
