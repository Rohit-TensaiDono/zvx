'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function AnimatedParticles({ count = 28 }) {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const items = Array.from({ length: count }).map((_, i) => {
      // 50% gold/orange, 30% red, 20% blue
      const roll = Math.random();
      const color = roll < 0.5
        ? (Math.random() > 0.5 ? '#F0C85A' : '#f4d373')   // gold
        : roll < 0.8
        ? '#D43C2F'                                          // red-orange
        : (Math.random() > 0.5 ? '#3BAAFF' : '#00D4FF');   // electric blue

      const size = Math.random() > 0.75 ? 2 : 1; // a few bigger sparks
      return {
        left: `${(Math.random() * 100).toFixed(4)}%`,
        top: `${(75 + Math.random() * 22).toFixed(4)}%`,
        delay: Math.random() * 3.5,
        xDrift: (Math.random() * 80) - 40,
        dur: 3 + Math.random() * 2,
        color,
        size,
      };
    });
    setParticles(items);
  }, [count]);

  if (!particles.length) return null;

  return (
    <>
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            background: p.color,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
          }}
          initial={{ opacity: 0, y: 0, x: 0 }}
          animate={{
            opacity: [0, 1, 0.8, 0],
            y: [-10, -90 - Math.random() * 60],
            x: [0, p.xDrift],
          }}
          transition={{
            duration: p.dur,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeOut',
          }}
        />
      ))}
    </>
  );
}
