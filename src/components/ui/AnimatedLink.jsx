'use client';
/**
 * AnimatedLink — premium interactive links.
 *
 * Variants:
 *   'underline'  draw-from-left underline + arrow shift    (default)
 *   'shimmer'    gold shimmer wash across text on hover
 *   'glow'       radial glow pulse on hover
 *   'magnetic'   slight Y-shift toward cursor on hover
 *
 * Usage:
 *   <AnimatedLink href="/products/rvak" icon={ArrowRight}>
 *     View Details
 *   </AnimatedLink>
 *
 *   <AnimatedLink variant="shimmer" color="#3BAAFF">
 *     Learn More
 *   </AnimatedLink>
 */
import { useRef, useState } from 'react';
import Link from 'next/link';

export function AnimatedLink({
  children,
  href,
  icon: Icon,
  variant = 'underline',
  color = '#F0C85A',
  className = '',
  external = false,
  ...props
}) {
  const ref = useRef(null);
  const [magnetY, setMagnetY] = useState(0);

  const onMove = (e) => {
    if (variant !== 'magnetic' || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const ny = ((e.clientY - r.top) / r.height - 0.5) * 6;
    setMagnetY(ny);
  };
  const onLeave = () => setMagnetY(0);

  const base = `group/alink inline-flex items-center gap-1.5 font-semibold
                text-sm transition-colors duration-200 relative cursor-pointer`;

  const inner = (
    <>
      {/* Text with optional shimmer */}
      <span
        className={`relative ${variant === 'shimmer' ? 'shimmer-text' : ''}`}
        style={{ color }}
      >
        {children}

        {/* Draw-from-left underline */}
        {variant === 'underline' && (
          <span
            className="absolute bottom-0 left-0 h-px w-0 group-hover/alink:w-full
                       transition-all duration-300 ease-out rounded-full"
            style={{ background: color }}
          />
        )}

        {/* Glow pulse */}
        {variant === 'glow' && (
          <span
            className="absolute inset-0 rounded opacity-0 group-hover/alink:opacity-100
                       transition-opacity duration-300 blur-md pointer-events-none"
            style={{ background: color, opacity: 0 }}
          />
        )}
      </span>

      {/* Arrow / icon — shifts right on hover */}
      {Icon && (
        <Icon
          className="w-3.5 h-3.5 flex-shrink-0
                     transition-transform duration-300 ease-out
                     group-hover/alink:translate-x-1.5"
          style={{ color }}
        />
      )}
    </>
  );

  const style = {
    transform: `translateY(${magnetY}px)`,
    transition: variant === 'magnetic'
      ? 'transform 0.2s ease-out'
      : undefined,
  };

  if (!href) {
    return (
      <span ref={ref} className={`${base} ${className}`} style={style}
        onMouseMove={onMove} onMouseLeave={onLeave} {...props}>
        {inner}
      </span>
    );
  }

  if (external) {
    return (
      <a ref={ref} href={href} target="_blank" rel="noopener noreferrer"
        className={`${base} ${className}`} style={style}
        onMouseMove={onMove} onMouseLeave={onLeave} {...props}>
        {inner}
      </a>
    );
  }

  return (
    <Link ref={ref} href={href}
      className={`${base} ${className}`} style={style}
      onMouseMove={onMove} onMouseLeave={onLeave} {...props}>
      {inner}
    </Link>
  );
}

/**
 * HighlightText — inline text that gets a gold underline wash on hover.
 * Use for section subheadings, pull-quotes, feature names.
 */
export function HighlightText({ children, color = '#F0C85A', className = '' }) {
  return (
    <span
      className={`relative group/hl inline-block cursor-default ${className}`}
      style={{ color }}
    >
      {children}
      <span
        className="absolute bottom-0 left-0 h-px w-0 group-hover/hl:w-full
                   transition-all duration-500 ease-out"
        style={{ background: `linear-gradient(90deg, ${color}, transparent)` }}
      />
    </span>
  );
}
