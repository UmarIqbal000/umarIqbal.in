import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { marqueeSkills, showcaseCerts } from '../../lib/data';
import { FadeUp } from './YashScrollFx';
import { Award } from 'lucide-react';

interface CertItem {
  src: string;
  title: string;
  issuer: string;
}

function CursorDrivenRow({
  items,
  reverse = false,
  mouseRatio,
}: {
  items: CertItem[];
  reverse?: boolean;
  mouseRatio: ReturnType<typeof useSpring>;
}) {
  // Move row based on cursor X position
  const x = useTransform(
    mouseRatio,
    [0, 1],
    reverse ? [-400, 100] : [100, -400]
  );

  const repeated = [...items, ...items, ...items];

  return (
    <div className="overflow-hidden py-3">
      <motion.div style={{ x }} className="flex w-max gap-5 pr-5 pointer-events-none select-none">
        {repeated.map((item, i) => (
          <div
            key={`${item.src}-${i}`}
            className="group relative h-48 w-80 md:h-60 md:w-[26rem] rounded-2xl border border-white/15 bg-[#141416] overflow-hidden flex-shrink-0 shadow-xl"
          >
            {/* Certificate Snapshot */}
            <img
              src={item.src}
              alt={item.title}
              draggable={false}
              className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            />

            {/* Gradient Overlay with Text */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-4 sm:p-5">
              <div className="flex items-center gap-1.5 text-[#00D4FF] mb-1">
                <Award size={13} />
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider">
                  {item.issuer}
                </span>
              </div>
              <h4 className="font-heading font-black text-sm sm:text-base text-white truncate">
                {item.title}
              </h4>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export const YashShowcase: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const rawMouseX = useMotionValue(0.5);
  const smoothMouseX = useSpring(rawMouseX, { stiffness: 60, damping: 20 });

  const rowA = showcaseCerts.slice(0, 5);
  const rowB = showcaseCerts.slice(5);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    rawMouseX.set(ratio);
  };

  const handleMouseLeave = () => {
    rawMouseX.set(0.5);
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="overflow-hidden py-16 md:py-24 bg-[#0a0a0a]"
    >
      {/* Tech Strip Marquee */}
      <FadeUp>
        <div className="flex overflow-hidden border-y border-white/10 py-5">
          <div className="flex w-max shrink-0 items-center gap-10 pr-10 animate-marquee">
            {[...marqueeSkills, ...marqueeSkills, ...marqueeSkills].map((skill, i) => (
              <span
                key={`${skill}-${i}`}
                className="flex items-center gap-10 whitespace-nowrap text-xl md:text-2xl font-black text-gray-300 font-heading uppercase"
              >
                {skill}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff8a3d] via-[#ff3d77] to-[#00d4ff] text-base">
                  ✦
                </span>
              </span>
            ))}
          </div>
        </div>
      </FadeUp>

      {/* Dual Cursor-Guided Smooth Scrolling Certificates Gallery */}
      <FadeUp delay={0.15} className="mt-14 space-y-4">
        <div className="max-w-6xl mx-auto px-6 mb-2">
          <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#8f8f89]">
            // VERIFIED INDUSTRY CERTIFICATIONS · MOVE CURSOR TO SCROLL
          </span>
        </div>

        {/* Row 1: Smoothly slides based on cursor movement */}
        <CursorDrivenRow items={rowA} reverse={false} mouseRatio={smoothMouseX} />

        {/* Row 2: Counter slides smoothly based on cursor movement */}
        <CursorDrivenRow items={rowB} reverse={true} mouseRatio={smoothMouseX} />
      </FadeUp>
    </section>
  );
};

export default YashShowcase;
