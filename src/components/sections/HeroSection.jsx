'use client';
import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { ChevronDown, Sparkles, Zap } from 'lucide-react';
import { Button } from '@/components/ui';
import AnimatedParticles from '@/components/AnimatedParticles';
import { ROUTES } from '@/constants/routes';

export default function HeroSection() {
  const [ready, setReady] = useState(false);
  const ctrl = useAnimation();

  useEffect(() => {
    const t = setTimeout(() => { setReady(true); ctrl.start('visible'); }, 400);
    return () => clearTimeout(t);
  }, [ctrl]);

  const up = (d = 0) => ({
    hidden:  { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0,
      transition: { duration: 0.9, delay: d, ease: [0.25, 0.46, 0.45, 0.94] } },
  });

  return (
    /* section-hero = transparent so the fixed mesh shows at full strength */
    <section id="hero" className="section-hero relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* Centre vignette — keeps text readable over the bright mesh */}
      <div className="absolute inset-0 z-[1] pointer-events-none
                      bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,
                        transparent_0%,rgba(11,11,12,0.55)_100%)]" />

      {/* Fire sparkles — render after hydration */}
      {ready && (
        <div className="absolute inset-0 z-[2] overflow-hidden pointer-events-none">
          <AnimatedParticles count={28} />
        </div>
      )}

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">

        {/* ── Logo + original aura (untouched) ── */}
        <motion.div
          className="mb-8 flex justify-center"
          variants={{
            hidden:  { opacity: 0, scale: 0.8, y: 50 },
            visible: { opacity: 1, scale: 1,   y: 0,
              transition: { duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] } },
          }}
          initial="hidden" animate={ctrl}
        >
          <div className="relative">
            <img
              src="/zvx-logo.png" alt="ZenVoraX"
              className="w-44 h-44 md:w-60 md:h-60 object-contain relative z-10
                         drop-shadow-[0_0_40px_rgba(240,200,90,0.35)]"
            />
            {/* Original gold/red aura */}
            <motion.div
              className="absolute inset-0 rounded-full blur-3xl z-0
                         bg-gradient-to-r from-[#F0C85A] via-[#D43C2F] to-[#F0C85A]"
              animate={{ scale: [1, 1.18, 1], opacity: [0.14, 0.40, 0.14] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />
            {/* Subtle blue outer ring */}
            <motion.div
              className="absolute inset-[-16px] rounded-full blur-2xl z-0"
              style={{ background: 'radial-gradient(circle, #3BAAFF 0%, transparent 70%)' }}
              animate={{ scale: [1, 1.28, 1], opacity: [0.06, 0.20, 0.06] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
            />
          </div>
        </motion.div>

        {/* Brand name */}
        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4
                     bg-gradient-to-r from-[#c0c0c0] via-white to-[#c0c0c0]
                     bg-clip-text text-transparent tracking-tight"
          variants={up(0.9)} initial="hidden" animate={ctrl}
        >
          ZenVoraX
        </motion.h1>

        {/* Tagline */}
        <motion.p
          className="text-xl md:text-2xl lg:text-3xl mb-3 font-light tracking-wide
                     bg-gradient-to-r from-[#F0C85A] to-[#D43C2F] bg-clip-text text-transparent"
          variants={up(1.1)} initial="hidden" animate={ctrl}
        >
          From Garage to Globe
        </motion.p>

        {/* Sub tagline */}
        <motion.p
          className="text-gray-400 text-base md:text-lg mb-10 max-w-2xl mx-auto leading-relaxed"
          variants={up(1.3)} initial="hidden" animate={ctrl}
        >
          Pioneering AR wearables, edge AI, sustainable energy, robotics & drones.{' '}
          <span className="text-[#F0C85A]">Built from first principles.</span>
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center mb-14"
          variants={up(1.55)} initial="hidden" animate={ctrl}
        >
          <Button variant="primary" size="lg" href={ROUTES.sections.products}>
            <Sparkles className="w-4 h-4" /> Explore Ecosystem
          </Button>
          <Button variant="blue" size="lg" href={ROUTES.agency}>
            <Zap className="w-4 h-4" /> Work With Us
          </Button>
        </motion.div>

        {/* Social proof pills */}
        <motion.div
          className="flex flex-wrap gap-3 justify-center"
          variants={up(1.8)} initial="hidden" animate={ctrl}
        >
          {[
            { label: 'Founded',   value: '2024' },
            { label: 'Verticals', value: '5+'   },
            { label: 'Products',  value: '9+'   },
            { label: 'Approach',  value: '1st Principles' },
          ].map(s => (
            <div key={s.label}
              className="px-4 py-2 rounded-full text-sm
                         bg-white/[0.06] border border-white/[0.10]
                         backdrop-blur-sm">
              <span className="text-gray-500">{s.label}: </span>
              <span className="text-[#F0C85A] font-semibold">{s.value}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.a href={ROUTES.sections.products}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.4 }}
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <ChevronDown className="w-7 h-7 text-[#F0C85A]/60" />
        </motion.div>
      </motion.a>
    </section>
  );
}
