import React, { useState } from 'react';
import { siteConfig } from '../../lib/data';
import { FadeUp } from './YashScrollFx';
import { Github, Linkedin, Mail, Copy, Check, ArrowUpRight, Globe, Phone, MapPin } from 'lucide-react';
import { SiLeetcode } from 'react-icons/si';

export const YashContact: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(siteConfig.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contact" className="relative px-6 py-28 md:px-16 md:py-36 bg-[#0a0a0a] text-[#f2f2ee]">
      <div className="max-w-6xl mx-auto space-y-20">
        
        {/* Giant Headline */}
        <FadeUp>
          <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#8f8f89]">
            // 04 · TRANSMISSION & INQUIRIES
          </span>
          <h2 className="text-5xl sm:text-7xl md:text-8xl font-black font-heading tracking-tight mt-2 uppercase leading-[0.92]">
            Let's build <br />
            something <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff8a3d] via-[#ff3d77] via-[#a855f7] to-[#00d4ff]">
              extraordinary.
            </span>
          </h2>
        </FadeUp>

        {/* Contact Info & Direct Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Email Copy & Details */}
          <div className="md:col-span-7 space-y-8">
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed font-sans max-w-lg">
              Open for Machine Learning research collaborations, AI software architectures, full-stack product builds, and technical leadership roles.
            </p>

            {/* Email Box */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#141416] border border-white/10 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 truncate">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#00D4FF]">
                  <Mail size={18} />
                </div>
                <div className="truncate">
                  <span className="text-[10px] font-mono text-[#8f8f89] uppercase block">EMAIL ADDRESS</span>
                  <span className="text-sm sm:text-base font-mono font-bold text-white truncate">
                    {siteConfig.email}
                  </span>
                </div>
              </div>

              <button
                onClick={copyEmail}
                className="px-4 py-2.5 rounded-xl bg-[#1e1e24] hover:bg-[#00D4FF] hover:text-black text-gray-200 text-xs font-mono font-bold uppercase transition-all flex items-center gap-1.5"
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                <span>{copied ? 'COPIED' : 'COPY'}</span>
              </button>
            </div>

            {/* Location & Status Meta */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs text-gray-400">
              <div className="flex items-center gap-2.5 p-4 rounded-xl bg-[#141416] border border-white/10">
                <MapPin size={16} className="text-brand-pink" />
                <span>{siteConfig.location}</span>
              </div>
              <div className="flex items-center gap-2.5 p-4 rounded-xl bg-[#141416] border border-white/10">
                <Phone size={16} className="text-brand-orange" />
                <span>{siteConfig.phone}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Social Links Matrix */}
          <div className="md:col-span-5 space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#8f8f89] block mb-2">
              DIRECT PORTALS
            </span>

            {[
              { label: 'LinkedIn Profile', url: siteConfig.socials.linkedin, icon: Linkedin },
              { label: 'GitHub Repository', url: siteConfig.socials.github, icon: Github },
              { label: 'LeetCode Profile', url: siteConfig.socials.leetcode, icon: SiLeetcode },
              { label: 'Live Portfolio', url: siteConfig.socials.website, icon: Globe },
            ].map((s) => {
              const Icon = s.icon;
              return (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-2xl bg-[#141416] border border-white/10 hover:border-[#00D4FF]/60 text-gray-300 hover:text-white flex items-center justify-between group transition-all"
                >
                  <div className="flex items-center gap-3">
                    <Icon size={18} className="text-[#00D4FF] group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-mono font-bold uppercase tracking-wider">{s.label}</span>
                  </div>
                  <ArrowUpRight size={16} className="text-gray-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </a>
              );
            })}
          </div>

        </div>

        {/* Footer */}
        <div className="pt-12 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#8f8f89]">
          <span>© 2026 UMAR IQBAL · ALL RIGHTS RESERVED</span>
          <span className="text-white">CRAFTED WITH SOUL & HIGH-PERFORMANCE CODE</span>
        </div>

      </div>
    </section>
  );
};

export default YashContact;
