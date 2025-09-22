"use client";
import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronDown, Sparkles } from "lucide-react";
import AnimatedParticles from "@/components/AnimatedParticles";

export default function HeroSection() {
  const [logoLoaded, setLogoLoaded] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLogoLoaded(true);
      controls.start("visible");
    }, 500);
    return () => clearTimeout(timer);
  }, [controls]);

  const logoVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 1.2,
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.3
      }
    }
  };

  const scrollToProducts = () => {
    document.getElementById("products")?.scrollIntoView({
      behavior: "smooth"
    });
  };

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({
      behavior: "smooth"
    });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0B0B0C] via-[#1a1a1c] to-[#0B0B0C]">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(240,200,90,0.03)_0%,transparent_50%)]" />

      {/* Floating Particles (client-only) */}
      <div className="absolute inset-0 overflow-hidden">
        <AnimatedParticles count={20} />
      </div>

      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        {/* Animated Logo */}
        <motion.div
          className="mb-8 flex justify-center"
          variants={logoVariants}
          initial="hidden"
          animate={controls}
        >
          <div className="relative">
            <img
              src="/zvx-logo.png"
              alt="ZenVoraX Logo"
              className="w-48 h-48 md:w-64 md:h-64 object-contain filter drop-shadow-2xl"
            />

            {/* Glow Effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-[#F0C85A] via-[#D43C2F] to-[#F0C85A] rounded-full blur-3xl opacity-20"
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.15, 0.35, 0.15]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
        </motion.div>

        {/* Brand Name */}
        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-[#c0c0c0] via-white to-[#c0c0c0] bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          ZenVoraX
        </motion.h1>

        {/* Tagline */}
        <motion.p
          className="text-xl md:text-2xl lg:text-3xl mb-4 bg-gradient-to-r from-[#F0C85A] to-[#D43C2F] bg-clip-text text-transparent font-light tracking-wide"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.3 }}
        >
          From Garage to Globe
        </motion.p>

        {/* Subtitle */}
        <motion.p
          className="text-gray-300 text-lg md:text-xl mb-12 max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.6 }}
        >
          Pioneering the future with cutting-edge technology solutions. Where innovation meets excellence in AR, AI, and sustainable energy.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.9 }}
        >
          <Button
            onClick={scrollToProducts}
            className="px-8 py-4 text-lg bg-gradient-to-r from-[#F0C85A] to-[#f4d373] text-black hover:from-[#f4d373] to-[#F0C85A] rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-2xl border-0 font-semibold"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Explore Products
          </Button>
          <Button
            onClick={scrollToContact}
            className="px-8 py-4 text-lg border-2 border-[#c0c0c0] text-white hover:bg-[#c0c85a] hover:text-black rounded-full transition-all duration-300 transform hover:scale-105 font-semibold"
          >
            Get in Touch
          </Button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.5 }}
        >
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }} className="cursor-pointer" onClick={scrollToProducts}>
            <ChevronDown className="w-8 h-8 text-[#F0C85A]" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
