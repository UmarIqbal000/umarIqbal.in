import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  ArrowDown, 
  Sparkles, 
  Brain, 
  Code, 
  Rocket, 
  Award, 
  ExternalLink, 
  Github, 
  Linkedin, 
  Mail, 
  Globe, 
  ArrowRight,
  Compass,
  Zap
} from 'lucide-react';
import { SiLeetcode } from 'react-icons/si';

interface Scroll3DHeroProps {
  onViewProjects: () => void;
  onExploreMore: () => void;
}

export const Scroll3DHero: React.FC<Scroll3DHeroProps> = ({ onViewProjects, onExploreMore }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Video element refs for instant crossfade & smooth frame sync
  const dollyVideoRef = useRef<HTMLVideoElement>(null);
  const orbitVideoRef = useRef<HTMLVideoElement>(null);
  const walkVideoRef = useRef<HTMLVideoElement>(null);
  const idleVideoRef = useRef<HTMLVideoElement>(null);

  const [currentPhase, setCurrentPhase] = useState<number>(0);
  const [scrollProgressVal, setScrollProgressVal] = useState<number>(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Phases & Scroll Breakpoints:
  // Phase 0 (0.00 - 0.28): Dolly In (Entrance)
  // Phase 1 (0.28 - 0.62): 3D Orbit (Technical Mastery & Story)
  // Phase 2 (0.62 - 0.88): Walk Forward (Ventures & Products)
  // Phase 3 (0.88 - 1.00): Milestones & CTA Landing

  useEffect(() => {
    let animationFrameId: number;

    // Smooth lerp states for video times
    let currentDollyTime = 0;
    let currentOrbitTime = 0;
    let currentWalkTime = 0;

    let targetDollyTime = 0;
    let targetOrbitTime = 0;
    let targetWalkTime = 0;

    const unsubscribe = scrollYProgress.on('change', (progress) => {
      setScrollProgressVal(progress);

      // Determine active phase
      if (progress < 0.28) {
        setCurrentPhase(0);
        const p0 = progress / 0.28;
        if (dollyVideoRef.current?.duration) {
          targetDollyTime = p0 * dollyVideoRef.current.duration;
        }
      } else if (progress < 0.62) {
        setCurrentPhase(1);
        const p1 = (progress - 0.28) / (0.62 - 0.28);
        if (orbitVideoRef.current?.duration) {
          targetOrbitTime = p1 * orbitVideoRef.current.duration;
        }
      } else if (progress < 0.88) {
        setCurrentPhase(2);
        const p2 = (progress - 0.62) / (0.88 - 0.62);
        if (walkVideoRef.current?.duration) {
          targetWalkTime = p2 * walkVideoRef.current.duration;
        }
      } else {
        setCurrentPhase(3);
      }
    });

    // 60FPS smooth video interpolation loop
    const smoothVideoLoop = () => {
      // Dolly In lerp
      if (dollyVideoRef.current && Math.abs(currentDollyTime - targetDollyTime) > 0.01) {
        currentDollyTime += (targetDollyTime - currentDollyTime) * 0.18;
        dollyVideoRef.current.currentTime = currentDollyTime;
      }

      // Orbit lerp
      if (orbitVideoRef.current && Math.abs(currentOrbitTime - targetOrbitTime) > 0.01) {
        currentOrbitTime += (targetOrbitTime - currentOrbitTime) * 0.18;
        orbitVideoRef.current.currentTime = currentOrbitTime;
      }

      // Walk Forward lerp
      if (walkVideoRef.current && Math.abs(currentWalkTime - targetWalkTime) > 0.01) {
        currentWalkTime += (targetWalkTime - currentWalkTime) * 0.18;
        walkVideoRef.current.currentTime = currentWalkTime;
      }

      animationFrameId = requestAnimationFrame(smoothVideoLoop);
    };

    animationFrameId = requestAnimationFrame(smoothVideoLoop);

    return () => {
      unsubscribe();
      cancelAnimationFrame(animationFrameId);
    };
  }, [scrollYProgress]);

  // Jump to specific story chapter
  const scrollToChapter = (phaseIndex: number) => {
    if (!containerRef.current) return;
    const containerTop = containerRef.current.offsetTop;
    const containerHeight = containerRef.current.offsetHeight;
    
    let targetScroll = 0;
    if (phaseIndex === 0) targetScroll = containerTop;
    if (phaseIndex === 1) targetScroll = containerTop + containerHeight * 0.35;
    if (phaseIndex === 2) targetScroll = containerTop + containerHeight * 0.68;
    if (phaseIndex === 3) targetScroll = containerTop + containerHeight * 0.92;

    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
  };

  return (
    <section ref={containerRef} className="relative w-full h-[450vh] bg-[#09090B]">
      {/* Pinned 3D Viewport Layer */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* Background Ambient Glowing Nebula */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-20">
          <div 
            className="absolute top-[-25%] left-[-20%] w-[75%] h-[75%] rounded-full bg-brand-violet/15 blur-[150px] animate-pulse" 
            style={{ animationDuration: '8s' }} 
          />
          <div 
            className="absolute bottom-[-25%] right-[-20%] w-[75%] h-[75%] rounded-full bg-brand-orange/12 blur-[150px] animate-pulse" 
            style={{ animationDuration: '12s' }} 
          />
          <div 
            className="absolute top-[30%] left-[30%] w-[50%] h-[50%] rounded-full bg-brand-pink/15 blur-[130px] animate-pulse" 
            style={{ animationDuration: '10s' }} 
          />
        </div>

        {/* 3D CHARACTER VIDEO STAGE (Synchronized with scroll progress) */}
        <div className="relative w-full max-w-5xl h-full flex items-center justify-center pointer-events-none">
          
          {/* Video 1: Dolly In (Phase 0) */}
          <video
            ref={dollyVideoRef}
            src="/Dolly_In.mp4"
            muted
            playsInline
            preload="auto"
            className={`absolute max-h-[85vh] w-auto object-contain mix-blend-screen transition-opacity duration-500 ${
              currentPhase === 0 ? 'opacity-95' : 'opacity-0 pointer-events-none'
            }`}
          />

          {/* Video 2: 3D Orbit (Phase 1) */}
          <video
            ref={orbitVideoRef}
            src="/3D_Orbit.mp4"
            muted
            playsInline
            preload="auto"
            className={`absolute max-h-[85vh] w-auto object-contain mix-blend-screen transition-opacity duration-500 ${
              currentPhase === 1 ? 'opacity-95' : 'opacity-0 pointer-events-none'
            }`}
          />

          {/* Video 3: Walk Forward (Phase 2) */}
          <video
            ref={walkVideoRef}
            src="/Walk_Forward.mp4"
            muted
            playsInline
            preload="auto"
            className={`absolute max-h-[85vh] w-auto object-contain mix-blend-screen transition-opacity duration-500 ${
              currentPhase === 2 ? 'opacity-95' : 'opacity-0 pointer-events-none'
            }`}
          />

          {/* Video 4: Idle Stance (Phase 3) */}
          <video
            ref={idleVideoRef}
            src="/Idle_Loop.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className={`absolute max-h-[85vh] w-auto object-contain mix-blend-screen transition-opacity duration-500 ${
              currentPhase === 3 ? 'opacity-90' : 'opacity-0 pointer-events-none'
            }`}
          />

          {/* Ambient center rim lighting */}
          <div className="absolute w-[400px] h-[400px] rounded-full bg-gradient-to-r from-brand-violet/20 via-brand-pink/15 to-transparent blur-[90px] -z-10" />
        </div>

        {/* ======================================================== */}
        {/* SCROLL-DRIVEN NARRATIVE OVERLAYS (3D Depth Cards & Story) */}
        {/* ======================================================== */}

        {/* CHAPTER 0: INTRO HERO (0% - 28%) */}
        {currentPhase === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 flex flex-col justify-between p-6 sm:p-12 md:p-16 max-w-7xl mx-auto pointer-events-none z-10"
          >
            {/* Top Bar: Pulsing Status */}
            <div className="flex justify-between items-center pointer-events-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#161617]/85 backdrop-blur-md border border-[#262627] shadow-lg rounded-full">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-pink relative flex">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-brand-pink opacity-75 animate-ping" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-pink" />
                </span>
                <span className="text-xs font-semibold text-gray-300 font-heading tracking-wide">
                  Currently building Ninzae & training an AI model
                </span>
              </div>
            </div>

            {/* Bottom Hero Typography & CTAs */}
            <div className="max-w-2xl text-left pointer-events-auto bg-gradient-to-t from-[#09090B]/90 via-[#09090B]/50 to-transparent p-6 rounded-3xl backdrop-blur-sm border border-[#262627]/40 shadow-2xl">
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold font-heading text-white tracking-tight leading-none mb-3">
                Umar <span className="text-gradient font-black">Iqbal</span>
              </h1>
              <h2 className="text-base sm:text-xl md:text-2xl font-bold font-heading text-gray-200 mb-4">
                Data Scientist & AI Researcher <span className="text-brand-pink/50">|</span> Full-Stack Developer <span className="text-brand-pink/50">|</span> Founder
              </h2>
              <p className="text-gray-400 text-xs sm:text-sm md:text-base leading-relaxed mb-6 font-medium">
                2nd-year B.Tech CSE (Data Science) student at <span className="text-brand-violet font-semibold">IILM University</span>. Published NLP researcher, ACM Student Chapter VP, founder of <span className="text-white font-semibold">Ninzae</span>.
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={onViewProjects}
                  className="bg-vivid-gradient text-white px-6 py-3 rounded-xl font-bold text-sm hover:shadow-lg hover:shadow-brand-violet/25 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                >
                  <span>View Projects</span>
                  <ArrowRight size={16} />
                </button>
                <button
                  onClick={() => scrollToChapter(1)}
                  className="px-5 py-3 rounded-xl bg-[#161617]/90 border border-[#262627] hover:border-brand-violet text-gray-300 hover:text-white text-sm font-semibold transition-all flex items-center gap-2"
                >
                  <Compass size={15} className="text-brand-violet" />
                  <span>Explore 3D Story</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* CHAPTER 1: 3D ORBIT & TECHNICAL MASTERY (28% - 62%) */}
        {currentPhase === 1 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex items-center justify-between p-6 sm:p-12 md:p-16 max-w-7xl mx-auto pointer-events-none z-10"
          >
            {/* Left Spatial Card: AI & Research */}
            <motion.div
              initial={{ x: -40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.6 }}
              className="max-w-xs sm:max-w-sm pointer-events-auto p-6 rounded-2xl bg-[#131316]/90 backdrop-blur-xl border border-brand-violet/30 shadow-[0_10px_35px_rgba(124,58,237,0.15)]"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2.5 rounded-xl bg-brand-violet/15 border border-brand-violet/30 text-brand-violet">
                  <Brain size={20} />
                </div>
                <div>
                  <h3 className="text-base font-bold font-heading text-white">AI & NLP Research</h3>
                  <span className="text-[11px] font-mono text-gray-400">Deep Learning & LLMs</span>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-4">
                Published research in fake news detection (DOI: 10.13140/RG.2.2.25770.27844) & 96.7% accurate CNN plant pathology model.
              </p>
              <div className="flex flex-wrap gap-1.5">
                {['NLP', 'PyTorch', 'TensorFlow', 'LLMs'].map((tag) => (
                  <span key={tag} className="text-[10px] font-bold px-2.5 py-1 rounded-md bg-[#202024] text-brand-pink border border-[#303036]">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Right Spatial Card: Systems & Engineering */}
            <motion.div
              initial={{ x: 40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.25, duration: 0.6 }}
              className="max-w-xs sm:max-w-sm pointer-events-auto p-6 rounded-2xl bg-[#131316]/90 backdrop-blur-xl border border-brand-pink/30 shadow-[0_10px_35px_rgba(236,72,153,0.15)] hidden sm:block"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2.5 rounded-xl bg-brand-pink/15 border border-brand-pink/30 text-brand-pink">
                  <Code size={20} />
                </div>
                <div>
                  <h3 className="text-base font-bold font-heading text-white">Full-Stack & Cloud</h3>
                  <span className="text-[11px] font-mono text-gray-400">High-Scale Platforms</span>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-4">
                Builds responsive web systems and interactive 3D WebGL interfaces with Claude Code, Cursor, and Antigravity.
              </p>
              <div className="flex flex-wrap gap-1.5">
                {['React', 'TypeScript', 'Node.js', 'WebGL'].map((tag) => (
                  <span key={tag} className="text-[10px] font-bold px-2.5 py-1 rounded-md bg-[#202024] text-brand-violet border border-[#303036]">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* CHAPTER 2: WALK FORWARD & VENTURES (62% - 88%) */}
        {currentPhase === 2 && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex flex-col justify-between p-6 sm:p-12 md:p-16 max-w-7xl mx-auto pointer-events-none z-10"
          >
            {/* Top Stage Headline */}
            <div className="text-center max-w-xl mx-auto pointer-events-auto">
              <span className="px-3.5 py-1.5 rounded-full bg-brand-orange/15 border border-brand-orange/30 text-[11px] font-mono font-bold text-brand-orange uppercase tracking-wider mb-2 inline-block">
                Founder & Builder
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-white">
                Ventures & Shipped Products
              </h2>
            </div>

            {/* Bottom 3D Ventures Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pointer-events-auto max-w-5xl mx-auto w-full">
              {/* Card 1 */}
              <div className="p-5 rounded-2xl bg-[#131316]/95 backdrop-blur-xl border border-[#262627] hover:border-brand-violet/50 transition-all shadow-xl">
                <div className="flex items-center gap-2.5 mb-2">
                  <Rocket size={18} className="text-brand-violet" />
                  <h4 className="text-sm font-bold text-white font-heading">Ninzae</h4>
                </div>
                <p className="text-xs text-gray-400 mb-3">AI product incubator & tech venture building modern software tools.</p>
                <span className="text-[10px] font-semibold text-brand-violet font-mono uppercase">Founder</span>
              </div>

              {/* Card 2 */}
              <div className="p-5 rounded-2xl bg-[#131316]/95 backdrop-blur-xl border border-[#262627] hover:border-brand-pink/50 transition-all shadow-xl">
                <div className="flex items-center gap-2.5 mb-2">
                  <Globe size={18} className="text-brand-pink" />
                  <h4 className="text-sm font-bold text-white font-heading">Umar Iqbal Store</h4>
                </div>
                <p className="text-xs text-gray-400 mb-3">Global storefront for digital & physical products with Supabase & Stripe.</p>
                <a href="https://store.umariqbal.in" target="_blank" rel="noopener noreferrer" className="text-[10px] font-bold text-brand-pink hover:underline flex items-center gap-1">
                  <span>store.umariqbal.in</span>
                  <ExternalLink size={10} />
                </a>
              </div>

              {/* Card 3 */}
              <div className="p-5 rounded-2xl bg-[#131316]/95 backdrop-blur-xl border border-[#262627] hover:border-brand-orange/50 transition-all shadow-xl">
                <div className="flex items-center gap-2.5 mb-2">
                  <Zap size={18} className="text-brand-orange" />
                  <h4 className="text-sm font-bold text-white font-heading">DocuMorph</h4>
                </div>
                <p className="text-xs text-gray-400 mb-3">Intelligent document conversion tool serving 5,000+ active global users.</p>
                <a href="https://documorph.netlify.app" target="_blank" rel="noopener noreferrer" className="text-[10px] font-bold text-brand-orange hover:underline flex items-center gap-1">
                  <span>documorph.netlify.app</span>
                  <ExternalLink size={10} />
                </a>
              </div>
            </div>
          </motion.div>
        )}

        {/* CHAPTER 3: MILESTONES & CALL TO ACTION (88% - 100%) */}
        {currentPhase === 3 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex flex-col justify-center items-center p-6 text-center max-w-3xl mx-auto pointer-events-none z-10"
          >
            <div className="pointer-events-auto p-8 rounded-3xl bg-[#131316]/95 backdrop-blur-2xl border border-[#262627] shadow-[0_20px_50px_rgba(0,0,0,0.9),_0_0_30px_rgba(124,58,237,0.2)]">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-violet/15 border border-brand-violet/30 text-brand-violet text-xs font-bold mb-4">
                <Award size={14} />
                <span>Google Cloud Silver League #1 • ACM Student VP</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-white mb-4">
                Let's Build Something <span className="text-gradient font-black">Extraordinary</span>
              </h2>

              <p className="text-sm sm:text-base text-gray-300 mb-6 max-w-xl mx-auto leading-relaxed">
                Open for AI research collaborations, full-stack software systems, startup engineering, and hackathon initiatives.
              </p>

              {/* Social Links Row */}
              <div className="flex items-center justify-center gap-3 mb-8">
                <a href="https://www.linkedin.com/in/umariqbal000/" target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl bg-[#1c1c20] border border-[#2c2c32] hover:border-brand-violet text-gray-300 hover:text-white hover:scale-110 transition-all">
                  <Linkedin size={18} />
                </a>
                <a href="https://github.com/UmarIqbal000" target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl bg-[#1c1c20] border border-[#2c2c32] hover:border-brand-violet text-gray-300 hover:text-white hover:scale-110 transition-all">
                  <Github size={18} />
                </a>
                <a href="https://leetcode.com/u/UmarIqbal000/" target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl bg-[#1c1c20] border border-[#2c2c32] hover:border-brand-violet text-gray-300 hover:text-white hover:scale-110 transition-all">
                  <SiLeetcode size={18} />
                </a>
                <a href="mailto:umariq.cse@gmail.com" className="p-3 rounded-xl bg-[#1c1c20] border border-[#2c2c32] hover:border-brand-violet text-gray-300 hover:text-white hover:scale-110 transition-all">
                  <Mail size={18} />
                </a>
                <a href="https://umariqbal.in" target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl bg-[#1c1c20] border border-[#2c2c32] hover:border-brand-violet text-gray-300 hover:text-white hover:scale-110 transition-all">
                  <Globe size={18} />
                </a>
              </div>

              {/* Button to explore detailed tabs */}
              <button
                onClick={onExploreMore}
                className="bg-vivid-gradient text-white px-8 py-3.5 rounded-xl font-bold font-heading text-sm sm:text-base hover:shadow-lg hover:shadow-brand-violet/30 hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-2"
              >
                <span>Explore Full Portfolio Details</span>
                <ArrowDown size={18} />
              </button>
            </div>
          </motion.div>
        )}

        {/* ======================================================== */}
        {/* FLOATING HUD CHAPTER NAVIGATOR (Right Sidebar on Desktop) */}
        {/* ======================================================== */}
        <div className="fixed right-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-end gap-2.5 z-40">
          {[
            { index: 0, label: '01 Intro' },
            { index: 1, label: '02 3D Orbit' },
            { index: 2, label: '03 Ventures' },
            { index: 3, label: '04 Milestones' },
          ].map((ch) => {
            const isActive = currentPhase === ch.index;
            return (
              <button
                key={ch.index}
                onClick={() => scrollToChapter(ch.index)}
                className={`group flex items-center gap-3 text-xs font-mono transition-all duration-300 ${
                  isActive ? 'text-white font-bold' : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                <span className={`transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                  {ch.label}
                </span>
                <span
                  className={`rounded-full transition-all duration-300 ${
                    isActive
                      ? 'w-6 h-2 bg-vivid-gradient shadow-[0_0_10px_rgba(124,58,237,0.8)]'
                      : 'w-2 h-2 bg-[#2c2c30] group-hover:bg-gray-400'
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Bottom Scroll Prompt Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none z-20">
          <span className="text-[10px] font-mono uppercase tracking-widest text-gray-500">
            {currentPhase === 3 ? 'Scroll to explore tabs' : 'Scroll to rotate 3D story'}
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            className="w-5 h-8 rounded-full border-2 border-[#333338] flex items-start justify-center p-1"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-brand-violet" />
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default Scroll3DHero;
