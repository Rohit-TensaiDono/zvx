'use client';
import React from 'react';
import { Sparkles, Target, Zap, Shield, Cpu, Globe2 } from 'lucide-react';
import { MechanicalCard, HighlightText, RevealSection, RevealGroup, RevealItem } from '@/components/ui';

const values = [
  { icon: Sparkles, title: 'Innovation',    desc: 'First-principles engineering', nodeColor: '#F0C85A' },
  { icon: Shield,   title: 'Privacy',       desc: 'Offline-first by default',     nodeColor: '#3BAAFF' },
  { icon: Target,   title: 'Precision',     desc: 'Silicon to software',          nodeColor: '#D43C2F' },
  { icon: Zap,      title: 'Impact',        desc: 'Global, from India',           nodeColor: '#c0c0c0' },
];

const stats = [
  { val: '2024', lbl: 'Founded',    color: '#F0C85A' },
  { val: '5+',   lbl: 'Verticals', color: '#D43C2F' },
  { val: '9+',   lbl: 'Products',  color: '#3BAAFF' },
  { val: '∞',    lbl: 'Scope',     color: '#c0c0c0' },
];

/* Make in India badge */
function MakeInIndia() {
  return (
    <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full
                    border border-[#FF9933]/30 bg-[#FF9933]/08"
      style={{ background: 'rgba(255,153,51,0.08)' }}>
      {/* Tricolour dots */}
      <span className="flex gap-1">
        <span className="w-2.5 h-2.5 rounded-full bg-[#FF9933]" />
        <span className="w-2.5 h-2.5 rounded-full bg-white" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#138808]" />
      </span>
      <span className="text-xs font-bold tracking-widest uppercase text-white/80">
        Make in India
      </span>
      <Cpu className="w-3.5 h-3.5 text-[#FF9933]" />
    </div>
  );
}

export default function AboutSection() {
  return (
    <section id="about" className="section relative">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <RevealSection anchor="about" className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold
                           tracking-widest uppercase border mb-5
                           bg-[#D43C2F]/10 text-[#D43C2F] border-[#D43C2F]/20">
            Our Story
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4
                         bg-gradient-to-r from-[#F0C85A] via-[#D43C2F] to-[#F0C85A]
                         bg-clip-text text-transparent leading-[1.18] pb-2">
            From Garage to Globe
          </h2>
          <MakeInIndia />
        </RevealSection>

        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Left — copy + values */}
          <RevealSection anchor="about" delay={0.05} className="space-y-6">
            <p className="text-lg text-gray-300 leading-relaxed">
              ZenVoraX was born in India with a single conviction:{' '}
              <HighlightText color="#F0C85A">
                technology should be built from the ground up, not assembled from imports.
              </HighlightText>
            </p>
            <p className="text-gray-400 leading-relaxed">
              We're a deep-tech startup building indigenous AR wearables, edge AI systems,
              sustainable energy solutions, robotics, and drone platforms — entirely designed
              and engineered in India. From PCB layouts to model training, every layer is ours.
            </p>

            {/* Make in India detail */}
            <div className="flex gap-3 p-4 rounded-xl border border-[#FF9933]/20
                            bg-gradient-to-r from-[#FF9933]/05 to-transparent">
              <Globe2 className="w-5 h-5 text-[#FF9933] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-white mb-1">
                  Proudly Built in India, Designed for the World
                </p>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Aligned with the Make in India and Atmanirbhar Bharat initiative —
                  ZenVoraX is committed to indigenous innovation across hardware, AI,
                  and deep tech. Our products are designed to compete globally while
                  keeping R&D, manufacturing intent, and IP rooted in India.
                </p>
              </div>
            </div>

            {/* Value cards */}
            <RevealGroup anchor="about" className="grid grid-cols-2 gap-4 pt-2" stagger={0.09}>
              {values.map(v => (
                <RevealItem key={v.title} nodeColor={v.nodeColor}>
                  <MechanicalCard
                    className="p-4 rounded-xl glass-card h-full"
                    scanColor={v.nodeColor}
                    accent={v.nodeColor}
                    intensity={4}
                  >
                    <div className="w-10 h-10 mb-3 rounded-xl flex items-center justify-center
                                    bg-gradient-to-br from-[#2a2a2e] to-[#1a1a1c]
                                    border border-gray-700/50
                                    group-hover/mcard:border-[#F0C85A]/40
                                    group-hover/mcard:shadow-[0_0_16px_rgba(240,200,90,0.12)]
                                    transition-all duration-300">
                      <v.icon className="w-5 h-5 text-[#F0C85A]
                                         group-hover/mcard:scale-110 transition-transform duration-300" />
                    </div>
                    <h3 className="text-sm font-bold text-white mb-1">{v.title}</h3>
                    <p className="text-xs text-gray-500">{v.desc}</p>
                  </MechanicalCard>
                </RevealItem>
              ))}
            </RevealGroup>
          </RevealSection>

          {/* Right — stats card */}
          <RevealItem nodeColor="#F0C85A">
            <MechanicalCard
              className="glass-card rounded-3xl p-10 overflow-hidden"
              scanColor="#F0C85A"
              intensity={3}
            >
              <div className="absolute inset-0 rounded-3xl pointer-events-none
                              bg-[radial-gradient(circle_at_30%_30%,rgba(240,200,90,0.07)_0%,transparent_55%)]" />
              <div className="absolute inset-0 rounded-3xl pointer-events-none
                              bg-[radial-gradient(circle_at_70%_70%,rgba(59,170,255,0.05)_0%,transparent_55%)]" />

              <div className="relative z-10 text-center">
                <div className="text-7xl font-bold mb-2
                                bg-gradient-to-r from-[#F0C85A] to-[#D43C2F]
                                bg-clip-text text-transparent">
                  2024
                </div>
                <p className="text-gray-300 mb-1 text-lg">Founded with Vision</p>
                <p className="text-xs text-gray-600 mb-8 tracking-widest uppercase">
                  Chandigarh, India
                </p>

                {/* Tricolour accent line */}
                <div className="flex h-0.5 rounded-full overflow-hidden mb-8 mx-auto w-2/3">
                  <div className="flex-1 bg-[#FF9933]" />
                  <div className="flex-1 bg-white/60" />
                  <div className="flex-1 bg-[#138808]" />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  {stats.map(s => (
                    <div key={s.lbl}>
                      <div className="text-3xl font-bold mb-1
                                      group-hover/mcard:scale-105 transition-transform duration-300"
                        style={{ color: s.color }}>
                        {s.val}
                      </div>
                      <div className="text-xs text-gray-500 uppercase tracking-widest">{s.lbl}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-white/[0.06]">
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Aligned with{' '}
                    <span className="text-[#FF9933]">Make in India</span>
                    {' '}·{' '}
                    <span className="text-white/40">Atmanirbhar Bharat</span>
                    {' '}·{' '}
                    <span className="text-[#3BAAFF]">Startup India</span>
                  </p>
                </div>
              </div>
            </MechanicalCard>
          </RevealItem>

        </div>
      </div>
    </section>
  );
}
