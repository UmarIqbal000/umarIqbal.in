import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Boxes, 
  RotateCw, 
  Compass, 
  ZoomIn, 
  Play, 
  Pause, 
  Sparkles, 
  Footprints, 
  RefreshCw,
  Cpu
} from 'lucide-react';
import NeuralCore3D from './3d/NeuralCore3D';

export type ExperienceMode = 'webgl_core' | 'video_orbit' | 'video_dolly' | 'video_walk' | 'video_idle';

interface ModeOption {
  id: ExperienceMode;
  label: string;
  shortLabel: string;
  badge?: string;
  icon: React.ComponentType<{ size: number; className?: string }>;
  src?: string;
  isWebGL?: boolean;
}

const MODES: ModeOption[] = [
  {
    id: 'webgl_core',
    label: 'Interactive 3D WebGL Core',
    shortLabel: '3D WebGL',
    badge: 'REALTIME',
    icon: Boxes,
    isWebGL: true,
  },
  {
    id: 'video_orbit',
    label: '3D Orbit (Scrubbable)',
    shortLabel: '3D Orbit',
    icon: Compass,
    src: '/3D_Orbit.mp4',
  },
  {
    id: 'video_dolly',
    label: 'Dolly In',
    shortLabel: 'Dolly In',
    icon: ZoomIn,
    src: '/Dolly_In.mp4',
  },
  {
    id: 'video_walk',
    label: 'Walk Forward',
    shortLabel: 'Walk In',
    icon: Footprints,
    src: '/Walk_Forward.mp4',
  },
  {
    id: 'video_idle',
    label: 'Idle Stance',
    shortLabel: 'Idle',
    icon: Sparkles,
    src: '/Idle_Loop.mp4',
  },
];

