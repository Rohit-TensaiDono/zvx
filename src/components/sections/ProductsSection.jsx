'use client';
import React from 'react';
import { ArrowRight, Radio, Camera, Glasses, Pencil, Brain, Battery, Bot, Plane } from 'lucide-react';
import Link from 'next/link';
import { rvakSeries, verticals } from '@/data/products';
import { Badge, SectionHeader, RevealGroup, RevealItem } from '@/components/ui';

const ICONS = { Radio, Camera, Glasses, Pencil, Brain, Battery, Bot, Plane };

function RVAKCard({ product }) {
  const Icon = ICONS[product.iconName] || Radio;
  return (
    <RevealItem>
      <div className="group relative rounded-2xl overflow-hidden border border-white/[0.07]
                      card-surface hover:border-white/[0.18]
                      transition-all duration-500 hover:scale-[1.025] h-full
                      hover:shadow-[0_0_32px_rgba(0,0,0,0.6)]">

        {/* Accent glow on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100
                        transition-opacity duration-500 rounded-2xl pointer-events-none"
          style={{ boxShadow: `inset 0 0 44px ${product.colorDim}` }} />

        {/* Image / placeholder */}
        <div className="relative h-44 overflow-hidden">
          {product.image ? (
            <img src={product.image} alt={product.name}
              className="w-full h-full object-cover opacity-55
                         group-hover:opacity-80 group-hover:scale-105
                         transition-all duration-500" />
          ) : (
            <div className="w-full h-full flex items-center justify-center"
              style={{ background: `radial-gradient(circle at 50% 50%, ${product.colorDim} 0%, rgba(17,17,20,0.92) 70%)` }}>
              <Icon className="w-16 h-16 opacity-22" style={{ color: product.color }} />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#111114] via-transparent to-transparent" />

          {/* Tier + status badges */}
          <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
            <Badge color={product.color}>{product.tier}</Badge>
            {product.badge && <Badge color="#9ca3af">{product.badge}</Badge>}
          </div>

          {/* Icon chip */}
          <div className="absolute bottom-3 right-3 w-9 h-9 rounded-xl
                          flex items-center justify-center"
            style={{ background: product.colorDim, border: `1px solid ${product.color}44` }}>
            <Icon className="w-4 h-4" style={{ color: product.color }} />
          </div>
        </div>

        {/* Body */}
        <div className="p-5">
          <h4 className="text-lg font-bold text-white mb-1">{product.name}</h4>
          <p className="text-xs text-gray-500 mb-4 italic">{product.tagline}</p>
          <ul className="space-y-1.5 mb-5">
            {product.features.map(f => (
              <li key={f} className="flex items-center gap-2 text-xs text-gray-400">
                <span className="w-1 h-1 rounded-full flex-shrink-0"
                  style={{ background: product.color }} />
                {f}
              </li>
            ))}
          </ul>
          <Link href={product.href}
            className="flex items-center gap-1.5 text-xs font-semibold
                       transition-colors group/lnk"
            style={{ color: product.color }}>
            View Details
            <ArrowRight className="w-3 h-3 group-hover/lnk:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </RevealItem>
  );
}

function VerticalCard({ product }) {
  const Icon = ICONS[product.iconName] || Bot;
  return (
    <RevealItem>
      <div className="group relative rounded-2xl overflow-hidden border border-white/[0.07]
                      card-surface hover:border-white/[0.15]
                      transition-all duration-500 h-full
                      hover:shadow-[0_0_28px_rgba(0,0,0,0.5)]">
        <div className="relative h-40 overflow-hidden">
          {product.image ? (
            <img src={product.image} alt={product.name}
              className="w-full h-full object-cover opacity-50
                         group-hover:opacity-72 group-hover:scale-105
                         transition-all duration-500" />
          ) : (
            <div className="w-full h-full flex items-center justify-center"
              style={{ background: `radial-gradient(circle at 50% 50%, ${product.color}15 0%, #111114 70%)` }}>
              <Icon className="w-14 h-14 opacity-20" style={{ color: product.color }} />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#111114] via-[#111114]/40 to-transparent" />
          {product.badge && (
            <div className="absolute top-3 left-3">
              <Badge color={product.color}>{product.badge}</Badge>
            </div>
          )}
        </div>

        <div className="p-5">
          <p className="text-[10px] font-semibold tracking-widest uppercase mb-2"
            style={{ color: product.color }}>
            {product.vertical}
          </p>
          <h4 className="text-xl font-bold text-white mb-3">{product.name}</h4>
          <p className="text-sm text-gray-400 leading-relaxed mb-4">{product.description}</p>
          <div className="flex flex-wrap gap-1.5 mb-5">
            {product.tags.map(tag => (
              <span key={tag}
                className="px-2 py-0.5 rounded-full text-[10px] font-medium
                           bg-white/[0.05] text-gray-400 border border-white/[0.07]">
                {tag}
              </span>
            ))}
          </div>
          <Link href={product.href}
            className="inline-flex items-center gap-2 text-sm font-semibold
                       group/lnk transition-colors"
            style={{ color: product.color }}>
            {product.cta || 'Learn More'}
            <ArrowRight className="w-4 h-4 group-hover/lnk:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </RevealItem>
  );
}

export default function ProductsSection() {
  return (
    /* section-dark = 86% opaque — mesh glows faintly through */
    <section id="products" className="section-dark relative py-24 px-4">
      <div className="max-w-7xl mx-auto">

        <SectionHeader
          label="The ZenVoraX Ecosystem"
          title={<>Five Verticals.<br className="md:hidden" /> One Vision.</>}
          subtitle="AR wearables, edge AI, sustainable energy, robotics, and drones — all built from first principles."
        />

        {/* ── R-VAK feature banner ── */}
        <RevealGroup className="mb-8">
          <RevealItem>
            <div className="rounded-3xl overflow-hidden border border-[#F0C85A]/18
                            card-surface relative">
              {/* Subtle image texture */}
              <div className="absolute inset-0">
                <img src="/images/rvak-banner.jpg" alt=""
                  className="w-full h-full object-cover opacity-[0.06]" />
                <div className="absolute inset-0
                                bg-gradient-to-r from-[#0e0e10] via-[#0e0e10]/80 to-transparent" />
              </div>

              {/* Header */}
              <div className="relative z-10 px-8 pt-10 pb-6 border-b border-white/[0.05]
                              flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="w-2 h-2 rounded-full bg-[#F0C85A]
                                     shadow-[0_0_8px_#F0C85A]" />
                    <span className="text-[10px] font-bold tracking-widest uppercase
                                     text-[#F0C85A]">
                      Smart Wearables
                    </span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-1">
                    R-VAK <span className="text-[#F0C85A]">Ecosystem</span>
                  </h3>
                  <p className="text-gray-400 text-sm max-w-lg">
                    Real-time Virtual Assistance Kernel — Astral, Spectral, Orion smart glasses
                    + Athena smart pen.
                  </p>
                </div>
                <Link href="/products/rvak"
                  className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-full
                             border border-[#F0C85A]/40 text-[#F0C85A] text-sm font-semibold
                             hover:bg-[#F0C85A]/10 transition-all">
                  Full Ecosystem <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* 4 product cards */}
              <RevealGroup
                className="relative z-10 grid grid-cols-1 sm:grid-cols-2
                           lg:grid-cols-4 gap-px bg-white/[0.04] p-px"
                stagger={0.1} delayChildren={0.1}
              >
                {rvakSeries.map(p => (
                  <div key={p.id} className="bg-[#0e0e10]/95">
                    <RVAKCard product={p} />
                  </div>
                ))}
              </RevealGroup>
            </div>
          </RevealItem>
        </RevealGroup>

        {/* ── 4 vertical cards ── */}
        <RevealGroup
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          stagger={0.1}
        >
          {verticals.map(v => <VerticalCard key={v.id} product={v} />)}
        </RevealGroup>

      </div>
    </section>
  );
}
