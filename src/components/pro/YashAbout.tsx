import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { siteConfig } from '../../lib/data';
import { FadeUp } from './YashScrollFx';
import { SparkleIcon, OrbIcon, BoltIcon, FlowerIcon } from './YashIcons';
import { Award, BookOpen, Cpu } from 'lucide-react';

export const YashAbout: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const floater1Y = useTransform(scrollYProgress, [0, 1], [-40, 80]);
  const floater2Y = useTransform(scrollYProgress, [0, 1], [60, -70]);
  const floater3Y = useTransform(scrollYProgress, [0, 1], [-50, 60]);

  return (
    <section
      ref={containerRef}
      id="about"
      className="relative overflow-hidden px-6 py-20 md:px-16 md:py-28 bg-[#0a0a0a] text-[#f2f2ee] border-t border-white/5"
    >
      {/* Floating 3D Chrome Vector Shapes */}
      <motion.div style={{ y: floater1Y }} className="absolute left-[6%] top-[10%] pointer-events-none opacity-60">
        <SparkleIcon className="w-12 h-12 md:w-16 md:h-16" />
      </motion.div>
      <motion.div style={{ y: floater2Y }} className="absolute right-[8%] top-[18%] pointer-events-none opacity-60">
        <OrbIcon className="w-10 h-10 md:w-14 md:h-14" />
      </motion.div>
      <motion.div style={{ y: floater3Y }} className="absolute left-[10%] bottom-[20%] pointer-events-none opacity-50">
        <BoltIcon className="w-10 h-10 md:w-12 md:h-12" />
      </motion.div>
      <motion.div style={{ y: floater1Y }} className="absolute right-[10%] bottom-[15%] pointer-events-none opacity-60">
        <FlowerIcon className="w-12 h-12 md:w-16 md:h-16" />
      </motion.div>

      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Section Header */}
        <FadeUp className="text-center">
          <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#8f8f89]">
            // 03 · ABOUT ME & CORE IDENTITY
          </span>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black font-heading tracking-tight mt-2 uppercase">
            Engineering Systems with <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff8a3d] via-[#a855f7] to-[#00d4ff]">
              Precision & Intelligence.
            </span>
          </h2>
        </FadeUp>

        {/* Narrative Bio */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-base sm:text-lg text-gray-300 leading-relaxed font-sans">
          <FadeUp delay={0.1}>
            <p className="border-l-2 border-white/20 pl-6">
              {siteConfig.about[0]}
            </p>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="border-l-2 border-[#00d4ff]/40 pl-6">
              {siteConfig.about[1]}
            </p>
          </FadeUp>
        </div>

        {/* Verified Milestones Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <FadeUp delay={0.1} className="p-6 sm:p-8 rounded-2xl bg-[#141416] border border-white/10 hover:border-[#00D4FF]/50 transition-all shadow-xl">
            <div className="flex items-center gap-3 mb-3 text-[#00D4FF]">
              <Award size={22} />
              <span className="font-mono text-xs font-bold uppercase">RANK #1 GLOBAL</span>
            </div>
            <h4 className="text-lg font-bold text-white mb-1 font-heading">Google Cloud Skill Boost</h4>
            <p className="text-xs text-gray-400 font-mono">15,320 pts · Silver League Leader</p>
          </FadeUp>

          <FadeUp delay={0.2} className="p-6 sm:p-8 rounded-2xl bg-[#141416] border border-white/10 hover:border-brand-violet/50 transition-all shadow-xl">
            <div className="flex items-center gap-3 mb-3 text-brand-violet">
              <BookOpen size={22} />
              <span className="font-mono text-xs font-bold uppercase">NLP RESEARCH</span>
            </div>
            <h4 className="text-lg font-bold text-white mb-1 font-heading">Published Paper</h4>
            <p className="text-xs text-gray-400 font-mono">DOI: 10.13140/RG.2.2.25770.27844</p>
          </FadeUp>

          <FadeUp delay={0.3} className="p-6 sm:p-8 rounded-2xl bg-[#141416] border border-white/10 hover:border-brand-pink/50 transition-all shadow-xl">
            <div className="flex items-center gap-3 mb-3 text-brand-pink">
              <Cpu size={22} />
              <span className="font-mono text-xs font-bold uppercase">LEADERSHIP</span>
            </div>
            <h4 className="text-lg font-bold text-white mb-1 font-heading">VP ACM Student Chapter</h4>
            <p className="text-xs text-gray-400 font-mono">IILM University · 500+ Members</p>
          </FadeUp>
        </div>

      </div>
    </section>
  );
};

export default YashAbout;
