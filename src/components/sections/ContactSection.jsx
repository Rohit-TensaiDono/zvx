'use client';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { Send, Mail, Globe, Clock } from 'lucide-react';
import { MechanicalCard, RevealSection, RevealGroup, RevealItem } from '@/components/ui';

/* nodeColor matches ANCHOR_NODES for 'contact' section */
const contactItems = [
  { icon: Mail,  label: 'Primary',    value: 'rohit@zenvorax.in',        color: '#F0C85A', nodeColor: '#F0C85A' },
  { icon: Mail,  label: 'General',    value: 'info@zenvorax.in',         color: '#D43C2F', nodeColor: '#D43C2F' },
  { icon: Clock, label: 'Response',   value: 'Within 24 hours',          color: '#3BAAFF', nodeColor: '#3BAAFF' },
  { icon: Globe, label: 'Operations', value: 'Global — Garage to Globe', color: '#c0c0c0', nodeColor: '#c0c0c0' },
];

function FormInput({ label, type = 'text', placeholder, required }) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <label className="text-xs font-semibold uppercase tracking-widest text-gray-500 block mb-2">
        {label}
      </label>
      <div className="relative">
        <input type={type} placeholder={placeholder} required={required}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full bg-white/[0.03] border rounded-xl px-4 py-3
                     text-white text-sm placeholder-gray-600
                     focus:outline-none transition-all duration-300"
          style={{
            borderColor: focused ? '#F0C85A' : 'rgba(255,255,255,0.08)',
            boxShadow:   focused ? '0 0 0 1px rgba(240,200,90,0.2)' : 'none',
          }} />
        <div className="absolute bottom-0 left-0 h-px rounded-full transition-all duration-300 ease-out"
          style={{ background: '#F0C85A', width: focused ? '100%' : '0%' }} />
      </div>
    </div>
  );
}

export default function ContactSection() {
  const [sent, setSent] = useState(false);

  return (
    <section id="contact" className="section relative">
      <div className="max-w-5xl mx-auto">

        <RevealSection anchor="contact" className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold
                           tracking-widest uppercase border mb-5
                           bg-[#3BAAFF]/10 text-[#3BAAFF] border-[#3BAAFF]/20">
            Contact
          </span>
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-4 text-white leading-[1.18] pb-1"
            initial={{ opacity: 0, y: 28, filter: 'blur(4px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            Let&apos;s Build Something{' '}
            <span className="text-[#F0C85A]">Extraordinary</span>
          </motion.h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Product inquiries, collaborations, or agency projects — we respond fast.
          </p>
        </RevealSection>

        <div className="grid lg:grid-cols-5 gap-10">

          {/* Form — gold glow matches first contact anchor node */}
          <RevealItem nodeColor="#F0C85A" className="lg:col-span-3">
            {sent ? (
              <MechanicalCard className="glass-card rounded-2xl p-12 text-center" scanColor="#F0C85A">
                <div className="text-5xl mb-4">✅</div>
                <h3 className="text-xl font-bold text-white mb-2">Message Sent!</h3>
                <p className="text-gray-400">We'll get back to you within 24 hours.</p>
              </MechanicalCard>
            ) : (
              <form className="space-y-4" onSubmit={e => { e.preventDefault(); setSent(true); }}>
                <div className="grid grid-cols-2 gap-4">
                  <FormInput label="Name"  placeholder="Your name" required />
                  <FormInput label="Email" type="email" placeholder="you@company.com" required />
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-widest text-gray-500 block mb-2">
                    Subject
                  </label>
                  <select required style={{ background: 'rgba(14,14,18,0.95)' }}
                    className="w-full border border-white/[0.08] rounded-xl px-4 py-3
                               text-sm text-gray-300 focus:outline-none
                               focus:border-[#F0C85A]/50 transition-colors">
                    <option value="">Select a topic...</option>
                    <option>Product Inquiry</option>
                    <option>Agency / Project</option>
                    <option>Partnership</option>
                    <option>Investor Inquiry</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-widest text-gray-500 block mb-2">
                    Message
                  </label>
                  <textarea placeholder="Tell us about your project..." rows={5} required
                    className="w-full bg-white/[0.03] border border-white/[0.08]
                               rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600
                               focus:outline-none focus:border-[#F0C85A]/50 transition-colors resize-none" />
                </div>
                <button type="submit"
                  className="group/sbtn w-full flex items-center justify-center gap-2 py-3.5
                             bg-gradient-to-r from-[#F0C85A] to-[#f4d373] text-black font-bold
                             rounded-xl hover:shadow-[0_0_28px_rgba(240,200,90,0.35)]
                             transition-all duration-300 hover:scale-[1.01] relative overflow-hidden">
                  <Send className="w-4 h-4 relative z-10
                                   group-hover/sbtn:translate-x-0.5 transition-transform duration-300" />
                  <span className="relative z-10">Send Message</span>
                </button>
              </form>
            )}
          </RevealItem>

          {/* Contact info — each card's nodeColor matches its anchor node */}
          <RevealGroup anchor="contact" className="lg:col-span-2 flex flex-col gap-3" stagger={0.09}>
            {contactItems.map(c => (
              <RevealItem key={c.label} nodeColor={c.nodeColor}>
                <MechanicalCard
                  className="flex gap-4 p-4 rounded-xl glass-card"
                  scanColor={c.color}
                  accent={c.color}
                  intensity={3}
                  noTilt
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0
                                  transition-all duration-300
                                  group-hover/mcard:shadow-[0_0_16px_var(--ci)]"
                    style={{ background:`${c.color}15`, border:`1px solid ${c.color}30`, '--ci':`${c.color}44` }}>
                    <c.icon className="w-4 h-4 group-hover/mcard:scale-110 transition-transform duration-300"
                      style={{ color: c.color }} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-1">
                      {c.label}
                    </p>
                    <p className="text-sm text-gray-200">{c.value}</p>
                  </div>
                </MechanicalCard>
              </RevealItem>
            ))}
          </RevealGroup>

        </div>
      </div>
    </section>
  );
}
