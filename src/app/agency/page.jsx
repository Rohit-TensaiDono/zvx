'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Globe, Bot, Cpu, TrendingUp, Wand2, Palette, Video, Zap, Check, Send } from 'lucide-react';
import { services, processSteps } from '@/data/services';

/* ── Icon map ─────────────────────────────────────────────────── */
const ICONS = { Globe, Bot, Cpu, TrendingUp, Wand2, Palette, Video, Zap };

/* ── Service card ─────────────────────────────────────────────── */
function ServiceCard({ s, i }) {
  const Icon = ICONS[s.iconName] || Globe;
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: i * 0.06 }}
      className={`group relative rounded-2xl overflow-hidden border transition-all duration-500 hover:scale-[1.015] ${
        s.featured
          ? 'border-[#F0C85A]/30 bg-gradient-to-br from-[#1e1c12] to-[#111114]'
          : 'border-white/[0.07] bg-gradient-to-br from-[#1a1a1c] to-[#111114] hover:border-white/[0.14]'
      }`}
    >
      {s.featured && (
        <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-[#F0C85A]/20 text-[#F0C85A] border border-[#F0C85A]/30">
          ✦ New
        </div>
      )}
      <div className="p-6">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
          style={{ background: `${s.color}18`, border: `1px solid ${s.color}33` }}>
          <Icon className="w-5 h-5" style={{ color: s.color }} />
        </div>
        <p className="text-[10px] font-bold tracking-widest uppercase mb-1" style={{ color: s.color }}>{s.subtitle}</p>
        <h3 className="text-xl font-bold text-white mb-3">{s.title}</h3>
        <p className="text-sm text-gray-400 leading-relaxed mb-5">{s.desc}</p>
        <ul className="space-y-2 mb-5">
          {s.offerings.map(o => (
            <li key={o} className="flex items-center gap-2 text-xs text-gray-500">
              <Check className="w-3 h-3 flex-shrink-0" style={{ color: s.color }} />
              {o}
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-between pt-4 border-t border-white/[0.05]">
          <span className="text-xs text-gray-600">⏱ {s.turnaround}</span>
          <a href="#contact"
            className="flex items-center gap-1 text-xs font-semibold group/lnk transition-colors"
            style={{ color: s.color }}>
            Get Quote <ArrowRight className="w-3 h-3 group-hover/lnk:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Page ─────────────────────────────────────────────────────── */
export default function AgencyPage() {
  const [sent, setSent] = useState(false);

  return (
    <>
      {/* Hero — global ScrollMesh shows through as background */}
      <section className="section-hero relative min-h-[82vh] flex items-center justify-center overflow-hidden pt-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_40%,rgba(59,170,255,0.06)_0%,transparent_70%)] z-[1]" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase bg-[#3BAAFF]/10 text-[#3BAAFF] border border-[#3BAAFF]/20 mb-6">
              ZenVoraX Agency
            </span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="text-5xl md:text-7xl font-bold mb-5 leading-tight">
            <span className="bg-gradient-to-r from-white via-[#c0c0c0] to-white bg-clip-text text-transparent">We Build.</span>
            <br />
            <span className="bg-gradient-to-r from-[#F0C85A] to-[#D43C2F] bg-clip-text text-transparent">You Scale.</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="text-lg text-gray-400 mb-10 max-w-xl mx-auto">
            Web, AI, IoT, automation, AI-generated ads, marketing, branding, and content — end to end.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.45 }}
            className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#services"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-[#F0C85A] to-[#f4d373] text-black font-bold rounded-full hover:shadow-[0_0_30px_rgba(240,200,90,0.4)] transition-all hover:scale-105 text-sm">
              Explore Services <ArrowRight className="w-4 h-4" />
            </a>
            <a href="#contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/20 text-white font-semibold rounded-full hover:bg-white/[0.05] transition-all text-sm">
              Get a Free Quote
            </a>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
            className="flex flex-wrap gap-2 justify-center mt-10">
            {['Web Dev', 'AI Solutions', 'IoT', 'Automation', 'AI Ads ✦', 'Marketing', 'Branding', 'Content'].map(t => (
              <span key={t} className="px-3 py-1 rounded-full text-xs text-gray-400 bg-white/[0.04] border border-white/[0.07]">{t}</span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats bar */}
      <div className="border-y border-white/[0.05] bg-[#0e0e10] relative z-10">
        <div className="max-w-5xl mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { val: '8',  lbl: 'Service Areas',     color: '#F0C85A' },
            { val: '7d', lbl: 'Fastest Turnaround', color: '#3BAAFF' },
            { val: '∞',  lbl: 'Scale Potential',   color: '#D43C2F' },
            { val: '1',  lbl: 'Point of Contact',  color: '#c0c0c0' },
          ].map(s => (
            <div key={s.lbl}>
              <div className="text-3xl font-bold mb-1" style={{ color: s.color }}>{s.val}</div>
              <div className="text-xs text-gray-500 uppercase tracking-widest">{s.lbl}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Services grid */}
      <section id="services" className="py-24 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase bg-[#F0C85A]/10 text-[#F0C85A] border border-[#F0C85A]/20 mb-5">
              Services
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">What We Do</h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Eight service areas. One team. Engineers who understand your problem at the silicon level.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((s, i) => <ServiceCard key={s.id} s={s} i={i} />)}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 px-4 bg-[#0e0e10] border-y border-white/[0.05] relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">How We Work</h2>
            <p className="text-gray-400">From brief to live — fast, transparent, and accountable.</p>
          </div>
          <div className="grid md:grid-cols-4 gap-px bg-white/[0.04] rounded-2xl overflow-hidden border border-white/[0.05]">
            {processSteps.map((p, i) => (
              <motion.div key={p.step}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-[#0e0e10] p-7 hover:bg-[#141416] transition-colors">
                <div className="text-5xl font-bold text-white/[0.06] mb-4 leading-none">{p.step}</div>
                <h3 className="text-base font-bold text-white mb-2">{p.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Ads spotlight */}
      <section className="py-20 px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="rounded-3xl overflow-hidden border border-[#F0C85A]/20 bg-gradient-to-br from-[#1a1a12] to-[#111114] p-8 md:p-12 relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(240,200,90,0.06)_0%,transparent_60%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(59,170,255,0.04)_0%,transparent_60%)]" />
            <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
              <div>
                <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-[#F0C85A]/15 text-[#F0C85A] border border-[#F0C85A]/25 mb-5">
                  ✦ New Service
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">AI-Generated Ads at Scale</h2>
                <p className="text-gray-400 leading-relaxed mb-6">
                  Generate hundreds of ad creatives, copy variations, and audience-targeted campaigns using AI.
                  Test in 3 days what used to take 3 months. Integrates with Meta, Google, and LinkedIn.
                </p>
                <ul className="space-y-2 mb-8">
                  {['100s of creatives in 48 hours', 'Multi-format: static, video, carousel',
                    'A/B test automation built-in', 'Performance feedback loop to AI model'].map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F0C85A] flex-shrink-0" />{f}
                    </li>
                  ))}
                </ul>
                <a href="#contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#F0C85A] to-[#f4d373] text-black font-bold text-sm hover:shadow-[0_0_24px_rgba(240,200,90,0.4)] transition-all">
                  Get AI Ads Quote <ArrowRight className="w-4 h-4" />
                </a>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Creatives/Day', value: '100+', color: '#F0C85A' },
                  { label: 'Platforms',     value: '3',    color: '#3BAAFF' },
                  { label: 'Test Variants', value: '∞',    color: '#D43C2F' },
                  { label: 'Time Saved',    value: '10×',  color: '#a78bfa' },
                ].map(s => (
                  <div key={s.label} className="p-5 rounded-2xl border border-white/[0.07] bg-white/[0.02] text-center">
                    <div className="text-3xl font-bold mb-1" style={{ color: s.color }}>{s.value}</div>
                    <div className="text-xs text-gray-500 uppercase tracking-widest">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 px-4 bg-[#0e0e10] border-t border-white/[0.05] relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Start a Project</h2>
          <p className="text-gray-400 mb-10">Tell us what you need. We'll tell you how we'd build it.</p>
          {sent ? (
            <div className="p-12 rounded-2xl border border-[#F0C85A]/20 bg-[#F0C85A]/5">
              <div className="text-4xl mb-4">✅</div>
              <h3 className="text-xl font-bold text-white mb-2">Inquiry Sent!</h3>
              <p className="text-gray-400">We'll get back to you within 24 hours.</p>
            </div>
          ) : (
            <form className="space-y-4 text-left" onSubmit={e => { e.preventDefault(); setSent(true); }}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-widest text-gray-500 block mb-2">Name</label>
                  <input type="text" placeholder="Your name" required
                    className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#F0C85A]/50 transition-colors" />
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-widest text-gray-500 block mb-2">Email</label>
                  <input type="email" placeholder="you@company.com" required
                    className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#F0C85A]/50 transition-colors" />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-widest text-gray-500 block mb-2">Service</label>
                <select required style={{ background: '#111114' }}
                  className="w-full border border-white/[0.08] rounded-xl px-4 py-3 text-gray-300 text-sm focus:outline-none focus:border-[#F0C85A]/50 transition-colors">
                  <option value="">Select a service...</option>
                  {services.map(s => <option key={s.id}>{s.title}</option>)}
                  <option>Multiple Services</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-widest text-gray-500 block mb-2">Budget</label>
                <select style={{ background: '#111114' }}
                  className="w-full border border-white/[0.08] rounded-xl px-4 py-3 text-gray-300 text-sm focus:outline-none focus:border-[#F0C85A]/50 transition-colors">
                  <option>Under ₹25,000</option>
                  <option>₹25,000 – ₹75,000</option>
                  <option>₹75,000 – ₹2,00,000</option>
                  <option>₹2,00,000+</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-widest text-gray-500 block mb-2">Details</label>
                <textarea rows={4} placeholder="Describe your project, goals, and timeline..." required
                  className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#F0C85A]/50 transition-colors resize-none" />
              </div>
              <button type="submit"
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-[#F0C85A] to-[#f4d373] text-black font-bold rounded-xl hover:shadow-[0_0_28px_rgba(240,200,90,0.35)] transition-all hover:scale-[1.01]">
                <Send className="w-4 h-4" /> Send Inquiry
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
