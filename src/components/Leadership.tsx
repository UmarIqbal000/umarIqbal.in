import React from 'react';
import { motion } from 'framer-motion';
import { Users, Calendar, Shield } from 'lucide-react';

const Leadership: React.FC = () => {
  const leadershipData = [
    {
      id: 'acm',
      role: 'Vice President',
      organization: 'ACM Student Chapter, IILM University',
      period: 'Oct 2025 - Present',
      description: 'Leads and coordinates the student community to foster computing knowledge, organizing tech talks, hands-on workshops, and hackathons.',
      activities: [
        'Leads a vibrant community of over 300+ student members.',
        'Organizes and conducts technical workshops, coding competitions, and AI/ML bootcamps.',
        'Mentors students on computer science tracks, project development, and competitive programming.'
      ],
      icon: Users,
      gradient: 'from-brand-violet via-brand-violet to-brand-pink',
      iconColor: 'text-brand-violet',
      ribbonText: '300+ Led'
    },
    {
      id: 'sih',
      role: 'Student Coordinator',
      organization: 'Internal Smart India Hackathon, IILM University',
      period: 'Sep - Oct 2025',
      description: 'Served as the lead student coordinator for the internal screening of the prestigious Smart India Hackathon (SIH), organizing and executing end-to-end event logistics.',
      activities: [
        'Coordinated participation for a massive base of 1,500+ students.',
        'Managed event logistics, technical evaluation infrastructure, and student support.',
        'Liaised with faculty evaluation rounds and panel judges to maintain hackathon standards.'
      ],
      icon: Shield,
      gradient: 'from-brand-pink via-brand-pink to-brand-orange',
      iconColor: 'text-brand-pink'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="py-12 max-w-5xl mx-auto px-4"
    >
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold font-heading mb-3">
          Leadership & <span className="text-gradient font-extrabold">Influence</span>
        </h2>
        <p className="text-gray-400 max-w-xl mx-auto text-sm md:text-base">
          Driving community growth, organizing large-scale tech events, and mentoring the next generation of engineers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        {leadershipData.map((item) => {
          const IconComponent = item.icon;
          
          return (
            <motion.div
              key={item.id}
              whileHover={{ y: -5 }}
              className="relative glass-card p-6 pl-8 border border-[#262627] shadow-lg bg-[#161617] rounded-[18px] overflow-hidden flex flex-col justify-between"
            >
              {/* Thick vertical gradient border on the left */}
              <div className={`absolute left-0 top-0 bottom-0 w-[5px] bg-gradient-to-b ${item.gradient}`} />

              {/* Rotated Gradient Ribbon for ACM VP */}
              {item.ribbonText && (
                <div className="absolute top-6 -right-12 w-44 bg-vivid-gradient text-white text-center py-1.5 text-xs font-bold font-heading tracking-wide uppercase rotate-45 shadow-sm select-none">
                  {item.ribbonText}
                </div>
              )}

              <div>
                {/* Header elements */}
                <div className="flex items-start gap-4 mb-4">
                  {/* Icon Wrapper */}
                  <div className={`p-2.5 rounded-xl border border-[#262627] bg-[#09090B] flex items-center justify-center shrink-0 ${item.iconColor}`}>
                    <IconComponent size={20} />
                  </div>
                  <div className="pr-12">
                    <span className={`text-[10px] bg-white/5 border border-[#262627] px-2.5 py-1 rounded-full font-bold font-heading uppercase tracking-wider ${item.iconColor}`}>
                      {item.id === 'acm' ? 'ACM VP' : 'SIH Lead'}
                    </span>
                    <h3 className="text-lg md:text-xl font-bold font-heading text-white mt-2 leading-tight">
                      {item.role}
                    </h3>
                    <p className="text-gray-300 font-semibold text-xs md:text-sm mt-1">
                      {item.organization}
                    </p>
                  </div>
                </div>

                {/* Period Badge */}
                <div className="flex items-center gap-2 text-xs font-semibold text-gray-300 bg-[#0D0D0E] px-3 py-1.5 rounded-full border border-[#262627] w-fit mb-5">
                  <Calendar size={14} className={item.iconColor} />
                  <span>{item.period}</span>
                </div>

                {/* Role Description */}
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  {item.description}
                </p>

                {/* Activity Bullet points */}
                <ul className="space-y-3">
                  {item.activities.map((act, aIdx) => (
                    <li key={aIdx} className="flex items-start gap-3 text-xs md:text-sm text-gray-300 leading-relaxed">
                      <span className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 bg-gradient-to-r ${item.gradient}`} />
                      <span>{act}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default Leadership;
