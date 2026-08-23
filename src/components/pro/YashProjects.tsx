import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { projects } from '../../lib/data';
import { FadeUp } from './YashScrollFx';
import ScrollStack, { ScrollStackItem } from '../reactbits/ScrollStack';
import { ArrowUpRight } from 'lucide-react';

function ArchiveCta() {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 160, damping: 16 });
  const y = useSpring(my, { stiffness: 160, damping: 16 });

  const onMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - (rect.left + rect.width / 2)) * 0.3);
    my.set((e.clientY - (rect.top + rect.height / 2)) * 0.3);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={() => {
        mx.set(0);
        my.set(0);
      }}
      className="inline-block p-8 text-center"
    >
      <motion.div style={{ x, y }} className="relative inline-block">
        {/* Breathing glow behind the pill */}
        <motion.div
          aria-hidden
          animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.08, 1] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -inset-2 rounded-full blur-xl bg-gradient-to-r from-[#ff8a3d] via-[#ff3d77] via-[#a855f7] to-[#00d4ff]"
        />
        <a
          href="#contact"
          className="relative inline-flex items-center gap-3 rounded-full px-10 py-5 text-[12px] md:text-[13px] font-bold uppercase tracking-[0.22em] text-white bg-gradient-to-r from-[#ff8a3d] via-[#ff3d77] via-[#a855f7] to-[#00d4ff] hover:scale-105 transition-all shadow-xl"
        >
          <span>Let's Build Something Extraordinary</span>
          <motion.span
            aria-hidden
            animate={{ x: [0, 7, 0] }}
            transition={{ duration: 1.3, repeat: Infinity, ease: 'easeInOut' }}
          >
            →
          </motion.span>
        </a>
      </motion.div>
    </div>
  );
}

export const YashProjects: React.FC = () => {
  return (
    <section id="work" className="relative px-6 py-20 md:px-12 bg-[#0a0a0a] text-[#f2f2ee]">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <FadeUp className="mb-14 text-center">
          <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#8f8f89]">
            // 02 · FEATURED PRODUCTIONS
          </span>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black font-heading tracking-tight mt-2 uppercase">
            Selected Work & Ventures
          </h2>
        </FadeUp>

        {/* React Bits <ScrollStack /> Component */}
        <ScrollStack
          useWindowScroll={true}
          itemDistance={90}
          itemScale={0.035}
          itemStackDistance={35}
          stackPosition="16%"
          scaleEndPosition="8%"
          baseScale={0.88}
          blurAmount={0}
        >
          {projects.map((project) => (
            <ScrollStackItem
              key={project.id}
              itemClassName="border border-white/15 bg-[#0d0d0d] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)] !p-0 overflow-hidden"
            >
              {/* Header Row */}
              <div className="flex flex-col gap-4 border-b border-white/10 px-6 py-6 sm:flex-row sm:items-center sm:justify-between md:px-10 bg-[#121214]">
                <div className="flex items-center gap-4 md:gap-6">
                  <span className="font-black text-4xl md:text-6xl text-white font-heading leading-none">
                    {project.index}
                  </span>
                  <div>
                    <p className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[#8f8f89]">
                      Project · {project.year}
                    </p>
                    <h3 className="text-xl md:text-3xl font-black font-heading text-white truncate mt-0.5">
                      {project.title}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/20 hover:border-white hover:bg-white hover:text-black transition-all text-xs font-mono font-bold uppercase tracking-wider text-white"
                  >
                    <span>Live Project</span>
                    <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-6 space-y-4 text-left">
                  <h4 className="text-sm font-mono font-bold text-brand-pink uppercase tracking-wider">
                    {project.tagline}
                  </h4>
                  <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-sans">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {(project.stack || []).map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1 rounded-lg text-xs font-mono bg-[#1a1a1f] text-gray-300 border border-white/5"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="pt-2">
                    <span className="text-xs font-mono font-bold text-[#00D4FF]">
                      STATUS: {project.metrics}
                    </span>
                  </div>
                </div>

                {/* Right Visual Image */}
                <div className="md:col-span-6 h-56 sm:h-72 rounded-2xl overflow-hidden border border-white/10 bg-[#16161a] relative group">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-5">
                    <span className="font-mono text-xs font-bold text-white uppercase tracking-widest">
                      {project.subtitle}
                    </span>
                  </div>
                </div>
              </div>
            </ScrollStackItem>
          ))}
        </ScrollStack>

        {/* Magnetic Archive CTA */}
        <div className="mt-16 text-center">
          <ArchiveCta />
        </div>
      </div>
    </section>
  );
};

export default YashProjects;
