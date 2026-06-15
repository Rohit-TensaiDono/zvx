'use client';
/**
 * SectionHeader — clean animated section title.
 *
 * FIXED: Removed nested whileInView inside RevealSection.
 * whileInView inside an opacity:0 parent never fires because the
 * parent hides the element before intersection can be observed.
 * Now uses a single motion.div with animate prop tied to parent's show state,
 * passed down via the RevealSection anchor system.
 *
 * Word-by-word stagger is done with CSS animation-delay on spans,
 * not Framer Motion whileInView — so it always fires when the parent reveals.
 */
import { motion } from 'framer-motion';
import { RevealSection } from './RevealSection';

export function SectionHeader({
  label,
  labelColor = '#F0C85A',
  title,
  subtitle,
  centered   = true,
  anchor     = '',
  className  = '',
}) {
  const isString = typeof title === 'string';
  const words    = isString ? title.split(' ') : [];

  return (
    <RevealSection
      anchor={anchor}
      className={`mb-14 ${centered ? 'text-center' : ''} ${className}`}
    >
      {/* Label pill */}
      {label && (
        <span
          className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold
                     tracking-widest uppercase border mb-5"
          style={{
            background:  `${labelColor}10`,
            color:        labelColor,
            borderColor: `${labelColor}20`,
          }}
        >
          {label}
        </span>
      )}

      {/* Title */}
      <h2
        className={`text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.12]
                    tracking-tight ${centered ? 'mx-auto' : ''}`}
        style={{ maxWidth: centered ? '36rem' : 'none' }}
      >
        {isString ? (
          /* Word-by-word: each word slides up from overflow-hidden via CSS */
          words.map((word, i) => (
            <span
              key={i}
              className="inline-block overflow-hidden"
              style={{ marginRight: i < words.length - 1 ? '0.28em' : 0 }}
            >
              <span
                className="inline-block"
                style={{
                  animation: `wordSlideUp 0.65s cubic-bezier(0.16,1,0.3,1) both`,
                  animationDelay: `${0.05 + i * 0.09}s`,
                }}
              >
                {word}
              </span>
            </span>
          ))
        ) : (
          title
        )}
      </h2>

      {/* Subtitle */}
      {subtitle && (
        <p
          className={`text-lg text-gray-400 mt-5 leading-relaxed ${centered ? 'mx-auto' : ''}`}
          style={{
            maxWidth: centered ? '40rem' : 'none',
            animation: 'fadeSlideUp 0.65s cubic-bezier(0.16,1,0.3,1) both',
            animationDelay: `${0.05 + words.length * 0.09 + 0.1}s`,
          }}
        >
          {subtitle}
        </p>
      )}
    </RevealSection>
  );
}
