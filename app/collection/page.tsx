'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from '@/lib/gsap';
import { products, getProductsByCategory, Product } from '@/data/products';
import { ProductCard } from '@/components/ProductCard';
import { ProductDrawer } from '@/components/ProductDrawer';
import { CategoryFilter } from '@/components/CategoryFilter';

function CollectionContent() {
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState('all');
  const [displayedProducts, setDisplayedProducts] = useState(products);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Handle URL category param
  useEffect(() => {
    const category = searchParams.get('category');
    if (category && ['wallet', 'eyewear', 'bracelet'].includes(category)) {
      setActiveCategory(category);
    }
  }, [searchParams]);

  // Filter products with animation
  useEffect(() => {
    setIsAnimating(true);
    
    const filtered = getProductsByCategory(activeCategory);
    
    // Small delay for animation
    const timer = setTimeout(() => {
      setDisplayedProducts(filtered);
      setIsAnimating(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [activeCategory]);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsDrawerOpen(true);
  };

  const handleCategoryChange = (category: string) => {
    if (category !== activeCategory) {
      setActiveCategory(category);
    }
  };

  return (
    <div className="w-full min-h-screen pt-32 pb-20">
      {/* Header */}
      <div className="w-full px-6 md:px-12 lg:px-16 mb-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="heading-section text-4xl md:text-5xl text-[#0A0A0A] mb-4"
        >
          Collection
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-body max-w-md"
        >
          Every piece designed with purpose. No excess, only essentials.
        </motion.p>
      </div>

      {/* Category Filter */}
      <div className="w-full px-6 md:px-12 lg:px-16">
        <CategoryFilter 
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />
      </div>

      {/* Product Grid */}
      <div className="w-full px-6 md:px-12 lg:px-16 mt-8">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          layout
        >
          <AnimatePresence mode="popLayout">
            {displayedProducts.map((product, index) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: isAnimating ? 0 : 1, 
                  y: isAnimating ? 10 : 0 
                }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ 
                  duration: 0.4,
                  delay: isAnimating ? 0 : index * 0.05,
                  ease: [0.16, 1, 0.3, 1]
                }}
              >
                <ProductCard
                  product={product}
                  onClick={() => handleProductClick(product)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {displayedProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20"
          >
            <p className="text-body text-lg">No products found in this category.</p>
          </motion.div>
        )}
      </div>

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

export default function CollectionPage() {
  return (
    <Suspense fallback={
      <div className="w-full min-h-screen pt-32 pb-20 flex items-center justify-center">
        <div className="text-[#888888] text-sm tracking-wider">Loading...</div>
      </div>
    }>
      <CollectionContent />
    </Suspense>
  );
}
