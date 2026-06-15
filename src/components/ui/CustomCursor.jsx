'use client';
/**
 * CustomCursor — two-layer cursor that connects to the node/card metaphor.
 *
 * Default state:  small dot  +  circular ring (white, 50% opacity)
 * Hover state:    ring becomes a ROUNDED SQUARE (matches node/card shape!)
 *                 ring colour matches the element's data-accent attribute
 *                 ring grows and glows in the card's accent colour
 * Click state:    ring pulses inward briefly
 *
 * The circle→square transition on hover reinforces that the cursor IS
 * a node, and hovering a card means "this node can expand into a card".
 *
 * Touch devices: returns null (cursor not shown).
 * SSR: rendered only client-side via useEffect.
 */
import { useEffect, useRef, useState } from 'react';

export function CustomCursor() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);
  const rafRef  = useRef(null);

  const mouse   = useRef({ x: -200, y: -200 });
  const ringPos = useRef({ x: -200, y: -200 });

  const [visible,  setVisible]  = useState(false);
  const [clicking, setClicking] = useState(false);
  const [hovered,  setHovered]  = useState(false);
  const [accent,   setAccent]   = useState('#F0C85A');
  const [isTouch,  setIsTouch]  = useState(false);

  useEffect(() => {
    // Don't render on touch/stylus devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true);
      return;
    }

    const getAccent = el => {
      const card = el?.closest('[data-accent]');
      return card?.dataset?.accent || '#F0C85A';
    };

    const onMove = e => {
      mouse.current = { x: e.clientX, y: e.clientY };
      setVisible(true);

      const el = document.elementFromPoint(e.clientX, e.clientY);
      const interactive = el?.closest(
        'a, button, [role="button"], .cursor-pointer, [data-interactive]'
      );
      setHovered(!!interactive);
      if (interactive) setAccent(getAccent(el));
    };

    const onDown  = () => setClicking(true);
    const onUp    = () => setClicking(false);
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    document.addEventListener('mousemove',   onMove,  { passive: true });
    document.addEventListener('mousedown',   onDown);
    document.addEventListener('mouseup',     onUp);
    document.addEventListener('mouseleave',  onLeave);
    document.addEventListener('mouseenter',  onEnter);

    // Ring follows with lag via RAF
    const animate = () => {
      rafRef.current = requestAnimationFrame(animate);
      const LERP = 0.13;
      ringPos.current.x += (mouse.current.x - ringPos.current.x) * LERP;
      ringPos.current.y += (mouse.current.y - ringPos.current.y) * LERP;

      if (dotRef.current) {
        dotRef.current.style.transform =
          `translate(${mouse.current.x}px, ${mouse.current.y}px)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform =
          `translate(${ringPos.current.x}px, ${ringPos.current.y}px)`;
      }
    };
    animate();

    return () => {
      cancelAnimationFrame(rafRef.current);
      document.removeEventListener('mousemove',  onMove);
      document.removeEventListener('mousedown',  onDown);
      document.removeEventListener('mouseup',    onUp);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
    };
  }, []);

  if (isTouch) return null;

  const ringSize    = clicking ? 28 : hovered ? 42 : 30;
  const ringRadius  = hovered  ? '6px' : '50%';       // circle → square on hover
  const ringColor   = hovered  ? accent : 'rgba(255,255,255,0.55)';
  const ringShadow  = hovered  ? `0 0 18px ${accent}66` : 'none';
  const dotColor    = hovered  ? accent : '#ffffff';
  const dotSize     = clicking ? 4 : 5;

  return (
    <>
      {/* Inner dot — sticks exactly to cursor */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          width:      `${dotSize}px`,
          height:     `${dotSize}px`,
          background: dotColor,
          borderRadius: '50%',
          marginLeft: `-${dotSize / 2}px`,
          marginTop:  `-${dotSize / 2}px`,
          opacity:    visible ? 1 : 0,
          willChange: 'transform',
          boxShadow:  hovered ? `0 0 8px ${accent}` : '0 0 4px rgba(255,255,255,0.4)',
          transition: 'background 0.18s, box-shadow 0.18s, opacity 0.25s, width 0.12s, height 0.12s',
        }}
      />

      {/* Outer ring — lags behind, becomes square on hover */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          width:        `${ringSize}px`,
          height:       `${ringSize}px`,
          border:       `1.5px solid ${ringColor}`,
          borderRadius: ringRadius,
          marginLeft:   `-${ringSize / 2}px`,
          marginTop:    `-${ringSize / 2}px`,
          opacity:      visible ? (hovered ? 0.92 : 0.50) : 0,
          willChange:   'transform',
          boxShadow:    ringShadow,
          transition:   [
            'width 0.28s cubic-bezier(0.16,1,0.3,1)',
            'height 0.28s cubic-bezier(0.16,1,0.3,1)',
            'border-radius 0.28s cubic-bezier(0.16,1,0.3,1)',
            'border-color 0.2s',
            'box-shadow 0.2s',
            'margin 0.28s cubic-bezier(0.16,1,0.3,1)',
            'opacity 0.25s',
          ].join(', '),
        }}
      />
    </>
  );
}
