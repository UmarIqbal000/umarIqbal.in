import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
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
  Zap,
  Terminal,
  FileText,
  Copy,
  Check
} from 'lucide-react';
import { SiLeetcode } from 'react-icons/si';
import CyberHUDFrame from './CyberHUDFrame';
import { cyberAudio } from '../../utils/CyberAudioEngine';

interface YashStyleScrollerProps {
  onViewProjectsTab: () => void;
  onExploreTabs: () => void;
}

export const YashStyleScroller: React.FC<YashStyleScrollerProps> = ({
  onViewProjectsTab,
  onExploreTabs,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const threeMountRef = useRef<HTMLDivElement>(null);

  // 4 Video Element Refs
  const dollyVideoRef = useRef<HTMLVideoElement>(null);
  const orbitVideoRef = useRef<HTMLVideoElement>(null);
  const walkVideoRef = useRef<HTMLVideoElement>(null);
  const idleVideoRef = useRef<HTMLVideoElement>(null);

  const [currentPhase, setCurrentPhase] = useState<number>(0);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [mouseCoord, setMouseCoord] = useState({ x: 0, y: 0 });
  const [copiedEmail, setCopiedEmail] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // -------------------------------------------------------------
  // PRELOAD & WARM UP VIDEOS
  // -------------------------------------------------------------
  useEffect(() => {
    [dollyVideoRef, orbitVideoRef, walkVideoRef, idleVideoRef].forEach((ref) => {
      if (ref.current) {
        ref.current.load();
        ref.current.play().then(() => ref.current?.pause()).catch(() => {});
      }
    });
  }, []);

  // -------------------------------------------------------------
  // THREE.JS 3D WEBGL CYBER SCENE (Hologram Rings + Dust Grid)
  // -------------------------------------------------------------
  useEffect(() => {
    const container = threeMountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.z = 7;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Group for rotating cyber elements
    const cyberGroup = new THREE.Group();
    scene.add(cyberGroup);

    // 1. Neon Cyan Torus Ring
    const ring1Geo = new THREE.TorusGeometry(2.5, 0.015, 16, 120);
    const ring1Mat = new THREE.MeshBasicMaterial({ color: 0x00d4ff, transparent: true, opacity: 0.5 });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    cyberGroup.add(ring1);

    // 2. Violet Outer Torus Ring
    const ring2Geo = new THREE.TorusGeometry(3.0, 0.012, 16, 120);
    const ring2Mat = new THREE.MeshBasicMaterial({ color: 0x7c3aed, transparent: true, opacity: 0.4 });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = -Math.PI / 4;
    ring2.rotation.y = Math.PI / 6;
    cyberGroup.add(ring2);

    // 3. Orange Horizon Ring
    const ring3Geo = new THREE.TorusGeometry(3.5, 0.01, 16, 120);
    const ring3Mat = new THREE.MeshBasicMaterial({ color: 0xf97316, transparent: true, opacity: 0.3 });
    const ring3 = new THREE.Mesh(ring3Geo, ring3Mat);
    ring3.rotation.z = Math.PI / 3;
    cyberGroup.add(ring3);

    // 4. 3D Floating Particle Cloud
    const particleCount = 400;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(particleCount * 3);
    const pColors = new Float32Array(particleCount * 3);

    const palette = [new THREE.Color('#00D4FF'), new THREE.Color('#7C3AED'), new THREE.Color('#EC4899')];

    for (let i = 0; i < particleCount; i++) {
      pPos[i * 3] = (Math.random() - 0.5) * 14;
      pPos[i * 3 + 1] = (Math.random() - 0.5) * 14;
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 10;

      const c = palette[Math.floor(Math.random() * palette.length)];
      pColors[i * 3] = c.r;
      pColors[i * 3 + 1] = c.g;
      pColors[i * 3 + 2] = c.b;
    }

    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    pGeo.setAttribute('color', new THREE.BufferAttribute(pColors, 3));

    const pMat = new THREE.PointsMaterial({
      size: 0.06,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    let animationId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      cyberGroup.rotation.y = elapsed * 0.25;
      cyberGroup.rotation.x = Math.sin(elapsed * 0.2) * 0.2;
      particles.rotation.y = elapsed * 0.04;
      particles.rotation.x = elapsed * 0.02;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // -------------------------------------------------------------
  // 60FPS VIDEO SCROLL INTERPOLATION
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
      setScrollProgress(Math.round(p * 100));

      if (p < 0.28) {
        if (currentPhase !== 0) {
          setCurrentPhase(0);
          cyberAudio.playTransitionSound();
        }
        const p0 = Math.max(0, Math.min(1, p / 0.28));
        if (dollyVideoRef.current?.duration) {
          targetDolly = p0 * dollyVideoRef.current.duration;
        }
      } else if (p < 0.62) {
        if (currentPhase !== 1) {
          setCurrentPhase(1);
          cyberAudio.playTransitionSound();
        }
        const p1 = Math.max(0, Math.min(1, (p - 0.28) / (0.62 - 0.28)));
        if (orbitVideoRef.current?.duration) {
          targetOrbit = p1 * orbitVideoRef.current.duration;
        }
      } else if (p < 0.88) {
        if (currentPhase !== 2) {
          setCurrentPhase(2);
          cyberAudio.playTransitionSound();
        }
        const p2 = Math.max(0, Math.min(1, (p - 0.62) / (0.88 - 0.62)));
        if (walkVideoRef.current?.duration) {
          targetWalk = p2 * walkVideoRef.current.duration;
        }
      } else {
        if (currentPhase !== 3) {
          setCurrentPhase(3);
          cyberAudio.playTransitionSound();
        }
      }
    });

    const loop = () => {
      if (dollyVideoRef.current && Math.abs(curDolly - targetDolly) > 0.005) {
        curDolly += (targetDolly - curDolly) * 0.22;
        dollyVideoRef.current.currentTime = curDolly;
      }
      if (orbitVideoRef.current && Math.abs(curOrbit - targetOrbit) > 0.005) {
        curOrbit += (targetOrbit - curOrbit) * 0.22;
        orbitVideoRef.current.currentTime = curOrbit;
      }
      if (walkVideoRef.current && Math.abs(curWalk - targetWalk) > 0.005) {
        curWalk += (targetWalk - curWalk) * 0.22;
        walkVideoRef.current.currentTime = curWalk;
      }
      animationId = requestAnimationFrame(loop);
    };

    animationId = requestAnimationFrame(loop);

    return () => {
      unsub();
      cancelAnimationFrame(animationId);
    };
  }, [scrollYProgress, currentPhase]);

  const handleMouseMove = (e: React.MouseEvent) => {
    setMouseCoord({
      x: (e.clientX / window.innerWidth) * 2 - 1,
      y: -(e.clientY / window.innerHeight) * 2 + 1,
    });
  };

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
      onMouseMove={handleMouseMove}
      className="relative w-full h-[460vh] bg-[#09090B] select-none"
    >
      {/* Pinned 3D Viewport Window */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* Three.js 3D WebGL Background Canvas */}
        <div ref={threeMountRef} className="absolute inset-0 pointer-events-none -z-10" />

        {/* Ambient Nebula Radial Wash */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-20">
          <div className="absolute top-[-20%] left-[-20%] w-[75%] h-[75%] rounded-full bg-[#00D4FF]/10 blur-[160px]" />
          <div className="absolute bottom-[-20%] right-[-20%] w-[75%] h-[75%] rounded-full bg-brand-violet/15 blur-[160px]" />
          <div className="absolute top-[30%] left-[30%] w-[50%] h-[50%] rounded-full bg-brand-pink/10 blur-[140px]" />
        </div>

        {/* CENTER 3D CHARACTER VIDEO STAGE */}
        <div
          className="relative w-full max-w-5xl h-full flex items-center justify-center pointer-events-none transition-transform duration-300 ease-out"
          style={{
            transform: `perspective(1000px) rotateY(${mouseCoord.x * 2.5}deg) rotateX(${mouseCoord.y * -2.5}deg)`,
          }}
        >
          {/* Video 0: Dolly In (Landing) */}
          <video
            ref={dollyVideoRef}
            src="/Dolly_In.mp4"
            muted
            playsInline
            preload="auto"
            className={`absolute max-h-[85vh] w-auto object-contain mix-blend-screen transition-opacity duration-700 ${
              currentPhase === 0 ? 'opacity-95' : 'opacity-0 pointer-events-none'
            }`}
          />

          {/* Video 1: 3D Orbit (About & Skills) */}
          <video
            ref={orbitVideoRef}
            src="/3D_Orbit.mp4"
            muted
            playsInline
            preload="auto"
            className={`absolute max-h-[85vh] w-auto object-contain mix-blend-screen transition-opacity duration-700 ${
              currentPhase === 1 ? 'opacity-95' : 'opacity-0 pointer-events-none'
            }`}
          />

          {/* Video 2: Walk Forward (Work & Ventures) */}
          <video
            ref={walkVideoRef}
            src="/Walk_Forward.mp4"
            muted
            playsInline
            preload="auto"
            className={`absolute max-h-[85vh] w-auto object-contain mix-blend-screen transition-opacity duration-700 ${
              currentPhase === 2 ? 'opacity-95' : 'opacity-0 pointer-events-none'
            }`}
          />

          {/* Video 3: Idle Stance (Milestones & Contact) */}
          <video
            ref={idleVideoRef}
            src="/Idle_Loop.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className={`absolute max-h-[85vh] w-auto object-contain mix-blend-screen transition-opacity duration-700 ${
              currentPhase === 3 ? 'opacity-90' : 'opacity-0 pointer-events-none'
            }`}
          />
        </div>

        {/* ======================================================== */}
        {/* YASH CHAUHAN STYLE OVERLAY SECTIONS                       */}
        {/* ======================================================== */}

        {/* ── SECTION 0: LANDING / HERO (0% - 28%) ── */}
        {currentPhase === 0 && (
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 flex flex-col justify-between p-6 sm:p-12 md:p-20 max-w-7xl mx-auto pointer-events-none z-20"
          >
            {/* Top Status */}
            <div className="flex justify-between items-center pointer-events-auto">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#161617]/80 backdrop-blur-md border border-[#00D4FF]/30 text-[#00D4FF] text-[11px] font-mono font-bold shadow-[0_0_15px_rgba(0,212,255,0.2)]">
                <span className="w-2 h-2 rounded-full bg-[#00D4FF] animate-ping" />
                <span>STATUS: BUILDING NINZAE & AI RESEARCH</span>
              </div>
            </div>

            {/* Yash-Style SVG Headline & Typography */}
            <div className="max-w-xl text-left pointer-events-auto">
              <span className="font-mono text-xs text-[#00D4FF] font-bold tracking-widest uppercase block mb-2">
                // SYSTEM INITIALIZED
              </span>
              <h1 className="text-5xl sm:text-7xl md:text-8xl font-black font-heading text-white tracking-tight leading-[0.95] mb-4">
                Hi, my<br />
                name is <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D4FF] via-brand-pink to-brand-orange">Umar.</span>
              </h1>
              <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed mb-8 max-w-lg font-medium">
                I build machine learning architectures, published NLP research, and modern web applications.
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
        )}

        {/* ── SECTION 1: ABOUT & SKILLS MATRIX (28% - 62%) ── */}
        {currentPhase === 1 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex items-center justify-between p-6 sm:p-12 md:p-16 max-w-7xl mx-auto pointer-events-none z-20"
          >
            {/* Left Column: Cyber About & Identity Card */}
            <div className="w-full max-w-sm pointer-events-auto hidden md:block">
              <CyberHUDFrame title="IDENTITY // PROFILE" badge="VERIFIED" accentColor="cyan">
                <div className="flex items-center gap-4 mb-4 pb-4 border-b border-[#26262D]">
                  <div className="w-16 h-16 rounded-xl bg-[#161617] border border-[#00D4FF]/40 flex items-center justify-center text-[#00D4FF] font-mono font-black text-xl shadow-[0_0_15px_rgba(0,212,255,0.25)]">
                    UI
                  </div>
                  <div>
                    <h3 className="font-heading font-black text-lg text-white">Umar Iqbal</h3>
                    <p className="text-xs font-mono text-[#00D4FF]">Data Scientist & AI Researcher</p>
                    <p className="text-[11px] text-gray-400 font-mono">IILM University, 2nd Year B.Tech</p>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-gray-300 leading-relaxed font-sans">
                  <p>
                    ⚡ <span className="text-white font-bold">NLP Researcher:</span> Published research on fake news detection in social feeds (DOI: 10.13140/RG.2.2.25770.27844).
                  </p>
                  <p>
                    ⚡ <span className="text-white font-bold">Leadership:</span> Vice President of ACM Student Chapter, organizing hackathons and technical seminars.
                  </p>
                </div>
              </CyberHUDFrame>
            </div>

            {/* Right Column: Technical Skills HUD Matrix */}
            <div className="w-full max-w-sm pointer-events-auto">
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
        )}

        {/* ── SECTION 2: FEATURED WORK & VENTURES (62% - 88%) ── */}
        {currentPhase === 2 && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex flex-col justify-between p-6 sm:p-12 md:p-16 max-w-7xl mx-auto pointer-events-none z-20"
          >
            {/* Header */}
            <div className="text-center max-w-xl mx-auto pointer-events-auto">
              <span className="font-mono text-xs font-bold text-brand-orange tracking-widest uppercase">
                // PRODUCTION DEPLOYMENTS
              </span>
              <h2 className="text-3xl sm:text-5xl font-black font-heading text-white mt-1">
                Featured Work & Ventures
              </h2>
            </div>

            {/* Cyber Project Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pointer-events-auto max-w-5xl mx-auto w-full">
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
        )}

        {/* ── SECTION 3: MILESTONES & CONTACT TERMINAL (88% - 100%) ── */}
        {currentPhase === 3 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.5 }}
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
        )}

        {/* ======================================================== */}
        {/* RIGHT HUD CHAPTER NAVIGATOR                               */}
        {/* ======================================================== */}
        <div className="fixed right-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-end gap-3 z-40">
          {[
            { idx: 0, label: '01 // INTRO' },
            { idx: 1, label: '02 // SKILLS & ABOUT' },
            { idx: 2, label: '03 // WORK' },
            { idx: 3, label: '04 // CONTACT' },
          ].map((ch) => {
            const isActive = currentPhase === ch.idx;
            return (
              <button
                key={ch.idx}
                onClick={() => jumpToPhase(ch.idx)}
                onMouseEnter={() => cyberAudio.playHoverSound()}
                className={`group flex items-center gap-3 text-xs font-mono transition-all duration-300 ${
                  isActive ? 'text-[#00D4FF] font-bold' : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                <span className={`transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                  {ch.label}
                </span>
                <span
                  className={`rounded-full transition-all duration-300 ${
                    isActive
                      ? 'w-6 h-2 bg-gradient-to-r from-[#00D4FF] to-brand-violet shadow-[0_0_12px_rgba(0,212,255,0.9)]'
                      : 'w-2 h-2 bg-[#2c2c30] group-hover:bg-gray-400'
                  }`}
                />
              </button>
            );
          })}

          <div className="mt-2 px-2.5 py-1 rounded-md bg-[#161617]/80 border border-[#26262D] text-[10px] font-mono text-[#00D4FF]">
            {scrollProgress}% 3D SCRUB
          </div>
        </div>

        {/* Bottom Scroll Mouse Animation */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none z-20">
          <span className="text-[9px] font-mono uppercase tracking-widest text-gray-500">
            {currentPhase === 3 ? 'Scroll to explore archive tabs' : 'Scroll down to rotate 3D world'}
          </span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
            className="w-4 h-7 rounded-full border border-gray-600 flex items-start justify-center p-1"
          >
            <div className="w-1 h-1.5 rounded-full bg-[#00D4FF]" />
          </motion.div>
        </div>

      </div>
    </div>
  );
};

export default YashStyleScroller;
