'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, getSubtotal, clearCart } = useCartStore();

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
            onClick={closeCart}
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
                <div className="flex items-center gap-3">
                  <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
                  <span 
                    className="text-[11px] uppercase tracking-[0.25em]"
                    style={{ fontFamily: 'var(--font-dm-sans)' }}
                  >
                    Cart ({items.length})
                  </span>
                </div>
                <button
                  onClick={closeCart}
                  className="p-2 -mr-2 hover:opacity-60 transition-opacity"
                  data-cursor="cta"
                  aria-label="Close cart"
                >
                  <X className="w-5 h-5 stroke-[1.5]" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto">
                {items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full px-6 text-center">
                    <ShoppingBag className="w-12 h-12 stroke-[1] text-[#CCCCCC] mb-4" />
                    <p className="text-body mb-2">Your cart is empty</p>
                    <p className="text-[12px] text-[#888888]">
                      Add some products to get started
                    </p>
                  </div>
                ) : (
                  <div className="divide-y divide-[#CCCCCC]">
                    {items.map((item) => (
                      <motion.div
                        key={item.product.id}
                        className="p-6 flex gap-4"
                        layout
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                      >
                        {/* Image */}
                        <div className="relative w-24 h-24 bg-[#F0F0F0] flex-shrink-0">
                          <Image
                            src={item.product.image}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                            sizes="96px"
                          />
                        </div>

                        {/* Info */}
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <h3 className="text-product text-[#0A0A0A] mb-1">
                              {item.product.name}
                            </h3>
                            <p className="text-[11px] uppercase tracking-wider text-[#888888]">
                              {item.product.category}
                            </p>
                          </div>

                          <div className="flex items-center justify-between">
                            {/* Quantity Controls */}
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                className="w-7 h-7 border border-[#CCCCCC] flex items-center justify-center hover:border-[#1A1A1A] transition-colors"
                                data-cursor="cta"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span 
                                className="w-8 text-center text-sm"
                                style={{ fontFamily: 'var(--font-dm-mono)' }}
                              >
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                className="w-7 h-7 border border-[#CCCCCC] flex items-center justify-center hover:border-[#1A1A1A] transition-colors"
                                data-cursor="cta"
                                aria-label="Increase quantity"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            {/* Price */}
                            <p className="text-price">
                              {item.product.currency}{item.product.price * item.quantity}
                            </p>
                          </div>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="p-1 hover:opacity-60 transition-opacity self-start"
                          data-cursor="cta"
                          aria-label="Remove item"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {items.length > 0 && (
                <div className="p-6 border-t border-[#CCCCCC] space-y-4">
                  {/* Subtotal */}
                  <div className="flex items-center justify-between">
                    <span 
                      className="text-[11px] uppercase tracking-[0.25em] text-[#888888]"
                      style={{ fontFamily: 'var(--font-dm-sans)' }}
                    >
                      Subtotal
                    </span>
                    <span 
                      className="text-lg text-[#0A0A0A]"
                      style={{ fontFamily: 'var(--font-dm-mono)' }}
                    >
                      €{getSubtotal()}
                    </span>
                  </div>

                  {/* Clear Cart */}
                  <button
                    onClick={clearCart}
                    className="text-[11px] uppercase tracking-[0.25em] text-[#888888] hover:text-[#0A0A0A] transition-colors"
                    data-cursor="cta"
                  >
                    Clear Cart
                  </button>

                  {/* Checkout Button (Portfolio - no actual checkout) */}
                  <button
                    className="w-full py-4 bg-[#0A0A0A] text-[#FAFAFA] text-[11px] uppercase tracking-[0.25em] hover:bg-[#FAFAFA] hover:text-[#0A0A0A] border border-[#0A0A0A] transition-all duration-300 opacity-50"
                    disabled
                    data-cursor="cta"
                  >
                    Checkout (Demo)
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
