'use client';

import { motion } from 'framer-motion';

interface MarqueeProps {
  items: string[];
  speed?: number;
  className?: string;
}

export function Marquee({ items, speed = 30, className = '' }: MarqueeProps) {
  // Duplicate items for seamless loop
  const duplicatedItems = [...items, ...items, ...items];

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <motion.div
        className="inline-flex"
        animate={{
          x: [0, -33.33 + '%'],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: speed,
            ease: 'linear',
          },
        }}
      >
        {duplicatedItems.map((item, index) => (
          <span
            key={index}
            className="inline-flex items-center mx-8 md:mx-12 text-[#888888] text-sm tracking-wider"
            style={{ fontFamily: 'var(--font-dm-mono)' }}
          >
            {item}
            <span className="mx-4 text-[#CCCCCC]">·</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
