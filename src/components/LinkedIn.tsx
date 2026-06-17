import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

interface EmbeddedPost {
  embedUrl: string;
  height: number;
}

const LinkedIn: React.FC = () => {
  const posts: EmbeddedPost[] = [
    { embedUrl: 'https://www.linkedin.com/embed/feed/update/urn:li:share:7469120164861714433?collapsed=1', height: 669 },
    { embedUrl: 'https://www.linkedin.com/embed/feed/update/urn:li:share:7440369100637442048?collapsed=1', height: 534 },
    { embedUrl: 'https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7440701707409420289?collapsed=1', height: 566 },
    { embedUrl: 'https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7436157542667440128?collapsed=1', height: 566 },
    { embedUrl: 'https://www.linkedin.com/embed/feed/update/urn:li:share:7427080943145758720?collapsed=1', height: 669 }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="py-12 max-w-6xl mx-auto px-4"
    >
      {/* Section Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold font-heading mb-3 text-white">
          From <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0A66C2] to-[#0077B5] font-extrabold font-heading">LinkedIn</span>
        </h2>
        <p className="text-gray-400 max-w-xl mx-auto text-sm md:text-base">
          Highlights of what I share on professional networks about startup growth, software systems, and AI research.
        </p>
      </div>

      {/* ===== LINKEDIN PROFILE CARD ===== */}
      <div className="mb-14 max-w-[790px] mx-auto">
        <div className="relative rounded-lg overflow-hidden bg-[#1B1F23] border border-[#38434F]">

          {/* ── BANNER ── */}
          <div className="relative h-[120px] sm:h-[160px] md:h-[200px] bg-[#000000] overflow-hidden">
            {/* Banner background — matches their real LinkedIn banner dark style */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#000000] via-[#0a0e14] to-[#0d1117]" />

            {/* Left: Code icon */}
            <div className="absolute top-5 left-6">
              <span className="text-white/50 text-xl font-mono font-bold select-none">&lt;/&gt;</span>
            </div>

            {/* Center: LinkedIn logo + Follow Now */}
            <div className="absolute top-5 left-1/2 -translate-x-1/2 flex items-center gap-4">
              <svg className="w-7 h-7" viewBox="0 0 24 24" fill="#0A66C2">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              <span className="text-white/80 text-sm md:text-base font-extrabold tracking-wide uppercase hidden sm:block" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>FOLLOW NOW!!</span>
            </div>

            {/* Right: Social handles */}
            <div className="absolute top-4 right-5 hidden md:flex flex-col gap-2.5">
              <a href="https://instagram.com/umariqbal000" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 group/s">
                <span className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)' }}>
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="white"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </span>
                <span className="text-[11px] font-mono font-semibold text-white/60 group-hover/s:text-white transition-colors">@umariqbal000</span>
              </a>
              <a href="https://x.com/UmarIqbal000" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 group/s">
                <span className="w-5 h-5 rounded-full bg-white flex items-center justify-center">
                  <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="#000"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </span>
                <span className="text-[11px] font-mono font-semibold text-white/60 group-hover/s:text-white transition-colors">@UmarIqbal000</span>
              </a>
              <a href="https://threads.net/@umariqbal000" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 group/s">
                <span className="w-5 h-5 rounded-full bg-white flex items-center justify-center">
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="#000"><path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.59 12c.025 3.086.718 5.496 2.057 7.164 1.432 1.781 3.632 2.695 6.54 2.717 2.227-.015 4.155-.554 5.456-1.812.93-.896 1.553-2.087 1.553-3.652 0-1.665-.606-2.878-1.8-3.607-1.053-.643-2.445-.98-4.128-1.003a9.2 9.2 0 00-.485.003c-1.593.06-2.873.47-3.693 1.184-.7.608-1.057 1.39-1.057 2.323 0 1.648 1.282 2.774 3.2 2.816l.068-.003c1.095-.028 1.92-.354 2.453-.968.39-.45.584-1.02.584-1.693h2.104c0 1.205-.424 2.233-1.226 2.974-.972.897-2.38 1.37-4.075 1.41h-.003c-2.846-.062-4.88-1.738-4.88-4.536 0-1.412.558-2.622 1.613-3.5 1.19-1 2.855-1.545 4.81-1.576l.205-.002c2.063.013 3.803.433 5.17 1.248 1.655 1.01 2.528 2.672 2.528 4.804 0 2.078-.822 3.704-2.184 4.875-1.613 1.39-3.878 2.093-6.61 2.113z"/></svg>
                </span>
                <span className="text-[11px] font-mono font-semibold text-white/60 group-hover/s:text-white transition-colors">@umariqbal000</span>
              </a>
              <a href="https://github.com/UmarIqbal000" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 group/s">
                <span className="w-5 h-5 rounded-full bg-white flex items-center justify-center">
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="#24292E"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                </span>
                <span className="text-[11px] font-mono font-semibold text-white/60 group-hover/s:text-white transition-colors">@UmarIqbal000</span>
              </a>
            </div>

            {/* Pencil edit icon (decorative, like LinkedIn) */}
            <button className="absolute bottom-3 right-4 w-8 h-8 rounded-full bg-[#1B1F23] border border-[#38434F] flex items-center justify-center text-[#C1C7CD] hover:bg-[#38434F] transition-colors cursor-default">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M12.1 1.3a1.1 1.1 0 011.5 0l1.1 1.1a1.1 1.1 0 010 1.5l-8 8L3 13l1.1-3.7zM11 3.4L4.5 10l-.6 1.8L5.7 11 12.2 4.5z"/></svg>
            </button>
          </div>

          {/* ── PROFILE PHOTO (overlapping banner) ── */}
          <div className="relative px-6 -mt-[56px] sm:-mt-[64px]">
            <div className="relative inline-block">
              <div className="w-[112px] h-[112px] sm:w-[128px] sm:h-[128px] rounded-full border-[4px] border-[#1B1F23] overflow-hidden bg-[#38434F]">
                <img
                  src="/Gemini_Generated_Image_7mgti7mgti7mgti7.png"
                  alt="Umar Iqbal"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              {/* Open to Work ring indicator (green dot like LinkedIn) */}
              <div className="absolute bottom-1 right-1 w-[18px] h-[18px] rounded-full bg-[#44B35C] border-[3px] border-[#1B1F23]" />
            </div>
          </div>

          {/* ── PROFILE INFO ── */}
          <div className="px-6 pt-3 pb-5">
            <div className="flex flex-col lg:flex-row lg:justify-between lg:gap-8">

              {/* Left Column — Identity */}
              <div className="flex-1 min-w-0">
                {/* Name row */}
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-[22px] sm:text-2xl font-semibold text-[#E7E9EA]" style={{ fontFamily: '-apple-system, system-ui, "Segoe UI", Roboto, sans-serif' }}>
                    Umar Iqbal
                  </h3>
                  {/* Verified badge */}
                  <svg className="w-[18px] h-[18px] flex-shrink-0" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" fill="#0A66C2"/>
                    <path d="M9.5 12.5l2 2 4-4.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-sm text-[#A8B3BD]">(He/Him)</span>
                </div>

                {/* Headline */}
                <p className="text-sm text-[#E7E9EA] mt-1 leading-snug" style={{ fontFamily: '-apple-system, system-ui, "Segoe UI", Roboto, sans-serif' }}>
                  I build AI-powered products. Founder @ Ninzae
                </p>

                {/* Location + Contact info */}
                <div className="flex items-center gap-1 mt-2 text-sm text-[#A8B3BD]">
                  <span>Greater Delhi Area</span>
                  <span className="mx-0.5">·</span>
                  <a href="https://www.linkedin.com/in/umariqbal000/" target="_blank" rel="noopener noreferrer"
                     className="text-[#71B7FB] font-semibold hover:underline">
                    Contact info
                  </a>
                </div>

                {/* Follower / Connection stats */}
                <div className="flex items-center gap-1 mt-2 text-sm">
                  <a href="https://www.linkedin.com/in/umariqbal000/" target="_blank" rel="noopener noreferrer"
                     className="text-[#71B7FB] font-semibold hover:underline">
                    2,913 followers
                  </a>
                  <span className="text-[#A8B3BD] mx-0.5">·</span>
                  <a href="https://www.linkedin.com/in/umariqbal000/" target="_blank" rel="noopener noreferrer"
                     className="text-[#71B7FB] font-semibold hover:underline">
                    500+ connections
                  </a>
                </div>

                {/* Action Buttons — exact LinkedIn style */}
                <div className="flex flex-wrap items-center gap-2 mt-4">
                  {/* Follow — filled blue pill */}
                  <a href="https://www.linkedin.com/in/umariqbal000/" target="_blank" rel="noopener noreferrer"
                     className="inline-flex items-center gap-1.5 h-8 px-4 rounded-full bg-[#0A66C2] text-white text-sm font-semibold hover:bg-[#004182] active:bg-[#00325E] transition-colors"
                     style={{ fontFamily: '-apple-system, system-ui, "Segoe UI", Roboto, sans-serif' }}>
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    Follow
                  </a>

                  {/* Message — outlined blue pill */}
                  <a href="https://www.linkedin.com/in/umariqbal000/" target="_blank" rel="noopener noreferrer"
                     className="inline-flex items-center gap-1.5 h-8 px-4 rounded-full border border-[#71B7FB] text-[#71B7FB] text-sm font-semibold hover:bg-[#71B7FB]/10 active:bg-[#71B7FB]/20 transition-colors"
                     style={{ fontFamily: '-apple-system, system-ui, "Segoe UI", Roboto, sans-serif' }}>
                    <ExternalLink size={14} />
                    View Profile
                  </a>

                  {/* More — outlined gray pill */}
                  <button className="inline-flex items-center h-8 px-4 rounded-full border border-[#A8B3BD] text-[#A8B3BD] text-sm font-semibold hover:bg-[#A8B3BD]/10 transition-colors"
                          style={{ fontFamily: '-apple-system, system-ui, "Segoe UI", Roboto, sans-serif' }}>
                    More
                  </button>
                </div>
              </div>

              {/* Right Column — Company & Education */}
              <div className="flex flex-col gap-3 mt-5 lg:mt-1 lg:min-w-[240px]">
                {/* Ninzae */}
                <a href="https://www.linkedin.com/in/umariqbal000/" target="_blank" rel="noopener noreferrer"
                   className="flex items-center gap-3 group">
                  <div className="w-11 h-11 rounded flex items-center justify-center bg-[#38434F] flex-shrink-0">
                    <span className="text-white font-black text-sm" style={{ fontFamily: 'system-ui, sans-serif' }}>N</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#E7E9EA] group-hover:text-[#71B7FB] group-hover:underline transition-colors leading-tight"
                       style={{ fontFamily: '-apple-system, system-ui, "Segoe UI", Roboto, sans-serif' }}>
                      Ninzae
                    </p>
                    <p className="text-xs text-[#A8B3BD]">Founder · Full-time</p>
                  </div>
                </a>

                {/* IILM University */}
                <a href="https://www.linkedin.com/in/umariqbal000/" target="_blank" rel="noopener noreferrer"
                   className="flex items-center gap-3 group">
                  <div className="w-11 h-11 rounded flex items-center justify-center bg-[#0A66C2]/20 flex-shrink-0">
                    <svg className="w-5 h-5 text-[#71B7FB]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m4 6 8-4 8 4"/><path d="m18 10 4 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8l4-2"/><path d="M14 22v-4a2 2 0 0 0-2-2 2 2 0 0 0-2 2v4"/><path d="M18 5v17"/><path d="M6 5v17"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#E7E9EA] group-hover:text-[#71B7FB] group-hover:underline transition-colors leading-tight"
                       style={{ fontFamily: '-apple-system, system-ui, "Segoe UI", Roboto, sans-serif' }}>
                      IILM University, Greater Noida
                    </p>
                    <p className="text-xs text-[#A8B3BD]">B.Tech Computer Science</p>
                  </div>
                </a>
              </div>
            </div>

            {/* ── Open to ── */}
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="inline-flex items-center h-7 px-4 rounded-full border border-[#44B35C] text-[#44B35C] text-xs font-semibold"
                    style={{ fontFamily: '-apple-system, system-ui, "Segoe UI", Roboto, sans-serif' }}>
                Open to
              </span>
              <span className="inline-flex items-center h-7 px-4 rounded-full border border-[#71B7FB] text-[#71B7FB] text-xs font-semibold"
                    style={{ fontFamily: '-apple-system, system-ui, "Segoe UI", Roboto, sans-serif' }}>
                Add section
              </span>
              <span className="inline-flex items-center h-7 px-4 rounded-full border border-[#71B7FB] text-[#71B7FB] text-xs font-semibold"
                    style={{ fontFamily: '-apple-system, system-ui, "Segoe UI", Roboto, sans-serif' }}>
                Enhance profile
              </span>
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full border border-[#A8B3BD] text-[#A8B3BD] text-xs cursor-default">
                •••
              </span>
            </div>

            {/* ── Mobile Social Links ── */}
            <div className="flex flex-wrap gap-2 mt-4 lg:hidden">
              <a href="https://instagram.com/umariqbal000" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#38434F]/50 hover:bg-[#38434F] transition-colors">
                <span className="w-4 h-4 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)' }}>
                  <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="white"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </span>
                <span className="text-[10px] font-mono font-semibold text-[#A8B3BD]">@umariqbal000</span>
              </a>
              <a href="https://x.com/UmarIqbal000" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#38434F]/50 hover:bg-[#38434F] transition-colors">
                <span className="w-4 h-4 rounded-full bg-white flex items-center justify-center">
                  <svg className="w-2 h-2" viewBox="0 0 24 24" fill="#000"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </span>
                <span className="text-[10px] font-mono font-semibold text-[#A8B3BD]">@UmarIqbal000</span>
              </a>
              <a href="https://threads.net/@umariqbal000" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#38434F]/50 hover:bg-[#38434F] transition-colors">
                <span className="w-4 h-4 rounded-full bg-white flex items-center justify-center">
                  <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="#000"><path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.59 12c.025 3.086.718 5.496 2.057 7.164 1.432 1.781 3.632 2.695 6.54 2.717 2.227-.015 4.155-.554 5.456-1.812.93-.896 1.553-2.087 1.553-3.652 0-1.665-.606-2.878-1.8-3.607-1.053-.643-2.445-.98-4.128-1.003a9.2 9.2 0 00-.485.003c-1.593.06-2.873.47-3.693 1.184-.7.608-1.057 1.39-1.057 2.323 0 1.648 1.282 2.774 3.2 2.816l.068-.003c1.095-.028 1.92-.354 2.453-.968.39-.45.584-1.02.584-1.693h2.104c0 1.205-.424 2.233-1.226 2.974-.972.897-2.38 1.37-4.075 1.41h-.003c-2.846-.062-4.88-1.738-4.88-4.536 0-1.412.558-2.622 1.613-3.5 1.19-1 2.855-1.545 4.81-1.576l.205-.002c2.063.013 3.803.433 5.17 1.248 1.655 1.01 2.528 2.672 2.528 4.804 0 2.078-.822 3.704-2.184 4.875-1.613 1.39-3.878 2.093-6.61 2.113z"/></svg>
                </span>
                <span className="text-[10px] font-mono font-semibold text-[#A8B3BD]">@umariqbal000</span>
              </a>
              <a href="https://github.com/UmarIqbal000" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#38434F]/50 hover:bg-[#38434F] transition-colors">
                <span className="w-4 h-4 rounded-full bg-white flex items-center justify-center">
                  <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="#24292E"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                </span>
                <span className="text-[10px] font-mono font-semibold text-[#A8B3BD]">@UmarIqbal000</span>
              </a>
            </div>
          </div>

          {/* ── Separator ── */}
          <div className="border-t border-[#38434F]" />

          {/* ── Analytics row ── */}
          <div className="px-6 py-3 flex items-center gap-2 text-xs text-[#A8B3BD]">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
            <span className="text-[#E7E9EA] font-semibold">2,913 followers</span>
            <span>·</span>
            <span>Connect to see mutual connections</span>
          </div>
        </div>
      </div>

      {/* ===== RECENT POSTS SECTION ===== */}
      <div className="text-center mb-8">
        <h3 className="text-xl md:text-2xl font-bold font-heading text-white mb-2">
          Recent <span className="text-[#0A66C2]">Posts</span>
        </h3>
        <p className="text-gray-500 text-xs">Latest updates and thoughts shared on LinkedIn</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.08 }}
            className={`rounded-lg overflow-hidden border border-[#38434F] bg-[#1B1F23] shadow-lg ${
              idx === posts.length - 1 && posts.length % 2 !== 0 ? 'md:col-span-2 md:max-w-[calc(50%-12px)] md:mx-auto' : ''
            }`}
          >
            <iframe
              src={post.embedUrl}
              height={post.height}
              width="100%"
              frameBorder="0"
              allowFullScreen
              title={`LinkedIn post ${idx + 1}`}
              className="w-full"
              style={{ maxHeight: '600px' }}
              loading="lazy"
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default LinkedIn;
