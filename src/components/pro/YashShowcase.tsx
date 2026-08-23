import React from 'react';
import { marqueeSkills, projects } from '../../lib/data';
import { FadeUp } from './YashScrollFx';

function GalleryRow({
  images,
  reverse = false,
  duration,
}: {
  images: { src: string; alt: string; title: string }[];
  reverse?: boolean;
  duration: string;
}) {
  const doubled = [...images, ...images, ...images];
  return (
    <div className="flex overflow-hidden">
      <div
        className={`flex w-max shrink-0 gap-4 pr-4 ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}
        style={{ animationDuration: duration }}
      >
        {doubled.map((item, i) => (
          <div
            key={`${item.src}-${i}`}
            className="group relative h-40 w-64 md:h-52 md:w-[22rem] rounded-2xl border border-white/10 bg-[#141416] overflow-hidden flex-shrink-0"
          >
            <img
              src={item.src}
              alt={item.alt}
              className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
              <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                {item.title}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export const YashShowcase: React.FC = () => {
  const shots = projects.map((p) => ({ src: p.image, alt: p.title, title: p.title }));
  const rowA = shots;
  const rowB = [...shots.slice(2), ...shots.slice(0, 2)];

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

      {/* Dual Counter-Scrolling Work Showcase Rows */}
      <FadeUp delay={0.15} className="mt-14 space-y-4">
        <GalleryRow images={rowA} duration="35s" />
        <GalleryRow images={rowB} reverse duration="42s" />
      </FadeUp>
    </section>
  );
};

export default YashShowcase;
