'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Battery, Calculator, Zap, Sun, Grid, ArrowRight, RotateCcw } from 'lucide-react';

/* ─── BESS Calculator ─────────────────────────── */
function BESSCalculator() {
  const [form, setForm] = useState({
    load:       '',   // kW average load
    duration:   '',   // hours of backup / storage
    dod:        80,   // depth of discharge %
    efficiency: 92,   // round-trip efficiency %
    voltage:    48,   // system voltage V
    cellAh:     200,  // cell capacity Ah
  });
  const [result, setResult] = useState(null);

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const calculate = () => {
    const L   = parseFloat(form.load);
    const H   = parseFloat(form.duration);
    const dod = form.dod / 100;
    const eff = form.efficiency / 100;
    const V   = form.voltage;
    const Ah  = form.cellAh;

    if (!L || !H || L <= 0 || H <= 0) return;

    const energyNeeded    = (L * H) / eff;                      // kWh to store
    const usableCapacity  = energyNeeded;
    const nominalCapacity = usableCapacity / dod;                // kWh (gross)
    const capacityAh      = (nominalCapacity * 1000) / V;        // Ah at system voltage
    const cellsInParallel = Math.ceil(capacityAh / Ah);         // cells in parallel
    const cellsInSeries   = Math.round(V / 3.2);                 // LFP nominal 3.2V/cell
    const totalCells      = cellsInSeries * cellsInParallel;
    const co2Saved        = nominalCapacity * 0.82 * 365;        // kg/year vs grid (approx)
    const costMin         = Math.round(nominalCapacity * 8000);  // ₹8,000/kWh rough
    const costMax         = Math.round(nominalCapacity * 14000); // ₹14,000/kWh installed

    setResult({ energyNeeded: energyNeeded.toFixed(2), nominalCapacity: nominalCapacity.toFixed(2),
      capacityAh: Math.ceil(capacityAh), cellsInParallel, cellsInSeries, totalCells,
      co2Saved: Math.round(co2Saved), costMin, costMax });
  };

  const reset = () => { setResult(null); setForm(p => ({ ...p, load: '', duration: '' })); };

  const Field = ({ label, unit, field, type = 'number', min, max, step = 1 }) => (
    <div>
      <label className="text-xs font-semibold uppercase tracking-widest text-gray-500 block mb-2">{label}{unit && <span className="text-gray-600 ml-1">({unit})</span>}</label>
      <input type={type} min={min} max={max} step={step} value={form[field]} placeholder="0"
        onChange={e => set(field, type === 'number' ? e.target.value : e.target.value)}
        className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#F0C85A]/50 transition-colors" />
    </div>
  );

  const SliderField = ({ label, unit, field, min, max }) => (
    <div>
      <div className="flex justify-between mb-2">
        <label className="text-xs font-semibold uppercase tracking-widest text-gray-500">{label}</label>
        <span className="text-sm font-bold text-[#F0C85A]">{form[field]}{unit}</span>
      </div>
      <input type="range" min={min} max={max} value={form[field]} onChange={e => set(field, parseInt(e.target.value))}
        className="w-full accent-[#F0C85A] cursor-pointer" />
      <div className="flex justify-between text-[10px] text-gray-600 mt-1"><span>{min}{unit}</span><span>{max}{unit}</span></div>
    </div>
  );

  return (
    <div className="rounded-2xl overflow-hidden border border-[#F0C85A]/20 bg-gradient-to-br from-[#1a1a12] to-[#111114]">
      {/* Header */}
      <div className="px-6 py-5 border-b border-white/[0.05] flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-[#F0C85A]/15 border border-[#F0C85A]/25 flex items-center justify-center">
          <Calculator className="w-5 h-5 text-[#F0C85A]" />
        </div>
        <div>
          <h3 className="font-bold text-white text-sm">BESS Sizing Calculator</h3>
          <p className="text-xs text-gray-500">LFP Battery Energy Storage System</p>
        </div>
      </div>

      <div className="p-6 grid md:grid-cols-2 gap-8">
        {/* Inputs */}
        <div className="space-y-5">
          <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">System Parameters</h4>
          <Field label="Average Load" unit="kW" field="load" min={0.1} step={0.1} />
          <Field label="Storage Duration" unit="hours" field="duration" min={0.5} step={0.5} />
          <Field label="System Voltage" unit="V" field="voltage" min={12} max={800} step={12} />
          <Field label="Cell Capacity" unit="Ah" field="cellAh" min={10} max={600} step={10} />
          <SliderField label="Depth of Discharge" unit="%" field="dod" min={50} max={100} />
          <SliderField label="Round-Trip Efficiency" unit="%" field="efficiency" min={80} max={99} />
          <div className="flex gap-3 pt-2">
            <button onClick={calculate}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-[#F0C85A] to-[#f4d373] text-black font-bold rounded-xl hover:shadow-[0_0_20px_rgba(240,200,90,0.35)] transition-all text-sm">
              <Zap className="w-4 h-4" /> Calculate
            </button>
            {result && (
              <button onClick={reset} className="px-4 py-3 rounded-xl border border-white/[0.1] text-gray-400 hover:text-white transition-colors">
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Results */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Results</h4>
          {!result ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12 rounded-xl border border-white/[0.05] bg-white/[0.01]">
              <Battery className="w-12 h-12 text-gray-700 mb-3" />
              <p className="text-sm text-gray-600">Enter load and duration,<br />then hit Calculate.</p>
            </div>
          ) : (
            <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}
              className="space-y-3">
              {[
                { label: 'Energy Required',     value: `${result.energyNeeded} kWh`,      color: '#F0C85A', sub: 'including efficiency losses' },
                { label: 'Nominal Capacity',    value: `${result.nominalCapacity} kWh`,    color: '#F0C85A', sub: `gross at ${form.dod}% DoD` },
                { label: 'Capacity (Ah)',        value: `${result.capacityAh} Ah`,          color: '#3BAAFF', sub: `at ${form.voltage}V system` },
                { label: 'Cells in Series',     value: result.cellsInSeries,                color: '#c0c0c0', sub: 'LFP @ 3.2V nominal' },
                { label: 'Cells in Parallel',   value: result.cellsInParallel,              color: '#c0c0c0', sub: `${form.cellAh}Ah cells` },
                { label: 'Total Cells',         value: result.totalCells,                   color: '#D43C2F', sub: 'S×P configuration' },
                { label: 'CO₂ Saved / Year',    value: `~${result.co2Saved.toLocaleString()} kg`, color: '#22c55e', sub: 'vs grid average' },
                { label: 'Estimated Cost Range', value: `₹${result.costMin.toLocaleString()} – ₹${result.costMax.toLocaleString()}`, color: '#a78bfa', sub: 'installed (indicative)' },
              ].map(r => (
                <div key={r.label} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                  <div>
                    <p className="text-xs text-gray-500">{r.label}</p>
                    <p className="text-[10px] text-gray-700">{r.sub}</p>
                  </div>
                  <span className="text-sm font-bold" style={{ color: r.color }}>{r.value}</span>
                </div>
              ))}
              <p className="text-[10px] text-gray-600 mt-2 text-center">* Indicative sizing. Contact ZenVoraX for a detailed engineering proposal.</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Page ─────────────────────────────────────── */
export default function BESSPage() {
  return (
    <div className="min-h-screen  text-white overflow-x-hidden">

      {/* Hero */}
      <section className="relative pt-32 pb-16 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_30%,rgba(240,200,90,0.07)_0%,transparent_70%)]" />
        <div className="absolute inset-0"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase bg-[#F0C85A]/10 text-[#F0C85A] border border-[#F0C85A]/20 mb-5">
              Sustainable Energy
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-5 bg-gradient-to-r from-white via-[#c0c0c0] to-white bg-clip-text text-transparent">
              BESS Solutions
            </h1>
            <p className="text-lg text-gray-400 max-w-xl mx-auto mb-8">
              Battery Energy Storage System design, consulting, and tooling — for grid-scale integration, off-grid solar, and industrial backup.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              {['Grid Storage', 'Solar Integration', 'Off-grid Systems', 'Industrial Backup', 'LFP Chemistry', 'Custom Design'].map(t => (
                <span key={t} className="px-3 py-1 rounded-full text-xs text-gray-400 bg-white/[0.04] border border-white/[0.07]">{t}</span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 px-4 border-y border-white/[0.05]">
        <div className="max-w-5xl mx-auto grid sm:grid-cols-3 gap-6">
          {[
            { icon: Battery, color: '#F0C85A', title: 'LFP Chemistry',   desc: 'Lithium Iron Phosphate — safest chemistry, longest cycle life, thermally stable up to 60°C.' },
            { icon: Sun,     color: '#D43C2F', title: 'Solar Pairing',   desc: 'Designed to integrate with PV arrays and charge controllers. Maximise self-consumption.' },
            { icon: Grid,    color: '#3BAAFF', title: 'Grid Services',   desc: 'Peak shaving, load shifting, frequency regulation, and backup power in a single system.' },
          ].map(f => {
            const Icon = f.icon;
            return (
              <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0 }}
                className="p-5 rounded-2xl border border-white/[0.07] bg-white/[0.02] hover:border-white/[0.13] transition-colors">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${f.color}18`, border: `1px solid ${f.color}30` }}>
                  <Icon className="w-5 h-5" style={{ color: f.color }} />
                </div>
                <h3 className="font-bold text-white mb-2">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Calculator */}
      <section id="calculator" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white mb-3">BESS Sizing Calculator</h2>
            <p className="text-gray-400">Input your load and duration. Get instant sizing, cell count, and cost estimates.</p>
          </div>
          <BESSCalculator />
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 border-t border-white/[0.05]">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-3">Need a Full Engineering Proposal?</h2>
          <p className="text-gray-400 mb-7">The calculator gives indicative numbers. Our team delivers detailed designs with BOM, installation specs, and commissioning support.</p>
          <a href="/#contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#F0C85A] to-[#f4d373] text-black font-bold hover:shadow-[0_0_24px_rgba(240,200,90,0.4)] transition-all text-sm">
            Get Full Proposal <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

    </div>
  );
}
