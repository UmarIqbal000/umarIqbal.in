import React, { useRef, useEffect, useState } from 'react';
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
  Award
} from 'lucide-react';
import { SiLeetcode } from 'react-icons/si';
import CyberHUDFrame from './CyberHUDFrame';

interface YashStyleScrollerProps {
  onViewProjectsTab: () => void;
  onExploreTabs: () => void;
}

export const YashStyleScroller: React.FC<YashStyleScrollerProps> = ({
  onViewProjectsTab,
  onExploreTabs,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // 4 Video Element Refs
  const dollyVideoRef = useRef<HTMLVideoElement>(null);
  const orbitVideoRef = useRef<HTMLVideoElement>(null);
  const walkVideoRef = useRef<HTMLVideoElement>(null);
  const idleVideoRef = useRef<HTMLVideoElement>(null);

  const [copiedEmail, setCopiedEmail] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // -------------------------------------------------------------
  // CONTINUOUS SMOOTH OPACITY & TRANSFORM CURVES
  // -------------------------------------------------------------
  // Video crossfade opacities
  const dollyOpacity = useTransform(scrollYProgress, [0, 0.22, 0.28], [1, 1, 0]);
  const orbitOpacity = useTransform(scrollYProgress, [0.24, 0.28, 0.58, 0.63], [0, 1, 1, 0]);
  const walkOpacity = useTransform(scrollYProgress, [0.59, 0.63, 0.84, 0.89], [0, 1, 1, 0]);
  const idleOpacity = useTransform(scrollYProgress, [0.85, 0.90, 1], [0, 1, 1]);

  // Section 0 (Hero Landing)
  const sec0Opacity = useTransform(scrollYProgress, [0, 0.20, 0.26], [1, 1, 0]);
  const sec0Y = useTransform(scrollYProgress, [0, 0.26], [0, -30]);

  // Section 1 (About & Skills)
  const sec1Opacity = useTransform(scrollYProgress, [0.24, 0.30, 0.56, 0.62], [0, 1, 1, 0]);
  const sec1Y = useTransform(scrollYProgress, [0.24, 0.30, 0.56, 0.62], [30, 0, 0, -30]);

  // Section 2 (Featured Work)
  const sec2Opacity = useTransform(scrollYProgress, [0.60, 0.66, 0.83, 0.88], [0, 1, 1, 0]);
  const sec2Y = useTransform(scrollYProgress, [0.60, 0.66, 0.83, 0.88], [30, 0, 0, -30]);

  // Section 3 (Milestones & Contact)
  const sec3Opacity = useTransform(scrollYProgress, [0.86, 0.92, 1], [0, 1, 1]);
  const sec3Y = useTransform(scrollYProgress, [0.86, 0.92, 1], [30, 0, 0]);

  // -------------------------------------------------------------
  // PRELOAD & WARM UP VIDEOS FOR INSTANT SMOOTH SCRUBBING
  // -------------------------------------------------------------
  useEffect(() => {
    const vids = [dollyVideoRef.current, orbitVideoRef.current, walkVideoRef.current, idleVideoRef.current];
    vids.forEach((v) => {
      if (v) {
        v.load();
        v.play().then(() => v.pause()).catch(() => {});
      }
    });
  }, []);

  // -------------------------------------------------------------
  // ULTRA-SMOOTH HARDWARE-SYNCED VIDEO SCRUB ENGINE
  // -------------------------------------------------------------
  useEffect(() => {
    let animationId: number;

    let curDolly = 0;
    let curOrbit = 0;
    let curWalk = 0;

    let targetDolly = 0;
    let targetOrbit = 0;
    let targetWalk = 0;

    const unsub = scrollYProgress.on('change', (p) => {
      // 1. Dolly In (0% - 28%)
      const p0 = Math.max(0, Math.min(1, p / 0.28));
      if (dollyVideoRef.current?.duration) {
        targetDolly = p0 * dollyVideoRef.current.duration;
      }

      // 2. 3D Orbit (28% - 62%)
      const p1 = Math.max(0, Math.min(1, (p - 0.28) / (0.62 - 0.28)));
      if (orbitVideoRef.current?.duration) {
        targetOrbit = p1 * orbitVideoRef.current.duration;
      }

      // 3. Walk Forward (62% - 88%)
      const p2 = Math.max(0, Math.min(1, (p - 0.62) / (0.88 - 0.62)));
      if (walkVideoRef.current?.duration) {
        targetWalk = p2 * walkVideoRef.current.duration;
      }
    });

    const loop = () => {
      const lerp = 0.20; // Smooth damping

      // Dolly
      if (dollyVideoRef.current && !dollyVideoRef.current.seeking && Math.abs(curDolly - targetDolly) > 0.005) {
        curDolly += (targetDolly - curDolly) * lerp;
        dollyVideoRef.current.currentTime = curDolly;
      }

      // Orbit
      if (orbitVideoRef.current && !orbitVideoRef.current.seeking && Math.abs(curOrbit - targetOrbit) > 0.005) {
        curOrbit += (targetOrbit - curOrbit) * lerp;
        orbitVideoRef.current.currentTime = curOrbit;
      }

      // Walk
      if (walkVideoRef.current && !walkVideoRef.current.seeking && Math.abs(curWalk - targetWalk) > 0.005) {
        curWalk += (targetWalk - curWalk) * lerp;
        walkVideoRef.current.currentTime = curWalk;
      }

      animationId = requestAnimationFrame(loop);
    };

    animationId = requestAnimationFrame(loop);

    return () => {
      unsub();
      cancelAnimationFrame(animationId);
    };
  }, [scrollYProgress]);

  const copyEmail = () => {
    navigator.clipboard.writeText('umariq.cse@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const jumpToPhase = (phaseIdx: number) => {
    if (!containerRef.current) return;
    const top = containerRef.current.offsetTop;
    const h = containerRef.current.offsetHeight;

    let target = 0;
    if (phaseIdx === 0) target = top;
    if (phaseIdx === 1) target = top + h * 0.36;
    if (phaseIdx === 2) target = top + h * 0.70;
    if (phaseIdx === 3) target = top + h * 0.94;

    window.scrollTo({ top: target, behavior: 'smooth' });
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[460vh] bg-[#09090B] select-none"
    >
      {/* Pinned Fullscreen Viewport Window */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden bg-[#09090B]">
        
        {/* FULLSCREEN VIDEO STAGE (Centered & Perfectly Scaled) */}
        <div className="absolute inset-0 w-full h-full pointer-events-none flex items-center justify-center overflow-hidden">
          {/* Video 0: Dolly In (Landing) */}
          <motion.video
            ref={dollyVideoRef}
            src="/Dolly_In.mp4"
            muted
            playsInline
            preload="auto"
            style={{ opacity: dollyOpacity }}
            className="absolute max-h-screen w-full h-full object-contain md:object-cover mix-blend-screen pointer-events-none"
          />

          {/* Video 1: 3D Orbit (About & Skills) */}
          <motion.video
            ref={orbitVideoRef}
            src="/3D_Orbit.mp4"
            muted
            playsInline
            preload="auto"
            style={{ opacity: orbitOpacity }}
            className="absolute max-h-screen w-full h-full object-contain md:object-cover mix-blend-screen pointer-events-none"
          />

          {/* Video 2: Walk Forward (Work & Ventures) */}
          <motion.video
            ref={walkVideoRef}
            src="/Walk_Forward.mp4"
            muted
            playsInline
            preload="auto"
            style={{ opacity: walkOpacity }}
            className="absolute max-h-screen w-full h-full object-contain md:object-cover mix-blend-screen pointer-events-none"
          />

          {/* Video 3: Idle Stance (Milestones & Contact) */}
          <motion.video
            ref={idleVideoRef}
            src="/Idle_Loop.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            style={{ opacity: idleOpacity }}
            className="absolute max-h-screen w-full h-full object-contain md:object-cover mix-blend-screen pointer-events-none"
          />

          {/* Soft Edge Vignettes */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#09090B] via-transparent to-[#09090B]/50 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#09090B]/60 via-transparent to-[#09090B]/60 pointer-events-none" />
        </div>

        {/* ======================================================== */}
        {/* OVERLAY NARRATIVE SECTIONS (No Face Block, Clear Flow)     */}
        {/* ======================================================== */}

        {/* ── SECTION 0: LANDING / HERO (0% - 28%) ── */}
        <motion.div
          style={{ opacity: sec0Opacity, y: sec0Y }}
          className="absolute inset-0 flex flex-col justify-between p-6 sm:p-12 md:p-20 max-w-7xl mx-auto pointer-events-none z-20"
        >
          {/* Top Status */}
          <div className="flex justify-between items-center pointer-events-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#161617]/85 backdrop-blur-md border border-[#00D4FF]/30 text-[#00D4FF] text-[11px] font-mono font-bold shadow-[0_0_15px_rgba(0,212,255,0.15)]">
              <span className="w-2 h-2 rounded-full bg-[#00D4FF] animate-ping" />
              <span>STATUS: BUILDING NINZAE & AI RESEARCH</span>
            </div>
          </div>

          {/* Headline & Typography */}
          <div className="max-w-xl text-left pointer-events-auto">
            <span className="font-mono text-xs text-[#00D4FF] font-bold tracking-widest uppercase block mb-2">
              // DATA SCIENCE & AI RESEARCH
            </span>
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-black font-heading text-white tracking-tight leading-[0.95] mb-4">
              Hi, my<br />
              name is <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D4FF] via-brand-pink to-brand-orange">Umar.</span>
            </h1>
            <p className="text-gray-200 text-sm sm:text-base md:text-lg leading-relaxed mb-8 max-w-lg font-medium drop-shadow-md">
              I build machine learning architectures, published NLP research, and modern web applications.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => jumpToPhase(3)}
                className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#00D4FF] to-brand-violet text-white font-mono font-bold text-xs sm:text-sm tracking-wider uppercase shadow-[0_0_20px_rgba(0,212,255,0.3)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
              >
                <span>Get in touch</span>
                <ArrowRight size={16} />
              </button>
              <button
                onClick={() => jumpToPhase(1)}
                className="px-6 py-3.5 rounded-xl bg-[#161617]/90 backdrop-blur-md border border-[#26262D] hover:border-[#00D4FF] text-gray-300 hover:text-white font-mono font-bold text-xs tracking-wider uppercase transition-all"
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
          {/* Left Column: Cyber About & Identity Card */}
          <div className="w-full max-w-xs sm:max-w-sm pointer-events-auto">
            <CyberHUDFrame title="IDENTITY // PROFILE" badge="VERIFIED" accentColor="cyan">
              <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4 pb-3 border-b border-[#26262D]">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-[#161617] border border-[#00D4FF]/40 flex items-center justify-center text-[#00D4FF] font-mono font-black text-base sm:text-xl shadow-[0_0_15px_rgba(0,212,255,0.2)]">
                  UI
                </div>
                <div>
                  <h3 className="font-heading font-black text-base sm:text-lg text-white">Umar Iqbal</h3>
                  <p className="text-[11px] sm:text-xs font-mono text-[#00D4FF]">Data Scientist & AI Researcher</p>
                  <p className="text-[10px] sm:text-[11px] text-gray-400 font-mono">IILM University, 2nd Year B.Tech</p>
                </div>
              </div>

              <div className="space-y-2 text-[11px] sm:text-xs text-gray-300 leading-relaxed font-sans">
                <p>
                  ⚡ <span className="text-white font-bold">NLP Researcher:</span> Published research on fake news detection in social feeds (DOI: 10.13140/RG.2.2.25770.27844).
                </p>
                <p className="hidden sm:block">
                  ⚡ <span className="text-white font-bold">Leadership:</span> Vice President of ACM Student Chapter, organizing hackathons and technical seminars.
                </p>
              </div>
            </CyberHUDFrame>
          </div>

          {/* Right Column: Technical Skills HUD Matrix */}
          <div className="w-full max-w-xs sm:max-w-sm pointer-events-auto hidden sm:block">
            <CyberHUDFrame title="TECHNICAL SKILLSET" badge="CORE" accentColor="violet">
              <div className="space-y-4">
                {/* Skill Group 1 */}
                <div>
                  <div className="flex justify-between items-center text-xs font-mono mb-1.5">
                    <span className="text-white font-bold">AI & NLP Research</span>
                    <span className="text-brand-violet font-bold">95%</span>
                  </div>
                  <div className="h-1.5 w-full bg-[#1e1e24] rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-brand-violet to-brand-pink w-[95%] rounded-full shadow-[0_0_8px_rgba(124,58,237,0.7)]" />
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
                    <div className="h-full bg-gradient-to-r from-[#00D4FF] to-brand-violet w-[90%] rounded-full shadow-[0_0_8px_rgba(0,212,255,0.7)]" />
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {['React', 'TypeScript', 'Node.js', 'Tailwind'].map((t) => (
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
                    <div className="h-full bg-gradient-to-r from-brand-orange to-brand-pink w-[88%] rounded-full shadow-[0_0_8px_rgba(249,115,22,0.7)]" />
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {['GCP #1', 'Firebase', 'Supabase', 'Vercel'].map((t) => (
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
          {/* Top Title: Positioned high up so face is completely unobstructed */}
          <div className="text-center max-w-xl mx-auto pointer-events-auto pt-2 sm:pt-4">
            <span className="font-mono text-xs font-bold text-brand-orange tracking-widest uppercase">
              // PRODUCTION DEPLOYMENTS
            </span>
            <h2 className="text-3xl sm:text-5xl font-black font-heading text-white mt-1">
              Featured Work & Ventures
            </h2>
          </div>

          {/* Bottom Project Cards Grid: Docked neatly at the lower third */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pointer-events-auto max-w-5xl mx-auto w-full pb-4 sm:pb-8">
            {/* Project 1 */}
            <CyberHUDFrame title="STARTUP // AI" badge="FOUNDER" accentColor="violet">
              <h4 className="text-base font-bold font-heading text-white mb-1.5">Ninzae</h4>
              <p className="text-xs text-gray-300 leading-relaxed mb-3">
                AI product studio & incubator designing autonomous agent workflows and machine intelligence tools.
              </p>
              <div className="font-mono text-[10px] text-brand-violet font-bold uppercase">
                ACTIVE VENTURE
              </div>
            </CyberHUDFrame>

            {/* Project 2 */}
            <CyberHUDFrame title="STORE // SAAS" badge="LIVE" accentColor="pink">
              <h4 className="text-base font-bold font-heading text-white mb-1.5">Umar Iqbal Store</h4>
              <p className="text-xs text-gray-300 leading-relaxed mb-3">
                Global e-commerce storefront backed by Firebase, Supabase database, and Stripe payments.
              </p>
              <a
                href="https://store.umariqbal.in"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[10px] text-brand-pink hover:underline font-bold uppercase inline-flex items-center gap-1"
              >
                <span>store.umariqbal.in</span>
                <ExternalLink size={10} />
              </a>
            </CyberHUDFrame>

            {/* Project 3 */}
            <CyberHUDFrame title="TOOL // 5K+ USERS" badge="SHIPPED" accentColor="orange">
              <h4 className="text-base font-bold font-heading text-white mb-1.5">DocuMorph</h4>
              <p className="text-xs text-gray-300 leading-relaxed mb-3">
                Intelligent document conversion platform launched solo, serving over 5,000+ active global users.
              </p>
              <a
                href="https://documorph.netlify.app"
                target="_blank"
                rel="noopener noreferrer"
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
          className="absolute inset-0 flex flex-col justify-end items-center p-6 sm:p-10 pb-12 sm:pb-16 max-w-4xl mx-auto pointer-events-none z-20"
        >
          <div className="pointer-events-auto w-full">
            <CyberHUDFrame title="TERMINAL // CONTACT & MILESTONES" badge="TRANSMISSION READY" accentColor="cyan">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                
                {/* Left: Highlights */}
                <div className="md:col-span-6 space-y-3 text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#00D4FF]/10 border border-[#00D4FF]/30 text-[#00D4FF] text-xs font-mono font-bold">
                    <Award size={14} />
                    <span>RANK #1 GOOGLE CLOUD SKILL BOOST</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black font-heading text-white leading-tight">
                    Let's collaborate on AI & Software systems.
                  </h3>

                  <p className="text-xs text-gray-300 leading-relaxed font-sans">
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
                      className="p-1.5 px-2.5 rounded-lg bg-[#202024] hover:bg-[#00D4FF] hover:text-black text-gray-300 text-xs font-mono transition-all flex items-center gap-1"
                    >
                      {copiedEmail ? <Check size={12} /> : <Copy size={12} />}
                      <span className="text-[10px]">{copiedEmail ? 'COPIED' : 'COPY'}</span>
                    </button>
                  </div>
                </div>

                {/* Right: Direct Actions & Socials */}
                <div className="md:col-span-6 flex flex-col gap-2.5">
                  <div className="grid grid-cols-2 gap-2">
                    <a
                      href="https://www.linkedin.com/in/umariqbal000/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-[#161617] border border-[#26262D] hover:border-[#00D4FF] text-gray-300 hover:text-white flex items-center justify-center gap-2 text-xs font-mono font-bold transition-all"
                    >
                      <Linkedin size={15} />
                      <span>LINKEDIN</span>
                    </a>
                    <a
                      href="https://github.com/UmarIqbal000"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-[#161617] border border-[#26262D] hover:border-[#00D4FF] text-gray-300 hover:text-white flex items-center justify-center gap-2 text-xs font-mono font-bold transition-all"
                    >
                      <Github size={15} />
                      <span>GITHUB</span>
                    </a>
                    <a
                      href="https://leetcode.com/u/UmarIqbal000/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-[#161617] border border-[#26262D] hover:border-[#00D4FF] text-gray-300 hover:text-white flex items-center justify-center gap-2 text-xs font-mono font-bold transition-all"
                    >
                      <SiLeetcode size={15} />
                      <span>LEETCODE</span>
                    </a>
                    <a
                      href="https://umariqbal.in"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-[#161617] border border-[#26262D] hover:border-[#00D4FF] text-gray-300 hover:text-white flex items-center justify-center gap-2 text-xs font-mono font-bold transition-all"
                    >
                      <Globe size={15} />
                      <span>WEBSITE</span>
                    </a>
                  </div>

                  {/* Explore Full Portfolio Details */}
                  <button
                    onClick={onExploreTabs}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#00D4FF] via-brand-violet to-brand-pink text-white font-mono font-bold text-xs tracking-wider uppercase shadow-md hover:scale-102 active:scale-98 transition-all flex items-center justify-center gap-2"
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

export default YashStyleScroller;
