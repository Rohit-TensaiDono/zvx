'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Github, Twitter, Linkedin, Mail, Youtube } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-t from-[#0B0B0C] to-[#111114] border-t border-white/[0.05]">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-1 space-y-5">
            <Link href="/" className="flex items-center gap-3">
              <img src="/zvx-logo.png" alt="ZVX" className="w-10 h-10 object-contain" />
              <span className="text-xl font-bold bg-gradient-to-r from-[#c0c0c0] to-white bg-clip-text text-transparent">ZenVoraX</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              From garage to globe. Building the future with AR, AI, sustainable energy, robotics, and drones — from first principles.
            </p>
            <p className="text-sm font-semibold bg-gradient-to-r from-[#F0C85A] to-[#D43C2F] bg-clip-text text-transparent">From Garage to Globe</p>
            <div className="flex gap-3">
              {[
                { icon: Github,   href: '#',                    label: 'GitHub' },
                { icon: Linkedin, href: '#',                    label: 'LinkedIn' },
                { icon: Twitter,  href: '#',                    label: 'Twitter' },
                { icon: Youtube,  href: '#',                    label: 'YouTube' },
                { icon: Mail,     href: 'mailto:rohit@zenvorax.in', label: 'Email' },
              ].map(s => (
                <motion.a key={s.label} href={s.href} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 bg-white/[0.04] rounded-xl flex items-center justify-center border border-white/[0.07] hover:border-[#F0C85A]/40 group transition-all">
                  <s.icon className="w-4 h-4 text-gray-500 group-hover:text-[#F0C85A] transition-colors" />
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-white mb-5 uppercase tracking-widest">Products</h3>
            <ul className="space-y-3">
              {[
                ['R-VAK Ecosystem', '/products/rvak'],
                ['R-VAK Astral',    '/products/rvak#astral'],
                ['R-VAK Spectral',  '/products/rvak#spectral'],
                ['R-VAK Orion',     '/products/rvak#orion'],
                ['R-VAK Athena',    '/products/rvak#athena'],
                ['Nemesis AI',      '/#products'],
                ['BESS Solutions',  '/products/bess'],
                ['ZVX Aura Robot',  '/#robotics'],
                ['ZVX Drones',      '/#drones'],
              ].map(([n,h]) => (
                <li key={n}><Link href={h} className="text-sm text-gray-400 hover:text-[#F0C85A] transition-colors">{n}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold text-white mb-5 uppercase tracking-widest">Agency</h3>
            <ul className="space-y-3">
              {[
                ['Web Development',    '/agency#services'],
                ['AI Solutions',       '/agency#services'],
                ['IoT Solutions',      '/agency#services'],
                ['Automations',        '/agency#services'],
                ['AI Ad Generation',   '/agency#services'],
                ['Marketing',         '/agency#services'],
                ['Branding & Design',  '/agency#services'],
                ['Get a Quote',        '/agency#contact'],
              ].map(([n,h]) => (
                <li key={n}><Link href={h} className="text-sm text-gray-400 hover:text-[#F0C85A] transition-colors">{n}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold text-white mb-5 uppercase tracking-widest">Contact</h3>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center gap-2 text-sm text-gray-400">
                <Mail className="w-3.5 h-3.5 text-[#F0C85A] flex-shrink-0" />
                <a href="mailto:rohit@zenvorax.in" className="hover:text-[#F0C85A] transition-colors">rohit@zenvorax.in</a>
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-400">
                <Mail className="w-3.5 h-3.5 text-[#F0C85A] flex-shrink-0" />
                <a href="mailto:info@zenvorax.in" className="hover:text-[#F0C85A] transition-colors">info@zenvorax.in</a>
              </li>
            </ul>
            <Link href="/agency"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-[#F0C85A]/40 text-[#F0C85A] text-sm font-semibold hover:bg-[#F0C85A]/10 transition-all">
              Start a Project →
            </Link>
          </div>
        </div>

        <div className="border-t border-white/[0.05] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">© {new Date().getFullYear()} ZenVoraX. All rights reserved.</p>
          <p className="text-gray-600 text-sm">Built with precision, ambition & first principles.</p>
        </div>
      </div>
    </footer>
  );
}
