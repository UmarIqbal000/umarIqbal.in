import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { projects } from '../../lib/data';
import { FadeUp } from './YashScrollFx';
import ScrollStack, { ScrollStackItem } from '../reactbits/ScrollStack';
import { ArrowUpRight, Cpu, ShoppingBag, FileText, Sun, Sparkles, Activity, CheckCircle2, Zap } from 'lucide-react';

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

function ProjectVisualPreview({ id }: { id: string }) {
  switch (id) {
    case 'ninzae':
      return (
        <div className="h-full w-full bg-[#111116] p-6 flex flex-col justify-between border border-purple-500/20 rounded-2xl relative overflow-hidden font-mono">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2 text-brand-violet">
              <Cpu size={16} />
              <span className="text-xs font-bold uppercase tracking-wider text-white">NINZAE AGENT ENGINE</span>
            </div>
            <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              ACTIVE
            </span>
          </div>

          <div className="space-y-2.5 py-3">
            <div className="bg-[#181820] p-3 rounded-xl border border-white/5 flex items-center justify-between text-xs">
              <span className="text-gray-400">Autonomous Core:</span>
              <span className="text-[#00D4FF] font-bold">Multi-Agent v2.4</span>
            </div>
            <div className="bg-[#181820] p-3 rounded-xl border border-white/5 flex items-center justify-between text-xs">
              <span className="text-gray-400">Inference Latency:</span>
              <span className="text-purple-300 font-bold">18ms / token</span>
            </div>
            <div className="bg-[#181820] p-3 rounded-xl border border-white/5 flex items-center justify-between text-xs">
              <span className="text-gray-400">Architecture:</span>
              <span className="text-brand-pink font-bold">PyTorch · Cloud AI</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] text-gray-500 pt-2 border-t border-white/5">
            <span>FOUNDER VENTURE</span>
            <span className="text-purple-400 font-bold">ninzae.ai</span>
          </div>
        </div>
      );

    case 'store':
      return (
        <div className="h-full w-full bg-[#111116] p-6 flex flex-col justify-between border border-cyan-500/20 rounded-2xl relative overflow-hidden font-mono">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2 text-[#00D4FF]">
              <ShoppingBag size={16} />
              <span className="text-xs font-bold uppercase tracking-wider text-white">STOREFRONT TELEMETRY</span>
            </div>
            <span className="flex items-center gap-1 text-[11px] text-[#00D4FF] font-bold bg-cyan-500/10 px-2.5 py-0.5 rounded-full border border-cyan-500/20">
              <Zap size={11} />
              LIVE PROD
            </span>
          </div>

          <div className="space-y-2.5 py-3">
            <div className="bg-[#181820] p-3 rounded-xl border border-white/5 flex items-center justify-between text-xs">
              <span className="text-gray-400">Database Layer:</span>
              <span className="text-emerald-400 font-bold">Supabase + Firebase</span>
            </div>
            <div className="bg-[#181820] p-3 rounded-xl border border-white/5 flex items-center justify-between text-xs">
              <span className="text-gray-400">Checkout Flow:</span>
              <span className="text-[#00D4FF] font-bold">Stripe 3D-Secure</span>
            </div>
            <div className="bg-[#181820] p-3 rounded-xl border border-white/5 flex items-center justify-between text-xs">
              <span className="text-gray-400">Domain:</span>
              <span className="text-white font-bold">store.umariqbal.in</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] text-gray-500 pt-2 border-t border-white/5">
            <span>GLOBAL DISPATCH</span>
            <span className="text-cyan-400 font-bold">100% OPERATIONAL</span>
          </div>
        </div>
      );

    case 'documorph':
      return (
        <div className="h-full w-full bg-[#111116] p-6 flex flex-col justify-between border border-pink-500/20 rounded-2xl relative overflow-hidden font-mono">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2 text-brand-pink">
              <FileText size={16} />
              <span className="text-xs font-bold uppercase tracking-wider text-white">DOCUMORPH SAAS PIPELINE</span>
            </div>
            <span className="flex items-center gap-1 text-[11px] text-pink-400 font-bold bg-pink-500/10 px-2.5 py-0.5 rounded-full border border-pink-500/20">
              <Activity size={11} />
              5,000+ USERS
            </span>
          </div>

          <div className="space-y-2.5 py-3">
            <div className="bg-[#181820] p-3 rounded-xl border border-white/5 flex items-center justify-between text-xs">
              <span className="text-gray-400">Processing Engine:</span>
              <span className="text-pink-400 font-bold">Zero-Server Client WASM</span>
            </div>
            <div className="bg-[#181820] p-3 rounded-xl border border-white/5 flex items-center justify-between text-xs">
              <span className="text-gray-400">Supported Codecs:</span>
              <span className="text-[#00D4FF] font-bold">PDF · DOCX · JSON · MD</span>
            </div>
            <div className="bg-[#181820] p-3 rounded-xl border border-white/5 flex items-center justify-between text-xs">
              <span className="text-gray-400">Service Reliability:</span>
              <span className="text-emerald-400 font-bold">99.9% Netlify Uptime</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] text-gray-500 pt-2 border-t border-white/5">
            <span>SOLO LAUNCH</span>
            <span className="text-pink-400 font-bold">documorph.netlify.app</span>
          </div>
        </div>
      );

    case 'solboost':
      return (
        <div className="h-full w-full bg-[#111116] p-6 flex flex-col justify-between border border-amber-500/20 rounded-2xl relative overflow-hidden font-mono">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2 text-amber-400">
              <Sun size={16} />
              <span className="text-xs font-bold uppercase tracking-wider text-white">SOLBOOST ANALYTICS</span>
            </div>
            <span className="flex items-center gap-1 text-[11px] text-amber-400 font-bold bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
              <Sparkles size={11} />
              TOP FINALIST
            </span>
          </div>

          <div className="space-y-2.5 py-3">
            <div className="bg-[#181820] p-3 rounded-xl border border-white/5 flex items-center justify-between text-xs">
              <span className="text-gray-400">Optimization Model:</span>
              <span className="text-amber-400 font-bold">Solar Irradiance ML</span>
            </div>
            <div className="bg-[#181820] p-3 rounded-xl border border-white/5 flex items-center justify-between text-xs">
              <span className="text-gray-400">Yield Enhancement:</span>
              <span className="text-emerald-400 font-bold">+34.8% Panel Output</span>
            </div>
            <div className="bg-[#181820] p-3 rounded-xl border border-white/5 flex items-center justify-between text-xs">
              <span className="text-gray-400">Telemetry Feed:</span>
              <span className="text-[#00D4FF] font-bold">Real-time Weather Radar</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] text-gray-500 pt-2 border-t border-white/5">
            <span>HACKATHON WINNER</span>
            <span className="text-amber-400 font-bold">solboost000.netlify.app</span>
          </div>
        </div>
      );

    default:
      return null;
  }
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
          itemDistance={80}
          itemScale={0.02}
          itemStackDistance={30}
          stackPosition="15%"
          scaleEndPosition="8%"
          baseScale={0.95}
        >
          {projects.map((project) => (
            <ScrollStackItem
              key={project.id}
              itemClassName="border border-white/15 bg-[#0d0d0d] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9)] !p-0 overflow-hidden"
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

                {/* Right Visual Dashboard Preview (Crystal Clear High-DPI) */}
                <div className="md:col-span-6 h-60 sm:h-72 rounded-2xl overflow-hidden border border-white/10 bg-[#16161a] relative group">
                  <ProjectVisualPreview id={project.id} />
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
