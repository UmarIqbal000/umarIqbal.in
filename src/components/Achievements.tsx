import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, Flame, Code2, Users, Sparkles, ExternalLink } from 'lucide-react';

interface Achievement {
  title: string;
  description: string;
  icon: React.ElementType;
  badgeText: string;
  accentColor: string;
  glowColor: string;
  url?: string;
}

const Achievements: React.FC = () => {
  const achievementsList: Achievement[] = [
    {
      title: 'Ranked #1 in Google Cloud Skill Boost',
      description: 'Secured the first position in the Silver League with a score of 15,320 points (cumulative 17,950 points), completing multiple technical quests and labs.',
      icon: Trophy,
      badgeText: 'Rank #1',
      accentColor: '#F59E0B',
      glowColor: 'rgba(245, 158, 11, 0.15)'
    },
    {
      title: 'Published NLP Research',
      description: 'Authored and published research on fake news detection in social media feeds. Documented under DOI: 10.13140/RG.2.2.25770.27844.',
      icon: Sparkles,
      badgeText: 'Research Published',
      accentColor: '#7C3AED',
      glowColor: 'rgba(124, 58, 237, 0.15)',
      url: 'https://doi.org/10.13140/RG.2.2.25770.27844'
    },
    {
      title: 'Built CNN Plant Disease Classifier',
      description: 'Designed and trained a deep learning Convolutional Neural Network (CNN) that classifies plant leaf diseases with an outstanding 96.7% prediction accuracy.',
      icon: Flame,
      badgeText: '96.7% Accuracy',
      accentColor: '#EC4899',
      glowColor: 'rgba(236, 72, 153, 0.15)'
    },
    {
      title: 'Campus Ambassador (MyGov & NSS)',
      description: 'Actively represented MyGov (Government of India) on campus and volunteered as the Campus Ambassador for NSS IIT Delhi during Kaizen \'25.',
      icon: Users,
      badgeText: 'Ambassador',
      accentColor: '#06B6D4',
      glowColor: 'rgba(6, 182, 212, 0.15)'
    },
    {
      title: 'GirlScript Summer of Code Shortlist',
      description: 'Selected and shortlisted as a contributor for the highly competitive GirlScript Summer of Code (GSSoC) 2024 cohort, contributing to open-source systems.',
      icon: Star,
      badgeText: 'Shortlisted',
      accentColor: '#F97316',
      glowColor: 'rgba(249, 115, 22, 0.15)'
    },
    {
      title: 'Active LeetCode Programmer',
      description: 'Consistently solves data structures and algorithms challenges on LeetCode to sharpen logical thinking and competitive programming skills.',
      icon: Code2,
      badgeText: 'Competitive Coding',
      accentColor: '#10B981',
      glowColor: 'rgba(16, 185, 129, 0.15)',
      url: 'https://leetcode.com/u/UmarIqbal000/'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="py-12 max-w-6xl mx-auto px-4"
    >
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold font-heading mb-3">
          Milestones & <span className="text-gradient font-extrabold">Achievements</span>
        </h2>
        <p className="text-gray-400 max-w-xl mx-auto text-sm md:text-base">
          Celebrating technical highlights, research, open-source selections, and competitive honors.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {achievementsList.map((item, idx) => {
          const IconComp = item.icon;

          return (
            <motion.div
              key={idx}
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="group relative rounded-2xl overflow-hidden"
            >
              {/* Card border glow on hover */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ boxShadow: `inset 0 0 0 1.5px ${item.accentColor}40, 0 0 30px ${item.glowColor}` }}
              />

              <div className="relative bg-[#131316] border border-[#222226] rounded-2xl p-6 h-full flex flex-col group-hover:border-transparent transition-colors duration-300">
                
                {/* Top accent line */}
                <div
                  className="absolute top-0 left-6 right-6 h-[2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `linear-gradient(90deg, transparent, ${item.accentColor}, transparent)` }}
                />

                {/* Header: Icon + Badge */}
                <div className="flex items-center justify-between mb-5">
                  <div
                    className="relative w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300"
                    style={{ backgroundColor: `${item.accentColor}12`, border: `1px solid ${item.accentColor}25` }}
                  >
                    <IconComp size={20} style={{ color: item.accentColor }} />
                    {/* Icon glow on hover */}
                    <div
                      className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md"
                      style={{ backgroundColor: item.glowColor }}
                    />
                  </div>

                  <span
                    className="text-[9px] font-black font-heading uppercase tracking-[0.15em] px-3 py-1 rounded-full border transition-all duration-300"
                    style={{
                      color: item.accentColor,
                      borderColor: `${item.accentColor}30`,
                      backgroundColor: `${item.accentColor}08`
                    }}
                  >
                    {item.badgeText}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-base md:text-lg font-bold font-heading text-white mb-3 leading-snug group-hover:text-white/95 transition-colors">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 text-[13px] leading-relaxed mb-5 flex-grow">
                  {item.description}
                </p>

                {/* Footer: Link or decorative line */}
                <div className="mt-auto">
                  {item.url ? (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-bold font-heading transition-all duration-300 group/link"
                      style={{ color: item.accentColor }}
                    >
                      <span className="group-hover/link:underline underline-offset-2">View Reference</span>
                      <ExternalLink size={12} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-200" />
                    </a>
                  ) : (
                    <div
                      className="h-[1px] w-12 rounded-full opacity-20 group-hover:w-20 group-hover:opacity-40 transition-all duration-500"
                      style={{ backgroundColor: item.accentColor }}
                    />
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default Achievements;