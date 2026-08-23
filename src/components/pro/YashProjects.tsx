import React from 'react';
import { projects } from '../../lib/data';
import { FadeUp } from './YashScrollFx';
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';

export const YashProjects: React.FC = () => {
  return (
    <section id="work" className="relative px-6 py-28 md:px-16 md:py-36 bg-[#0a0a0a] text-[#f2f2ee]">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Header */}
        <FadeUp>
          <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#8f8f89]">
            // 02 · FEATURED PRODUCTIONS
          </span>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black font-heading tracking-tight mt-2 uppercase">
            Selected Ventures & <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff8a3d] via-[#ff3d77] to-[#a855f7]">
              Shipped Platforms.
            </span>
          </h2>
        </FadeUp>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, idx) => (
            <FadeUp
              key={project.id}
              delay={idx * 0.1}
              className="group relative rounded-3xl bg-[#141416] border border-white/10 p-8 sm:p-10 flex flex-col justify-between hover:border-white/30 transition-all duration-500 overflow-hidden"
            >
              {/* Background ambient gradient glow */}
              <div className="absolute -right-20 -top-20 w-60 h-60 bg-gradient-to-br from-brand-violet/20 to-transparent rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700 pointer-events-none" />

              <div>
                {/* Top Metas */}
                <div className="flex items-center justify-between gap-4 mb-6">
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-white/5 border border-white/10 text-gray-300">
                    {project.category}
                  </span>
                  <span className="text-xs font-mono text-[#8f8f89]">
                    {project.period}
                  </span>
                </div>

                {/* Title & Subtitle */}
                <h3 className="text-2xl sm:text-3xl font-black font-heading text-white group-hover:text-[#00D4FF] transition-colors mb-2">
                  {project.title}
                </h3>
                <p className="text-xs sm:text-sm font-mono font-semibold text-brand-pink mb-4">
                  {project.tagline}
                </p>

                {/* Description */}
                <p className="text-sm text-gray-300 leading-relaxed font-sans mb-8">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tags.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-0.5 rounded-md text-[11px] font-mono bg-[#1e1e24] text-gray-400 border border-white/5"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Actions & Metrics */}
              <div className="pt-6 border-t border-white/10 flex items-center justify-between gap-4">
                <span className="text-xs font-mono font-bold text-[#00D4FF]">
                  {project.metrics}
                </span>

                <div className="flex items-center gap-3">
                  {project.links.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white transition-all"
                      title="View GitHub Repository"
                    >
                      <Github size={16} />
                    </a>
                  )}

                  {project.links.live && (
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#00D4FF] to-brand-violet text-white text-xs font-mono font-bold uppercase tracking-wider hover:scale-105 transition-all shadow-md"
                    >
                      <span>Live Site</span>
                      <ArrowUpRight size={14} />
                    </a>
                  )}
                </div>
              </div>
            </FadeUp>
          ))}
        </div>

      </div>
    </section>
  );
};

export default YashProjects;
