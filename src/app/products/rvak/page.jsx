'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Radio, Camera, Glasses, Pencil, ArrowRight } from 'lucide-react';

const products = [
  {
    id: 'astral', name: 'R-VAK Astral', tier: 'Entry Grade', icon: Radio, color: '#F0C85A',
    tagline: 'Hear the future, speak commands.',
    desc: 'The entry-level R-VAK experience — lightweight frames with crystal-clear audio and always-on AI voice assistant. Built for everyday professionals who want smarter audio without screen distraction.',
    specs: [['Form Factor','Lightweight wraparound frame'],['Audio','Dual speaker + directional mic array'],['AI','Voice-activated edge inference'],['Connectivity','Bluetooth 5.2, USB-C'],['Battery','12hr continuous, 20hr standby'],['Weight','32g'],],
    image: '/images/rvak.jpg',
    video: '/videos/astral.mp4',          // ← ADD THIS
  },
  {
    id: 'spectral', name: 'R-VAK Spectral', tier: 'Mid Range', icon: Camera, color: '#D43C2F',
    tagline: 'See what AI sees.',
    desc: 'Spectral adds a high-resolution camera array to the Astral foundation. Real-time object recognition, live scene analysis, and AI-powered visual assistance — hands-free, always-on.',
    specs: [['Camera','12MP wide + depth sensor'],['AI','On-device visual inference, INT8'],['Display','Side OLED notification strip'],['Connectivity','BT 5.2, WiFi 6, USB-C'],['Battery','8hr active, 16hr standby'],['Weight','41g'],],
    image: '/images/rvak-banner.jpg',
    video: '/videos/spectral.mp4',         // ← ADD THIS
  },
  {
    id: 'orion', name: 'R-VAK Orion', tier: 'Flagship', icon: Glasses, color: '#3BAAFF',
    tagline: 'The full augmented reality experience.',
    desc: 'Orion is the flagship — full AR waveguide projection, 4K camera, neural sync, and haptic feedback. The complete platform for spatial computing on the ZenVoraX R-VAK kernel.',
    specs: [['Display','Binocular AR waveguide, 40° FOV'],['Camera','4K + depth + IR array'],['Processor','Custom NPU, 12 TOPS'],['Connectivity','BT 5.3, WiFi 6E, UWB'],['Battery','6hr AR-active, 14hr standby'],['Weight','58g'],],
    image: '/images/rvak.jpg',
    badge: 'Coming Soon',
    video: '/videos/orion.mp4',            // ← ADD THIS
  },
  {
    id: 'athena', name: 'R-VAK Athena', tier: 'Smart Pen', icon: Pencil, color: '#c0c0c0',
    tagline: 'Write analog. Live digital.',
    desc: 'Athena is the missing link between physical writing and digital productivity. A real ink ballpoint pen with a 6-axis gyroscope that tracks every stroke and syncs handwritten notes — automatically — to any connected device.',
    specs: [['Tracking','6-axis IMU gyroscope'],['Sync','BLE 5.2, sub-100ms latency'],['Ink','Universal replaceable ballpoint cartridge'],['Battery','3-month CR2016 coin cell'],['Companion App','Android & iOS (coming)'],['Weight','14g'],],
    image: null,
    badge: 'Prototype',
    video: '/videos/athena.mp4',           // ← ADD THIS
  },
];

export default function RVAKPage() {
  return (
    <div className="min-h-screen  text-white overflow-x-hidden">

      {/* Hero */}
      <section className="relative pt-32 pb-16 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_50%_at_50%_30%,rgba(240,200,90,0.08)_0%,transparent_70%)]" />
        <div className="absolute inset-0"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px)', backgroundSize:'64px 64px' }} />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}>
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase bg-[#F0C85A]/10 text-[#F0C85A] border border-[#F0C85A]/20 mb-5">Smart Wearables</span>
            <h1 className="text-4xl md:text-6xl font-bold mb-3 text-white">R-VAK <span className="bg-gradient-to-r from-[#F0C85A] to-[#D43C2F] bg-clip-text text-transparent">Ecosystem</span></h1>
            <p className="text-base text-[#F0C85A]/70 font-light tracking-widest mb-5 uppercase text-sm">Real-time Virtual Assistance Kernel</p>
            <p className="text-lg text-gray-400 max-w-xl mx-auto">Four devices. One kernel. A complete family of AI-powered smart glasses and wearable input tools built on the R-VAK platform.</p>
          </motion.div>
        </div>
      </section>

      {/* Products */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto space-y-8">
          {products.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div key={p.id} id={p.id}
                initial={{ opacity:0, y:40 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true, amount: 0 }} transition={{ duration:0.7 }}
                className="rounded-2xl overflow-hidden border border-white/[0.07] bg-gradient-to-br from-[#1a1a1c] to-[#111114] hover:border-white/[0.13] transition-all"
              >
                <div className={`grid md:grid-cols-2 ${i % 2 === 1 ? 'md:[&>*:first-child]:order-2' : ''}`}>
                  {/* Image / Video */}
                    <div className="relative h-56 md:h-auto min-h-[220px] overflow-hidden group">
                      {p.video ? (
                        <video
                          src={p.video}
                          muted
                          loop
                          playsInline
                          preload="metadata"
                          className="w-full h-full object-cover opacity-60 group-hover:opacity-85 transition-opacity duration-500"
                          onMouseEnter={(e) => e.currentTarget.play()}
                          onMouseLeave={(e) => { e.currentTarget.pause(); e.currentTarget.currentTime = 0; }}
                        />
                      ) : p.image ? (
                        <img src={p.image} alt={p.name} className="w-full h-full object-cover opacity-60" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center"
                          style={{ background:`radial-gradient(circle at 50% 50%, ${p.color}15 0%, #111114 70%)` }}>
                          <Icon className="w-20 h-20 opacity-20" style={{ color:p.color }} />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#111114] pointer-events-none" />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase"
                        style={{ background:`${p.color}22`, color:p.color, border:`1px solid ${p.color}44` }}>
                        {p.tier}
                      </span>
                      {p.badge && (
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-white/[0.08] text-gray-300 border border-white/[0.1]">
                          {p.badge}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                        style={{ background:`${p.color}18`, border:`1px solid ${p.color}33` }}>
                        <Icon className="w-4 h-4" style={{ color:p.color }} />
                      </div>
                      <h2 className="text-2xl font-bold text-white">{p.name}</h2>
                    </div>
                    <p className="text-sm italic mb-4" style={{ color:p.color }}>{p.tagline}</p>
                    <p className="text-sm text-gray-400 leading-relaxed mb-6">{p.desc}</p>
                    <div className="grid grid-cols-2 gap-x-6 gap-y-2 mb-6">
                      {p.specs.map(([k,v]) => (
                        <div key={k} className="text-xs">
                          <span className="text-gray-600">{k}: </span>
                          <span className="text-gray-300">{v}</span>
                        </div>
                      ))}
                    </div>
                    <a href="/#contact" className="inline-flex items-center gap-2 text-sm font-semibold transition-colors group/lnk" style={{ color:p.color }}>
                      Register Interest <ArrowRight className="w-4 h-4 group-hover/lnk:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

    </div>
  );
}
