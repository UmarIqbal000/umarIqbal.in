import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, X, ChevronLeft, ChevronRight } from 'lucide-react';

interface Certification {
  title: string;
  issuer: string;
  date: string;
  image: string;
  category: string;
  logo: string;
  logoBg: string;
  logoColor: string;
}

const Certifications: React.FC = () => {
  const [selectedCert, setSelectedCert] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const certifications: Certification[] = [
    {
      title: 'AWS Academy Graduate — Cloud Foundations',
      issuer: 'Amazon Web Services',
      date: 'Nov 2025',
      image: '/Screenshot 2025-11-25 174050.png',
      category: 'Cloud',
      logo: 'AWS',
      logoBg: '#232F3E',
      logoColor: '#FF9900'
    },
    {
      title: "CS50's Introduction to AI with Python",
      issuer: 'Harvard University',
      date: '2025',
      image: '/Screenshot 2025-11-25 174110.png',
      category: 'Harvard CS50',
      logo: 'H',
      logoBg: '#A51C30',
      logoColor: '#FFFFFF'
    },
    {
      title: 'Introduction to Cloud Computing',
      issuer: 'Infosys Springboard',
      date: 'Nov 2025',
      image: '/Screenshot 2025-11-25 174151.png',
      category: 'Infosys',
      logo: 'iS',
      logoBg: '#007CC3',
      logoColor: '#FFFFFF'
    },
    {
      title: '3D Printing Course',
      issuer: 'Infosys Springboard',
      date: 'Oct 2025',
      image: '/Screenshot 2025-11-25 174214.png',
      category: 'Infosys',
      logo: 'iS',
      logoBg: '#007CC3',
      logoColor: '#FFFFFF'
    },
    {
      title: 'GDG Solution Challenge — Participation',
      issuer: 'Google Developer Groups',
      date: '2025',
      image: '/Screenshot 2025-11-25 174236.png',
      category: 'Google',
      logo: 'G',
      logoBg: '#FFFFFF',
      logoColor: '#4285F4'
    },
    {
      title: 'Internet of Things',
      issuer: 'Infosys Springboard',
      date: 'Aug 2025',
      image: '/Screenshot 2025-11-25 174255.png',
      category: 'Infosys',
      logo: 'iS',
      logoBg: '#007CC3',
      logoColor: '#FFFFFF'
    },
    {
      title: 'Bring AI to Work Workshop',
      issuer: 'Google Workspace',
      date: 'Jun 2025',
      image: '/Screenshot 2025-11-25 174316.png',
      category: 'Google',
      logo: 'G',
      logoBg: '#FFFFFF',
      logoColor: '#4285F4'
    },
    {
      title: '2025 Aspire Leaders Program',
      issuer: 'Aspire Institute',
      date: 'May 2025',
      image: '/Screenshot 2025-11-25 174336.png',
      category: 'Leadership',
      logo: 'A',
      logoBg: '#8B1A2B',
      logoColor: '#FFFFFF'
    },
    {
      title: 'Aspire Leaders Program — Module 1',
      issuer: 'Aspire Institute',
      date: '2025',
      image: '/Screenshot 2025-11-25 174355.png',
      category: 'Leadership',
      logo: 'A',
      logoBg: '#8B1A2B',
      logoColor: '#FFFFFF'
    },
    {
      title: 'Python Programming AD141-RHA',
      issuer: 'Red Hat',
      date: 'May 2025',
      image: '/Screenshot 2025-11-25 174433.png',
      category: 'Development',
      logo: 'RH',
      logoBg: '#EE0000',
      logoColor: '#FFFFFF'
    },
    {
      title: 'Project Management with ChatGPT',
      issuer: 'Udemy',
      date: 'Apr 2025',
      image: '/Screenshot 2025-11-25 174451.png',
      category: 'AI & Tools',
      logo: 'U',
      logoBg: '#A435F0',
      logoColor: '#FFFFFF'
    },
    {
      title: "CS50's Intro to Programming with Python",
      issuer: 'Harvard University',
      date: '2025',
      image: '/Screenshot 2025-11-25 174510.png',
      category: 'Harvard CS50',
      logo: 'H',
      logoBg: '#A51C30',
      logoColor: '#FFFFFF'
    },
    {
      title: "Kaizen'25 Campus Ambassador — Top 50",
      issuer: 'NSS IIT Delhi',
      date: '2025',
      image: '/Screenshot 2025-11-25 174528.png',
      category: 'Leadership',
      logo: 'IIT',
      logoBg: '#1A237E',
      logoColor: '#FFFFFF'
    },
    {
      title: 'GRC Essentials: Governance, Risk & Compliance',
      issuer: 'Udemy',
      date: 'Jan 2025',
      image: '/Screenshot 2025-11-25 174600.png',
      category: 'AI & Tools',
      logo: 'U',
      logoBg: '#A435F0',
      logoColor: '#FFFFFF'
    },
    {
      title: "CS50x — Introduction to Computer Science",
      issuer: 'Harvard University',
      date: '2024',
      image: '/Screenshot 2025-11-25 174656.png',
      category: 'Harvard CS50',
      logo: 'H',
      logoBg: '#A51C30',
      logoColor: '#FFFFFF'
    },
    {
      title: 'Introduction to Python',
      issuer: 'DataFlair',
      date: 'Sep 2024',
      image: '/Screenshot 2025-11-25 174716.png',
      category: 'Development',
      logo: 'DF',
      logoBg: '#1E88E5',
      logoColor: '#FFFFFF'
    },
    {
      title: 'Ford EV Engineering Job Simulation',
      issuer: 'Forage',
      date: 'Aug 2024',
      image: '/Screenshot 2025-11-25 174746.png',
      category: 'AI & Tools',
      logo: 'F',
      logoBg: '#003478',
      logoColor: '#FFFFFF'
    },
    {
      title: 'Mastering Linux: Complete Guide',
      issuer: 'Udemy',
      date: 'Aug 2024',
      image: '/Screenshot 2025-11-25 174759.png',
      category: 'Development',
      logo: 'U',
      logoBg: '#A435F0',
      logoColor: '#FFFFFF'
    },
    {
      title: 'Data Visualisation: Business Insights',
      issuer: 'Forage (Tata)',
      date: 'Aug 2024',
      image: '/Screenshot 2025-11-25 174821.png',
      category: 'AI & Tools',
      logo: 'T',
      logoBg: '#003478',
      logoColor: '#FFFFFF'
    },
    {
      title: 'AI Coding Curriculum — Top 20%',
      issuer: 'WhiteHat Jr',
      date: '2024',
      image: '/Screenshot 2025-11-25 174846.png',
      category: 'AI & Tools',
      logo: 'WH',
      logoBg: '#00BFA5',
      logoColor: '#FFFFFF'
    }
  ];

  const categories = ['All', ...Array.from(new Set(certifications.map(c => c.category)))];
  const filtered = activeCategory === 'All' ? certifications : certifications.filter(c => c.category === activeCategory);

  const navigateCert = (direction: 'prev' | 'next') => {
    if (selectedCert === null) return;
    const currentIdx = certifications.findIndex((_, i) => i === selectedCert);
    if (direction === 'prev') {
      setSelectedCert(currentIdx > 0 ? currentIdx - 1 : certifications.length - 1);
    } else {
      setSelectedCert(currentIdx < certifications.length - 1 ? currentIdx + 1 : 0);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="py-12 max-w-6xl mx-auto px-4"
    >
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold font-heading mb-3">
          Certifications & <span className="text-gradient font-extrabold">Badges</span>
        </h2>
        <p className="text-gray-400 max-w-xl mx-auto text-sm md:text-base">
          Professional development, cloud credentials, and accredited academic achievements.
        </p>
        <p className="text-gray-500 text-xs mt-2 font-mono">
          {certifications.length} Certifications Earned
        </p>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {categories.map((cat) => {
          const count = cat === 'All' ? certifications.length : certifications.filter(c => c.category === cat).length;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold font-heading transition-all duration-300 border ${
                activeCategory === cat
                  ? 'bg-brand-violet/15 border-brand-violet/40 text-brand-violet shadow-[0_0_12px_rgba(124,58,237,0.1)]'
                  : 'bg-[#131316] border-[#2a2a2e] text-gray-400 hover:border-[#3a3a3e] hover:text-gray-200'
              }`}
            >
              {cat} <span className="ml-1 opacity-60">({count})</span>
            </button>
          );
        })}
      </div>

      {/* Certificate Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <AnimatePresence mode="popLayout">
          {filtered.map((cert, idx) => {
            const globalIdx = certifications.indexOf(cert);
            return (
              <motion.div
                key={cert.title}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25, delay: idx * 0.03 }}
                onClick={() => setSelectedCert(globalIdx)}
                className="group cursor-pointer rounded-2xl border border-[#2a2a2e] bg-[#131316] overflow-hidden hover:border-[#3a3a3e] hover:shadow-[0_0_25px_rgba(124,58,237,0.06)] transition-all duration-300"
              >
                {/* Certificate Image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-[#0e0e11]">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#131316] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-3">
                    <span className="text-[10px] font-bold font-heading text-white bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1.5">
                      <ExternalLink size={10} /> View Certificate
                    </span>
                  </div>
                </div>

                {/* Card Info */}
                <div className="p-4">
                  <div className="flex items-start gap-3">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 border border-white/10"
                      style={{ backgroundColor: cert.logoBg }}
                    >
                      <span className="text-[10px] font-black tracking-tight" style={{ color: cert.logoColor }}>
                        {cert.logo}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-xs md:text-sm font-bold font-heading text-white leading-tight line-clamp-2">
                        {cert.title}
                      </h3>
                      <p className="text-[11px] text-gray-400 mt-1 font-medium">
                        {cert.issuer}
                      </p>
                      <p className="text-[10px] text-gray-500 mt-0.5 font-mono">
                        {cert.date}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedCert !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative max-w-4xl w-full bg-[#131316] border border-[#2a2a2e] rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm border border-[#3a3a3e] flex items-center justify-center text-gray-400 hover:text-white transition-colors"
              >
                <X size={16} />
              </button>

              {/* Navigation arrows */}
              <button
                onClick={() => navigateCert('prev')}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm border border-[#3a3a3e] flex items-center justify-center text-gray-400 hover:text-white transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => navigateCert('next')}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm border border-[#3a3a3e] flex items-center justify-center text-gray-400 hover:text-white transition-colors"
              >
                <ChevronRight size={20} />
              </button>

              {/* Certificate image */}
              <img
                src={certifications[selectedCert].image}
                alt={certifications[selectedCert].title}
                className="w-full max-h-[70vh] object-contain bg-white"
              />

              {/* Info bar */}
              <div className="p-5 flex items-center gap-4 border-t border-[#2a2a2e]">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 border border-white/10"
                  style={{ backgroundColor: certifications[selectedCert].logoBg }}
                >
                  <span className="text-xs font-black tracking-tight" style={{ color: certifications[selectedCert].logoColor }}>
                    {certifications[selectedCert].logo}
                  </span>
                </div>
                <div>
                  <h3 className="text-sm md:text-base font-bold font-heading text-white">
                    {certifications[selectedCert].title}
                  </h3>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {certifications[selectedCert].issuer} • {certifications[selectedCert].date}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Certifications;