import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin } from 'lucide-react';

const Experience: React.FC = () => {
  const experiences = [
    {
      role: 'Founder',
      company: 'Ninzae',
      type: 'Full-time',
      period: 'Oct 2024 – Present',
      location: 'New Delhi, Delhi, India · Hybrid',
      gradient: 'from-brand-violet via-brand-violet to-brand-pink',
      iconColor: 'text-brand-violet',
      bullets: [
        'Founded and bootstrapped a community-focused tech platform designed to aggregate resource streams.',
        'Manages operations, product strategy, content direction, and directs a cross-functional team of contributors.'
      ]
    },
    {
      role: 'Full Stack Dev with AI',
      company: 'The UmarIqbal Newsletter',
      type: 'Self-employed',
      period: 'Mar 2026 – Present',
      location: 'New Delhi, Delhi, India · Hybrid',
      gradient: 'from-brand-pink via-brand-pink to-brand-orange',
      iconColor: 'text-brand-pink',
      bullets: [
        'Publishing a developer-focused newsletter covering full-stack engineering, AI integrations, and modern tooling.',
        'Growing a community of builders and engineers interested in cutting-edge AI-powered development workflows.'
      ]
    },
    {
      role: 'Founder',
      company: 'Umar Iqbal Store',
      type: 'Self-employed',
      period: 'Jul 2025 – Present',
      location: 'New Delhi, Delhi, India · Hybrid',
      gradient: 'from-brand-orange to-brand-orange/80',
      iconColor: 'text-brand-orange',
      bullets: [
        'Built, launched, and successfully shipped 50+ bespoke client projects across various industries.',
        'Delivers end-to-end full-stack web architectures and automated integration solutions for clients.'
      ]
    },
    {
      role: 'Vice President',
      company: 'ACM, Association for Computing Machinery',
      type: 'Part-time',
      period: 'Oct 2025 – Present',
      location: 'Greater Noida · Hybrid',
      gradient: 'from-brand-violet to-brand-violet/80',
      iconColor: 'text-brand-violet',
      bullets: [
        'Leading the ACM Student Chapter, organizing technical workshops, hackathons, and coding competitions.',
        'Mentoring student developers and fostering a culture of innovation and collaborative learning on campus.'
      ]
    },
    {
      role: 'Aspire Leader Program Alumni & Fellow',
      company: 'Aspire Institute',
      type: 'Part-time',
      period: 'Mar 2025 – Present',
      location: 'Cambridge, Massachusetts, United States · Remote',
      gradient: 'from-rose-500 via-rose-500 to-brand-pink',
      iconColor: 'text-rose-400',
      bullets: [
        'Selected as an Aspire Leader Program Fellow (Mar–May 2025) and transitioned to Alumni status (May 2025–Present).',
        'Aspire Institute Inc. — Transforming lives of first-generation college students around the world.'
      ]
    },
    {
      role: 'CS50 Learner — CS50X, CS50P, CS50AI',
      company: 'Harvard University',
      type: 'Part-time',
      period: 'Oct 2024 – Nov 2025',
      location: 'Cambridge, Massachusetts, United States · Remote',
      gradient: 'from-red-600 via-red-500 to-brand-pink',
      iconColor: 'text-red-400',
      bullets: [
        'CS50\'s Introduction to Computer Science (Oct 2024 – Jan 2025) — C, Python, SQL, Web Dev fundamentals.',
        'CS50\'s Introduction to Programming with Python (Jan 2025 – Mar 2025) — Advanced Python programming.',
        'CS50\'s Introduction to Artificial Intelligence with Python (Mar 2025 – Nov 2025) — Search, knowledge, ML, NLP.'
      ]
    },
    {
      role: 'Frontend AI Chat Model Refiner',
      company: 'Outlier',
      type: 'Internship',
      period: 'Jun 2025 – Jul 2025',
      location: 'New Delhi, Delhi, India · Hybrid',
      gradient: 'from-cyan-500 via-cyan-400 to-blue-500',
      iconColor: 'text-cyan-400',
      bullets: [
        'Refined and evaluated AI chat model outputs to improve frontend interaction quality and conversational accuracy.',
        'Provided detailed annotations and feedback to improve model training data for production-grade AI assistants.'
      ]
    },
    {
      role: 'Introduction to Internet of Things — Learner',
      company: 'Stanford Online',
      type: 'Part-time',
      period: 'Jan 2025 – Mar 2025',
      location: 'California, United States · Remote',
      gradient: 'from-red-700 via-red-600 to-red-500',
      iconColor: 'text-red-500',
      bullets: [
        'Completed Stanford\'s IoT curriculum covering embedded systems, sensor networks, and cloud-connected devices.',
        'Gained foundational knowledge in edge computing, data pipelines, and smart device architectures.'
      ]
    },
    {
      role: 'Campus Ambassador @ Kaizen\'25',
      company: 'NSS IIT Delhi',
      type: 'Part-time',
      period: 'Jan 2025 – Feb 2025',
      location: 'New Delhi, Delhi, India · Hybrid',
      gradient: 'from-blue-600 via-blue-500 to-cyan-500',
      iconColor: 'text-blue-400',
      bullets: [
        'Represented IIT Delhi\'s Kaizen\'25 as an official Campus Ambassador, driving student engagement and registrations.',
        'Coordinated outreach campaigns across college networks to amplify event visibility and participation.'
      ]
    },
    {
      role: 'Open Source Contributor',
      company: 'GirlScript Summer of Code',
      type: 'Internship',
      period: 'Nov 2024 – Feb 2025',
      location: 'New Delhi, Delhi, India · Remote',
      gradient: 'from-orange-500 via-orange-400 to-yellow-500',
      iconColor: 'text-orange-400',
      bullets: [
        'Contributed to open source repositories during GSSoC, fixing bugs, adding features, and improving documentation.',
        'Collaborated with maintainers and fellow contributors through pull requests and code reviews.'
      ]
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="py-12 max-w-4xl mx-auto px-4"
    >
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold font-heading mb-3">
          Professional <span className="text-gradient font-extrabold">Experience</span>
        </h2>
        <p className="text-gray-400 max-w-xl mx-auto text-sm md:text-base">
          My journey as a full-stack engineer, startup founder, and AI integration specialist.
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-6">
        {experiences.map((exp, idx) => (
          <motion.div
            key={idx}
            whileHover={{ y: -4 }}
            className="relative glass-card p-6 pl-8 border border-[#262627] shadow-lg bg-[#161617] rounded-[18px] overflow-hidden"
          >
            {/* Thick vertical gradient border on the left */}
            <div className={`absolute left-0 top-0 bottom-0 w-[5px] bg-gradient-to-b ${exp.gradient}`} />

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <div className="flex items-start gap-4">
                {/* Work Icon */}
                <div className={`p-2.5 rounded-xl border border-[#262627] bg-[#09090B] flex items-center justify-center shrink-0 ${exp.iconColor}`}>
                  <Briefcase size={18} />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold font-heading text-white leading-tight">
                    {exp.role}
                  </h3>
                  <div className="flex flex-wrap items-center gap-1.5 text-sm text-gray-400 mt-1 font-medium">
                    <span className="font-bold text-gray-200">{exp.company}</span>
                    <span>·</span>
                    <span className="text-xs font-semibold text-gray-400">{exp.type}</span>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <MapPin size={13} className="text-brand-pink" />
                      <span>{exp.location}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-xs font-semibold text-gray-300 bg-[#0D0D0E] px-3 py-1.5 rounded-full border border-[#262627] w-fit shrink-0 md:self-start">
                <Calendar size={14} className="text-brand-violet" />
                <span>{exp.period}</span>
              </div>
            </div>

            <ul className="space-y-3">
              {exp.bullets.map((bullet, bIdx) => (
                <li key={bIdx} className="flex items-start gap-3 text-sm md:text-base text-gray-300 leading-relaxed">
                  <span className="w-2 h-2 rounded-full bg-brand-pink mt-2 flex-shrink-0" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Experience;