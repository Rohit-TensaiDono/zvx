'use client';
/**
 * Badge — pill label primitive.
 * color prop accepts any CSS color string (use theme colors).
 */
export function Badge({ children, color = '#F0C85A', size = 'md', className = '' }) {
  const sizes = { sm: 'px-2 py-0.5 text-[10px]', md: 'px-2.5 py-1 text-[10px]', lg: 'px-3 py-1 text-xs' };
  return (
    <span
      className={`inline-flex items-center font-bold tracking-widest uppercase rounded-full ${sizes[size]} ${className}`}
      style={{ background: `${color}22`, color, border: `1px solid ${color}44` }}
    >
      {children}
    </span>
  );
}
