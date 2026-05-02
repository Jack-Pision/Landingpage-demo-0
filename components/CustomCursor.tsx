'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hasDetected, setHasDetected] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 400 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const checkMobile = () => {
      const isMobileDevice = window.matchMedia('(hover: none)').matches || 
                            window.matchMedia('(pointer: coarse)').matches ||
                            window.innerWidth < 768;
      setIsMobile(isMobileDevice);
      setHasDetected(true);
      
      if (!isMobileDevice) {
        document.body.classList.add('has-custom-cursor');
      } else {
        document.body.classList.remove('has-custom-cursor');
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    const handleElementMouseEnter = (e: Event) => {
      const target = e.target as HTMLElement;
      const isProduct = target.closest('[data-cursor="product"]');
      const isCta = target.closest('[data-cursor="cta"]');
      
      if (isProduct || isCta) {
        setIsHovering(true);
        setCursorText(isProduct ? 'VIEW' : '');
      }
    };

    const handleElementMouseLeave = () => {
      setIsHovering(false);
      setCursorText('');
    };

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    const hoverables = document.querySelectorAll('a, button, [data-cursor]');
    hoverables.forEach((el) => {
      el.addEventListener('mouseenter', handleElementMouseEnter);
      el.addEventListener('mouseleave', handleElementMouseLeave);
    });

    return () => {
      document.body.classList.remove('has-custom-cursor');
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', checkMobile);
      hoverables.forEach((el) => {
        el.removeEventListener('mouseenter', handleElementMouseEnter);
        el.removeEventListener('mouseleave', handleElementMouseLeave);
      });
    };
  }, [cursorX, cursorY, isVisible]);

  if (hasDetected && isMobile) return null;

  if (!hasDetected) {
    return (
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference opacity-0"
        style={{ x: cursorXSpring, y: cursorYSpring }}
      >
        <div className="relative -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0A0A0A]" style={{ width: 10, height: 10 }} />
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
      style={{ x: cursorXSpring, y: cursorYSpring }}
      animate={{
        width: isHovering ? 40 : 10,
        height: isHovering ? 40 : 10,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{
        width: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
        height: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
        opacity: { duration: 0.2 },
      }}
    >
      <div 
        className="relative -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0A0A0A] flex items-center justify-center"
        style={{ width: '100%', height: '100%' }}
      >
        {cursorText && (
          <motion.span
            ref={labelRef}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="text-[9px] font-mono uppercase tracking-wider text-[#FAFAFA]"
            style={{ fontFamily: 'var(--font-dm-mono)' }}
          >
            {cursorText}
          </motion.span>
        )}
      </div>
    </motion.div>
  );
}
