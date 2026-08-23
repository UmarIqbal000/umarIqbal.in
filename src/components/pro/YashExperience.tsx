import React, { useEffect, useRef } from 'react';
import { motion, useAnimationFrame, useMotionValue } from 'framer-motion';
import { highlights, timeline } from '../../lib/data';
import { FadeUp } from './YashScrollFx';
import { Award, BookOpen, Cpu, Sparkles } from 'lucide-react';

const CARD_GAP = 16;
const DRIFT_SPEED = 40;

function HighlightsCarousel() {
  const x = useMotionValue(0);
  const setRef = useRef<HTMLDivElement>(null);
  const loopWidth = useRef(0);
  const hovering = useRef(false);
  const dragging = useRef(false);

  useEffect(() => {
    const measure = () => {
      if (setRef.current) loopWidth.current = setRef.current.offsetWidth + CARD_GAP;
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  useAnimationFrame((_, delta) => {
    const w = loopWidth.current;
    if (!w) return;
    let next = x.get();
    const paused = hovering.current || dragging.current;
    if (!paused) next -= (DRIFT_SPEED * delta) / 1000;
    if (next <= -w || next > 0) next = -(((-next % w) + w) % w);
    x.set(next);
  });

  const cards = highlights.map((item, idx) => (
    <figure
      key={idx}
      className="group w-[290px] md:w-[360px] shrink-0 select-none overflow-hidden rounded-3xl border border-white/10 bg-[#0d0d0d] transition-colors duration-300 hover:border-white/40"
    >
      <div className="overflow-hidden h-48 bg-[#16161a]">
        <img
          src={item.image}
          alt={item.title}
          draggable={false}
          className="pointer-events-none h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <figcaption className="p-6">
        <p className="font-bold text-white text-base">{item.title}</p>
        <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-[#8f8f89]">{item.detail}</p>
        <p className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[#00D4FF] mt-4">
          {item.year}
        </p>
      </figcaption>
    </figure>
  ));

  return (
    <div
      className="overflow-hidden py-4"
      onMouseEnter={() => (hovering.current = true)}
      onMouseLeave={() => (hovering.current = false)}
    >
      <motion.div
        drag="x"
        dragMomentum={false}
        onDragStart={() => (dragging.current = true)}
        onDragEnd={() => (dragging.current = false)}
        style={{ x }}
        className="flex w-max cursor-grab gap-4 active:cursor-grabbing"
      >
        <div ref={setRef} className="flex gap-4">
          {cards}
        </div>
        <div aria-hidden className="flex gap-4">
          {cards}
        </div>
      </motion.div>
    </div>
  );
}

export const YashExperience: React.FC = () => {
  return (
    <section id="journey" className="overflow-hidden px-6 py-24 md:px-12 md:py-36 bg-[#0a0a0a] text-[#f2f2ee]">
      <div className="max-w-6xl mx-auto space-y-20">
        
        {/* Section Title */}
        <div className="text-center">
          <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#8f8f89]">
            // 03 · CREDENTIALS & CHRONOLOGY
          </span>
          <h2 className="text-5xl sm:text-7xl md:text-8xl font-black font-heading tracking-tight mt-2 uppercase">
            My Journey
          </h2>
        </div>

        {/* Highlights Drifting Carousel */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 px-2">
            <Sparkles size={16} className="text-[#00D4FF]" />
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-gray-400">
              FEATURED MILESTONES (DRAG & HOVER)
            </span>
          </div>
          <HighlightsCarousel />
        </div>

        {/* Interactive Vertical Timeline */}
        <div className="max-w-4xl mx-auto pt-10">
          <div className="relative border-l border-white/15 ml-4 sm:ml-6 space-y-10 pl-8 sm:pl-10">
            {timeline.map((item, idx) => (
              <FadeUp key={idx} delay={idx * 0.1} className="relative group">
                {/* Node */}
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
                  <p className="text-xs font-mono font-semibold text-brand-pink mb-3">
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

      </div>
    </section>
  );
};

export default YashExperience;
