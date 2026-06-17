import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Rocket } from 'lucide-react';

interface Project {
  name: string;
  description: string;
  url: string;
  tags: string[];
  bannerGradient: string;
}

const Projects: React.FC = () => {
  const projectsList: Project[] = [
    {
      name: 'Umar Iqbal Store',
      description: 'A global e-commerce storefront offering digital and physical products, integrated with a Firebase and Supabase database backend.',
      url: 'https://store.umariqbal.in',
      tags: ['E-commerce', 'React', 'Firebase', 'Supabase', 'Stripe'],
      bannerGradient: 'from-brand-violet to-brand-pink'
    },
    {
      name: 'DocuMorph',
      description: 'An intelligent document conversion platform launched solo, serving over 5,000+ active users globally.',
      url: 'https://documorph.netlify.app',
      tags: ['SaaS', 'TypeScript', 'React', 'TailwindCSS', 'Netlify'],
      bannerGradient: 'from-brand-pink to-brand-orange'
    },
    {
      name: 'SolBoost',
      description: 'A solar-energy optimization platform engineered to boost panel efficiencies, built as a collaborative effort by a 5-person hackathon team.',
      url: 'https://solboost000.netlify.app',
      tags: ['Hackathon', 'React', 'Python', 'Data Analytics', 'Netlify'],
      bannerGradient: 'from-brand-orange to-brand-violet'
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
          Featured <span className="text-gradient font-extrabold">Projects</span>
        </h2>
        <p className="text-gray-400 max-w-xl mx-auto text-sm md:text-base">
          A showcase of products, platforms, and SaaS applications I have shipped.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projectsList.map((project, idx) => (
          <motion.div
            key={idx}
            whileHover={{ y: -6 }}
            className="glass-card overflow-hidden bg-[#161617] border border-[#262627] shadow-md flex flex-col justify-between h-full group"
          >
            <div>
              {/* Colorful Gradient Header Banner */}
              <div className={`h-24 w-full bg-gradient-to-r ${project.bannerGradient} relative flex items-center justify-center`}>
                <div className="absolute inset-0 bg-black/10 mix-blend-overlay" />
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/20 group-hover:scale-110 transition-transform duration-300">
                  <Rocket size={20} />
                </div>
              </div>

              {/* Project Details */}
              <div className="p-6">
                <h3 className="text-xl font-bold font-heading text-white mb-3 group-hover:text-brand-violet transition-colors">
                  {project.name}
                </h3>
                <p className="text-gray-350 text-sm md:text-base leading-relaxed mb-6">
                  {project.description}
                </p>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[10px] bg-[#0D0D0E] text-gray-400 font-semibold font-heading uppercase tracking-wide border border-[#262627] px-2 py-0.5 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Visit Site Action */}
            <div className="p-6 pt-0">
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-vivid-gradient text-white flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold hover:shadow-md hover:brightness-105 transition-all duration-300 font-heading"
              >
                <span>Visit Site</span>
                <ExternalLink size={16} />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Projects;