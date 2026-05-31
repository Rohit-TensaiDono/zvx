'use client';
/**
 * SectionHeader — consistent section titles across the whole site.
 */
import { motion } from 'framer-motion';
import { fadeUp } from '@/constants/animations';

export function SectionHeader({
  label,
  labelColor = '#F0C85A',
  title,
  subtitle,
  centered = true,
  className = '',
}) {
  return (
    <div className={`mb-16 ${centered ? 'text-center' : ''} ${className}`}>
      {label && (
        <motion.div variants={fadeUp(0)} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <span
            className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase border mb-5"
            style={{ background: `${labelColor}10`, color: labelColor, borderColor: `${labelColor}20` }}
          >
            {label}
          </span>
        </motion.div>
      )}
      <motion.h2
        className={`text-4xl md:text-5xl lg:text-6xl font-bold leading-tight ${centered ? 'mx-auto' : ''}`}
        style={{ maxWidth: centered ? '32rem' : 'none' }}
        variants={fadeUp(0.08)} initial="hidden" whileInView="visible" viewport={{ once: true }}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          className={`text-lg text-gray-400 mt-4 ${centered ? 'mx-auto' : ''}`}
          style={{ maxWidth: centered ? '38rem' : 'none' }}
          variants={fadeUp(0.16)} initial="hidden" whileInView="visible" viewport={{ once: true }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
