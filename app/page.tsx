'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from '@/lib/gsap';
import { products, featuredProducts, Product } from '@/data/products';
import { ProductCard } from '@/components/ProductCard';
import { ProductDrawer } from '@/components/ProductDrawer';
import { Marquee } from '@/components/Marquee';

const categoryLinks = [
  { label: 'WALLETS', href: '/collection?category=wallet' },
  { label: 'EYEWEAR', href: '/collection?category=eyewear' },
  { label: 'BRACELETS', href: '/collection?category=bracelet' },
];

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Hero headline animation
  useEffect(() => {
    if (!headlineRef.current) return;

    const words = headlineRef.current.querySelectorAll('.word');
    
    gsap.fromTo(words,
      { 
        y: 60, 
        opacity: 0,
        rotateX: -40
      },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.5
      }
    );
  }, []);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsDrawerOpen(true);
  };

  // Get featured products for asymmetric grid
  const mainFeatured = featuredProducts[0]; // First featured
  const secondaryFeatured = featuredProducts.slice(1, 3); // Next 2 featured

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative min-h-screen w-full flex items-center bg-[#FAFAFA] pt-20"
      >
        <div className="w-full px-6 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Headline */}
            <div className="order-2 lg:order-1">
              <h1 
                ref={headlineRef}
                className="heading-display text-5xl md:text-7xl lg:text-[96px] text-[#0A0A0A] mb-8"
                style={{ perspective: '1000px' }}
              >
                <span className="word inline-block">Carry</span>{' '}
                <span className="word inline-block">Less.</span>
                <br />
                <span className="word inline-block">Choose</span>{' '}
                <span className="word inline-block">Better.</span>
              </h1>
              
              <p className="text-body max-w-md mb-12 text-lg">
                Minimal accessories for men who value precision over excess.
              </p>

              {/* Categories */}
              <div className="flex flex-wrap gap-6 md:gap-10">
                {categoryLinks.map((cat, index) => (
                  <motion.div
                    key={cat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.6, 
                      delay: 1.2 + index * 0.1,
                      ease: [0.16, 1, 0.3, 1]
                    }}
                  >
                    <Link
                      href={cat.href}
                      className="group relative text-nav text-[#0A0A0A] hover:text-[#D4A96A] transition-colors duration-300"
                      data-cursor="cta"
                    >
                      {cat.label}
                      <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#D4A96A] group-hover:w-full transition-all duration-300" />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right: Hero Product Image */}
            <motion.div 
              className="order-1 lg:order-2 relative"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div 
                className="relative aspect-[4/5] w-full max-w-lg mx-auto"
                style={{
                  animation: 'float 6s ease-in-out infinite',
                }}
              >
                <Image
                  src="/images/hero-wallet.png"
                  alt="FORGED Slim Bifold Wallet"
                  fill
                  className="object-contain"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Floating animation keyframes */}
        <style jsx global>{`
          @keyframes float {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-12px);
            }
          }
        `}</style>
      </section>

      {/* Horizontal Rule */}
      <div className="w-full px-6 md:px-12 lg:px-16">
        <div className="h-[1px] bg-[#CCCCCC] w-full" />
      </div>

      {/* Marquee */}
      <section className="py-12 border-b border-[#CCCCCC]">
        <Marquee 
          items={['FORGED', 'MINIMAL', 'CRAFTED', 'PRECISE']}
          speed={25}
        />
      </section>

      {/* Featured Section */}
      <section className="py-20 md:py-32 w-full px-6 md:px-12 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <h2 className="heading-section text-4xl md:text-5xl text-[#0A0A0A]">
            Featured
          </h2>
        </motion.div>

        {/* Asymmetric Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Large Card Left */}
          {mainFeatured && (
            <div className="lg:row-span-2">
              <ProductCard 
                product={mainFeatured} 
                onClick={() => handleProductClick(mainFeatured)}
                index={0}
              />
            </div>
          )}

          {/* Two Stacked Cards Right */}
          <div className="flex flex-col gap-6">
            {secondaryFeatured.map((product, index) => (
              <ProductCard 
                key={product.id}
                product={product}
                onClick={() => handleProductClick(product)}
                index={index + 1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Marquee */}
      <section className="py-12 border-y border-[#CCCCCC]">
        <Marquee 
          items={['FORGED', 'MINIMAL', 'CRAFTED', 'PRECISE']}
          speed={25}
        />
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 w-full px-6 md:px-12 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <h2 className="heading-section text-4xl md:text-5xl lg:text-6xl text-[#0A0A0A] mb-8">
            Less is More
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

      {/* Product Drawer */}
      <ProductDrawer
        product={selectedProduct}
        isOpen={isDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false);
          setTimeout(() => setSelectedProduct(null), 300);
        }}
      />
    </div>
  );
}
