import React from 'react';
import { siteConfig } from '../../lib/data';
import { FadeUp } from './YashScrollFx';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export const YashHowIWork: React.FC = () => {
  return (
    <section id="process" className="relative px-6 py-20 md:px-12 bg-[#0d0d0f] text-[#f2f2ee] border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <FadeUp className="mb-14 text-center">
          <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#8f8f89]">
            // 04 · WORKFLOW & METHODOLOGY
          </span>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black font-heading tracking-tight mt-2 uppercase">
            How I Work & Ship
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-sm sm:text-base text-gray-400 font-sans">
            A disciplined, production-grade 5-step engineering pipeline from first principles to scalable deployment.
          </p>
        </FadeUp>

        {/* 5-Step Process Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {siteConfig.workProcess.map((step, sIdx) => (
            <FadeUp
              key={step.step}
              delay={sIdx * 0.1}
              className="p-6 rounded-2xl bg-[#141418] border border-white/10 relative overflow-hidden group hover:border-[#00D4FF]/60 hover:-translate-y-1 transition-all duration-300 shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl font-black font-heading text-white/20 group-hover:text-[#00D4FF] transition-colors">
                    {step.step}
                  </span>
                  <CheckCircle2 size={16} className="text-[#00D4FF]/40 group-hover:text-[#00D4FF] transition-colors" />
                </div>
                <h4 className="text-base font-bold text-white leading-snug font-heading mb-2">
                  {step.title}
                </h4>
              </div>
              <div className="pt-4 border-t border-white/5 flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider text-gray-400 group-hover:text-[#00D4FF] transition-colors">
                <span>Phase {step.step}</span>
                <ArrowRight size={10} />
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
};

export default YashHowIWork;
