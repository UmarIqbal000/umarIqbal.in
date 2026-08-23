import React from 'react';
import { motion } from 'framer-motion';

export const YashProfileScanner: React.FC = () => {
  return (
    <div className="relative w-full max-w-[420px] bg-[#0E0E12]/95 border border-[#00D4FF]/40 rounded-2xl p-5 shadow-[0_0_30px_rgba(0,212,255,0.18)] backdrop-blur-2xl">
      {/* Corner Technical Notches */}
      <div className="absolute top-0 left-0 w-3.5 h-3.5 border-t-2 border-l-2 border-[#00D4FF] pointer-events-none" />
      <div className="absolute top-0 right-0 w-3.5 h-3.5 border-t-2 border-r-2 border-[#00D4FF] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-3.5 h-3.5 border-b-2 border-l-2 border-[#00D4FF] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-3.5 h-3.5 border-b-2 border-r-2 border-[#00D4FF] pointer-events-none" />

      {/* Header Bar */}
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#26262D]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-sm bg-[#00D4FF] animate-pulse" />
          <h3 className="font-mono text-xs font-bold tracking-widest text-[#00D4FF] uppercase">
            BIOMETRIC PROFILE // SCANNER
          </h3>
        </div>
        <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase tracking-wider bg-[#00D4FF]/10 text-[#00D4FF] border border-[#00D4FF]/30">
          ID: VERIFIED
        </span>
      </div>

      {/* Profile Container: Photo with Animated Scanner Laser */}
      <div className="flex gap-4 items-center">
        {/* Photo Box with Scanner Laser */}
        <div className="relative w-28 h-32 sm:w-32 sm:h-36 rounded-xl overflow-hidden bg-[#161617] border border-[#00D4FF]/50 flex-shrink-0 flex items-center justify-center">
          <img
            src="/avatar_3d.jpg"
            alt="Umar Iqbal 3D Avatar"
            className="w-full h-full object-cover object-top"
          />

          {/* Fallback Monogram */}
          <div className="absolute inset-0 flex items-center justify-center font-mono font-black text-3xl text-gradient -z-10">
            UI
          </div>

          {/* Animated Laser Scanline (Moving up and down) */}
          <motion.div
            animate={{ y: ['-100%', '300%'] }}
            transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
            className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#00D4FF] to-transparent shadow-[0_0_12px_#00D4FF] pointer-events-none"
          />

          {/* Blue Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#00D4FF]/20 to-transparent pointer-events-none" />
        </div>

        {/* Identity Details */}
        <div className="flex-1 space-y-2 text-left font-mono">
          <div>
            <span className="text-[10px] text-gray-500 uppercase">NAME:</span>
            <h4 className="text-base sm:text-lg font-black text-white font-heading">Umar Iqbal</h4>
          </div>

          <div>
            <span className="text-[10px] text-gray-500 uppercase">ROLE:</span>
            <p className="text-xs text-[#00D4FF] font-bold">NLP Researcher & AI Founder</p>
          </div>

          <div>
            <span className="text-[10px] text-gray-500 uppercase">UNIVERSITY:</span>
            <p className="text-[11px] text-gray-300">IILM Univ (B.Tech CSE Data Science)</p>
          </div>

          <div>
            <span className="text-[10px] text-gray-500 uppercase">STATUS:</span>
            <p className="text-[11px] text-brand-orange font-bold">VP ACM Student Chapter</p>
          </div>
        </div>
      </div>

      {/* Published NLP Researcher Citation */}
      <div className="mt-4 pt-3 border-t border-[#26262D] text-left text-xs text-gray-300 leading-relaxed font-sans">
        <p>
          ⚡ <span className="text-white font-bold">Published NLP Research:</span> Fake news detection on social feeds (<span className="text-[#00D4FF] font-mono text-[11px]">DOI: 10.13140/RG.2.2.25770.27844</span>).
        </p>
      </div>
    </div>
  );
};

export default YashProfileScanner;
