import React from 'react';
import { timeline } from '../../lib/data';
import { FadeUp } from './YashScrollFx';
import { CheckCircle2, Clock, Sparkles } from 'lucide-react';

export const YashJourney: React.FC = () => {
  return (
    <section id="journey" className="relative px-6 py-28 md:px-16 md:py-36 bg-[#0a0a0a] text-[#f2f2ee]">
      <div className="max-w-4xl mx-auto space-y-16">
        
        {/* Header */}
        <FadeUp>
          <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#8f8f89]">
            // 03 · CHRONOLOGY & MILESTONES
          </span>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black font-heading tracking-tight mt-2 uppercase">
            Education, Research & <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D4FF] via-brand-pink to-brand-orange">
              Leadership Journey.
            </span>
          </h2>
        </FadeUp>

        {/* Timeline Flow */}
        <div className="relative border-l border-white/15 ml-4 sm:ml-6 space-y-12 pl-8 sm:pl-10">
          {timeline.map((item, idx) => (
            <FadeUp key={idx} delay={idx * 0.1} className="relative group">
              {/* Timeline Node Point */}
              <div className="absolute -left-[41px] sm:-left-[49px] top-1.5 w-6 h-6 rounded-full bg-[#0a0a0a] border-2 border-[#00D4FF] flex items-center justify-center group-hover:scale-125 group-hover:bg-[#00D4FF] transition-all shadow-[0_0_15px_rgba(0,212,255,0.4)]">
                <span className="w-2 h-2 rounded-full bg-[#00D4FF] group-hover:bg-black" />
              </div>

              {/* Card */}
              <div className="p-6 sm:p-8 rounded-2xl bg-[#141416] border border-white/10 group-hover:border-white/25 transition-all">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-mono font-bold text-[#00D4FF] uppercase tracking-wider">
                    {item.period}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-white/5 text-gray-300 border border-white/10">
                    {item.status === 'in_progress' ? 'CURRENT DEGREE' : item.status === 'completed' ? 'VERIFIED' : 'ACTIVE'}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black font-heading text-white mb-1">
                  {item.title}
                </h3>
                <p className="text-xs font-mono font-semibold text-brand-pink mb-4">
                  {item.org}
                </p>
                <p className="text-sm text-gray-300 leading-relaxed font-sans">
                  {item.description}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>

      </div>
    </section>
  );
};

export default YashJourney;
