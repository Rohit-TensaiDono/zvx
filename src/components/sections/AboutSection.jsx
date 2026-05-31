'use client';
import React from 'react';
import { motion, useInView } from 'framer-motion';
import { Sparkles, Target, Zap, Shield } from 'lucide-react';

const values = [
  { icon: Sparkles, title: 'Innovation',  desc: 'First-principles engineering' },
  { icon: Shield,   title: 'Privacy',     desc: 'Offline-first by default'      },
  { icon: Target,   title: 'Precision',   desc: 'Silicon to software'           },
  { icon: Zap,      title: 'Impact',      desc: 'Global, from India'            },
];

const stats = [
  { val: '2024', lbl: 'Founded',    color: '#F0C85A' },
  { val: '5+',   lbl: 'Verticals', color: '#D43C2F' },
  { val: '8.2',  lbl: 'CGPA',      color: '#3BAAFF' },
  { val: '∞',    lbl: 'Scope',     color: '#c0c0c0' },
];

export default function AboutSection() {
  const ref     = React.useRef(null);
  const inView  = useInView(ref, { once: true, threshold: 0.1 });

  return (
    /* section-mid — slightly more transparent for visual rhythm */
    <section id="about" className="section-mid relative py-24 px-4">
      <div className="max-w-6xl mx-auto">

        <motion.div ref={ref} className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}>
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold
                           tracking-widest uppercase border mb-5
                           bg-[#D43C2F]/10 text-[#D43C2F] border-[#D43C2F]/20">
            Our Story
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5
                         bg-gradient-to-r from-[#F0C85A] via-[#D43C2F] to-[#F0C85A]
                         bg-clip-text text-transparent">
            From Garage to Globe
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left — copy + values */}
          <motion.div className="space-y-6"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}>
            <p className="text-lg text-gray-300 leading-relaxed">
              ZenVoraX was built on one belief:{' '}
              <span className="text-[#F0C85A] font-semibold">
                technology should be built from the ground up, not patched together.
              </span>
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              We're engineers first — designing PCBs, writing firmware, training models,
              and shipping products that span smart wearables, AI, energy, robotics,
              and aerial systems.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              {values.map((v, i) => (
                <motion.div key={v.title}
                  className="group p-4 rounded-xl border border-white/[0.06]
                             bg-white/[0.02] hover:border-[#F0C85A]/30
                             transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 + i * 0.1 }}>
                  <div className="w-10 h-10 mb-3 bg-gradient-to-br
                                  from-[#2a2a2e] to-[#1a1a1c] rounded-xl
                                  flex items-center justify-center
                                  border border-gray-700/50
                                  group-hover:border-[#F0C85A]/40 transition-all">
                    <v.icon className="w-5 h-5 text-[#F0C85A]" />
                  </div>
                  <h3 className="text-sm font-bold text-white mb-1">{v.title}</h3>
                  <p className="text-xs text-gray-500">{v.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right — stats card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}>
            <div className="relative card-surface rounded-3xl p-10
                            border border-gray-700/50 overflow-hidden">
              {/* Ambient glows */}
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
                <p className="text-gray-300 mb-8 text-lg">Founded with Vision</p>
                <div className="grid grid-cols-2 gap-6">
                  {stats.map(s => (
                    <div key={s.lbl}>
                      <div className="text-3xl font-bold mb-1" style={{ color: s.color }}>
                        {s.val}
                      </div>
                      <div className="text-xs text-gray-500 uppercase tracking-widest">
                        {s.lbl}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
