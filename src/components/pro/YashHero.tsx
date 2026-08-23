import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { siteConfig, marqueeSkills } from '../../lib/data';
import { SparkleIcon } from './YashIcons';

const EASE = [0.65, 0, 0.35, 1] as const;

export const YashHero: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const avatarY = useTransform(scrollYProgress, [0, 1], [0, 90]);

  return (
    <section
      ref={ref}
      id="home"
      className="relative flex min-h-screen flex-col justify-between overflow-hidden px-6 pt-24 md:px-12 md:pt-28 bg-[#0a0a0a]"
    >
      <motion.div style={{ y, opacity }} className="my-auto w-full max-w-7xl mx-auto">
        {/* Giant Condensed Display Headline */}
        <div className="overflow-hidden text-center">
          <motion.h1
            initial={{ y: '110%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 1, ease: EASE, delay: 0.2 }}
            className="text-center font-black tracking-tight text-[17.5vw] md:text-[14.5vw] leading-[0.92] text-[#f2f2ee] select-none font-heading uppercase"
          >
            Hi, I'm Umar
          </motion.h1>
        </div>

        {/* 3-Column Interactive Grid */}
        <div className="relative mx-auto mt-4 grid max-w-6xl grid-cols-1 items-center gap-8 md:mt-[-2vw] md:grid-cols-[1fr_auto_1fr]">
          
          {/* Left Column — Uppercase Tagline with Sparkle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.6 }}
            className="order-2 max-w-[260px] text-[11px] font-semibold uppercase leading-[1.8] tracking-[0.2em] text-[#8f8f89] max-md:mx-auto max-md:text-center md:order-1 md:justify-self-start font-mono"
          >
            A Data Scientist & AI Engineer crafting intelligent machine learning architectures{' '}
            <SparkleIcon className="inline-block h-4 w-4 align-[-0.2em]" />
          </motion.p>

          {/* Center Column — 3D Avatar with Gradient Drop Shadow Glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: EASE, delay: 0.4 }}
            style={{ y: avatarY }}
            className="order-1 justify-self-center md:order-2"
          >
            <div className="relative group animate-float-gentle">
              <img
                src={siteConfig.avatar}
                alt="Umar Iqbal 3D Avatar"
                className="h-auto w-[65vw] max-w-[320px] md:w-[21vw] object-contain transition-transform duration-500 group-hover:scale-105"
                style={{
                  transform: 'rotate(4deg)',
                  filter:
                    'drop-shadow(0 0 50px rgba(168,85,247,0.45)) drop-shadow(0 0 25px rgba(0,212,255,0.4)) drop-shadow(0 30px 40px rgba(0,0,0,0.8))',
                  maskImage: 'radial-gradient(circle at 50% 50%, black 65%, transparent 98%)',
                  WebkitMaskImage: 'radial-gradient(circle at 50% 50%, black 65%, transparent 98%)',
                }}
              />
            </div>
          </motion.div>

          {/* Right Column — Gradient Pill CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.7 }}
            className="order-3 max-md:mx-auto md:justify-self-end"
          >
            <a
              href="#contact"
              className="inline-block rounded-full px-8 py-4 text-[11px] font-bold uppercase tracking-[0.22em] text-white bg-gradient-to-r from-[#ff8a3d] via-[#ff3d77] via-[#a855f7] to-[#00d4ff] hover:scale-105 active:scale-95 transition-all shadow-[0_0_25px_rgba(168,85,247,0.4)]"
            >
              Get In Touch
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom Continuous Marquee Skills Ticker */}
      <div className="w-full overflow-hidden border-t border-white/10 py-4 mt-8">
        <div className="flex w-max animate-marquee space-x-10 text-xs font-mono font-bold uppercase tracking-widest text-[#8f8f89]">
          {[...marqueeSkills, ...marqueeSkills, ...marqueeSkills].map((s, idx) => (
            <span key={idx} className="flex items-center gap-4 hover:text-[#00D4FF] transition-colors cursor-default">
              <span>{s}</span>
              <span className="text-white/20">/</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default YashHero;
