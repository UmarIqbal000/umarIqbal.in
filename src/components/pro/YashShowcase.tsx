import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useAnimationFrame } from 'framer-motion';
import { marqueeSkills, showcaseCerts } from '../../lib/data';
import { FadeUp } from './YashScrollFx';
import { Award, X, ExternalLink, ZoomIn, Sparkles } from 'lucide-react';

const CARD_GAP = 20;

interface CertItem {
  src: string;
  title: string;
  issuer: string;
}

function InteractiveDraggableRow({
  items,
  speed = 35,
  reverse = false,
  onSelectCert,
}: {
  items: CertItem[];
  speed?: number;
  reverse?: boolean;
  onSelectCert: (cert: CertItem) => void;
}) {
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
    
    if (!paused) {
      const step = (speed * delta) / 1000;
      next = reverse ? next + step : next - step;
    }

    if (next <= -w) next += w;
    if (next >= 0) next -= w;

    x.set(next);
  });

  const renderCard = (item: CertItem, keyPrefix: string, i: number) => (
    <div
      key={`${keyPrefix}-${item.src}-${i}`}
      onClick={() => onSelectCert(item)}
      className="group relative h-48 w-80 md:h-60 md:w-[26rem] rounded-2xl border border-white/15 bg-[#141416] overflow-hidden flex-shrink-0 shadow-xl cursor-pointer hover:border-[#00D4FF] hover:scale-[1.02] transition-all duration-300 select-none"
    >
      {/* Certificate Snapshot */}
      <img
        src={item.src}
        alt={item.title}
        draggable={false}
        className="pointer-events-none h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
      />

      {/* Dark Gradient Overlay with Text & Zoom Icon */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-4 sm:p-5 pointer-events-none">
        <div className="flex items-center justify-between gap-2 mb-1">
          <div className="flex items-center gap-1.5 text-[#00D4FF]">
            <Award size={13} />
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider">
              {item.issuer}
            </span>
          </div>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-[10px] font-mono text-white/80 bg-white/10 px-2 py-0.5 rounded-full backdrop-blur-sm">
            <ZoomIn size={10} />
            <span>CLICK TO VIEW</span>
          </div>
        </div>
        <h4 className="font-heading font-black text-sm sm:text-base text-white truncate">
          {item.title}
        </h4>
      </div>
    </div>
  );

  return (
    <div
      className="overflow-hidden py-2"
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
          {items.map((item, i) => renderCard(item, 'set1', i))}
        </div>
        <div aria-hidden className="flex gap-5">
          {items.map((item, i) => renderCard(item, 'set2', i))}
        </div>
        <div aria-hidden className="flex gap-5">
          {items.map((item, i) => renderCard(item, 'set3', i))}
        </div>
      </motion.div>
    </div>
  );
}

export const YashShowcase: React.FC = () => {
  const [selectedCert, setSelectedCert] = useState<CertItem | null>(null);

  const rowA = showcaseCerts.slice(0, 5);
  const rowB = showcaseCerts.slice(5);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedCert(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section className="overflow-hidden py-16 md:py-24 bg-[#0a0a0a]">
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

      {/* Dual Counter-Scrolling Verified Certificates Gallery */}
      <FadeUp delay={0.15} className="mt-14 space-y-5">
        <div className="max-w-6xl mx-auto px-6 mb-2 flex items-center justify-between">
          <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#8f8f89]">
            // VERIFIED INDUSTRY CERTIFICATIONS (DRAG & CLICK TO VIEW)
          </span>
          <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono text-[#00D4FF]">
            <Sparkles size={12} />
            <span>INTERACTIVE PREVIEW</span>
          </span>
        </div>

        {/* Row 1: Leftward drift + Grab to pan */}
        <InteractiveDraggableRow items={rowA} speed={38} reverse={false} onSelectCert={setSelectedCert} />

        {/* Row 2: Rightward drift + Grab to pan */}
        <InteractiveDraggableRow items={rowB} speed={38} reverse={true} onSelectCert={setSelectedCert} />
      </FadeUp>

      {/* Fullscreen Certificate Lightbox Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCert(null)}
            className="fixed inset-0 z-[150] flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.25, ease: [0.65, 0, 0.35, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-[#141416] border border-white/20 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,212,255,0.25)] flex flex-col max-h-[90vh]"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-5 border-b border-white/10 bg-[#0e0e11]">
                <div className="flex items-center gap-2 text-[#00D4FF]">
                  <Award size={18} />
                  <span className="font-mono text-xs font-bold uppercase tracking-wider">
                    {selectedCert.issuer}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedCert(null)}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                  title="Close (Esc)"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Certificate Image View */}
              <div className="p-4 sm:p-6 overflow-y-auto flex items-center justify-center bg-black/40">
                <img
                  src={selectedCert.src}
                  alt={selectedCert.title}
                  className="max-h-[65vh] w-auto object-contain rounded-xl border border-white/10 shadow-2xl"
                />
              </div>

              {/* Footer */}
              <div className="p-5 border-t border-white/10 bg-[#0e0e11] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="font-heading font-black text-lg text-white">
                    {selectedCert.title}
                  </h3>
                  <p className="text-xs font-mono text-gray-400">Verified Professional Credential</p>
                </div>
                <a
                  href={selectedCert.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#00D4FF] to-brand-violet text-white text-xs font-mono font-bold uppercase tracking-wider hover:scale-105 transition-all shadow-md"
                >
                  <span>Open Full Image</span>
                  <ExternalLink size={14} />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default YashShowcase;
