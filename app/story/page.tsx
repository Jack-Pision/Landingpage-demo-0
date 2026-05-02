'use client';

import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from '@/lib/gsap';

const pillars = [
  {
    number: '01',
    title: 'Minimal by Design',
    description: 'Every detail serves a purpose. Nothing added without reason.',
  },
  {
    number: '02',
    title: 'Built to Last',
    description: 'Materials selected for longevity, not trends.',
  },
  {
    number: '03',
    title: 'One at a Time',
    description: 'Small batch production. Quality over quantity.',
  },
];

const imageStrip = [
  '/images/story-1.png',
  '/images/story-2.png',
  '/images/story-3.png',
  '/images/story-4.png',
];

export default function StoryPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pullQuoteRef = useRef<HTMLHeadingElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  // Pull quote letter animation
  useEffect(() => {
    if (!pullQuoteRef.current) return;

    const letters = pullQuoteRef.current.querySelectorAll('.letter');
    
    gsap.fromTo(letters,
      { 
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.03,
        ease: 'power3.out',
        delay: 0.3
      }
    );
  }, []);

  const quoteText = "Made for men who say less, carry more.";

  return (
    <div ref={containerRef} className="w-full min-h-screen">
      {/* Pull Quote Hero */}
      <section className="min-h-[80vh] flex items-center justify-center px-6 md:px-12 lg:px-16 pt-32 pb-20">
        <h1 
          ref={pullQuoteRef}
          className="heading-display text-4xl md:text-6xl lg:text-7xl text-center max-w-4xl text-[#0A0A0A]"
          style={{ perspective: '1000px' }}
        >
          {quoteText.split('').map((char, index) => (
            <span 
              key={index} 
              className="letter inline-block"
              style={{ 
                display: char === ' ' ? 'inline' : 'inline-block',
                whiteSpace: char === ' ' ? 'pre' : 'normal'
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </h1>
      </section>

      {/* Editorial Two-Column Section */}
      <section className="py-20 md:py-32 w-full px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-stretch min-h-[600px]">
          {/* Left: Editorial Copy */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-center"
          >
            <h2 className="heading-section text-3xl md:text-4xl text-[#0A0A0A] mb-8">
              The Story
            </h2>
            <div className="space-y-6 text-body text-base leading-relaxed">
              <p>
                FORGED began with a simple observation: men carry too much. 
                Wallets bulge with receipts and cards never used. Accessories 
                scream for attention rather than complement the wearer.
              </p>
              <p>
                We set out to create something different. Pieces that disappear 
                into your routine yet elevate it. Accessories that feel like 
                extensions of intention rather than afterthoughts.
              </p>
              <p>
                Each FORGED product is the result of relentless subtraction. 
                We remove until nothing else can be taken away. What remains 
                is essential, precise, and enduring.
              </p>
            </div>
          </motion.div>

          {/* Right: Full-bleed Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative h-full min-h-[400px] lg:min-h-full"
          >
            <div className="relative h-full w-full bg-[#F0F0F0] overflow-hidden">
              <Image
                src="/images/story-flatlay.png"
                alt="FORGED product flatlay"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Value Pillars */}
      <section className="py-20 md:py-32 w-full px-6 md:px-12 lg:px-16 bg-[#F0F0F0]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.15,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="text-center md:text-left"
            >
              <span 
                className="text-[64px] md:text-[80px] text-[#CCCCCC] leading-none block mb-4"
                style={{ fontFamily: 'var(--font-dm-mono)', fontWeight: 300 }}
              >
                {pillar.number}
              </span>
              <h3 className="text-product text-[#0A0A0A] mb-3">
                {pillar.title}
              </h3>
              <p className="text-body">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Horizontal Image Strip with Parallax */}
      <section className="py-0 overflow-hidden">
        <motion.div 
          className="flex"
          style={{ y: parallaxY }}
        >
          {imageStrip.map((src, index) => (
            <div 
              key={index}
              className="relative w-1/4 aspect-[4/3] flex-shrink-0"
            >
              <Image
                src={src}
                alt={`FORGED product ${index + 1}`}
                fill
                className="object-cover"
                sizes="25vw"
              />
            </div>
          ))}
        </motion.div>
      </section>

      {/* Closing CTA */}
      <section className="py-20 md:py-32 w-full px-6 md:px-12 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <h2 className="heading-section text-4xl md:text-5xl lg:text-6xl text-[#0A0A0A] mb-8">
            Carry Less.
            <br />
            Choose Better.
          </h2>
          <Link
            href="/collection"
            className="inline-flex items-center gap-2 px-8 py-4 border border-[#1A1A1A] text-[11px] uppercase tracking-[0.25em] text-[#0A0A0A] hover:border-[#D4A96A] transition-colors duration-300"
            data-cursor="cta"
          >
            View Collection
            <span className="text-[#D4A96A]">→</span>
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
