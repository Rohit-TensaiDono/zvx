// src/components/AnimatedParticles.jsx
"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

/**
 * AnimatedParticles
 * - Generates deterministic particles only on client (useEffect)
 * - Avoids server/client hydration mismatch caused by Math.random() at render time
 */
export default function AnimatedParticles({ count = 20 }) {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // generate positions once on client
    const items = Array.from({ length: count }).map(() => ({
      left: `${(Math.random() * 100).toFixed(6)}%`,
      top: `${(80 + Math.random() * 20).toFixed(6)}%`,
      delay: Math.random() * 3
    }));
    setParticles(items);
  }, [count]);

  if (particles.length === 0) return null; // server side renders nothing -> no mismatch

  return (
    <>
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-gradient-to-r from-[#F0C85A] to-[#D43C2F] rounded-full"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 1, 0],
            y: [-20, -100],
            x: [0, (Math.random() * 100) - 50] // small client-only variance is fine (pure animation)
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut"
          }}
          style={{
            left: p.left,
            top: p.top
          }}
        />
      ))}
    </>
  );
}
