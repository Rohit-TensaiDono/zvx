'use client';
import React, { useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Send, Mail, Globe, Clock } from 'lucide-react';

const contactItems = [
  { icon: Mail,  label: 'Primary',       value: 'rohit@zenvorax.in',            color: '#F0C85A' },
  { icon: Mail,  label: 'General',       value: 'info@zenvorax.in',             color: '#D43C2F' },
  { icon: Clock, label: 'Response',      value: 'Within 24 hours',              color: '#3BAAFF' },
  { icon: Globe, label: 'Operations',    value: 'Global — Garage to Globe',     color: '#c0c0c0' },
];

export default function ContactSection() {
  const ref    = React.useRef(null);
  const inView = useInView(ref, { once: true, threshold: 0.1 });
  const [sent, setSent] = useState(false);

  return (
    <section id="contact" className="section-dark relative py-24 px-4">
      <div className="max-w-5xl mx-auto">

        <motion.div ref={ref} className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}>
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold
                           tracking-widest uppercase border mb-5
                           bg-[#3BAAFF]/10 text-[#3BAAFF] border-[#3BAAFF]/20">
            Contact
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Let's Build Something{' '}
            <span className="text-[#F0C85A]">Extraordinary</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            For product inquiries, collaborations, or agency projects — we respond fast.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10">

          {/* Form */}
          <motion.div className="lg:col-span-3"
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}>
            {sent ? (
              <div className="h-full flex flex-col items-center justify-center p-12
                              rounded-2xl border border-[#F0C85A]/20 bg-[#F0C85A]/5 text-center">
                <div className="text-4xl mb-4">✅</div>
                <h3 className="text-xl font-bold text-white mb-2">Message Sent!</h3>
                <p className="text-gray-400">We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form className="space-y-4"
                onSubmit={e => { e.preventDefault(); setSent(true); }}>
                <div className="grid grid-cols-2 gap-4">
                  {['Name', 'Email'].map(f => (
                    <div key={f}>
                      <label className="text-xs font-semibold uppercase tracking-widest
                                        text-gray-500 block mb-2">{f}</label>
                      <input type={f === 'Email' ? 'email' : 'text'}
                        placeholder={f === 'Email' ? 'you@company.com' : 'Your name'}
                        required
                        className="w-full bg-white/[0.04] border border-white/[0.08]
                                   rounded-xl px-4 py-3 text-white text-sm
                                   placeholder-gray-600
                                   focus:outline-none focus:border-[#F0C85A]/50
                                   transition-colors" />
                    </div>
                  ))}
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-widest
                                    text-gray-500 block mb-2">Subject</label>
                  <select required
                    style={{ background: 'rgba(11,11,12,0.9)' }}
                    className="w-full border border-white/[0.08] rounded-xl px-4 py-3
                               text-sm text-gray-300
                               focus:outline-none focus:border-[#F0C85A]/50 transition-colors">
                    <option value="">Select a topic...</option>
                    <option>Product Inquiry</option>
                    <option>Agency / Project</option>
                    <option>Partnership</option>
                    <option>Investor Inquiry</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-widest
                                    text-gray-500 block mb-2">Message</label>
                  <textarea placeholder="Tell us about your project or inquiry..."
                    rows={5} required
                    className="w-full bg-white/[0.04] border border-white/[0.08]
                               rounded-xl px-4 py-3 text-white text-sm
                               placeholder-gray-600
                               focus:outline-none focus:border-[#F0C85A]/50
                               transition-colors resize-none" />
                </div>
                <button type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3.5
                             bg-gradient-to-r from-[#F0C85A] to-[#f4d373]
                             text-black font-bold rounded-xl
                             hover:shadow-[0_0_28px_rgba(240,200,90,0.35)]
                             transition-all duration-300 hover:scale-[1.01]">
                  <Send className="w-4 h-4" /> Send Message
                </button>
              </form>
            )}
          </motion.div>

          {/* Contact info */}
          <motion.div className="lg:col-span-2 flex flex-col gap-4"
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}>
            {contactItems.map(c => (
              <div key={c.label}
                className="flex gap-4 p-4 rounded-xl border border-white/[0.06]
                           bg-white/[0.02] hover:border-white/[0.11] transition-colors">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${c.color}15`, border: `1px solid ${c.color}30` }}>
                  <c.icon className="w-4 h-4" style={{ color: c.color }} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-widest
                                font-semibold mb-1">{c.label}</p>
                  <p className="text-sm text-gray-200">{c.value}</p>
                </div>
              </div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
