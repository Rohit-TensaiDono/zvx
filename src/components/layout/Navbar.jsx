'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { productDropdown, mainLinks } from '@/data/navigation';
import { ROUTES } from '@/constants/routes';

const nav = (anchor = 'hero') =>
  window.dispatchEvent(new CustomEvent('mesh-navigate', { detail: { anchor } }));

const hrefToAnchor = {
  [ROUTES.home]:              'hero',
  [ROUTES.agency]:            'agency',
  [ROUTES.products.bess]:     'bess',
  [ROUTES.products.rvak]:     'rvak',
  [ROUTES.sections.products]: 'products',
  [ROUTES.sections.about]:    'about',
  [ROUTES.sections.contact]:  'contact',
};

export default function Navbar() {
  const [scrolled,   setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [prodOpen,   setProdOpen]   = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const handleLink = href => nav(hrefToAnchor[href] || 'hero');

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`
          fixed top-0 left-0 right-0 z-50
          border-b transition-colors duration-500
          ${scrolled
            ? 'bg-[#0B0B0C]/88 backdrop-blur-xl border-white/[0.07] shadow-2xl'
            : 'bg-transparent border-transparent'
          }
        `}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link href={ROUTES.home} onClick={() => handleLink(ROUTES.home)}
              className="flex items-center gap-3 group">
              <img src="/zvx-logo.png" alt="ZVX"
                className="w-9 h-9 object-contain
                           group-hover:drop-shadow-[0_0_8px_rgba(240,200,90,0.6)]
                           transition-all duration-300" />
              <span className="text-lg font-bold tracking-wide
                               bg-gradient-to-r from-[#c0c0c0] to-white
                               bg-clip-text text-transparent">
                ZenVoraX
              </span>
            </Link>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-1">
              <div className="relative"
                onMouseEnter={() => setProdOpen(true)}
                onMouseLeave={() => setProdOpen(false)}>
                <button className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium
                                   text-gray-300 hover:text-white transition-colors
                                   rounded-lg hover:bg-white/[0.05]">
                  Products
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200
                    ${prodOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {prodOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 6, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.97 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 mt-2 w-64
                                 bg-[#141416]/96 backdrop-blur-xl
                                 border border-white/[0.08] rounded-xl
                                 overflow-hidden shadow-2xl"
                    >
                      {productDropdown.map(p => (
                        <Link key={p.name} href={p.href}
                          onClick={() => handleLink(p.href)}
                          className="flex flex-col px-4 py-3 hover:bg-white/[0.05]
                                     transition-colors group/item
                                     border-b border-white/[0.04] last:border-0">
                          <span className="text-sm font-semibold text-white
                                           group-hover/item:text-[#F0C85A] transition-colors">
                            {p.name}
                          </span>
                          <span className="text-xs text-gray-500 mt-0.5">{p.desc}</span>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {mainLinks.map(l => (
                <Link key={l.name} href={l.href}
                  onClick={() => handleLink(l.href)}
                  className="px-4 py-2 text-sm font-medium text-gray-300
                             hover:text-white transition-colors
                             rounded-lg hover:bg-white/[0.05]">
                  {l.name}
                </Link>
              ))}
            </div>

            <div className="hidden md:flex">
              <Link href={ROUTES.agency}
                onClick={() => handleLink(ROUTES.agency)}
                className="px-4 py-2 text-sm font-semibold rounded-full
                           border border-[#F0C85A]/40 text-[#F0C85A]
                           hover:bg-[#F0C85A]/10 transition-all duration-200">
                Start a Project
              </Link>
            </div>

            <button className="md:hidden p-2 text-gray-300 hover:text-white transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu — border is INSIDE the animated container so it
          doesn't appear as a thin line when height collapses to 0      */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-16 left-0 right-0 z-40 md:hidden overflow-hidden
                       bg-[#0B0B0C]/95 backdrop-blur-xl"
          >
            {/* Inner wrapper carries the border — only visible when menu is open */}
            <div className="border-b border-white/[0.06] px-4 py-4 flex flex-col gap-1">
              {productDropdown.map(p => (
                <Link key={p.name} href={p.href}
                  onClick={() => { setMobileOpen(false); handleLink(p.href); }}
                  className="px-4 py-3 text-sm text-gray-300 hover:text-white
                             rounded-lg hover:bg-white/[0.05] transition-colors">
                  {p.name}
                </Link>
              ))}
              <div className="h-px bg-white/[0.06] my-2" />
              {mainLinks.map(l => (
                <Link key={l.name} href={l.href}
                  onClick={() => { setMobileOpen(false); handleLink(l.href); }}
                  className="px-4 py-3 text-sm text-gray-300 hover:text-white
                             rounded-lg hover:bg-white/[0.05]">
                  {l.name}
                </Link>
              ))}
              <Link href={ROUTES.agency}
                onClick={() => { setMobileOpen(false); handleLink(ROUTES.agency); }}
                className="mt-2 text-center px-4 py-3 rounded-full
                           border border-[#F0C85A]/40 text-[#F0C85A] text-sm font-semibold">
                Start a Project
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
