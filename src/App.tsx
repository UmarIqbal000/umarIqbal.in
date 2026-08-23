import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  GraduationCap, 
  Zap, 
  Briefcase, 
  Megaphone, 
  Rocket, 
  Medal, 
  Trophy, 
  Linkedin 
} from 'lucide-react';
import YashNav from './components/pro/YashNav';
import YashHero from './components/pro/YashHero';
import YashAbout from './components/pro/YashAbout';
import YashProjects from './components/pro/YashProjects';
import YashJourney from './components/pro/YashJourney';
import YashContact from './components/pro/YashContact';

import Education from './components/Education';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Leadership from './components/Leadership';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import Achievements from './components/Achievements';
import LinkedIn from './components/LinkedIn';

type TabId = 
  | 'education' 
  | 'skills' 
  | 'experience' 
  | 'leadership' 
  | 'projects' 
  | 'certifications' 
  | 'achievements' 
  | 'linkedin';

interface Tab {
  id: TabId;
  label: string;
  icon: React.ComponentType<{ size: number; className?: string }>;
}

function App() {
  const [activeTab, setActiveTab] = useState<TabId>('education');
  const [hoveredTab, setHoveredTab] = useState<TabId | null>(null);

  const tabs: Tab[] = [
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'skills', label: 'Skills', icon: Zap },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'leadership', label: 'Leadership', icon: Megaphone },
    { id: 'projects', label: 'Projects', icon: Rocket },
    { id: 'certifications', label: 'Certifications', icon: Medal },
    { id: 'achievements', label: 'Achievements', icon: Trophy },
    { id: 'linkedin', label: 'LinkedIn', icon: Linkedin },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'education':
        return <Education />;
      case 'skills':
        return <Skills />;
      case 'experience':
        return <Experience />;
      case 'leadership':
        return <Leadership />;
      case 'projects':
        return <Projects />;
      case 'certifications':
        return <Certifications />;
      case 'achievements':
        return <Achievements />;
      case 'linkedin':
        return <LinkedIn />;
      default:
        return <Education />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f2f2ee] flex flex-col font-sans selection:bg-[#00D4FF]/20 selection:text-[#00D4FF] relative overflow-x-hidden">
      
      {/* Yash-Style Edge-to-Edge Minimalist Header */}
      <YashNav />

      {/* Main Narrative Flow Inspired by Yash Chauhan */}
      <main className="flex-1 w-full flex flex-col">
        {/* 01 // HERO SECTION */}
        <YashHero />

        {/* 02 // ABOUT & WORK PROCESS */}
        <YashAbout />

        {/* 03 // FEATURED VENTURES & CASE STUDIES */}
        <YashProjects />

        {/* 04 // TIMELINE & MILESTONES */}
        <YashJourney />

        {/* DETAILED ARCHIVE SECTION (Optional Deep Dive) */}
        <section id="archive" className="relative px-6 py-20 md:px-16 bg-[#0e0e11] border-t border-b border-white/10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#8f8f89]">
                // COMPLETE ARCHIVES & CREDENTIALS
              </span>
              <h2 className="text-3xl sm:text-4xl font-black font-heading text-white mt-1">
                Explore Detailed Records
              </h2>
            </div>

            {/* Navigation Tabs Bar */}
            <div id="tab-navigation-bar" className="relative z-30 mb-8 scroll-mt-24">
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-2 px-1 max-w-full justify-start md:justify-center">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  const isHovered = hoveredTab === tab.id;

                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      onMouseEnter={() => setHoveredTab(tab.id)}
                      onMouseLeave={() => setHoveredTab(null)}
                      className={`relative flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs font-bold transition-all whitespace-nowrap ${
                        isActive
                          ? 'bg-[#00D4FF] text-black shadow-[0_0_20px_rgba(0,212,255,0.4)]'
                          : 'bg-[#141416] text-gray-400 hover:text-white border border-white/5'
                      }`}
                    >
                      <Icon size={14} className={isActive ? 'text-black' : 'text-[#00D4FF]'} />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tab Content Display */}
            <div className="min-h-[400px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25 }}
                >
                  {renderTabContent()}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* 05 // CONTACT & TRANSMISSION */}
        <YashContact />
      </main>

    </div>
  );
}

export default App;