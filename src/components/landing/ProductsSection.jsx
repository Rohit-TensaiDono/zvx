"use client";
import React from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Eye, Brain, Calculator, ArrowRight } from "lucide-react";

export default function ProductsSection() {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });

  const products = [
    {
      id: 1,
      name: "Chakra View™ Smart Glasses",
      description:
        "Revolutionary AR glasses with advanced AI integration, spatial audio technology, and sleek design for the future of wearable computing.",
      icon: Eye,
      gradient: "from-[#F0C85A] to-[#f4d373]",
      delay: 0
    },
    {
      id: 2,
      name: "Nemesis AI",
      description:
        "Hybrid offline AI assistant with intelligent thermal management and battery awareness for optimal performance and efficiency.",
      icon: Brain,
      gradient: "from-[#D43C2F] to-[#e65a4f]",
      delay: 0.2
    },
    {
      id: 3,
      name: "BESS Calculator",
      description:
        "Advanced Battery Energy Storage System calculator for optimizing sustainable energy solutions and grid management.",
      icon: Calculator,
      gradient: "from-[#c0c0c0] to-[#e0e0e0]",
      delay: 0.4
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.6
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  return (
    <section id="products" className="py-20 px-4 bg-gradient-to-b from-[#0B0B0C] to-[#1a1a1c]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-[#c0c0c0] to-white bg-clip-text text-transparent">
            Our Products
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Cutting-edge technology solutions designed to transform industries and empower innovation
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {products.map((product) => (
            <motion.div key={product.id} variants={cardVariants} className="group relative">
              <div className="relative bg-gradient-to-br from-[#1a1a1c] to-[#2a2a2e] rounded-3xl p-8 border border-gray-700/50 hover:border-gray-600/70 transition-all duration-500 transform-gpu hover:scale-105 hover:shadow-2xl">
                {/* Glow Effect */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${product.gradient} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-500`}
                />

                {/* Icon */}
                <div className={`w-16 h-16 mb-6 bg-gradient-to-br ${product.gradient} rounded-2xl flex items-center justify-center shadow-lg`}>
                  <product.icon className="w-8 h-8 text-black" />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-white transition-colors">{product.name}</h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-8">{product.description}</p>

                {/* Learn More Button */}
                <Button
                  variant="ghost"
                  className={`group/btn w-full justify-between text-lg p-4 hover:bg-gradient-to-r ${product.gradient} hover:text-black transition-all duration-300 rounded-xl border border-gray-600/50 hover:border-transparent`}
                >
                  Learn More
                  <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-300" />
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
