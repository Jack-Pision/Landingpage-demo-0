'use client';

import Link from 'next/link';

const footerLinks = [
  { href: '/', label: 'Home' },
  { href: '/collection', label: 'Collection' },
  { href: '/story', label: 'Story' },
];

// Inline SVG icons for reliability
const LinkedInIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const XIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
    <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
  </svg>
);

const socialLinks = [
  { href: 'https://www.linkedin.com/in/jack-pision-201764377', label: 'LinkedIn', Icon: LinkedInIcon },
  { href: 'https://github.com/Jack-Pision', label: 'GitHub', Icon: GithubIcon },
  { href: 'https://x.com/Jack_pision', label: 'X', Icon: XIcon },
];

export function Footer() {
  return (
    <footer className="w-full py-16 md:py-24 border-t border-[#CCCCCC]">
      <div className="w-full px-6 md:px-12 lg:px-16">
        <div className="flex flex-col items-center gap-8">
          {/* Brand */}
          <Link href="/" className="block">
            <span 
              className="text-sm tracking-[0.4em] uppercase text-[#0A0A0A]"
              style={{ fontFamily: 'var(--font-dm-mono)' }}
            >
              FORGED
            </span>
          </Link>

          {/* Nav Links */}
          <nav className="flex items-center gap-8 md:gap-12">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-nav text-[#888888] hover:text-[#0A0A0A] transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Tagline */}
          <p className="text-body text-center max-w-md">
            Made for men who say less, carry more.
          </p>

          {/* Copyright & Developer Credit with Social Links */}
          <div className="pt-8 border-t border-[#CCCCCC] w-full flex flex-col items-center gap-4">
            <p 
              className="text-[11px] text-[#888888] tracking-wider uppercase"
              style={{ fontFamily: 'var(--font-dm-mono)' }}
            >
              2026 FORGED. All rights reserved.
            </p>
            <div className="flex items-center gap-3">
              <span className="text-[10px] text-[#AAAAAA]">
                Crafted by{' '}
                <a 
                  href="https://www.linkedin.com/in/jack-pision-201764377" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#888888] hover:text-[#D4A96A] transition-colors duration-300"
                >
                  Jack Pision
                </a>
              </span>
              <span className="text-[#CCCCCC]">|</span>
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#888888] hover:text-[#0A0A0A] transition-colors duration-300"
                    aria-label={social.label}
                  >
                    <social.Icon />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
