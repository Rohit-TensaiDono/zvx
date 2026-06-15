'use client';
/**
 * MechanicalCard — precision card with:
 *   • 3D perspective tilt (mouse tracking)
 *   • Specular glare chasing cursor
 *   • Corner reticles on hover
 *   • Scan line on entry
 *   • Optional href → entire card becomes a clickable link
 *   • data-accent attribute for CustomCursor colour detection
 */
import { useRef, useState, useCallback, useEffect } from 'react';
import Link from 'next/link';

export function MechanicalCard({
  children,
  className   = '',
  intensity   = 6,
  scanColor   = '#F0C85A',
  noTilt      = false,
  href        = null,        // make whole card a link
  accent      = null,        // passed to data-accent for cursor
  onClick     = null,
}) {
  const cardRef  = useRef(null);
  const rafRef   = useRef(null);
  const [hovered,  setHovered]  = useState(false);
  const [rot,      setRot]      = useState({ x: 0, y: 0 });
  const [glare,    setGlare]    = useState({ x: 50, y: 50 });
  const [scanning, setScanning] = useState(false);

  const onMove = useCallback((e) => {
    if (!cardRef.current || noTilt) return;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const r  = cardRef.current.getBoundingClientRect();
      const nx = (e.clientX - r.left)  / r.width  - 0.5;
      const ny = (e.clientY - r.top)   / r.height - 0.5;
      setRot({ x: -ny * intensity, y: nx * intensity });
      setGlare({ x: nx * 100 + 50, y: ny * 100 + 50 });
    });
  }, [intensity, noTilt]);

  const onEnter = useCallback(() => {
    setHovered(true);
    setScanning(true);
    setTimeout(() => setScanning(false), 700);
  }, []);

  const onLeave = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setHovered(false);
    setRot({ x: 0, y: 0 });
    setGlare({ x: 50, y: 50 });
  }, []);

  useEffect(() => () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); }, []);

  const tiltStyle = noTilt ? {} : {
    transform:     `perspective(900px) rotateX(${rot.x}deg) rotateY(${rot.y}deg)`,
    transition:    hovered ? 'transform 0.10s ease-out' : 'transform 0.55s ease-out',
    willChange:    'transform',
    transformStyle:'preserve-3d',
  };

  // Decide if we wrap in Link or plain div
  const Wrapper = href ? Link : 'div';
  const wrapperProps = href
    ? { href, className: `block h-full`, onClick }
    : onClick
      ? { className: 'h-full', onClick, role: 'button' }
      : { className: 'h-full' };

  return (
    <Wrapper {...wrapperProps}>
      <div
        ref={cardRef}
        className={`relative group/mcard ${className}`}
        data-interactive
        data-accent={accent || scanColor}
        onMouseMove={onMove}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        style={tiltStyle}
      >
        {/* Orbit border trace */}
        <div
          className="absolute inset-0 rounded-[inherit] pointer-events-none z-0
                     opacity-0 group-hover/mcard:opacity-100 transition-opacity duration-300"
          style={{
            padding: '1px',
            background: `conic-gradient(from var(--card-angle,0deg), transparent 0%, ${scanColor}55 25%, transparent 50%)`,
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
            animation: hovered ? 'card-orbit 3s linear infinite' : 'none',
          }}
        />

        {/* Specular glare */}
        <div
          className="absolute inset-0 rounded-[inherit] pointer-events-none z-20
                     opacity-0 group-hover/mcard:opacity-100 transition-opacity duration-200 overflow-hidden"
          style={{
            background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.055) 0%, transparent 55%)`,
          }}
        />

        {/* Scan line on entry */}
        <div
          className="absolute left-0 right-0 h-px pointer-events-none z-20 overflow-hidden"
          style={{
            top: '30%',
            opacity: scanning ? 1 : 0,
            animation: scanning ? 'scan-sweep 0.6s ease-out forwards' : 'none',
            background: `linear-gradient(90deg, transparent, ${scanColor}80, transparent)`,
            transition: 'opacity 0.2s',
          }}
        />

        {/* Corner reticles */}
        {[
          'top-0 left-0 border-t border-l',
          'top-0 right-0 border-t border-r',
          'bottom-0 left-0 border-b border-l',
          'bottom-0 right-0 border-b border-r',
        ].map((pos, i) => (
          <div
            key={i}
            className={`absolute w-3 h-3 pointer-events-none z-20 transition-all duration-300 ${pos}`}
            style={{
              borderColor: scanColor,
              opacity:    hovered ? 0.85 : 0,
              transform:  hovered ? 'scale(1)' : 'scale(0.4)',
              borderWidth: '1.5px',
            }}
          />
        ))}

        {/* Content */}
        <div className="relative z-10 h-full">{children}</div>
      </div>
    </Wrapper>
  );
}
