import React from 'react';
import { skills } from '../../lib/data';
import { FadeUp } from './YashScrollFx';
import { Code2, Brain, Layout, Server, Wrench } from 'lucide-react';

const skillCategories = [
  {
    title: 'Programming Languages',
    icon: Code2,
    color: 'text-amber-400',
    borderColor: 'group-hover:border-amber-400/40',
    items: skills.languages || ['Python', 'TypeScript', 'JavaScript', 'SQL', 'C++', 'Java'],
  },
  {
    title: 'AI & Machine Learning',
    icon: Brain,
    color: 'text-brand-pink',
    borderColor: 'group-hover:border-brand-pink/40',
    items: skills.ai_ml || ['PyTorch', 'TensorFlow', 'NLP', 'LLMs', 'Scikit-Learn', 'HuggingFace'],
  },
  {
    title: 'Frontend Engineering',
    icon: Layout,
    color: 'text-[#00D4FF]',
    borderColor: 'group-hover:border-[#00D4FF]/40',
    items: skills.frontend || ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'Three.js', 'WebGL', 'Vite'],
  },
  {
    title: 'Backend & Cloud Services',
    icon: Server,
    color: 'text-purple-400',
    borderColor: 'group-hover:border-purple-400/40',
    items: skills.backend_cloud || ['Node.js', 'Express', 'Firebase', 'Supabase', 'Google Cloud #1', 'REST APIs', 'PostgreSQL', 'MongoDB'],
  },
  {
    title: 'Developer Tools & Infra',
    icon: Wrench,
    color: 'text-emerald-400',
    borderColor: 'group-hover:border-emerald-400/40',
    items: skills.tools || ['Google Cloud Platform', 'Antigravity', 'Cursor', 'Git & GitHub', 'Docker', 'Vercel & Netlify'],
  },
];

export const YashSkills: React.FC = () => {
  return (
    <section id="skills" className="relative px-6 py-20 md:px-12 bg-[#0a0a0a] text-[#f2f2ee] border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <FadeUp className="mb-14 text-center">
          <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#8f8f89]">
            // 05 · TECHNICAL CAPABILITIES
          </span>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black font-heading tracking-tight mt-2 uppercase">
            Languages, Tools & Stack
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-sm sm:text-base text-gray-400 font-sans">
            The core programming languages, artificial intelligence frameworks, frontend architectures, and cloud services I build with.
          </p>
        </FadeUp>

        {/* Categorized Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <FadeUp
                key={cat.title}
                delay={idx * 0.1}
                className={`group p-6 sm:p-8 rounded-2xl bg-[#141416] border border-white/10 ${cat.borderColor} transition-all duration-300 shadow-xl flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <div className={`p-2.5 rounded-xl bg-white/5 ${cat.color}`}>
                      <Icon size={20} />
                    </div>
                    <h3 className="text-base font-bold text-white font-heading uppercase tracking-wide">
                      {cat.title}
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {cat.items.map((item) => (
                      <span
                        key={item}
                        className="px-3 py-1.5 rounded-lg text-xs font-mono font-medium bg-[#1c1c22] text-gray-200 border border-white/5 group-hover:border-white/15 transition-all"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default YashSkills;
