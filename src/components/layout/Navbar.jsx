'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { productDropdown, mainLinks } from '@/data/navigation';
import { ROUTES } from '@/constants/routes';

export default function Navbar() {
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [prodOpen, setProdOpen]     = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY < 60);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: scrolled ? 1 : 0.96 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out ${
          scrolled ? 'bg-[#0B0B0C]/90 backdrop-blur-xl shadow-2xl' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href={ROUTES.home} className="flex items-center gap-3 group">
              <img src="/zvx-logo.png" alt="ZVX"
                className="w-9 h-9 object-contain group-hover:drop-shadow-[0_0_8px_rgba(240,200,90,0.6)] transition-all duration-300" />
              <span className="text-lg font-bold bg-gradient-to-r from-[#c0c0c0] to-white bg-clip-text text-transparent tracking-wide">
                ZenVoraX
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-1">
              {/* Products dropdown */}
              <div className="relative" onMouseEnter={() => setProdOpen(true)} onMouseLeave={() => setProdOpen(false)}>
                <button className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors rounded-lg hover:bg-white/[0.05]">
                  Products
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${prodOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {prodOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.97 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 mt-1 w-64 bg-[#141416] border border-white/[0.08] rounded-xl overflow-hidden shadow-2xl"
                    >
                      {productDropdown.map(p => (
                        <Link key={p.name} href={p.href}
                          className="flex flex-col px-4 py-3 hover:bg-white/[0.05] transition-colors group/item border-b border-white/[0.04] last:border-0">
                          <span className="text-sm font-semibold text-white group-hover/item:text-[#F0C85A] transition-colors">{p.name}</span>
                          <span className="text-xs text-gray-500 mt-0.5">{p.desc}</span>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {mainLinks.map(l => (
                <Link key={l.name} href={l.href}
                  className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors rounded-lg hover:bg-white/[0.05]">
                  {l.name}
                </Link>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-3">
              <Link href={ROUTES.agency}
                className="px-4 py-2 text-sm font-semibold rounded-full border border-[#F0C85A]/40 text-[#F0C85A] hover:bg-[#F0C85A]/10 transition-all duration-200">
                Start a Project
              </Link>
            </div>

            <button className="md:hidden p-2 text-gray-300 hover:text-white" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed top-16 left-0 right-0 z-40 bg-[#0B0B0C]/95 backdrop-blur-xl md:hidden overflow-hidden"
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {productDropdown.map(p => (
                <Link key={p.name} href={p.href} onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 text-sm text-gray-300 hover:text-white rounded-lg hover:bg-white/[0.05] transition-colors">
                  {p.name}
                </Link>
              ))}
              <div className="h-px bg-white/[0.06] my-2" />
              {mainLinks.map(l => (
                <Link key={l.name} href={l.href} onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 text-sm text-gray-300 hover:text-white rounded-lg hover:bg-white/[0.05]">
                  {l.name}
                </Link>
              ))}
              <Link href={ROUTES.agency} onClick={() => setMobileOpen(false)}
                className="mt-2 text-center px-4 py-3 rounded-full border border-[#F0C85A]/40 text-[#F0C85A] text-sm font-semibold">
                Start a Project
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
