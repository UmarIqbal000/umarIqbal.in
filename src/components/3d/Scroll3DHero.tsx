import React, { useRef, useEffect, useState, useCallback } from 'react';
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
  Layers,
  ChevronDown
} from 'lucide-react';
import { SiLeetcode } from 'react-icons/si';

interface Scroll3DHeroProps {
  onViewProjects: () => void;
  onExploreMore: () => void;
}

export const Scroll3DHero: React.FC<Scroll3DHeroProps> = ({ onViewProjects, onExploreMore }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const threeCanvasRef = useRef<HTMLDivElement>(null);

  // Video element refs for instant crossfade & smooth frame sync
  const dollyVideoRef = useRef<HTMLVideoElement>(null);
  const orbitVideoRef = useRef<HTMLVideoElement>(null);
  const walkVideoRef = useRef<HTMLVideoElement>(null);
  const idleVideoRef = useRef<HTMLVideoElement>(null);

  const [currentPhase, setCurrentPhase] = useState<number>(0);
  const [scrollPercent, setScrollPercent] = useState<number>(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // -------------------------------------------------------------
  // THREE.JS 3D HOLOGRAPHIC AMBIENT STAGE
  // -------------------------------------------------------------
  useEffect(() => {
    const mount = threeCanvasRef.current;
    if (!mount) return;

    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // 3D Orbital Torus Rings around the character
    const ringGroup = new THREE.Group();
    scene.add(ringGroup);

    // Ring 1 (Violet)
    const ring1Geo = new THREE.TorusGeometry(2.4, 0.015, 16, 120);
    const ring1Mat = new THREE.MeshBasicMaterial({ color: 0x7c3aed, transparent: true, opacity: 0.5 });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    ringGroup.add(ring1);

    // Ring 2 (Pink)
    const ring2Geo = new THREE.TorusGeometry(2.8, 0.012, 16, 120);
    const ring2Mat = new THREE.MeshBasicMaterial({ color: 0xec4899, transparent: true, opacity: 0.4 });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = -Math.PI / 4;
    ring2.rotation.y = Math.PI / 6;
    ringGroup.add(ring2);

    // Ring 3 (Orange Data Ring)
    const ring3Geo = new THREE.TorusGeometry(3.2, 0.01, 16, 120);
    const ring3Mat = new THREE.MeshBasicMaterial({ color: 0xf97316, transparent: true, opacity: 0.35 });
    const ring3 = new THREE.Mesh(ring3Geo, ring3Mat);
    ring3.rotation.z = Math.PI / 3;
    ringGroup.add(ring3);

    // Floating 3D Depth Dust Particles
    const dustCount = 300;
    const dustGeo = new THREE.BufferGeometry();
    const dustPositions = new Float32Array(dustCount * 3);
    const dustColors = new Float32Array(dustCount * 3);

    const colors = [new THREE.Color('#7C3AED'), new THREE.Color('#EC4899'), new THREE.Color('#38BDF8')];

    for (let i = 0; i < dustCount; i++) {
      dustPositions[i * 3] = (Math.random() - 0.5) * 12;
      dustPositions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      dustPositions[i * 3 + 2] = (Math.random() - 0.5) * 8;

      const c = colors[Math.floor(Math.random() * colors.length)];
      dustColors[i * 3] = c.r;
      dustColors[i * 3 + 1] = c.g;
      dustColors[i * 3 + 2] = c.b;
    }

    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));
    dustGeo.setAttribute('color', new THREE.BufferAttribute(dustColors, 3));

    const dustMat = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });

    const dust = new THREE.Points(dustGeo, dustMat);
    scene.add(dust);

    let animationId: number;
    let clock = new THREE.Clock();

    const render = () => {
      animationId = requestAnimationFrame(render);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Rotate 3D rings with scroll and time
      ringGroup.rotation.y = elapsed * 0.2 + ringGroup.userData.targetRotY;
      ringGroup.rotation.x = Math.sin(elapsed * 0.15) * 0.2 + ringGroup.userData.targetRotX;
      ringGroup.rotation.z = elapsed * 0.1;

      dust.rotation.y = elapsed * 0.05;
      dust.rotation.x = elapsed * 0.02;

      renderer.render(scene, camera);
    };

    ringGroup.userData.targetRotY = 0;
    ringGroup.userData.targetRotX = 0;

    render();

    const handleResize = () => {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // -------------------------------------------------------------
  // SMOOTH 60FPS VIDEO SCROLL SCRUBBING ENGINE
  // -------------------------------------------------------------
  useEffect(() => {
    let animationFrameId: number;

    let currentDollyTime = 0;
    let currentOrbitTime = 0;
    let currentWalkTime = 0;

    let targetDollyTime = 0;
    let targetOrbitTime = 0;
    let targetWalkTime = 0;

    const unsubscribe = scrollYProgress.on('change', (progress) => {
      setScrollPercent(Math.round(progress * 100));

      // Phase 0: Dolly In (0% - 28%)
      if (progress < 0.28) {
        setCurrentPhase(0);
        const p0 = Math.max(0, Math.min(1, progress / 0.28));
        if (dollyVideoRef.current?.duration) {
          targetDollyTime = p0 * dollyVideoRef.current.duration;
        }
      } 
      // Phase 1: 3D Orbit (28% - 62%)
      else if (progress < 0.62) {
        setCurrentPhase(1);
        const p1 = Math.max(0, Math.min(1, (progress - 0.28) / (0.62 - 0.28)));
        if (orbitVideoRef.current?.duration) {
          targetOrbitTime = p1 * orbitVideoRef.current.duration;
        }
      } 
      // Phase 2: Walk Forward (62% - 88%)
      else if (progress < 0.88) {
        setCurrentPhase(2);
        const p2 = Math.max(0, Math.min(1, (progress - 0.62) / (0.88 - 0.62)));
        if (walkVideoRef.current?.duration) {
          targetWalkTime = p2 * walkVideoRef.current.duration;
        }
      } 
      // Phase 3: Milestones & Idle Landing (88% - 100%)
      else {
        setCurrentPhase(3);
      }
    });

    const smoothVideoLoop = () => {
      if (dollyVideoRef.current && Math.abs(currentDollyTime - targetDollyTime) > 0.005) {
        currentDollyTime += (targetDollyTime - currentDollyTime) * 0.22;
        dollyVideoRef.current.currentTime = currentDollyTime;
      }

      if (orbitVideoRef.current && Math.abs(currentOrbitTime - targetOrbitTime) > 0.005) {
        currentOrbitTime += (targetOrbitTime - currentOrbitTime) * 0.22;
        orbitVideoRef.current.currentTime = currentOrbitTime;
      }

      if (walkVideoRef.current && Math.abs(currentWalkTime - targetWalkTime) > 0.005) {
        currentWalkTime += (targetWalkTime - currentWalkTime) * 0.22;
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

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({
      x: (e.clientX / window.innerWidth) * 2 - 1,
      y: -(e.clientY / window.innerHeight) * 2 + 1,
    });
  };

  const scrollToChapter = (phaseIndex: number) => {
    if (!containerRef.current) return;
    const containerTop = containerRef.current.offsetTop;
    const containerHeight = containerRef.current.offsetHeight;
    
    let targetScroll = 0;
    if (phaseIndex === 0) targetScroll = containerTop;
    if (phaseIndex === 1) targetScroll = containerTop + containerHeight * 0.36;
    if (phaseIndex === 2) targetScroll = containerTop + containerHeight * 0.70;
    if (phaseIndex === 3) targetScroll = containerTop + containerHeight * 0.94;

    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
  };

  return (
    <section 
      ref={containerRef} 
      onMouseMove={handleMouseMove}
      className="relative w-full h-[450vh] bg-[#09090B] selection:bg-brand-violet/20 select-none"
    >
      {/* ======================================================== */}
      {/* PINNED 3D CINEMATIC VIEWPORT (Sticky Full-Screen Window)  */}
      {/* ======================================================== */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* Three.js 3D WebGL Holographic Stage Layer */}
        <div ref={threeCanvasRef} className="absolute inset-0 pointer-events-none -z-10" />

        {/* Ambient Glowing Color Wash */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-20">
          <div 
            className="absolute top-[-25%] left-[-20%] w-[80%] h-[80%] rounded-full bg-brand-violet/12 blur-[150px] animate-pulse" 
            style={{ animationDuration: '8s' }} 
          />
          <div 
            className="absolute bottom-[-25%] right-[-20%] w-[80%] h-[80%] rounded-full bg-brand-orange/10 blur-[150px] animate-pulse" 
            style={{ animationDuration: '12s' }} 
          />
          <div 
            className="absolute top-[30%] left-[30%] w-[55%] h-[55%] rounded-full bg-brand-pink/12 blur-[130px] animate-pulse" 
            style={{ animationDuration: '10s' }} 
          />
        </div>

        {/* ======================================================== */}
        {/* 3D CHARACTER VIDEO STAGE (Seamless Screen Blend)          */}
        {/* ======================================================== */}
        <div 
          className="relative w-full max-w-5xl h-full flex items-center justify-center pointer-events-none transition-transform duration-300 ease-out"
          style={{
            transform: `perspective(1000px) rotateY(${mousePos.x * 3}deg) rotateX(${mousePos.y * -3}deg)`,
          }}
        >
          {/* Video 1: Dolly In (Phase 0) */}
          <video
            ref={dollyVideoRef}
            src="/Dolly_In.mp4"
            muted
            playsInline
            preload="auto"
            className={`absolute max-h-[86vh] w-auto object-contain mix-blend-screen transition-opacity duration-700 ${
              currentPhase === 0 ? 'opacity-95 scale-100' : 'opacity-0 scale-95 pointer-events-none'
            }`}
          />

          {/* Video 2: 3D Orbit (Phase 1) */}
          <video
            ref={orbitVideoRef}
            src="/3D_Orbit.mp4"
            muted
            playsInline
            preload="auto"
            className={`absolute max-h-[86vh] w-auto object-contain mix-blend-screen transition-opacity duration-700 ${
              currentPhase === 1 ? 'opacity-95 scale-100' : 'opacity-0 scale-95 pointer-events-none'
            }`}
          />

          {/* Video 3: Walk Forward (Phase 2) */}
          <video
            ref={walkVideoRef}
            src="/Walk_Forward.mp4"
            muted
            playsInline
            preload="auto"
            className={`absolute max-h-[86vh] w-auto object-contain mix-blend-screen transition-opacity duration-700 ${
              currentPhase === 2 ? 'opacity-95 scale-100' : 'opacity-0 scale-95 pointer-events-none'
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
            className={`absolute max-h-[86vh] w-auto object-contain mix-blend-screen transition-opacity duration-700 ${
              currentPhase === 3 ? 'opacity-90 scale-100' : 'opacity-0 scale-95 pointer-events-none'
            }`}
          />

          {/* Core Ambient Backlight */}
          <div className="absolute w-[450px] h-[450px] rounded-full bg-gradient-to-r from-brand-violet/20 via-brand-pink/15 to-transparent blur-[100px] -z-10" />
        </div>

        {/* ======================================================== */}
        {/* SCROLL-DRIVEN 3D STORYLINE OVERLAYS                      */}
        {/* ======================================================== */}

        {/* CHAPTER 0: INTRO HERO (0% - 28%) */}
        {currentPhase === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 flex flex-col justify-between p-6 sm:p-12 md:p-16 max-w-7xl mx-auto pointer-events-none z-20"
          >
            {/* Top Bar: Status Badge */}
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

              {/* 3D Mode indicator */}
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#161617]/80 backdrop-blur-md border border-brand-violet/30 text-brand-violet text-xs font-mono font-bold">
                <Compass size={13} className="animate-spin" style={{ animationDuration: '8s' }} />
                <span>SCROLL TO EXPLORE 3D</span>
              </div>
            </div>

            {/* Bottom Hero Card */}
            <div className="max-w-2xl text-left pointer-events-auto bg-gradient-to-t from-[#09090B]/95 via-[#09090B]/70 to-transparent p-6 sm:p-8 rounded-3xl backdrop-blur-md border border-[#262627]/50 shadow-2xl">
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
                  <span>3D Orbit View</span>
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
            className="absolute inset-0 flex items-center justify-between p-6 sm:p-12 md:p-16 max-w-7xl mx-auto pointer-events-none z-20"
          >
            {/* Left Spatial Card: AI & Deep Learning */}
            <motion.div
              initial={{ x: -40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="max-w-xs sm:max-w-sm pointer-events-auto p-6 rounded-2xl bg-[#131316]/95 backdrop-blur-xl border border-brand-violet/35 shadow-[0_12px_40px_rgba(124,58,237,0.2)]"
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
                Published research on fake news detection in social feeds (DOI: 10.13140/RG.2.2.25770.27844) & 96.7% accuracy CNN classifier.
              </p>
              <div className="flex flex-wrap gap-1.5">
                {['NLP', 'PyTorch', 'TensorFlow', 'LLMs', 'Antigravity'].map((tag) => (
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
              transition={{ delay: 0.2, duration: 0.5 }}
              className="max-w-xs sm:max-w-sm pointer-events-auto p-6 rounded-2xl bg-[#131316]/95 backdrop-blur-xl border border-brand-pink/35 shadow-[0_12px_40px_rgba(236,72,153,0.2)] hidden sm:block"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2.5 rounded-xl bg-brand-pink/15 border border-brand-pink/30 text-brand-pink">
                  <Code size={20} />
                </div>
                <div>
                  <h3 className="text-base font-bold font-heading text-white">Full-Stack & Cloud</h3>
                  <span className="text-[11px] font-mono text-gray-400">High-Scale Architecture</span>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-4">
                Builds high-performance web systems, interactive 3D WebGL interfaces, and AI workflows using Claude Code & Cursor.
              </p>
              <div className="flex flex-wrap gap-1.5">
                {['React', 'TypeScript', 'Node.js', 'WebGL', 'Three.js'].map((tag) => (
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
            className="absolute inset-0 flex flex-col justify-between p-6 sm:p-12 md:p-16 max-w-7xl mx-auto pointer-events-none z-20"
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
                <p className="text-xs text-gray-400 mb-3">AI product incubator & tech venture building intelligent automation tools.</p>
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
            className="absolute inset-0 flex flex-col justify-center items-center p-6 text-center max-w-3xl mx-auto pointer-events-none z-20"
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

              {/* Explore Detailed Tabs CTA */}
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
        <div className="fixed right-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-end gap-3 z-40">
          {[
            { index: 0, label: '01 Intro (Dolly In)' },
            { index: 1, label: '02 3D Orbit' },
            { index: 2, label: '03 Walk In' },
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
                      ? 'w-6 h-2 bg-vivid-gradient shadow-[0_0_12px_rgba(124,58,237,0.9)]'
                      : 'w-2 h-2 bg-[#2c2c30] group-hover:bg-gray-400'
                  }`}
                />
              </button>
            );
          })}

          {/* Live Scroll Progress Counter */}
          <div className="mt-2 px-2.5 py-1 rounded-md bg-[#161617]/80 border border-[#262627] text-[10px] font-mono text-gray-400">
            {scrollPercent}% 3D SCRUB
          </div>
        </div>

        {/* Bottom Scroll Prompt Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none z-20">
          <span className="text-[10px] font-mono uppercase tracking-widest text-gray-500">
            {currentPhase === 3 ? 'Scroll to explore tabs' : 'Scroll down to rotate 3D story'}
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
