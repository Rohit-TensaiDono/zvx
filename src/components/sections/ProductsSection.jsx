'use client';
/**
 * ProductsSection — full card-click navigation + per-product theming.
 * Each card has:
 *   • href on MechanicalCard so clicking anywhere navigates
 *   • accent=product.color for cursor colour detection
 *   • Themed gradient header matching the product colour
 *   • nodeColor on RevealItem matching the anchor node exactly
 */
import React from 'react';
import { ArrowRight, Radio, Camera, Glasses, Pencil,
         Brain, Battery, Bot, Plane } from 'lucide-react';
import Link from 'next/link';
import { rvakSeries, verticals } from '@/data/products';
import { Badge, SectionHeader, RevealGroup, RevealItem,
         MechanicalCard, AnimatedLink } from '@/components/ui';

const ICONS = { Radio, Camera, Glasses, Pencil, Brain, Battery, Bot, Plane };

function RVAKCard({ product }) {
  const Icon = ICONS[product.iconName] || Radio;
  return (
    <RevealItem nodeColor={product.color}>
      <MechanicalCard
        className="rounded-2xl overflow-hidden glass-card h-full"
        scanColor={product.color}
        accent={product.color}
        intensity={5}
        href={product.href}
      >
        {/* Themed header with product colour gradient */}
        <div className="relative h-44 overflow-hidden">
          {product.image ? (
            <img src={product.image} alt={product.name}
              className="w-full h-full object-cover opacity-55
                         group-hover/mcard:opacity-80 group-hover/mcard:scale-105
                         transition-all duration-500" />
          ) : (
            <div className="w-full h-full flex items-center justify-center"
              style={{ background:`radial-gradient(circle at 50% 60%, ${product.colorDim} 0%, rgba(14,14,16,.97) 72%)` }}>
              <Icon className="w-16 h-16 opacity-22" style={{ color: product.color }} />
            </div>
          )}
          {/* Themed colour wash overlay */}
          <div className="absolute inset-0"
            style={{
              background: `linear-gradient(to bottom,
                ${product.color}08 0%,
                transparent 40%,
                #111114 100%)`
            }} />
          {/* Badges */}
          <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
            <Badge color={product.color}>{product.tier}</Badge>
            {product.badge && <Badge color="#9ca3af">{product.badge}</Badge>}
          </div>
          {/* Icon chip */}
          <div className="absolute bottom-3 right-3 w-9 h-9 rounded-xl
                          flex items-center justify-center
                          transition-transform duration-300 group-hover/mcard:-translate-y-1"
            style={{ background: product.colorDim, border:`1px solid ${product.color}55` }}>
            <Icon className="w-4 h-4" style={{ color: product.color }} />
          </div>
        </div>

        <div className="p-5">
          <h4 className="text-lg font-bold text-white mb-1">{product.name}</h4>
          <p className="text-xs mb-4 italic" style={{ color: `${product.color}99` }}>{product.tagline}</p>
          <ul className="space-y-1.5 mb-5">
            {product.features.map(f => (
              <li key={f} className="flex items-center gap-2 text-xs text-gray-400">
                <span className="w-1 h-1 rounded-full flex-shrink-0"
                  style={{ background: product.color }} />
                {f}
              </li>
            ))}
          </ul>
          {/* Bottom CTA row */}
          <div className="flex items-center justify-between pt-3 border-t border-white/[0.06]">
            <span className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: `${product.color}88` }}>
              {product.tier}
            </span>
            <span className="flex items-center gap-1 text-xs font-semibold
                             transition-colors group-hover/mcard:translate-x-1 duration-200"
              style={{ color: product.color }}>
              Explore <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </MechanicalCard>
    </RevealItem>
  );
}

