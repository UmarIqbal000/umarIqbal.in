import React, { useRef, useEffect } from 'react';
import { motion, useMotionValue, useAnimationFrame } from 'framer-motion';
import { highlights } from '../../lib/data';
import { FadeUp } from './YashScrollFx';
import { Trophy, Award, Star, ArrowUpRight, Sparkles } from 'lucide-react';

const CARD_WIDTH = 360;
const CARD_GAP = 20;

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
    if (!hovering.current && !dragging.current) {
      next -= (38 * delta) / 1000;
    }
    if (next <= -w) next += w;
    if (next >= 0) next -= w;
    x.set(next);
  });

  const cards = highlights.map((item, idx) => (
    <div
      key={`${item.title}-${idx}`}
      style={{ width: `${CARD_WIDTH}px` }}
      className="flex-shrink-0 rounded-2xl border border-white/15 bg-[#141418] p-6 md:p-8 flex flex-col justify-between shadow-2xl hover:border-[#00D4FF]/50 transition-all select-none"
    >
      <div>
        <div className="flex items-center justify-between gap-3 mb-4">
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#00D4FF]/10 text-[#00D4FF] border border-[#00D4FF]/20">
            <Trophy size={13} />
            <span>{item.year}</span>
          </span>
          <span className="text-xs font-mono text-gray-500">#{String(idx + 1).padStart(2, '0')}</span>
        </div>

        <h4 className="text-xl font-bold font-heading text-white leading-snug mb-3">
          {item.title}
        </h4>
        <p className="text-sm text-gray-300 leading-relaxed font-sans">
          {item.detail}
        </p>
      </div>

      <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono text-[#00D4FF]">
        <span>VERIFIED MILESTONE</span>
        <Sparkles size={14} />
      </div>
    </div>
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
        className="flex w-max cursor-grab gap-5 active:cursor-grabbing"
      >
        <div ref={setRef} className="flex gap-5">
          {cards}
        </div>
        <div aria-hidden className="flex gap-5">
          {cards}
        </div>
        <div aria-hidden className="flex gap-5">
          {cards}
        </div>
      </motion.div>
    </div>
  );
}

export const YashHighlights: React.FC = () => {
  return (
    <section id="highlights" className="relative px-6 py-20 md:px-12 bg-[#0a0a0a] text-[#f2f2ee] border-t border-white/5 overflow-hidden">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Header */}
        <FadeUp className="text-center">
          <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#8f8f89]">
            // 07 · RECOGNITION & HONORS
          </span>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black font-heading tracking-tight mt-2 uppercase">
            Highlights & Milestones
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-sm sm:text-base text-gray-400 font-sans">
            Notable accolades, competitive ranks, and key achievements across engineering and research.
          </p>
        </FadeUp>

        {/* Infinite Auto-Drifting & Draggable Highlights Carousel */}
        <FadeUp delay={0.15}>
          <HighlightsCarousel />
        </FadeUp>
      </div>
    </section>
  );
};

export default YashHighlights;
