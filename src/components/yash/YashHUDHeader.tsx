import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Github, Linkedin, Mail, Globe } from 'lucide-react';
import { SiLeetcode } from 'react-icons/si';
import { cyberAudio } from '../../utils/CyberAudioEngine';

interface YashHUDHeaderProps {
  onNavigate: (index: number) => void;
}

export const YashHUDHeader: React.FC<YashHUDHeaderProps> = ({ onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(cyberAudio.getMuted());

  const handleToggleSound = () => {
    const muted = cyberAudio.toggleMute();
    setIsMuted(muted);
  };

  const handleNavClick = (index: number) => {
    cyberAudio.playClickSound();
    setIsMenuOpen(false);
    onNavigate(index);
  };

  return (
    <>
      {/* Top Cyber Navigation Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-5 flex items-center justify-between pointer-events-none">
        
        {/* Brand Logo (Yash-Style Hexagon Badge) */}
        <div 
          onClick={() => handleNavClick(0)}
          onMouseEnter={() => cyberAudio.playHoverSound()}
          className="pointer-events-auto cursor-pointer flex items-center gap-3 group"
        >
          <div className="relative w-10 h-10 flex items-center justify-center bg-[#161617]/90 border border-brand-violet/50 rounded-xl shadow-[0_0_15px_rgba(124,58,237,0.3)] backdrop-blur-md group-hover:scale-105 group-hover:border-[#00D4FF] transition-all">
            <span className="font-mono font-black text-sm text-gradient">UI</span>
          </div>
          <span className="font-mono text-xs font-bold tracking-widest text-gray-300 hidden sm:inline group-hover:text-white transition-colors">
            UMAR.IQBAL // <span className="text-[#00D4FF]">DEV</span>
          </span>
        </div>

        {/* Right HUD Controls: Sound Toggle + Menu Trigger */}
        <div className="flex items-center gap-3 pointer-events-auto">
          
          {/* Sound Toggle Button */}
          <button
            onClick={handleToggleSound}
            onMouseEnter={() => cyberAudio.playHoverSound()}
            title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
            aria-label={isMuted ? 'Unmute Sound' : 'Mute Sound'}
            className="w-10 h-10 rounded-xl bg-[#161617]/90 border border-[#26262D] hover:border-brand-violet text-gray-300 hover:text-white flex items-center justify-center backdrop-blur-md transition-all shadow-md active:scale-95"
          >
            {isMuted ? (
              <VolumeX size={16} className="text-gray-500" />
            ) : (
              <Volume2 size={16} className="text-[#00D4FF]" />
            )}
          </button>

          {/* Menu Button */}
          <button
            onClick={() => {
              cyberAudio.playClickSound();
              setIsMenuOpen(!isMenuOpen);
            }}
            onMouseEnter={() => cyberAudio.playHoverSound()}
            title="Toggle Menu"
            aria-label="Toggle Menu"
            className="px-4 h-10 rounded-xl bg-[#161617]/90 border border-[#26262D] hover:border-[#00D4FF] text-gray-200 hover:text-white flex items-center gap-2.5 backdrop-blur-md transition-all shadow-md active:scale-95 group"
          >
            <span className="font-mono text-[11px] font-bold tracking-wider hidden sm:inline">
              {isMenuOpen ? 'CLOSE' : 'MENU'}
            </span>
            <div className="flex flex-col gap-1 w-4">
              <span className={`h-0.5 bg-[#00D4FF] transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
              <span className={`h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`h-0.5 bg-brand-pink transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
            </div>
          </button>
        </div>
      </header>

      {/* Fullscreen Cyber Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(24px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-40 bg-[#09090B]/95 flex flex-col justify-between p-8 sm:p-16 md:p-24 overflow-y-auto"
          >
            {/* Top Status */}
            <div className="flex items-center justify-between border-b border-[#26262D] pb-6">
              <span className="font-mono text-xs text-gray-500 tracking-widest uppercase">
                SYSTEM NAVIGATION // PORTAL
              </span>
              <span className="font-mono text-xs text-[#00D4FF] font-bold">
                STATUS: 3D ENGINE ONLINE
              </span>
            </div>

            {/* Main Menu Links */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-auto py-12">
              <div className="flex flex-col gap-6">
                {[
                  { idx: 0, label: '01 // HOME', desc: '3D Neural Hero & Introduction' },
                  { idx: 1, label: '02 // ABOUT & SKILLS', desc: 'NLP Research, AI Stack & Verified Identity' },
                ].map((item) => (
                  <div
                    key={item.idx}
                    onClick={() => handleNavClick(item.idx)}
                    onMouseEnter={() => cyberAudio.playHoverSound()}
                    className="cursor-pointer group text-left"
                  >
                    <h2 className="text-3xl sm:text-5xl font-black font-heading text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#00D4FF] group-hover:to-brand-violet transition-all">
                      {item.label}
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-400 font-mono mt-1 group-hover:text-gray-200">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-6">
                {[
                  { idx: 2, label: '03 // WORK & VENTURES', desc: 'Ninzae, Store & Shipped Platforms' },
                  { idx: 3, label: '04 // CONTACT & SOCIALS', desc: 'Get in touch & Transmission Terminal' },
                ].map((item) => (
                  <div
                    key={item.idx}
                    onClick={() => handleNavClick(item.idx)}
                    onMouseEnter={() => cyberAudio.playHoverSound()}
                    className="cursor-pointer group text-left"
                  >
                    <h2 className="text-3xl sm:text-5xl font-black font-heading text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-brand-pink group-hover:to-brand-orange transition-all">
                      {item.label}
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-400 font-mono mt-1 group-hover:text-gray-200">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Social Links & Footer */}
            <div className="border-t border-[#26262D] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <a
                  href="https://github.com/UmarIqbal000"
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => cyberAudio.playHoverSound()}
                  className="p-2.5 rounded-lg bg-[#161617] border border-[#26262D] hover:border-brand-violet text-gray-300 hover:text-white transition-all"
                >
                  <Github size={18} />
                </a>
                <a
                  href="https://www.linkedin.com/in/umariqbal000/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => cyberAudio.playHoverSound()}
                  className="p-2.5 rounded-lg bg-[#161617] border border-[#26262D] hover:border-brand-violet text-gray-300 hover:text-white transition-all"
                >
                  <Linkedin size={18} />
                </a>
                <a
                  href="https://leetcode.com/u/UmarIqbal000/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => cyberAudio.playHoverSound()}
                  className="p-2.5 rounded-lg bg-[#161617] border border-[#26262D] hover:border-brand-violet text-gray-300 hover:text-white transition-all"
                >
                  <SiLeetcode size={18} />
                </a>
                <a
                  href="mailto:umariq.cse@gmail.com"
                  onMouseEnter={() => cyberAudio.playHoverSound()}
                  className="p-2.5 rounded-lg bg-[#161617] border border-[#26262D] hover:border-brand-violet text-gray-300 hover:text-white transition-all"
                >
                  <Mail size={18} />
                </a>
                <a
                  href="https://umariqbal.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => cyberAudio.playHoverSound()}
                  className="p-2.5 rounded-lg bg-[#161617] border border-[#26262D] hover:border-brand-violet text-gray-300 hover:text-white transition-all"
                >
                  <Globe size={18} />
                </a>
              </div>

              <div className="font-mono text-xs text-gray-500">
                UMAR IQBAL © 2026 // ALL RIGHTS RESERVED
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default YashHUDHeader;
