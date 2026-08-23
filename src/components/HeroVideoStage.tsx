import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { RotateCw, Compass, ZoomIn, Play, Pause, Sparkles, Footprints, RefreshCw } from 'lucide-react';

export type VideoMode = 'idle' | 'orbit' | 'dolly' | 'walk';

interface VideoClip {
  id: VideoMode;
  label: string;
  shortLabel: string;
  icon: React.ComponentType<{ size: number; className?: string }>;
  src: string;
  loop: boolean;
  description: string;
}

const CLIPS: VideoClip[] = [
  {
    id: 'idle',
    label: 'Idle Stance',
    shortLabel: 'Idle',
    icon: Sparkles,
    src: '/Idle_Loop.mp4',
    loop: true,
    description: 'Natural ambient breathing and subtle presence',
  },
  {
    id: 'orbit',
    label: '3D Orbit (Interactive)',
    shortLabel: '3D Orbit',
    icon: Compass,
    src: '/3D_Orbit.mp4',
    loop: true,
    description: 'Move mouse across to scrub 3D angle',
  },
  {
    id: 'dolly',
    label: 'Dolly In',
    shortLabel: 'Dolly In',
    icon: ZoomIn,
    src: '/Dolly_In.mp4',
    loop: true,
    description: 'Cinematic push-in perspective',
  },
  {
    id: 'walk',
    label: 'Walk Forward',
    shortLabel: 'Walk In',
    icon: Footprints,
    src: '/Walk_Forward.mp4',
    loop: true,
    description: 'Dynamic entrance step toward camera',
  },
];

export const HeroVideoStage: React.FC = () => {
  const [activeMode, setActiveMode] = useState<VideoMode>('idle');
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isScrubbing, setIsScrubbing] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [videoLoaded, setVideoLoaded] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  const currentClip = CLIPS.find((c) => c.id === activeMode) || CLIPS[0];

  // Switch video clip smoothly
  const handleModeSelect = (mode: VideoMode) => {
    setActiveMode(mode);
    setVideoLoaded(false);
    setIsScrubbing(false);
    setIsPlaying(true);
  };

  // When activeMode changes, update video element
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.pause();
    video.src = currentClip.src;
    video.load();

    const handleCanPlay = () => {
      setVideoLoaded(true);
      if (isPlaying && !isScrubbing) {
        video.play().catch(() => {
          // Autoplay policy fallback
          setIsPlaying(false);
        });
      }
    };

    video.addEventListener('canplay', handleCanPlay);
    return () => {
      video.removeEventListener('canplay', handleCanPlay);
    };
  }, [activeMode]);

  // Handle Play/Pause toggle
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

  // Replay from start
  const handleReplay = () => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    video.play().then(() => setIsPlaying(true)).catch(() => {});
  };

  // Interactive mouse scrubbing for 3D Orbit
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (activeMode !== 'orbit' || !containerRef.current || !videoRef.current) return;

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

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (activeMode === 'orbit' && isScrubbing) {
      setIsScrubbing(false);
      const video = videoRef.current;
      if (video) {
        video.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    }
  };

  return (
    <div className="relative w-full max-w-[460px] mx-auto flex flex-col items-center select-none group/stage">
      {/* Background Tech Ambient Glow */}
      <div className="absolute -inset-2 bg-gradient-to-tr from-brand-violet/25 via-brand-pink/20 to-brand-orange/20 rounded-[2.5rem] blur-2xl opacity-60 group-hover/stage:opacity-80 transition-opacity duration-700 pointer-events-none -z-10" />

      {/* Main 3D Stage Container */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative w-full aspect-[4/5] sm:aspect-[3/4] bg-[#0E0E10]/90 rounded-[2rem] border border-[#262627] shadow-[0_20px_50px_rgba(0,0,0,0.8),_0_0_25px_rgba(124,58,237,0.12)] overflow-hidden flex flex-col items-center justify-center backdrop-blur-xl"
      >
        {/* Subtle grid HUD pattern */}
        <div className="absolute inset-0 bg-grid-pattern bg-[size:30px_30px] opacity-[0.03] pointer-events-none" />

        {/* Top HUD Bar */}
        <div className="absolute top-4 inset-x-4 flex items-center justify-between z-20 pointer-events-auto">
          {/* Status Badge */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#161617]/80 backdrop-blur-md border border-[#262627] text-[11px] font-semibold text-gray-300 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="tracking-wide uppercase font-mono text-[10px]">
              {activeMode === 'orbit' && isScrubbing ? 'SCRUBBING 3D' : `${activeMode.toUpperCase()} VIEW`}
            </span>
          </div>

          {/* Quick HUD Action Buttons */}
          <div className="flex items-center gap-1.5 bg-[#161617]/80 backdrop-blur-md border border-[#262627] rounded-full p-1 shadow-sm">
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
        </div>

        {/* Video Canvas Layer with dark theme blending */}
        <div className="relative w-full h-full flex items-center justify-center p-2">
          <video
            ref={videoRef}
            src={currentClip.src}
            autoPlay
            muted
            loop={currentClip.loop}
            playsInline
            preload="auto"
            className="w-full h-full object-contain rounded-2xl mix-blend-screen transition-opacity duration-300"
          />

          {/* Loading placeholder skeleton */}
          {!videoLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#0E0E10]/50 backdrop-blur-sm z-10">
              <RotateCw className="w-8 h-8 text-brand-violet animate-spin opacity-75" />
            </div>
          )}

          {/* Orbit Scrubbing Guide Overlay on Hover */}
          {activeMode === 'orbit' && isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none px-3.5 py-1.5 rounded-full bg-[#161617]/90 backdrop-blur-md border border-brand-violet/30 text-[11px] font-medium text-gray-200 shadow-lg flex items-center gap-2"
            >
              <Compass size={13} className="text-brand-violet animate-spin" style={{ animationDuration: '6s' }} />
              <span>Drag cursor horizontally to rotate</span>
            </motion.div>
          )}
        </div>

        {/* Bottom Corner Ambient Vignette */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#09090B] via-transparent to-transparent opacity-60" />
      </div>

      {/* Mode Switcher Navigation Pills */}
      <div className="w-full mt-4 flex items-center justify-center">
        <div className="flex flex-wrap items-center justify-center gap-1.5 p-1.5 bg-[#161617]/80 backdrop-blur-md border border-[#262627] rounded-2xl shadow-lg w-full max-w-full">
          {CLIPS.map((clip) => {
            const Icon = clip.icon;
            const isActive = activeMode === clip.id;

            return (
              <button
                key={clip.id}
                onClick={() => handleModeSelect(clip.id)}
                className={`relative px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all duration-300 flex-1 justify-center min-w-[78px] ${
                  isActive
                    ? 'text-white shadow-md'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-[#202022]/60'
                }`}
                title={clip.description}
              >
                <Icon size={14} className={isActive ? 'text-white' : 'text-gray-500'} />
                <span className="hidden sm:inline">{clip.shortLabel}</span>
                <span className="sm:hidden text-[10px]">{clip.shortLabel}</span>

                {/* Active Pill Indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeVideoModePill"
                    className="absolute inset-0 bg-vivid-gradient rounded-xl -z-10 shadow-[0_2px_10px_rgba(124,58,237,0.4)]"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
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

export default HeroVideoStage;
