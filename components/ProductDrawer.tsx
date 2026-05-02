'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X, Plus, Minus } from 'lucide-react';
import { Product } from '@/data/products';
import { useCartStore } from '@/store/cartStore';
import { useState } from 'react';

interface ProductDrawerProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProductDrawer({ product, isOpen, onClose }: ProductDrawerProps) {
  const { addItem } = useCartStore();
  const [quantity, setQuantity] = useState(1);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.classList.add('lenis-stopped');
    } else {
      document.body.style.overflow = '';
      document.documentElement.classList.remove('lenis-stopped');
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.classList.remove('lenis-stopped');
    };
  }, [isOpen]);

  // Reset quantity when product changes
  useEffect(() => {
    setQuantity(1);
  }, [product?.id]);

  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addItem(product);
      }
      onClose();
    }
  };

  if (!product) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/40 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            className="fixed top-0 right-0 h-full w-full max-w-[480px] bg-[#FAFAFA] z-50 shadow-2xl"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-[#CCCCCC]">
                <span 
                  className="text-[11px] uppercase tracking-[0.25em] text-[#888888]"
                  style={{ fontFamily: 'var(--font-dm-sans)' }}
                >
                  Product Details
                </span>
                <button
                  onClick={onClose}
                  className="p-2 -mr-2 hover:opacity-60 transition-opacity"
                  data-cursor="cta"
                  aria-label="Close drawer"
                >
                  <X className="w-5 h-5 stroke-[1.5]" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto pb-24">
                {/* Image */}
                <div className="relative aspect-square bg-[#F0F0F0]">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="480px"
                    priority
                  />
                </div>

                {/* Product Info */}
                <div className="p-6 space-y-4">
                  <h2 className="heading-section text-3xl text-[#0A0A0A]">
                    {product.name}
                  </h2>
                  <p className="text-[12px] uppercase tracking-wider text-[#888888]">
                    {product.category}
                  </p>
                  <p className="text-price text-lg">
                    {product.currency}{product.price}
                  </p>
                  <p className="text-body">
                    {product.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {product.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] uppercase tracking-wider text-[#888888] px-2 py-1 border border-[#CCCCCC] rounded-sm"
                        style={{ fontFamily: 'var(--font-dm-mono)' }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Quantity Selector */}
                  <div className="pt-4 border-t border-[#CCCCCC]">
                    <label 
                      className="text-[11px] uppercase tracking-[0.25em] text-[#888888] block mb-3"
                      style={{ fontFamily: 'var(--font-dm-sans)' }}
                    >
                      Quantity
                    </label>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-10 h-10 border border-[#CCCCCC] flex items-center justify-center hover:border-[#1A1A1A] transition-colors"
                        data-cursor="cta"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span 
                        className="w-12 text-center text-lg"
                        style={{ fontFamily: 'var(--font-dm-mono)' }}
                      >
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-10 h-10 border border-[#CCCCCC] flex items-center justify-center hover:border-[#1A1A1A] transition-colors"
                        data-cursor="cta"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer - Add to Cart */}
              <div className="p-6 border-t border-[#CCCCCC]">
                <button
                  onClick={handleAddToCart}
                  className="w-full py-4 bg-[#0A0A0A] text-[#FAFAFA] text-[11px] uppercase tracking-[0.25em] hover:bg-[#FAFAFA] hover:text-[#0A0A0A] border border-[#0A0A0A] transition-all duration-300"
                  data-cursor="cta"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
