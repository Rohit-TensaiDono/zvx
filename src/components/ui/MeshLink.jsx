'use client';
/**
 * MeshLink — Next.js Link wrapper that fires 'mesh-breathe'
 * before navigation so the neural field responds to every
 * intentional user action, not just scroll reveals.
 *
 * direction:
 *   'down'    — user is going deeper in the page (default)
 *   'up'      — user is going back / upward
 *   'forward' — navigating to a new route (agency, product pages)
 */
import Link from 'next/link';

export function MeshLink({
  href,
  direction = 'forward',
  children,
  className = '',
  ...props
}) {
  const handleClick = () => {
    window.dispatchEvent(
      new CustomEvent('mesh-breathe', { detail: { direction } })
    );
  };

  return (
    <Link href={href} className={className} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
}
