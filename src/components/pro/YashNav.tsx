import React, { useEffect, useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

const links = [
  { label: 'ABOUT', href: '#about' },
  { label: 'PROJECTS', href: '#work' },
  { label: 'JOURNEY', href: '#journey' },
  { label: 'CONTACT', href: '#contact' },
];

export const YashNav: React.FC = () => {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 300);
    setScrolled(y > 40);
  });

  useEffect(() => {
    setScrolled(window.scrollY > 40);
  }, []);

  return (
    <motion.header
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: hidden ? -120 : 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.65, 0, 0.35, 1], delay: hidden ? 0 : 0.3 }}
      className="fixed inset-x-0 top-0 z-[80] select-none"
    >
      <div
        className={`transition-colors duration-500 ${
          scrolled ? 'border-b border-white/10 bg-[#0a0a0a]/80 backdrop-blur-md' : ''
        }`}
      >
        <nav className="flex items-center justify-between px-6 py-5 md:px-16 max-w-7xl mx-auto">
          {/* Brand Monogram & Avatar */}
          <a
            href="#home"
            className="flex items-center gap-3 group"
          >
            <div className="w-8 h-8 rounded-full overflow-hidden border border-white/20 group-hover:border-[#00D4FF] transition-all bg-[#141416] flex-shrink-0 shadow-[0_0_12px_rgba(0,212,255,0.3)]">
              <img src="/head.png" alt="Umar Iqbal" className="w-full h-full object-cover" />
            </div>
            <span className="text-xs font-mono font-black tracking-widest text-white group-hover:text-[#00D4FF] transition-colors">
              UMAR.IQBAL // <span className="text-[#00D4FF]">AI</span>
            </span>
          </a>

          {/* Navigation Links */}
          <div className="flex items-center gap-6 md:gap-12">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.25em] text-gray-400 hover:text-white transition-colors duration-300"
              >
                {l.label}
              </a>
            ))}
          </div>
        </nav>
      </div>
    </motion.header>
  );
};

export default YashNav;
