'use client';
import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { ChevronDown, Sparkles, Zap } from 'lucide-react';
import AnimatedParticles from '@/components/AnimatedParticles';
import { ROUTES } from '@/constants/routes';

const nav = anchor =>
  window.dispatchEvent(new CustomEvent('mesh-navigate', { detail: { anchor } }));

const up = (d = 0) => ({
  hidden:  { opacity: 0, y: 26, filter: 'blur(4px)' },
  visible: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.88, delay: d, ease: [0.16, 1, 0.3, 1] },
  },
});

export default function HeroSection() {
  const ctrl  = useAnimation();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Page load: mesh navigates to 'hero' face, then content appears
    nav('hero');
    const show = setTimeout(() => { setReady(true); ctrl.start('visible'); }, 350);
    return () => clearTimeout(show);
  }, [ctrl]);

  return (
    <section id="hero"
      className="relative h-screen flex items-center justify-center overflow-hidden">

      {/* Centre vignette */}
      <div className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 55% at 50% 50%, transparent 0%, rgba(11,11,12,0.52) 100%)',
        }}
      />

      {/* Fire sparkles */}
      {ready && (
        <div className="absolute inset-0 z-[2] overflow-hidden pointer-events-none">
          <AnimatedParticles count={26} />
        </div>
      )}

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">

        {/* Logo + aura */}
        <motion.div
          className="mb-8 flex justify-center"
          variants={{
            hidden:  { opacity: 0, scale: 0.82, y: 44 },
            visible: {
              opacity: 1, scale: 1, y: 0,
              transition: { duration: 1.15, ease: [0.16, 1, 0.3, 1] },
            },
          }}
          initial="hidden" animate={ctrl}
        >
          <div className="relative">
            <img src="/zvx-logo.png" alt="ZenVoraX"
              className="w-44 h-44 md:w-60 md:h-60 object-contain relative z-10
                         drop-shadow-[0_0_44px_rgba(240,200,90,0.28)]" />
            {/* Original gold/red aura — preserved */}
            <motion.div
              className="absolute inset-0 rounded-full blur-3xl z-0
                         bg-gradient-to-r from-[#F0C85A] via-[#D43C2F] to-[#F0C85A]"
              animate={{ scale: [1, 1.18, 1], opacity: [0.13, 0.40, 0.13] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute inset-[-18px] rounded-full blur-2xl z-0"
              style={{ background: 'radial-gradient(circle, #3BAAFF 0%, transparent 70%)' }}
              animate={{ scale: [1, 1.28, 1], opacity: [0.05, 0.17, 0.05] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
            />
          </div>
        </motion.div>

        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4 tracking-tight
                     bg-gradient-to-r from-[#c0c0c0] via-white to-[#c0c0c0]
                     bg-clip-text text-transparent"
          variants={up(0.85)} initial="hidden" animate={ctrl}
        >
          ZenVoraX
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl lg:text-3xl mb-3 font-light tracking-wide
                     bg-gradient-to-r from-[#F0C85A] to-[#D43C2F]
                     bg-clip-text text-transparent pb-1 leading-[1.2]"
          variants={up(1.05)} initial="hidden" animate={ctrl}
        >
          From Garage to Globe
        </motion.p>

        <motion.p
          className="text-gray-400 text-base md:text-lg mb-10
                     max-w-2xl mx-auto leading-relaxed"
          variants={up(1.22)} initial="hidden" animate={ctrl}
        >
          Pioneering AR wearables, edge AI, sustainable energy, robotics & drones.{' '}
          <span className="text-[#F0C85A]">Built from first principles.</span>
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center mb-14"
          variants={up(1.40)} initial="hidden" animate={ctrl}
        >
          <a href={ROUTES.sections.products}
            onClick={() => nav('products')}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full
                       font-semibold text-sm
                       bg-gradient-to-r from-[#F0C85A] to-[#f4d373] text-black
                       hover:shadow-[0_0_32px_rgba(240,200,90,0.45)]
                       transition-all duration-300 hover:scale-105">
            <Sparkles className="w-4 h-4" /> Explore Ecosystem
          </a>
          <a href={ROUTES.agency}
            onClick={() => nav('agency')}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full
                       font-semibold text-sm
                       border border-[#3BAAFF]/50 text-[#3BAAFF]
                       hover:bg-[#3BAAFF]/10
                       hover:shadow-[0_0_24px_rgba(59,170,255,0.25)]
                       transition-all duration-300 hover:scale-105">
            <Zap className="w-4 h-4" /> Work With Us
          </a>
        </motion.div>

        <motion.div
          className="flex flex-wrap gap-3 justify-center"
          variants={up(1.58)} initial="hidden" animate={ctrl}
        >
          {[
            { label: 'Founded',   value: '2024'          },
            { label: 'Verticals', value: '5+'            },
            { label: 'Products',  value: '9+'            },
            { label: 'Approach',  value: '1st Principles'},
          ].map(s => (
            <div key={s.label}
              className="px-4 py-2 rounded-full text-sm
                         bg-white/[0.06] border border-white/[0.10] backdrop-blur-sm">
              <span className="text-gray-500">{s.label}: </span>
              <span className="text-[#F0C85A] font-semibold">{s.value}</span>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.a href={ROUTES.sections.products}
        onClick={() => nav('products')}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }}>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <ChevronDown className="w-7 h-7 text-[#F0C85A]/60" />
        </motion.div>
      </motion.a>

      {/* Bottom gradient bridge — subtle, keeps mesh visible into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none z-10"
        style={{
          background:
            'linear-gradient(to bottom, transparent 0%, rgba(11,11,12,0.28) 60%, rgba(11,11,12,0.50) 100%)',
        }}
      />
    </section>
  );
}
