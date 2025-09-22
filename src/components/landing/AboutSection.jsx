"use client";
import React from "react";
import { motion, useInView } from "framer-motion";
import { Sparkles, Target, Zap } from "lucide-react";

export default function AboutSection() {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-[#1a1a1c] to-[#0B0B0C]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 bg-gradient-to-r from-[#F0C85A] via-[#D43C2F] to-[#F0C85A] bg-clip-text text-transparent">
            From Garage to Globe
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="space-y-6">
              <p className="text-xl text-gray-300 leading-relaxed">
                What started as an ambitious vision in a small garage has evolved into a global technology powerhouse.
                ZenVoraX began with a simple belief:{" "}
                <span className="text-[#F0C85A] font-semibold">
                  technology should enhance human potential
                </span>
                , not complicate it.
              </p>

              <p className="text-xl text-gray-300 leading-relaxed">
                Today, we're pioneering the future with revolutionary AR experiences, intelligent AI systems,
                and sustainable energy solutions that are transforming industries worldwide.
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-6 mt-12">
              {[
                { icon: Sparkles, title: "Innovation", desc: "Pushing boundaries" },
                { icon: Target, title: "Precision", desc: "Attention to detail" },
                { icon: Zap, title: "Impact", desc: "Meaningful change" }
              ].map((value, index) => (
                <motion.div
                  key={value.title}
                  className="text-center group"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                >
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#2a2a2e] to-[#1a1a1c] rounded-2xl flex items-center justify-center border border-gray-700/50 group-hover:border-[#F0C85A]/50 transition-all duration-300">
                    <value.icon className="w-8 h-8 text-[#F0C85A]" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{value.title}</h3>
                  <p className="text-gray-400">{value.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative bg-gradient-to-br from-[#2a2a2e] to-[#1a1a1c] rounded-3xl p-12 border border-gray-700/50">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(240,200,90,0.1)_0%,transparent_50%)] rounded-3xl" />

              <div className="relative z-10 text-center">
                <div className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-[#F0C85A] to-[#D43C2F] bg-clip-text text-transparent mb-4">
                  2024
                </div>
                <p className="text-xl text-gray-300 mb-6">Founded with Vision</p>

                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-3xl font-bold text-[#F0C85A] mb-2">3</div>
                    <div className="text-sm text-gray-400">Products</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-[#D43C2F] mb-2">∞</div>
                    <div className="text-sm text-gray-400">Possibilities</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
