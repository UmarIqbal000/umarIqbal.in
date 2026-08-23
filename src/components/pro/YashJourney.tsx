import React, { useState } from 'react';
import { timeline } from '../../lib/data';
import { FadeUp } from './YashScrollFx';
import { Briefcase, ExternalLink, Calendar, MapPin, Linkedin, Sparkles } from 'lucide-react';

interface EmbeddedPost {
  embedUrl: string;
  height: number;
}

const linkedInPosts: EmbeddedPost[] = [
  { embedUrl: 'https://www.linkedin.com/embed/feed/update/urn:li:share:7469120164861714433?collapsed=1', height: 669 },
  { embedUrl: 'https://www.linkedin.com/embed/feed/update/urn:li:share:7440369100637442048?collapsed=1', height: 534 },
  { embedUrl: 'https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7440701707409420289?collapsed=1', height: 566 },
  { embedUrl: 'https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7436157542667440128?collapsed=1', height: 566 },
  { embedUrl: 'https://www.linkedin.com/embed/feed/update/urn:li:share:7427080943145758720?collapsed=1', height: 669 },
];

export const YashJourney: React.FC = () => {
  const [loadedIframes, setLoadedIframes] = useState<{ [key: number]: boolean }>({});

  return (
    <section id="journey" className="relative px-6 py-20 md:px-12 bg-[#0d0d10] text-[#f2f2ee] border-t border-white/5">
      <div className="max-w-6xl mx-auto space-y-20">
        
        {/* Section Header */}
        <FadeUp className="text-center">
          <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#8f8f89]">
            // 06 · EXPERIENCE & PROFESSIONAL NETWORK
          </span>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black font-heading tracking-tight mt-2 uppercase">
            My Journey & LinkedIn
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-sm sm:text-base text-gray-400 font-sans">
            Career milestones, startup ventures, and direct thoughts shared across my professional network.
          </p>
        </FadeUp>

        {/* ── PART 1: CAREER & VENTURE TIMELINE ── */}
        <div className="space-y-10">
          <FadeUp>
            <div className="flex items-center gap-3 border-b border-white/10 pb-4">
              <Briefcase size={20} className="text-[#00D4FF]" />
              <h3 className="text-2xl font-black font-heading text-white uppercase">
                Career Experience & Leadership
              </h3>
            </div>
          </FadeUp>

          <div className="relative pl-6 md:pl-10 border-l-2 border-white/10 space-y-10">
            {timeline.map((item, idx) => (
              <FadeUp key={item.title} delay={idx * 0.1} className="relative group">
                {/* Glowing Dot on the Line */}
                <div className="absolute -left-[31px] md:-left-[47px] top-1.5 h-4 w-4 rounded-full bg-[#0a0a0a] border-2 border-[#00D4FF] group-hover:bg-[#00D4FF] group-hover:scale-125 transition-all shadow-[0_0_12px_rgba(0,212,255,0.6)]" />

                <div className="p-6 md:p-8 rounded-2xl bg-[#141418] border border-white/10 group-hover:border-white/20 transition-all shadow-xl">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#00D4FF]/10 text-[#00D4FF] border border-[#00D4FF]/20">
                        {item.tag}
                      </span>
                      <span className="text-xs font-mono text-gray-400 flex items-center gap-1">
                        <Calendar size={12} />
                        {item.year}
                      </span>
                    </div>
                  </div>

                  <h4 className="text-xl sm:text-2xl font-black font-heading text-white">
                    {item.title}
                  </h4>
                  <p className="text-sm font-mono text-purple-400 mb-3">
                    {item.company}
                  </p>
                  <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-sans">
                    {item.detail}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>

        {/* ── PART 2: EMBEDDED LINKEDIN POSTS ── */}
        <div className="space-y-10 pt-10 border-t border-white/10">
          <FadeUp>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <Linkedin size={22} className="text-[#0A66C2]" />
                <h3 className="text-2xl font-black font-heading text-white uppercase">
                  From My LinkedIn Network
                </h3>
              </div>
              <a
                href="https://www.linkedin.com/in/umariqbal000/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0A66C2] hover:bg-[#0077B5] text-white text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-md self-start sm:self-auto"
              >
                <span>Connect on LinkedIn</span>
                <ExternalLink size={13} />
              </a>
            </div>
          </FadeUp>

          {/* Grid of Embedded Posts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {linkedInPosts.map((post, idx) => (
              <FadeUp
                key={post.embedUrl}
                delay={idx * 0.1}
                className="rounded-2xl overflow-hidden bg-[#1B1F23] border border-[#38434F] shadow-2xl relative"
              >
                {!loadedIframes[idx] && (
                  <div className="absolute inset-0 flex items-center justify-center bg-[#1B1F23]/80 z-10">
                    <div className="flex items-center gap-2 text-xs font-mono text-[#71B7FB]">
                      <span className="h-2 w-2 rounded-full bg-[#0A66C2] animate-ping" />
                      <span>Loading LinkedIn transmission...</span>
                    </div>
                  </div>
                )}
                <iframe
                  src={post.embedUrl}
                  height={post.height}
                  width="100%"
                  frameBorder="0"
                  allowFullScreen
                  title={`LinkedIn Post ${idx + 1}`}
                  className="w-full rounded-2xl"
                  onLoad={() => setLoadedIframes((prev) => ({ ...prev, [idx]: true }))}
                />
              </FadeUp>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default YashJourney;
