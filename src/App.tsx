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
import Header from './components/Header';
import Education from './components/Education';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Leadership from './components/Leadership';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import Achievements from './components/Achievements';
import LinkedIn from './components/LinkedIn';
import Footer from './components/Footer';

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
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

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

  const handleTabChange = (id: TabId) => {
    setActiveTab(id);
    // Smoothly scroll to the tab bar container when tab switches, so user doesn't get disoriented if they've scrolled down inside a tab
    const tabElement = document.getElementById('tab-navigation-bar');
    if (tabElement) {
      tabElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <div 
      onMouseMove={handleMouseMove}
      className="min-h-screen bg-[#09090B] text-white flex flex-col font-sans selection:bg-brand-violet/10 selection:text-brand-violet relative overflow-x-hidden"
    >
      {/* Interactive spotlight cursor tracer */}
      <div 
        className="pointer-events-none fixed -z-10 w-[550px] h-[550px] rounded-full opacity-[0.08] blur-[100px] transition-all duration-300 ease-out bg-gradient-to-br from-brand-violet via-brand-pink to-brand-orange hidden md:block"
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Premium Tech Grid Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern bg-[size:50px_50px] opacity-[0.02] pointer-events-none -z-20" />
      {/* Soft overlay gradient to fade out grid pattern near the bottom */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#09090B]/50 to-[#09090B] pointer-events-none -z-20" />

      {/* Persistent Hero Header */}
      <Header onViewProjects={() => handleTabChange('projects')} />
      
      {/* Floating Capsule-shaped Tab Bar */}
      <div 
        id="tab-navigation-bar" 
        className="sticky top-4 z-40 w-full flex justify-center px-4 scroll-mt-6"
      >
        <div className="bg-[#161617]/80 backdrop-blur-xl border border-[#262627] shadow-[0_12px_40px_rgba(0,0,0,0.5),_0_0_20px_rgba(124,58,237,0.03)] rounded-full p-1.5 max-w-full md:max-w-4xl overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory">
          <div 
            className="flex items-center gap-1"
            onMouseLeave={() => setHoveredTab(null)}
          >
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  onMouseEnter={() => setHoveredTab(tab.id)}
                  className={`relative px-4 py-2 md:px-5 md:py-2.5 rounded-full flex items-center gap-2 whitespace-nowrap text-xs md:text-sm font-semibold transition-all duration-300 snap-center outline-none select-none group ${
                    isActive 
                      ? 'text-white font-bold' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Icon 
                    size={15} 
                    className={`transition-transform duration-300 ${
                      isActive 
                        ? 'text-white scale-110' 
                        : 'text-gray-500 group-hover:text-white group-hover:scale-110'
                    }`} 
                  />
                  <span>{tab.label}</span>
                  
                  {/* Hover background bubble indicator */}
                  {hoveredTab === tab.id && !isActive && (
                    <motion.div
                      layoutId="hoverTabIndicator"
                      className="absolute inset-0 bg-[#262627]/60 rounded-full -z-10"
                      transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    />
                  )}
                  
                  {/* Active background pill indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute inset-0 bg-vivid-gradient rounded-full -z-10 shadow-[0_4px_12px_rgba(124,58,237,0.35)]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
      
      {/* Content panel beneath tabs */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-10 flex-grow min-h-[500px] w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            {renderTabContent()}
          </motion.div>
        </AnimatePresence>
      </main>
      
      {/* Persistent Footer */}
      <Footer onTabChange={(id: string) => handleTabChange(id as TabId)} />
    </div>
  );
}

export default App;