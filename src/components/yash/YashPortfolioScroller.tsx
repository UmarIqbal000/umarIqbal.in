import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  ArrowDown, 
  ExternalLink, 
  Github, 
  Linkedin, 
  Globe, 
  ArrowRight,
  Terminal,
  Copy,
  Check,
  Award,
  Zap,
  Code,
  Layers
} from 'lucide-react';
import { SiLeetcode } from 'react-icons/si';
import Yash3DCanvas from './Yash3DCanvas';
import YashHUDHeader from './YashHUDHeader';
import YashProfileScanner from './YashProfileScanner';
import CyberHUDFrame from '../cyber/CyberHUDFrame';
import { cyberAudio } from '../../utils/CyberAudioEngine';

interface YashPortfolioScrollerProps {
  onViewProjectsTab: () => void;
  onExploreTabs: () => void;
}

export const YashPortfolioScroller: React.FC<YashPortfolioScrollerProps> = ({
  onViewProjectsTab,
  onExploreTabs,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Smooth Section Opacity & Position Curves
  const sec0Opacity = useTransform(scrollYProgress, [0, 0.20, 0.26], [1, 1, 0]);
  const sec0Y = useTransform(scrollYProgress, [0, 0.26], [0, -30]);

  const sec1Opacity = useTransform(scrollYProgress, [0.24, 0.32, 0.56, 0.62], [0, 1, 1, 0]);
  const sec1Y = useTransform(scrollYProgress, [0.24, 0.32, 0.56, 0.62], [30, 0, 0, -30]);

  const sec2Opacity = useTransform(scrollYProgress, [0.60, 0.68, 0.83, 0.88], [0, 1, 1, 0]);
  const sec2Y = useTransform(scrollYProgress, [0.60, 0.68, 0.83, 0.88], [30, 0, 0, -30]);

  const sec3Opacity = useTransform(scrollYProgress, [0.86, 0.92, 1], [0, 1, 1]);
  const sec3Y = useTransform(scrollYProgress, [0.86, 0.92, 1], [30, 0, 0]);

  const jumpToPhase = (phaseIdx: number) => {
    if (!containerRef.current) return;
    cyberAudio.playClickSound();
    const top = containerRef.current.offsetTop;
    const h = containerRef.current.offsetHeight;

    let target = 0;
    if (phaseIdx === 0) target = top;
    if (phaseIdx === 1) target = top + h * 0.36;
    if (phaseIdx === 2) target = top + h * 0.70;
    if (phaseIdx === 3) target = top + h * 0.94;

    window.scrollTo({ top: target, behavior: 'smooth' });
  };

  const copyEmail = () => {
    cyberAudio.playClickSound();
    navigator.clipboard.writeText('umariq.cse@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[460vh] bg-[#09090B] select-none font-sans"
    >
      {/* Top Fixed Cyber Navigation with Sound & Menu */}
      <YashHUDHeader onNavigate={jumpToPhase} />

      {/* Pinned 3D WebGL Viewport */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden bg-[#09090B]">
        
        {/* Real-time Three.js 3D Holographic Core Canvas */}
        <Yash3DCanvas scrollYProgress={scrollYProgress} />

        {/* Ambient Nebula Radial Wash */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-20">
          <div className="absolute top-[-20%] left-[-20%] w-[75%] h-[75%] rounded-full bg-[#00D4FF]/10 blur-[180px]" />
          <div className="absolute bottom-[-20%] right-[-20%] w-[75%] h-[75%] rounded-full bg-brand-violet/15 blur-[180px]" />
          <div className="absolute top-[30%] left-[30%] w-[50%] h-[50%] rounded-full bg-brand-pink/10 blur-[160px]" />
        </div>

        {/* ======================================================== */}
        {/* YASH CHAUHAN STYLE OVERLAY SECTIONS                       */}
        {/* ======================================================== */}

        {/* ── SECTION 0: LANDING / HERO (0% - 28%) ── */}
        <motion.div
          style={{ opacity: sec0Opacity, y: sec0Y }}
          className="absolute inset-0 flex flex-col justify-between p-6 sm:p-12 md:p-20 max-w-7xl mx-auto pointer-events-none z-20"
        >
          {/* Top Status Badge */}
          <div className="flex justify-between items-center pointer-events-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#161617]/85 backdrop-blur-md border border-[#00D4FF]/30 text-[#00D4FF] text-[11px] font-mono font-bold shadow-[0_0_15px_rgba(0,212,255,0.2)]">
              <span className="w-2 h-2 rounded-full bg-[#00D4FF] animate-ping" />
              <span>STATUS: BUILDING NINZAE & AI RESEARCH</span>
            </div>
          </div>

          {/* Yash-Style SVG Headline & Typography */}
          <div className="max-w-xl text-left pointer-events-auto">
            <span className="font-mono text-xs text-[#00D4FF] font-bold tracking-widest uppercase block mb-2">
              // DATA SCIENCE & NLP RESEARCH
            </span>
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-black font-heading text-white tracking-tight leading-[0.95] mb-4">
              Hi, my<br />
              name is <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D4FF] via-brand-pink to-brand-orange">Umar.</span>
            </h1>
            <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed mb-8 max-w-lg font-medium">
              I build machine learning architectures, published NLP research, and scalable full-stack applications.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => jumpToPhase(3)}
                onMouseEnter={() => cyberAudio.playHoverSound()}
                className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#00D4FF] to-brand-violet text-white font-mono font-bold text-xs sm:text-sm tracking-wider uppercase shadow-[0_0_20px_rgba(0,212,255,0.4)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
              >
                <span>Get in touch</span>
                <ArrowRight size={16} />
              </button>
              <button
                onClick={() => jumpToPhase(1)}
                onMouseEnter={() => cyberAudio.playHoverSound()}
                className="px-6 py-3.5 rounded-xl bg-[#161617]/90 border border-[#26262D] hover:border-[#00D4FF] text-gray-300 hover:text-white font-mono font-bold text-xs tracking-wider uppercase transition-all"
              >
                Explore About & Skills
              </button>
            </div>
          </div>
        </motion.div>

        {/* ── SECTION 1: ABOUT & SKILLS MATRIX (28% - 62%) ── */}
        <motion.div
          style={{ opacity: sec1Opacity, y: sec1Y }}
          className="absolute inset-0 flex items-center justify-between p-6 sm:p-12 md:p-16 max-w-7xl mx-auto pointer-events-none z-20"
        >
          {/* Left Column: Yash Profile Picture Scanner */}
          <div className="w-full max-w-md pointer-events-auto">
            <YashProfileScanner />
          </div>

          {/* Right Column: Technical Skills HUD Matrix */}
          <div className="w-full max-w-sm pointer-events-auto hidden md:block">
            <CyberHUDFrame title="TECHNICAL SKILLSET" badge="CORE" accentColor="violet">
              <div className="space-y-4">
                {/* Skill Group 1 */}
                <div>
                  <div className="flex justify-between items-center text-xs font-mono mb-1.5">
                    <span className="text-white font-bold">AI & NLP Research</span>
                    <span className="text-brand-violet font-bold">95%</span>
                  </div>
                  <div className="h-1.5 w-full bg-[#1e1e24] rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-brand-violet to-brand-pink w-[95%] rounded-full shadow-[0_0_10px_rgba(124,58,237,0.8)]" />
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {['PyTorch', 'TensorFlow', 'NLP', 'LLMs', 'Antigravity'].map((t) => (
                      <span key={t} className="text-[9px] font-mono px-2 py-0.5 rounded bg-[#1e1e24] text-gray-300 border border-[#2d2d35]">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Skill Group 2 */}
                <div>
                  <div className="flex justify-between items-center text-xs font-mono mb-1.5">
                    <span className="text-white font-bold">Full-Stack & WebGL</span>
                    <span className="text-[#00D4FF] font-bold">90%</span>
                  </div>
                  <div className="h-1.5 w-full bg-[#1e1e24] rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#00D4FF] to-brand-violet w-[90%] rounded-full shadow-[0_0_10px_rgba(0,212,255,0.8)]" />
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {['React', 'TypeScript', 'Node.js', 'Three.js', 'Tailwind'].map((t) => (
                      <span key={t} className="text-[9px] font-mono px-2 py-0.5 rounded bg-[#1e1e24] text-gray-300 border border-[#2d2d35]">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Skill Group 3 */}
                <div>
                  <div className="flex justify-between items-center text-xs font-mono mb-1.5">
                    <span className="text-white font-bold">Cloud & Databases</span>
                    <span className="text-brand-orange font-bold">88%</span>
                  </div>
                  <div className="h-1.5 w-full bg-[#1e1e24] rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-brand-orange to-brand-pink w-[88%] rounded-full shadow-[0_0_10px_rgba(249,115,22,0.8)]" />
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {['GCP #1', 'Firebase', 'Supabase', 'Vercel', 'Netlify'].map((t) => (
                      <span key={t} className="text-[9px] font-mono px-2 py-0.5 rounded bg-[#1e1e24] text-gray-300 border border-[#2d2d35]">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </CyberHUDFrame>
          </div>
        </motion.div>

        {/* ── SECTION 2: FEATURED WORK & VENTURES (62% - 88%) ── */}
        <motion.div
          style={{ opacity: sec2Opacity, y: sec2Y }}
          className="absolute inset-0 flex flex-col justify-between p-6 sm:p-10 md:p-14 max-w-7xl mx-auto pointer-events-none z-20"
        >
          {/* Header */}
          <div className="text-center max-w-xl mx-auto pointer-events-auto pt-2 sm:pt-4">
            <span className="font-mono text-xs font-bold text-brand-orange tracking-widest uppercase">
              // PRODUCTION DEPLOYMENTS
            </span>
            <h2 className="text-3xl sm:text-5xl font-black font-heading text-white mt-1">
              Featured Work & Ventures
            </h2>
          </div>

          {/* Cyber Project Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pointer-events-auto max-w-5xl mx-auto w-full pb-4 sm:pb-8">
            {/* Project 1 */}
            <CyberHUDFrame title="STARTUP // AI" badge="FOUNDER" accentColor="violet">
              <h4 className="text-base font-bold font-heading text-white mb-2">Ninzae</h4>
              <p className="text-xs text-gray-300 leading-relaxed mb-4">
                AI product studio & incubator designing autonomous agent workflows and machine intelligence tools.
              </p>
              <div className="font-mono text-[10px] text-brand-violet font-bold uppercase">
                ACTIVE VENTURE
              </div>
            </CyberHUDFrame>

            {/* Project 2 */}
            <CyberHUDFrame title="STORE // SAAS" badge="LIVE" accentColor="pink">
              <h4 className="text-base font-bold font-heading text-white mb-2">Umar Iqbal Store</h4>
              <p className="text-xs text-gray-300 leading-relaxed mb-4">
                Global e-commerce storefront backed by Firebase, Supabase database, and Stripe payments.
              </p>
              <a
                href="https://store.umariqbal.in"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => cyberAudio.playHoverSound()}
                className="font-mono text-[10px] text-brand-pink hover:underline font-bold uppercase inline-flex items-center gap-1"
              >
                <span>store.umariqbal.in</span>
                <ExternalLink size={10} />
              </a>
            </CyberHUDFrame>

            {/* Project 3 */}
            <CyberHUDFrame title="TOOL // 5K+ USERS" badge="SHIPPED" accentColor="orange">
              <h4 className="text-base font-bold font-heading text-white mb-2">DocuMorph</h4>
              <p className="text-xs text-gray-300 leading-relaxed mb-4">
                Intelligent document conversion platform launched solo, serving over 5,000+ active global users.
              </p>
              <a
                href="https://documorph.netlify.app"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => cyberAudio.playHoverSound()}
                className="font-mono text-[10px] text-brand-orange hover:underline font-bold uppercase inline-flex items-center gap-1"
              >
                <span>documorph.netlify.app</span>
                <ExternalLink size={10} />
              </a>
            </CyberHUDFrame>
          </div>
        </motion.div>

        {/* ── SECTION 3: MILESTONES & CONTACT TERMINAL (88% - 100%) ── */}
        <motion.div
          style={{ opacity: sec3Opacity, y: sec3Y }}
          className="absolute inset-0 flex flex-col justify-center items-center p-6 max-w-4xl mx-auto pointer-events-none z-20"
        >
          <div className="pointer-events-auto w-full">
            <CyberHUDFrame title="TERMINAL // CONTACT & MILESTONES" badge="TRANSMISSION READY" accentColor="cyan">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                
                {/* Left: Highlights */}
                <div className="md:col-span-6 space-y-4 text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#00D4FF]/10 border border-[#00D4FF]/30 text-[#00D4FF] text-xs font-mono font-bold">
                    <Award size={14} />
                    <span>RANK #1 GOOGLE CLOUD SKILL BOOST</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black font-heading text-white leading-tight">
                    Let's collaborate on AI & Software systems.
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-sans">
                    Open for deep learning research, AI startup development, full-stack web platforms, and hackathons.
                  </p>

                  {/* Email Copy Trigger */}
                  <div className="flex items-center gap-2 p-2 rounded-xl bg-[#161617] border border-[#26262D]">
                    <Terminal size={14} className="text-[#00D4FF] ml-2" />
                    <span className="font-mono text-xs text-gray-300 flex-1 truncate">
                      umariq.cse@gmail.com
                    </span>
                    <button
                      onClick={copyEmail}
                      onMouseEnter={() => cyberAudio.playHoverSound()}
                      className="p-2 rounded-lg bg-[#202024] hover:bg-[#00D4FF] hover:text-black text-gray-300 text-xs font-mono transition-all flex items-center gap-1"
                    >
                      {copiedEmail ? <Check size={12} /> : <Copy size={12} />}
                      <span className="text-[10px]">{copiedEmail ? 'COPIED' : 'COPY'}</span>
                    </button>
                  </div>
                </div>

                {/* Right: Direct Actions & Socials */}
                <div className="md:col-span-6 flex flex-col gap-3">
                  <div className="grid grid-cols-2 gap-2.5">
                    <a
                      href="https://www.linkedin.com/in/umariqbal000/"
                      target="_blank"
                      rel="noopener noreferrer"
                      onMouseEnter={() => cyberAudio.playHoverSound()}
                      className="p-3 rounded-xl bg-[#161617] border border-[#26262D] hover:border-[#00D4FF] text-gray-300 hover:text-white flex items-center justify-center gap-2 text-xs font-mono font-bold transition-all"
                    >
                      <Linkedin size={16} />
                      <span>LINKEDIN</span>
                    </a>
                    <a
                      href="https://github.com/UmarIqbal000"
                      target="_blank"
                      rel="noopener noreferrer"
                      onMouseEnter={() => cyberAudio.playHoverSound()}
                      className="p-3 rounded-xl bg-[#161617] border border-[#26262D] hover:border-[#00D4FF] text-gray-300 hover:text-white flex items-center justify-center gap-2 text-xs font-mono font-bold transition-all"
                    >
                      <Github size={16} />
                      <span>GITHUB</span>
                    </a>
                    <a
                      href="https://leetcode.com/u/UmarIqbal000/"
                      target="_blank"
                      rel="noopener noreferrer"
                      onMouseEnter={() => cyberAudio.playHoverSound()}
                      className="p-3 rounded-xl bg-[#161617] border border-[#26262D] hover:border-[#00D4FF] text-gray-300 hover:text-white flex items-center justify-center gap-2 text-xs font-mono font-bold transition-all"
                    >
                      <SiLeetcode size={16} />
                      <span>LEETCODE</span>
                    </a>
                    <a
                      href="https://umariqbal.in"
                      target="_blank"
                      rel="noopener noreferrer"
                      onMouseEnter={() => cyberAudio.playHoverSound()}
                      className="p-3 rounded-xl bg-[#161617] border border-[#26262D] hover:border-[#00D4FF] text-gray-300 hover:text-white flex items-center justify-center gap-2 text-xs font-mono font-bold transition-all"
                    >
                      <Globe size={16} />
                      <span>WEBSITE</span>
                    </a>
                  </div>

                  {/* Explore Full Portfolio Details */}
                  <button
                    onClick={onExploreTabs}
                    onMouseEnter={() => cyberAudio.playHoverSound()}
                    className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-[#00D4FF] via-brand-violet to-brand-pink text-white font-mono font-bold text-xs tracking-wider uppercase shadow-lg hover:scale-102 active:scale-98 transition-all flex items-center justify-center gap-2"
                  >
                    <span>Explore Detailed Archive Tabs</span>
                    <ArrowDown size={14} />
                  </button>
                </div>

              </div>
            </CyberHUDFrame>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default YashPortfolioScroller;