function VerticalCard({ product }) {
  const Icon = ICONS[product.iconName] || Bot;
  return (
    <RevealItem nodeColor={product.color}>
      <MechanicalCard
        className="rounded-2xl overflow-hidden glass-card h-full"
        scanColor={product.color}
        accent={product.color}
        intensity={4}
        href={product.href}
      >
        {/* Themed header */}
        <div className="relative h-40 overflow-hidden">
          {product.image ? (
            <img src={product.image} alt={product.name}
              className="w-full h-full object-cover opacity-50
                         group-hover/mcard:opacity-70 group-hover/mcard:scale-105
                         transition-all duration-500" />
          ) : (
            <div className="w-full h-full flex items-center justify-center"
              style={{ background:`radial-gradient(circle at 50% 55%, ${product.color}18 0%, #111114 72%)` }}>
              <Icon className="w-14 h-14 opacity-18" style={{ color: product.color }} />
            </div>
          )}
          <div className="absolute inset-0"
            style={{
              background:`linear-gradient(to bottom, ${product.color}06 0%, transparent 35%, #111114 100%)`
            }} />
          {product.badge && (
            <div className="absolute top-3 left-3">
              <Badge color={product.color}>{product.badge}</Badge>
            </div>
          )}
          {/* Vertical label */}
          <div className="absolute bottom-3 left-3">
            <span className="text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded"
              style={{ background: `${product.color}20`, color: product.color }}>
              {product.vertical}
            </span>
          </div>
        </div>

        <div className="p-5">
          <h4 className="text-xl font-bold text-white mb-2">{product.name}</h4>
          <p className="text-sm text-gray-400 leading-relaxed mb-4">{product.description}</p>
          <div className="flex flex-wrap gap-1.5 mb-4">
            {product.tags.map(tag => (
              <span key={tag}
                className="px-2 py-0.5 rounded-full text-[10px] font-medium
                           bg-white/[0.05] text-gray-400 border border-white/[0.07]
                           group-hover/mcard:border-white/[0.14] transition-colors">
                {tag}
              </span>
            ))}
          </div>
          <div className="flex items-center justify-between pt-3 border-t border-white/[0.06]">
            <span className="text-xs text-gray-600">{product.badge || 'Active'}</span>
            <span className="flex items-center gap-1 text-xs font-semibold
                             group-hover/mcard:translate-x-1 transition-transform duration-200"
              style={{ color: product.color }}>
              {product.cta || 'Learn More'} <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </MechanicalCard>
    </RevealItem>
  );
}

export default function ProductsSection() {
  return (
    <section id="products" className="section relative" style={{ marginTop: '-3rem' }}>
      <div className="max-w-7xl mx-auto">

        <SectionHeader
          anchor="products"
          label="The ZenVoraX Ecosystem"
          title="Five Verticals. One Vision."
          subtitle="AR wearables, edge AI, sustainable energy, robotics, and drones — built from first principles."
        />

        {/* R-VAK banner */}
        <RevealGroup anchor="products" className="mb-8">
          <RevealItem nodeColor="#F0C85A">
            <MechanicalCard
              className="rounded-3xl overflow-hidden glass-card"
              scanColor="#F0C85A" accent="#F0C85A"
              intensity={2} noTilt
            >
              <div className="absolute inset-0 pointer-events-none">
                <img src="/images/rvak-banner.jpg" alt=""
                  className="w-full h-full object-cover opacity-[0.07]" />
                <div className="absolute inset-0 bg-gradient-to-r
                                from-[#0e0e10]/95 via-[#0e0e10]/80 to-transparent" />
              </div>

              <div className="relative z-10 px-8 pt-10 pb-6
                              border-b border-white/[0.05]
                              flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="w-2 h-2 rounded-full bg-[#F0C85A]
                                     shadow-[0_0_8px_#F0C85A] animate-pulse" />
                    <span className="text-[10px] font-bold tracking-widest uppercase text-[#F0C85A]">
                      Smart Wearables
                    </span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-1">
                    R-VAK <span className="text-[#F0C85A]">Ecosystem</span>
                  </h3>
                  <p className="text-gray-400 text-sm max-w-lg">
                    Real-time Virtual Assistance Kernel — Astral, Spectral, Orion glasses + Athena smart pen.
                  </p>
                </div>
                <Link href="/products/rvak"
                  data-interactive data-accent="#F0C85A"
                  onClick={() => window.dispatchEvent(
                    new CustomEvent('mesh-navigate', { detail: { anchor: 'rvak' } })
                  )}
                  className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-full
                             border border-[#F0C85A]/40 text-[#F0C85A] text-sm font-semibold
                             hover:bg-[#F0C85A]/10 transition-all">
                  Full Ecosystem <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* 4 R-VAK cards */}
              <RevealGroup anchor="products"
                className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4
                           gap-px bg-white/[0.04] p-px"
                stagger={0.10}>
                {rvakSeries.map(p => (
                  <div key={p.id} className="bg-[#0e0e10]/90">
                    <RVAKCard product={p} />
                  </div>
                ))}
              </RevealGroup>
            </MechanicalCard>
          </RevealItem>
        </RevealGroup>

        {/* Vertical cards grid */}
        <RevealGroup anchor="products"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          stagger={0.10}>
          {verticals.map(v => <VerticalCard key={v.id} product={v} />)}
        </RevealGroup>

      </div>
    </section>
  );
}
