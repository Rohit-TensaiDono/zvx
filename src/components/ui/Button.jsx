'use client';
/**
 * Button — reusable CTA primitive.
 * Renders <a> when href is provided, <button> otherwise.
 */
import { forwardRef } from 'react';
import Link from 'next/link';

const variants = {
  primary: 'bg-gradient-to-r from-[#F0C85A] to-[#f4d373] text-black hover:shadow-[0_0_30px_rgba(240,200,90,0.4)] hover:scale-105',
  ghost:   'border border-white/20 text-white hover:bg-white/[0.05]',
  gold:    'border border-[#F0C85A]/40 text-[#F0C85A] hover:bg-[#F0C85A]/10',
  blue:    'border border-[#3BAAFF]/50 text-[#3BAAFF] hover:bg-[#3BAAFF]/10 hover:shadow-[0_0_20px_rgba(59,170,255,0.2)] hover:scale-105',
  danger:  'border border-[#D43C2F]/40 text-[#D43C2F] hover:bg-[#D43C2F]/10',
};

const sizes = {
  sm: 'px-4 py-2   text-xs gap-1.5',
  md: 'px-6 py-3   text-sm gap-2',
  lg: 'px-8 py-3.5 text-base gap-2',
};

export const Button = forwardRef(function Button(
  { variant = 'primary', size = 'md', href, external, children, className = '', ...rest },
  ref
) {
  const base = `inline-flex items-center justify-center font-semibold rounded-full
                transition-all duration-200 ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return external
      ? <a ref={ref} href={href} className={base} target="_blank" rel="noopener noreferrer" {...rest}>{children}</a>
      : <Link ref={ref} href={href} className={base} {...rest}>{children}</Link>;
  }
  return <button ref={ref} className={base} {...rest}>{children}</button>;
});
