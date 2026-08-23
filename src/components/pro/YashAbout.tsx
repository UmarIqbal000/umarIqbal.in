import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { siteConfig, skills } from '../../lib/data';
import { WordReveal, FadeUp } from './YashScrollFx';
import { SparkleIcon, OrbIcon, DiscIcon, BoltIcon, FlowerIcon, RingIcon } from './YashIcons';
import { Award, BookOpen, Cpu, Globe } from 'lucide-react';

const skillGroups = [
  { title: 'AI & Machine Learning', items: skills.ai_ml || skills.languages || [] },
  { title: 'Frontend Engineering', items: skills.frontend || [] },
  { title: 'Backend & Cloud', items: skills.backend_cloud || skills.backend || [] },
  { title: 'Developer Tools', items: skills.tools || [] },
];

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
      className="relative overflow-hidden px-6 py-28 md:px-16 md:py-36 bg-[#0a0a0a] text-[#f2f2ee]"
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

      <div className="max-w-6xl mx-auto space-y-24">
        
        {/* Section Header */}
        <FadeUp>
          <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#8f8f89]">
            // 01 · ABOUT & CORE IDENTITY
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
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <FadeUp delay={0.1} className="p-6 rounded-2xl bg-[#141416] border border-white/10 hover:border-[#00D4FF]/50 transition-all">
            <div className="flex items-center gap-3 mb-3 text-[#00D4FF]">
              <Award size={22} />
              <span className="font-mono text-xs font-bold uppercase">RANK #1 GLOBAL</span>
            </div>
            <h4 className="text-lg font-bold text-white mb-1">Google Cloud Skill Boost</h4>
            <p className="text-xs text-gray-400 font-mono">15,320 pts · Silver League Leader</p>
          </FadeUp>

          <FadeUp delay={0.2} className="p-6 rounded-2xl bg-[#141416] border border-white/10 hover:border-brand-violet/50 transition-all">
            <div className="flex items-center gap-3 mb-3 text-brand-violet">
              <BookOpen size={22} />
              <span className="font-mono text-xs font-bold uppercase">NLP RESEARCH</span>
            </div>
            <h4 className="text-lg font-bold text-white mb-1">Published Paper</h4>
            <p className="text-xs text-gray-400 font-mono">DOI: 10.13140/RG.2.2.25770.27844</p>
          </FadeUp>

          <FadeUp delay={0.3} className="p-6 rounded-2xl bg-[#141416] border border-white/10 hover:border-brand-pink/50 transition-all">
            <div className="flex items-center gap-3 mb-3 text-brand-pink">
              <Cpu size={22} />
              <span className="font-mono text-xs font-bold uppercase">LEADERSHIP</span>
            </div>
            <h4 className="text-lg font-bold text-white mb-1">VP ACM Student Chapter</h4>
            <p className="text-xs text-gray-400 font-mono">IILM University · 500+ Members</p>
          </FadeUp>
        </div>

        {/* Categorized Skills Grid */}
        <div className="space-y-8">
          <FadeUp>
            <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#8f8f89]">
              // TECHNICAL CAPABILITIES
            </span>
            <h3 className="text-2xl sm:text-3xl font-black font-heading text-white mt-1">
              Skills & Technology Stack
            </h3>
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {skillGroups.map((group, gIdx) => (
              <FadeUp key={group.title} delay={gIdx * 0.1} className="p-6 rounded-2xl bg-[#141416]/80 border border-white/10">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#00d4ff] mb-4">
                  {group.title}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {(group.items || []).map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1 rounded-lg text-xs font-mono font-medium bg-[#1e1e24] text-gray-200 border border-white/5 hover:border-white/20 transition-all"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </FadeUp>
            ))}
          </div>
        </div>

        {/* 5-Step Work Process Roadmap */}
        <div className="space-y-8">
          <FadeUp>
            <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#8f8f89]">
              // WORKFLOW & METHODOLOGY
            </span>
            <h3 className="text-2xl sm:text-3xl font-black font-heading text-white mt-1">
              How I Build & Ship Products
            </h3>
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
            {siteConfig.workProcess.map((step, sIdx) => (
              <FadeUp key={step.step} delay={sIdx * 0.1} className="p-5 rounded-2xl bg-[#141416] border border-white/10 relative overflow-hidden group hover:border-[#00D4FF]/50 transition-all">
                <span className="text-3xl font-black font-heading text-white/20 group-hover:text-[#00D4FF] transition-colors block mb-2">
                  {step.step}
                </span>
                <h5 className="text-sm font-bold text-white leading-snug">
                  {step.title}
                </h5>
              </FadeUp>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default YashAbout;
