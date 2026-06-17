import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Globe, ArrowUp } from 'lucide-react';
import { SiLeetcode } from 'react-icons/si';

interface FooterProps {
  onTabChange?: (id: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onTabChange }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { id: 'education', label: 'Education' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'leadership', label: 'Leadership' },
    { id: 'projects', label: 'Projects' },
    { id: 'certifications', label: 'Certifications' },
    { id: 'achievements', label: 'Achievements' },
    { id: 'linkedin', label: 'LinkedIn' },
  ];

  return (
    <footer className="relative bg-[#09090B] text-white border-t border-[#262627] mt-auto overflow-hidden">
      {/* Subtle bottom-right purple ambient glow */}
      <div className="absolute bottom-[-100px] right-[-100px] w-[350px] h-[350px] rounded-full bg-brand-violet/5 blur-[100px] pointer-events-none -z-10" />
      {/* Subtle bottom-left orange ambient glow */}
      <div className="absolute bottom-[-100px] left-[-100px] w-[250px] h-[250px] rounded-full bg-brand-orange/3 blur-[90px] pointer-events-none -z-10" />

      {/* Elegant gradient accent line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-brand-violet/80 via-brand-pink/80 to-brand-orange/80" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 pb-12 border-b border-[#262627]">
          
          {/* Column 1: Bio & Details (Span 5) */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-extrabold font-heading mb-3 tracking-tight">
                Umar <span className="text-gradient font-black">Iqbal</span>
              </h3>
              <p className="text-gray-300 text-sm font-heading font-semibold mb-4">
                Data Scientist & AI Researcher | Full-Stack Developer | Founder
              </p>
              <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                Designing and building high-performance AI solutions, robust full-stack applications, and engaging digital products.
              </p>
            </div>
            <p className="text-gray-500 text-xs font-heading mt-6 md:mt-0">
              © {new Date().getFullYear()} Umar Iqbal. All rights reserved.
            </p>
          </div>

          {/* Column 2: Navigation Links (Span 3) */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-bold font-heading text-gray-400 uppercase tracking-widest mb-6">
              Navigation
            </h4>
            <div className="grid grid-cols-2 gap-y-3 gap-x-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    onTabChange?.(link.id);
                    // Smoothly scroll to the navigation bar after switching tabs
                    const tabElement = document.getElementById('tab-navigation-bar');
                    if (tabElement) {
                      tabElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                  className="text-gray-400 hover:text-white text-sm font-medium transition-colors text-left outline-none"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Column 3: Contact & Social Connect (Span 4) */}
          <div className="md:col-span-4 flex flex-col justify-between">
            <div>
              <h4 className="text-xs font-bold font-heading text-gray-400 uppercase tracking-widest mb-6">
                Get In Touch
              </h4>
              <div className="flex flex-col gap-2.5 mb-6">
                <a 
                  href="mailto:umariq.cse@gmail.com" 
                  className="text-gray-300 hover:text-white text-sm md:text-base font-semibold font-heading transition-colors hover:underline block"
                >
                  umariq.cse@gmail.com
                </a>
                <a 
                  href="mailto:umariqbal.business@gmail.com" 
                  className="text-gray-300 hover:text-white text-sm md:text-base font-semibold font-heading transition-colors hover:underline block"
                >
                  umariqbal.business@gmail.com
                </a>
                <a 
                  href="mailto:info@ninzae.in" 
                  className="text-gray-300 hover:text-white text-sm md:text-base font-semibold font-heading transition-colors hover:underline block"
                >
                  info@ninzae.in
                </a>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <span className="text-xs font-bold font-heading text-gray-500 uppercase tracking-widest">Connect with me</span>
              <div className="flex items-center gap-3">
                <a
                  href="https://www.linkedin.com/in/umariqbal000/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl border border-[#262627] text-gray-400 hover:text-white hover:border-brand-violet bg-[#161617]/50 hover:bg-[#161617] transition-all hover:scale-105 shadow-sm"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={18} />
                </a>
                <a
                  href="https://github.com/UmarIqbal000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl border border-[#262627] text-gray-400 hover:text-white hover:border-brand-violet bg-[#161617]/50 hover:bg-[#161617] transition-all hover:scale-105 shadow-sm"
                  aria-label="GitHub"
                >
                  <Github size={18} />
                </a>
                <a
                  href="https://leetcode.com/u/UmarIqbal000/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl border border-[#262627] text-gray-400 hover:text-white hover:border-brand-violet bg-[#161617]/50 hover:bg-[#161617] transition-all hover:scale-105 shadow-sm flex items-center justify-center"
                  aria-label="LeetCode"
                >
                  <SiLeetcode size={18} />
                </a>
                <a
                  href="mailto:umariq.cse@gmail.com"
                  className="p-2.5 rounded-xl border border-[#262627] text-gray-400 hover:text-white hover:border-brand-violet bg-[#161617]/50 hover:bg-[#161617] transition-all hover:scale-105 shadow-sm"
                  aria-label="Email"
                >
                  <Mail size={18} />
                </a>
                <a
                  href="https://umariqbal.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl border border-[#262627] text-gray-400 hover:text-white hover:border-brand-violet bg-[#161617]/50 hover:bg-[#161617] transition-all hover:scale-105 shadow-sm"
                  aria-label="Website"
                >
                  <Globe size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Built with tech stack & Back to top button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8">
          <p className="text-gray-500 text-xs font-heading text-center sm:text-left">
            Designed & Engineered by <span className="text-white">Umar Iqbal</span>
          </p>

          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#262627] bg-[#161617]/50 hover:bg-vivid-gradient text-gray-300 hover:text-white text-xs font-bold font-heading transition-all duration-300 shadow-lg hover:shadow-[0_0_15px_rgba(124,58,237,0.3)] hover:border-transparent outline-none"
          >
            <span>Back to top</span>
            <ArrowUp size={14} />
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;