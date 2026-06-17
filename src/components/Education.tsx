import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar, MapPin, BookOpen } from 'lucide-react';

const Education: React.FC = () => {
  const educationData = [
    {
      degree: 'Bachelor of Technology - BTech, Computer Science and Engineering (Specialization in Data Science and Big Data Analytics)',
      institution: 'IILM University',
      location: 'Greater Noida',
      period: 'Aug 2024 – Jul 2028',
      grade: 'A',
      activities: 'Vice President at ACM Students Chapter',
      icon: <GraduationCap size={18} />,
      gradient: 'from-brand-violet via-brand-violet to-brand-pink',
      iconColor: 'text-brand-violet',
      skills: ['Engineering', 'C (Programming Language)', 'AI foundations', 'Machine Learning']
    },
    {
      degree: "CS50's Certifications, Computer Science",
      institution: 'Harvard Online',
      location: 'Remote',
      period: 'Oct 2024 – Nov 2025',
      grade: 'CS50X, CS50P, CS50AI',
      activities: 'CS50 Global Community Member',
      icon: <BookOpen size={18} />,
      gradient: 'from-brand-pink via-brand-pink to-brand-orange',
      iconColor: 'text-brand-pink',
      skills: ['HTML', 'CSS', 'C', 'Python', 'Web Development', 'AI Foundations', 'Problem Solving']
    },
    {
      degree: 'Class 12th (Science Stream — P.C.M + Computer Science & Physical Education)',
      institution: 'Modern Era Public School',
      location: 'Bijnor',
      period: 'Apr 2023 – Jul 2024',
      grade: 'C.B.S.E. Board - 73%',
      icon: <BookOpen size={18} />,
      gradient: 'from-brand-orange to-brand-orange/80',
      iconColor: 'text-brand-orange',
      skills: ['Python (Programming Language)', 'Database Management System (DBMS)', 'Information Technology']
    },
    {
      degree: 'Class 10th (General Science & Technology)',
      institution: 'Modern Era Public School',
      location: 'Bijnor',
      period: 'Apr 2021 – Jul 2022',
      grade: 'C.B.S.E. Board - 88.5%',
      icon: <BookOpen size={18} />,
      gradient: 'from-brand-violet to-brand-violet/80',
      iconColor: 'text-brand-violet',
      skills: ['Information Technology']
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
          Academic <span className="text-gradient font-extrabold">Education</span>
        </h2>
        <p className="text-gray-400 max-w-xl mx-auto text-sm md:text-base">
          My academic foundation in Computer Science, Data Sciences, and core science disciplines.
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-6">
        {educationData.map((edu, idx) => (
          <motion.div
            key={idx}
            whileHover={{ y: -4 }}
            className="relative glass-card p-6 pl-8 border border-[#262627] shadow-lg bg-[#161617] rounded-[18px] overflow-hidden"
          >
            {/* Thick vertical gradient border on the left */}
            <div className={`absolute left-0 top-0 bottom-0 w-[5px] bg-gradient-to-b ${edu.gradient}`} />

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <div className="flex items-start gap-4">
                {/* Institution Icon */}
                <div className={`p-2.5 rounded-xl border border-[#262627] bg-[#09090B] flex items-center justify-center shrink-0 ${edu.iconColor}`}>
                  {edu.icon}
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold font-heading text-white leading-tight">
                    {edu.degree}
                  </h3>
                  <div className="flex flex-wrap items-center gap-1.5 text-sm text-gray-400 mt-1 font-medium">
                    <span className="font-bold text-gray-200">{edu.institution}</span>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <MapPin size={13} className="text-brand-violet" />
                      <span>{edu.location}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-xs font-semibold text-gray-300 bg-[#0D0D0E] px-3 py-1.5 rounded-full border border-[#262627] w-fit shrink-0 md:self-start">
                <Calendar size={14} className="text-brand-pink" />
                <span>{edu.period}</span>
              </div>
            </div>

            {/* Extra Metadata Row: Grade & Activities */}
            {(edu.grade || edu.activities) && (
              <div className="flex flex-col gap-1.5 text-xs text-gray-400 pt-1 mb-4">
                {edu.grade && (
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-300 font-heading">Grade:</span>
                    <span>{edu.grade}</span>
                  </div>
                )}
                {edu.activities && (
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-300 font-heading">Activities and Societies:</span>
                    <span>{edu.activities}</span>
                  </div>
                )}
              </div>
            )}

            {/* Skills Tags */}
            {edu.skills && edu.skills.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-3 border-t border-[#262627]/30">
                {edu.skills.map((skill, sIdx) => (
                  <span 
                    key={sIdx} 
                    className="text-[10px] md:text-xs font-semibold text-gray-300 bg-[#262627]/50 border border-[#262627] px-2.5 py-1 rounded-md"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Education;