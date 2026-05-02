'use client';

import { motion } from 'framer-motion';

const categories = [
  { id: 'all', label: 'ALL' },
  { id: 'wallet', label: 'WALLETS' },
  { id: 'eyewear', label: 'EYEWEAR' },
  { id: 'bracelet', label: 'BRACELETS' },
];

interface CategoryFilterProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export function CategoryFilter({ activeCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="flex items-center justify-center gap-4 md:gap-8 py-8 border-b border-[#CCCCCC]">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className="relative text-nav py-2"
          data-cursor="cta"
        >
          <span
            className={`transition-colors duration-300 ${
              activeCategory === category.id ? 'text-[#0A0A0A]' : 'text-[#888888] hover:text-[#0A0A0A]'
            }`}
          >
            {category.label}
          </span>
          
          {/* Active underline */}
          {activeCategory === category.id && (
            <motion.div
              layoutId="activeCategory"
              className="absolute -bottom-[1px] left-0 right-0 h-[1px] bg-[#D4A96A]"
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            />
          )}
        </button>
      ))}
    </div>
  );
}