export const Hero3DExperience: React.FC = () => {
  const [activeMode, setActiveMode] = useState<ExperienceMode>('webgl_core');
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isScrubbing, setIsScrubbing] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [videoLoaded, setVideoLoaded] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  const currentOption = MODES.find((m) => m.id === activeMode) || MODES[0];

  const handleModeSelect = (mode: ExperienceMode) => {
    setActiveMode(mode);
    setVideoLoaded(false);
    setIsScrubbing(false);
    setIsPlaying(true);
  };

  useEffect(() => {
    if (currentOption.isWebGL) return;

    const video = videoRef.current;
    if (!video || !currentOption.src) return;

    video.pause();
    video.src = currentOption.src;
    video.load();

    const handleCanPlay = () => {
      setVideoLoaded(true);
      if (isPlaying && !isScrubbing) {
        video.play().catch(() => setIsPlaying(false));
      }
    };

    video.addEventListener('canplay', handleCanPlay);
    return () => {
      video.removeEventListener('canplay', handleCanPlay);
    };
  }, [activeMode, currentOption.isWebGL, currentOption.src]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const handleReplay = () => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    video.play().then(() => setIsPlaying(true)).catch(() => {});
  };

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (activeMode !== 'video_orbit' || !containerRef.current || !videoRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const relativeX = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));

      if (rafRef.current) cancelAnimationFrame(rafRef.current);

      rafRef.current = requestAnimationFrame(() => {
        const video = videoRef.current;
        if (video && video.duration) {
          if (!video.paused) {
            video.pause();
            setIsPlaying(false);
          }
          video.currentTime = relativeX * video.duration;
          setIsScrubbing(true);
        }
      });
    },
    [activeMode]
  );

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (activeMode === 'video_orbit' && isScrubbing) {
      setIsScrubbing(false);
      const video = videoRef.current;
      if (video) {
        video.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    }
  };

  return (
    <div className="relative w-full max-w-[480px] mx-auto flex flex-col items-center select-none group/hero3d">
      {/* Background 3D Radial Glow */}
      <div className="absolute -inset-3 bg-gradient-to-tr from-brand-violet/30 via-brand-pink/20 to-brand-orange/20 rounded-[2.5rem] blur-2xl opacity-70 group-hover/hero3d:opacity-90 transition-opacity duration-700 pointer-events-none -z-10" />

      {/* Main 3D Stage Viewport */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative w-full aspect-[4/5] sm:aspect-[3/4] bg-[#0E0E10]/95 rounded-[2rem] border border-[#262627] shadow-[0_25px_60px_rgba(0,0,0,0.85),_0_0_30px_rgba(124,58,237,0.15)] overflow-hidden flex flex-col items-center justify-center backdrop-blur-2xl"
      >
        {/* Subtle HUD Grid Overlay */}
        <div className="absolute inset-0 bg-grid-pattern bg-[size:25px_25px] opacity-[0.04] pointer-events-none" />

        {/* Top HUD Status Bar */}
        <div className="absolute top-4 inset-x-4 flex items-center justify-between z-20 pointer-events-auto">
          {/* Active Mode Badge */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#161617]/90 backdrop-blur-md border border-[#262627] text-[11px] font-semibold text-gray-300 shadow-md">
            <span
              className={`w-2 h-2 rounded-full ${
                currentOption.isWebGL ? 'bg-brand-violet' : 'bg-emerald-400'
              } animate-pulse`}
            />
            <span className="tracking-wide uppercase font-mono text-[10px]">
              {currentOption.isWebGL
                ? 'REALTIME 3D WEBGL'
                : activeMode === 'video_orbit' && isScrubbing
                ? 'SCRUBBING 3D'
                : '3D HOLOGRAM VIDEO'}
            </span>
          </div>

          {/* Quick HUD controls for video mode */}
          {!currentOption.isWebGL && (
            <div className="flex items-center gap-1.5 bg-[#161617]/90 backdrop-blur-md border border-[#262627] rounded-full p-1 shadow-sm">
              <button
                onClick={togglePlay}
                className="p-1.5 rounded-full text-gray-400 hover:text-white hover:bg-[#262627] transition-all"
                title={isPlaying ? 'Pause' : 'Play'}
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause size={13} /> : <Play size={13} />}
              </button>
              <button
                onClick={handleReplay}
                className="p-1.5 rounded-full text-gray-400 hover:text-white hover:bg-[#262627] transition-all"
                title="Replay from start"
                aria-label="Replay"
              >
                <RefreshCw size={13} />
              </button>
            </div>
          )}
        </div>

        {/* VIEWPORT CONTENT: Real-Time WebGL 3D Canvas vs Hologram Video */}
        {currentOption.isWebGL ? (
          <div className="w-full h-full relative z-10">
            <NeuralCore3D />
          </div>
        ) : (
          <div className="relative w-full h-full flex items-center justify-center p-2">
            <video
              ref={videoRef}
              src={currentOption.src}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="w-full h-full object-contain rounded-2xl mix-blend-screen transition-opacity duration-300"
            />

            {!videoLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-[#0E0E10]/50 backdrop-blur-sm z-10">
                <RotateCw className="w-8 h-8 text-brand-violet animate-spin opacity-75" />
              </div>
            )}

            {activeMode === 'video_orbit' && isHovered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none px-3.5 py-1.5 rounded-full bg-[#161617]/90 backdrop-blur-md border border-brand-violet/30 text-[11px] font-medium text-gray-200 shadow-lg flex items-center gap-2"
              >
                <Compass size={13} className="text-brand-violet animate-spin" style={{ animationDuration: '6s' }} />
                <span>Drag cursor across to rotate 3D</span>
              </motion.div>
            )}
          </div>
        )}

        {/* Ambient Dark Theme Vignette */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#09090B]/80 via-transparent to-transparent" />
      </div>

      {/* Futuristic Mode Switcher Bar */}
      <div className="w-full mt-4 flex items-center justify-center">
        <div className="flex flex-wrap items-center justify-center gap-1.5 p-1.5 bg-[#161617]/90 backdrop-blur-xl border border-[#262627] rounded-2xl shadow-xl w-full">
          {MODES.map((mode) => {
            const Icon = mode.icon;
            const isActive = activeMode === mode.id;

            return (
              <button
                key={mode.id}
                onClick={() => handleModeSelect(mode.id)}
                className={`relative px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all duration-300 flex-1 justify-center min-w-[76px] ${
                  isActive
                    ? 'text-white font-bold'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-[#202022]/60'
                }`}
                title={mode.label}
              >
                <Icon size={14} className={isActive ? 'text-white' : 'text-gray-500'} />
                <span>{mode.shortLabel}</span>

                {/* Active Pill Indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeHero3DModePill"
                    className="absolute inset-0 bg-vivid-gradient rounded-xl -z-10 shadow-[0_4px_14px_rgba(124,58,237,0.45)]"
                    transition={{ type: 'spring', stiffness: 420, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Hero3DExperience;
