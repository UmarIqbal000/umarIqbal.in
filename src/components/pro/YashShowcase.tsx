import React from 'react';
import { marqueeSkills, showcaseCerts } from '../../lib/data';
import { FadeUp } from './YashScrollFx';
import { Award } from 'lucide-react';

function GalleryRow({
  items,
  reverse = false,
  duration,
}: {
  items: { src: string; title: string; issuer: string }[];
  reverse?: boolean;
  duration: string;
}) {
  const doubled = [...items, ...items, ...items];
  return (
    <div className="flex overflow-hidden">
      <div
        className={`flex w-max shrink-0 gap-5 pr-5 ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}
        style={{ animationDuration: duration }}
      >
        {doubled.map((item, i) => (
          <div
            key={`${item.src}-${i}`}
            className="group relative h-48 w-80 md:h-60 md:w-[26rem] rounded-2xl border border-white/10 bg-[#141416] overflow-hidden flex-shrink-0 shadow-lg hover:border-[#00D4FF]/50 transition-all duration-300"
          >
            {/* Certificate Snapshot */}
            <img
              src={item.src}
              alt={item.title}
              className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            />

            {/* Dark Gradient Overlay with Text */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-4 sm:p-5">
              <div className="flex items-center gap-1.5 text-[#00D4FF] mb-1">
                <Award size={13} />
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider">
                  {item.issuer}
                </span>
              </div>
              <h4 className="font-heading font-black text-sm sm:text-base text-white truncate">
                {item.title}
              </h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export const YashShowcase: React.FC = () => {
  const rowA = showcaseCerts.slice(0, 5);
  const rowB = showcaseCerts.slice(5);

  return (
    <section className="overflow-hidden py-16 md:py-24 bg-[#0a0a0a]">
      {/* Tech Strip Marquee */}
      <FadeUp>
        <div className="flex overflow-hidden border-y border-white/10 py-5">
          <div className="flex w-max shrink-0 items-center gap-10 pr-10 animate-marquee">
            {[...marqueeSkills, ...marqueeSkills, ...marqueeSkills].map((skill, i) => (
              <span
                key={`${skill}-${i}`}
                className="flex items-center gap-10 whitespace-nowrap text-xl md:text-2xl font-black text-gray-300 font-heading uppercase"
              >
                {skill}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff8a3d] via-[#ff3d77] to-[#00d4ff] text-base">
                  ✦
                </span>
              </span>
            ))}
          </div>
        </div>
      </FadeUp>

      {/* Dual Counter-Scrolling Verified Certificates Gallery */}
      <FadeUp delay={0.15} className="mt-14 space-y-5">
        <div className="max-w-6xl mx-auto px-6 mb-2">
          <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#8f8f89]">
            // VERIFIED INDUSTRY CERTIFICATIONS
          </span>
        </div>
        <GalleryRow items={rowA} duration="38s" />
        <GalleryRow items={rowB} reverse duration="45s" />
      </FadeUp>
    </section>
  );
};

export default YashShowcase;
