'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Product } from '@/data/products';

interface ProductCardProps {
  product: Product;
  onClick?: () => void;
  index?: number;
}

export function ProductCard({ product, onClick, index = 0 }: ProductCardProps) {
  return (
    <motion.div
      className="group relative bg-[#F0F0F0] overflow-hidden"
      data-cursor="product"
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ y: -6 }}
    >
      {/* Border overlay on hover */}
      <motion.div
        className="absolute inset-0 border border-[#1A1A1A] pointer-events-none z-10"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />

      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden">
        <motion.div
          className="w-full h-full"
          whileHover={{ scale: 1.04 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </motion.div>
      </div>

      {/* Product Info */}
      <div className="p-4 md:p-6">
        <motion.h3
          className="text-product text-[#0A0A0A] mb-1 group-hover:underline decoration-[#D4A96A] underline-offset-4"
          transition={{ duration: 0.3 }}
        >
          {product.name}
        </motion.h3>
        <p className="text-[12px] text-[#888888] uppercase tracking-wider mb-2">
          {product.category}
        </p>
        <p className="text-price">
          {product.currency}{product.price}
        </p>
      </div>
    </motion.div>
  );
}
