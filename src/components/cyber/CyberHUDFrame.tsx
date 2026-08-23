import React from 'react';

interface CyberHUDFrameProps {
  children: React.ReactNode;
  title?: string;
  badge?: string;
  className?: string;
  accentColor?: 'violet' | 'cyan' | 'pink' | 'orange';
}

export const CyberHUDFrame: React.FC<CyberHUDFrameProps> = ({
  children,
  title,
  badge,
  className = '',
  accentColor = 'cyan',
}) => {
  const colorMap = {
    cyan: {
      border: 'border-[#00D4FF]/40',
      glow: 'shadow-[0_0_25px_rgba(0,212,255,0.15)]',
      text: 'text-[#00D4FF]',
      bg: 'bg-[#00D4FF]/10',
      line: '#00D4FF',
    },
    violet: {
      border: 'border-[#7C3AED]/40',
      glow: 'shadow-[0_0_25px_rgba(124,58,237,0.18)]',
      text: 'text-brand-violet',
      bg: 'bg-brand-violet/10',
      line: '#7C3AED',
    },
    pink: {
      border: 'border-[#EC4899]/40',
      glow: 'shadow-[0_0_25px_rgba(236,72,153,0.18)]',
      text: 'text-brand-pink',
      bg: 'bg-brand-pink/10',
      line: '#EC4899',
    },
    orange: {
      border: 'border-[#F97316]/40',
      glow: 'shadow-[0_0_25px_rgba(249,115,22,0.18)]',
      text: 'text-brand-orange',
      bg: 'bg-brand-orange/10',
      line: '#F97316',
    },
  };

  const scheme = colorMap[accentColor];

  return (
    <div
      className={`relative bg-[#0E0E12]/90 backdrop-blur-xl border ${scheme.border} ${scheme.glow} rounded-2xl p-6 transition-all duration-300 ${className}`}
      style={{
        clipPath: 'polygon(0 14px, 14px 0, calc(100% - 14px) 0, 100% 14px, 100% calc(100% - 14px), calc(100% - 14px) 100%, 14px 100%, 0 calc(100% - 14px))',
      }}
    >
      {/* Corner Tech Notches */}
      <div className="absolute top-0 left-0 w-3.5 h-3.5 border-t-2 border-l-2 border-white/60 pointer-events-none" />
      <div className="absolute top-0 right-0 w-3.5 h-3.5 border-t-2 border-r-2 border-white/60 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-3.5 h-3.5 border-b-2 border-l-2 border-white/60 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-3.5 h-3.5 border-b-2 border-r-2 border-white/60 pointer-events-none" />

      {/* Cyber Frame Header */}
      {(title || badge) && (
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#26262D]">
          {title && (
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-sm ${scheme.bg} ${scheme.text} inline-block`} style={{ backgroundColor: scheme.line }} />
              <h3 className={`font-mono text-xs font-bold tracking-widest uppercase ${scheme.text}`}>
                {title}
              </h3>
            </div>
          )}
          {badge && (
            <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase tracking-wider ${scheme.bg} ${scheme.text} border border-white/10`}>
              {badge}
            </span>
          )}
        </div>
      )}

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default CyberHUDFrame;
