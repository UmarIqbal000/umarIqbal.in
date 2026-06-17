import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Globe, ArrowRight } from 'lucide-react';
import { SiLeetcode } from 'react-icons/si';

interface HeaderProps {
  onViewProjects: () => void;
}

const Header: React.FC<HeaderProps> = ({ onViewProjects }) => {
  return (
    <header className="relative min-h-[85vh] flex flex-col justify-center overflow-hidden py-16 md:py-24">
      {/* Premium Dark-Theme Glowing Nebula Background */}
      <div className="absolute inset-0 overflow-hidden -z-10 bg-[#09090B]">
        <div 
          className="absolute top-[-25%] left-[-25%] w-[80%] h-[80%] rounded-full bg-brand-violet/12 blur-[140px] animate-pulse" 
          style={{ animationDuration: '8s' }} 
        />
        <div 
          className="absolute bottom-[-25%] right-[-25%] w-[80%] h-[80%] rounded-full bg-brand-orange/10 blur-[140px] animate-pulse" 
          style={{ animationDuration: '12s' }} 
        />
        <div 
          className="absolute top-[20%] left-[30%] w-[60%] h-[60%] rounded-full bg-brand-pink/12 blur-[120px] animate-pulse" 
          style={{ animationDuration: '10s' }} 
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full relative z-10">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            {/* Pulsing Status Chip */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#161617] border border-[#262627] shadow-md rounded-full mb-8 select-none">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-pink relative flex">
                <span className="absolute inline-flex h-full w-full rounded-full bg-brand-pink opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-pink" />
              </span>
              <span className="text-xs font-semibold text-gray-300 font-heading tracking-wide">
                Currently building Ninzae & training an AI model
              </span>
            </div>

            {/* Name Heading */}
            <h1 className="text-5xl md:text-7xl font-extrabold font-heading text-white mb-4 tracking-tight leading-none">
              Umar <span className="text-gradient font-black">Iqbal</span>
            </h1>

            {/* Sub-headline */}
            <h2 className="text-xl md:text-2xl font-bold font-heading text-gray-200 mb-8 tracking-wide">
              Data Scientist & AI Researcher <span className="text-brand-pink/50">|</span> Full-Stack Developer <span className="text-brand-pink/50">|</span> Founder
            </h2>

            {/* Intro paragraph */}
            <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-3xl mx-auto mb-10 font-medium">
              2nd-year B.Tech CSE (Data Science and Big Data Analytics) student at{' '}
              <span className="text-brand-violet font-semibold">IILM University, Greater Noida</span>; builds AI products with{' '}
              <span className="font-semibold text-white">Claude Code</span>,{' '}
              <span className="font-semibold text-white">Cursor</span> and{' '}
              <span className="font-semibold text-white">Antigravity</span>; published NLP researcher; Vice President of the ACM Student Chapter; founder of{' '}
              <span className="font-semibold text-white">Ninzae</span> and{' '}
              <span className="font-semibold text-white">Umar Iqbal Store</span>.
            </p>

            {/* Actions & Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10 justify-center w-full sm:w-auto">
              <button
                onClick={onViewProjects}
                className="bg-vivid-gradient text-white px-8 py-3.5 rounded-xl font-bold hover:shadow-lg hover:shadow-brand-violet/25 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 font-heading text-sm md:text-base flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                <span>View Projects</span>
                <ArrowRight size={18} />
              </button>
              
              <a
                href="#"
                className="border border-[#262627] text-white hover:border-brand-violet px-8 py-3.5 rounded-xl font-bold hover:text-brand-violet hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 font-heading text-sm md:text-base flex items-center justify-center bg-[#161617] shadow-sm w-full sm:w-auto"
              >
                Download Resume
              </a>
            </div>

            {/* Row of Icon Links */}
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
              <span className="text-xs font-bold font-heading text-gray-500 uppercase tracking-widest">Connect</span>
              <div className="h-px w-8 bg-[#262627] hidden sm:block" />
              <div className="flex items-center gap-3 flex-wrap justify-center">
                <a 
                  href="https://www.linkedin.com/in/umariqbal000/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-2.5 rounded-xl border border-[#262627] text-gray-400 hover:text-white hover:border-brand-violet bg-[#161617] transition-all hover:-translate-y-1 hover:shadow-sm" 
                  aria-label="LinkedIn"
                >
                  <Linkedin size={18} />
                </a>
                <a 
                  href="https://github.com/UmarIqbal000" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-2.5 rounded-xl border border-[#262627] text-gray-400 hover:text-white hover:border-brand-violet bg-[#161617] transition-all hover:-translate-y-1 hover:shadow-sm" 
                  aria-label="GitHub"
                >
                  <Github size={18} />
                </a>
                <a 
                  href="https://leetcode.com/u/UmarIqbal000/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-2.5 rounded-xl border border-[#262627] text-gray-400 hover:text-white hover:border-brand-violet bg-[#161617] transition-all hover:-translate-y-1 hover:shadow-sm flex items-center justify-center" 
                  aria-label="LeetCode"
                >
                  <SiLeetcode size={18} />
                </a>
                <a 
                  href="mailto:umariq.cse@gmail.com" 
                  className="p-2.5 rounded-xl border border-[#262627] text-gray-400 hover:text-white hover:border-brand-violet bg-[#161617] transition-all hover:-translate-y-1 hover:shadow-sm" 
                  aria-label="Email"
                >
                  <Mail size={18} />
                </a>
                <a 
                  href="https://umariqbal.in" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-2.5 rounded-xl border border-[#262627] text-gray-400 hover:text-white hover:border-brand-violet bg-[#161617] transition-all hover:-translate-y-1 hover:shadow-sm" 
                  aria-label="Website"
                >
                  <Globe size={18} />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </header>
  );
};

export default Header;