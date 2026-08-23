import React, { useState } from 'react';
import { FadeUp } from './YashScrollFx';
import { 
  Briefcase, 
  Calendar, 
  MapPin, 
  ExternalLink, 
  Linkedin, 
  Award, 
  BookOpen, 
  Trophy, 
  Sparkles, 
  CheckCircle2,
  ChevronRight
} from 'lucide-react';

interface JourneyItem {
  id: string;
  role: string;
  company: string;
  type: string;
  period: string;
  location: string;
  tag: string;
  accentColor: string;
  borderColor: string;
  badgeBg: string;
  icon: React.ComponentType<{ size: number; className?: string }>;
  bullets: string[];
  skills: string[];
}

const detailedJourney: JourneyItem[] = [
  {
    id: 'ninzae',
    role: 'Founder & Lead Architect',
    company: 'Ninzae',
    type: 'Active Startup Venture',
    period: 'Oct 2024 – Present',
    location: 'New Delhi, India · Hybrid',
    tag: 'Founder',
    accentColor: 'text-[#00D4FF]',
    borderColor: 'border-[#00D4FF]/30 hover:border-[#00D4FF]',
    badgeBg: 'bg-[#00D4FF]/10 text-[#00D4FF] border-[#00D4FF]/30',
    icon: Sparkles,
    bullets: [
      'Bootstrapped and launched an engineering platform dedicated to tech roadmaps, curated resources, and skill tracking for CSE students.',
      'Architected Next.js full-stack system integrated with autonomous AI tool agents and dynamic resume generation algorithms.',
      'Leads product roadmap, system scalability, UI/UX direction, and community growth across university campuses.'
    ],
    skills: ['Next.js', 'AI Agents', 'System Architecture', 'TypeScript', 'Tailwind CSS', 'PostgreSQL']
  },
  {
    id: 'newsletter',
    role: 'Author & Full-Stack AI Engineer',
    company: 'The UmarIqbal Newsletter',
    type: 'Media & Tech Publication',
    period: 'Mar 2026 – Present',
    location: 'New Delhi, India · Hybrid',
    tag: '1,000+ Builders',
    accentColor: 'text-brand-pink',
    borderColor: 'border-brand-pink/30 hover:border-brand-pink',
    badgeBg: 'bg-pink-500/10 text-pink-400 border-pink-500/30',
    icon: Briefcase,
    bullets: [
      'Publishes high-signal weekly deep dives into autonomous agent architectures, LLM tooling, and solo developer frameworks.',
      'Grew an active readership of 1,000+ engineers, founders, and students seeking practical, hype-free AI implementation guides.'
    ],
    skills: ['Autonomous Agents', 'LLMs', 'Prompt Engineering', 'Tech Writing', 'Full-Stack Dev']
  },
  {
    id: 'store',
    role: 'Founder & E-Commerce Lead',
    company: 'Umar Iqbal Store',
    type: 'Production Platform',
    period: 'Jul 2025 – Present',
    location: 'New Delhi, India · Hybrid',
    tag: '50+ Client Builds',
    accentColor: 'text-amber-400',
    borderColor: 'border-amber-400/30 hover:border-amber-400',
    badgeBg: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    icon: Briefcase,
    bullets: [
      'Engineered and deployed a live e-commerce marketplace featuring real-time inventory and Stripe 3D-Secure checkout workflows.',
      'Delivered 50+ bespoke full-stack solutions, custom business automations, and AI integrations for international clients.'
    ],
    skills: ['React', 'Supabase', 'Firebase', 'Stripe API', 'E-Commerce', 'Node.js']
  },
  {
    id: 'acm',
    role: 'Vice President — ACM Student Chapter',
    company: 'ACM, Association for Computing Machinery',
    type: 'Executive Leadership',
    period: 'Oct 2025 – Present',
    location: 'Greater Noida, India · Campus',
    tag: '500+ Members',
    accentColor: 'text-purple-400',
    borderColor: 'border-purple-400/30 hover:border-purple-400',
    badgeBg: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
    icon: Trophy,
    bullets: [
      'Directs the ACM Student Chapter, spearheading campus-wide technical workshops, competitive hackathons, and coding bootcamps.',
      'Mentors junior engineering students in full-stack web engineering, algorithmic problem solving, and open-source contributions.'
    ],
    skills: ['Leadership', 'Event Orchestration', 'Developer Mentorship', 'Hackathon Management']
  },
  {
    id: 'aspire',
    role: 'Aspire Leader Program Fellow & Alumni',
    company: 'Aspire Institute',
    type: 'Global Leadership Fellowship',
    period: 'Mar 2025 – Present',
    location: 'Cambridge, Massachusetts, USA · Remote',
    tag: 'Fellowship',
    accentColor: 'text-rose-400',
    borderColor: 'border-rose-400/30 hover:border-rose-400',
    badgeBg: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
    icon: Award,
    bullets: [
      'Selected into the competitive global leadership program founded by Harvard Business School professors.',
      'Completed rigorous training in ethical leadership, systemic problem solving, and community venture incubation.'
    ],
    skills: ['Strategic Leadership', 'Global Ethics', 'Venture Incubation', 'Systemic Thinking']
  },
  {
    id: 'harvard',
    role: 'CS50 Scholar — CS50X, CS50P, CS50AI',
    company: 'Harvard University',
    type: 'Academic Certification',
    period: 'Oct 2024 – Nov 2025',
    location: 'Cambridge, Massachusetts, USA · Remote',
    tag: 'Harvard CS50',
    accentColor: 'text-red-400',
    borderColor: 'border-red-400/30 hover:border-red-400',
    badgeBg: 'bg-red-500/10 text-red-400 border-red-500/30',
    icon: BookOpen,
    bullets: [
      'Completed CS50x (C, Data Structures, Memory, SQL, Web) with distinction.',
      'Completed CS50P (Advanced Python OOP, File I/O, Testing, Libraries).',
      'Completed CS50AI (Machine Learning, Minimax, Neural Networks, Natural Language Processing).'
    ],
    skills: ['Python', 'C', 'Algorithms & Data Structures', 'Neural Networks', 'Search & Optimization']
  },
  {
    id: 'research',
    role: 'Published NLP Researcher (Fake News Detection)',
    company: 'DOI: 10.13140/RG.2.2.25770.27844',
    type: 'Peer-Reviewed Publication',
    period: '2024',
    location: 'Academic Research Paper',
    tag: 'Published Paper',
    accentColor: 'text-[#00D4FF]',
    borderColor: 'border-[#00D4FF]/30 hover:border-[#00D4FF]',
    badgeBg: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
    icon: BookOpen,
    bullets: [
      'Authored and published academic research investigating machine learning and NLP classifiers for deceptive content detection.',
      'Built comparative model evaluation pipelines assessing Transformer architectures against traditional statistical NLP baselines.'
    ],
    skills: ['NLP', 'Transformers', 'PyTorch', 'Text Classification', 'Research Methodology']
  },
  {
    id: 'gcp',
    role: 'Rank #1 Global — Google Cloud Skill Boost',
    company: 'Google Cloud Platform (Silver League)',
    type: 'Global Competition',
    period: '2024',
    location: 'Global Leaderboard',
    tag: '15,320 Points',
    accentColor: 'text-emerald-400',
    borderColor: 'border-emerald-400/30 hover:border-emerald-400',
    badgeBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    icon: Trophy,
    bullets: [
      'Ranked #1 globally in the Silver League with 15,320 points across cloud architecture, compute, and machine learning quests.',
      'Earned 18+ verified Google Cloud skill badges spanning GCP infrastructure, Kubernetes, BigQuery, and Vertex AI.'
    ],
    skills: ['Google Cloud', 'Compute Engine', 'Vertex AI', 'BigQuery', 'Docker & Kubernetes']
  }
];

const linkedInPosts = [
  { embedUrl: 'https://www.linkedin.com/embed/feed/update/urn:li:share:7469120164861714433?collapsed=1', height: 669 },
  { embedUrl: 'https://www.linkedin.com/embed/feed/update/urn:li:share:7440369100637442048?collapsed=1', height: 534 },
  { embedUrl: 'https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7440701707409420289?collapsed=1', height: 566 },
  { embedUrl: 'https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7436157542667440128?collapsed=1', height: 566 },
  { embedUrl: 'https://www.linkedin.com/embed/feed/update/urn:li:share:7427080943145758720?collapsed=1', height: 669 },
];

export const YashJourney: React.FC = () => {
  const [loadedIframes, setLoadedIframes] = useState<{ [key: number]: boolean }>({});

  return (
    <section id="journey" className="relative px-6 py-20 md:px-12 bg-[#0a0a0d] text-[#f2f2ee] border-t border-white/5">
      <div className="max-w-6xl mx-auto space-y-24">
        
        {/* Section Header */}
        <FadeUp className="text-center">
          <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#8f8f89]">
            // 06 · EXPERIENCE & CAREER TRAJECTORY
          </span>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black font-heading tracking-tight mt-2 uppercase">
            My Journey & Experience
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-sm sm:text-base text-gray-400 font-sans">
            A chronological timeline of startup ventures, leadership roles, academic research, and engineering milestones.
          </p>
        </FadeUp>

        {/* ── PART 1: GLOWING CONTINUOUS TIMELINE ── */}
        <div className="relative">
          {/* Continuous Glowing Timeline Gradient Line */}
          <div className="absolute left-4 md:left-8 top-3 bottom-3 w-1 bg-gradient-to-b from-[#00D4FF] via-purple-500 via-brand-pink to-[#00D4FF] rounded-full shadow-[0_0_15px_rgba(0,212,255,0.4)]" />

          {/* Timeline Cards Container */}
          <div className="space-y-12 pl-12 md:pl-20">
            {detailedJourney.map((item, idx) => {
              const Icon = item.icon;
              return (
                <FadeUp key={item.id} delay={idx * 0.08} className="relative group">
                  {/* Glowing Node Marker aligned with card */}
                  <div className="absolute -left-[45px] md:-left-[69px] top-6 flex items-center justify-center">
                    <div className="relative flex items-center justify-center">
                      {/* Outer pulse aura */}
                      <div className="absolute h-8 w-8 rounded-full bg-[#00D4FF]/20 animate-ping opacity-75" />
                      {/* Inner solid badge with icon */}
                      <div className="relative h-7 w-7 md:h-8 md:w-8 rounded-full bg-[#121216] border-2 border-[#00D4FF] flex items-center justify-center text-[#00D4FF] shadow-[0_0_15px_rgba(0,212,255,0.6)] group-hover:scale-110 group-hover:bg-[#00D4FF] group-hover:text-black transition-all">
                        <Icon size={14} />
                      </div>
                    </div>
                  </div>

                  {/* Experience Card */}
                  <article className={`p-6 sm:p-8 md:p-10 rounded-[2rem] bg-[#121216] border border-white/10 ${item.borderColor} transition-all duration-300 shadow-2xl relative overflow-hidden group-hover:-translate-y-1`}>
                    
                    {/* Top Row: Tag, Period, Location */}
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold border ${item.badgeBg}`}>
                          {item.tag}
                        </span>
                        <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-white/5 text-gray-300 border border-white/5">
                          {item.type}
                        </span>
                      </div>

                      <div className="flex items-center gap-4 text-xs font-mono text-gray-400">
                        <span className="flex items-center gap-1.5 text-[#00D4FF]">
                          <Calendar size={13} />
                          {item.period}
                        </span>
                        <span className="hidden sm:flex items-center gap-1.5">
                          <MapPin size={13} />
                          {item.location}
                        </span>
                      </div>
                    </div>

                    {/* Role & Company */}
                    <div className="mb-5">
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-black font-heading text-white group-hover:text-[#00D4FF] transition-colors">
                        {item.role}
                      </h3>
                      <p className="text-sm sm:text-base font-mono font-semibold text-purple-300 mt-1">
                        {item.company}
                      </p>
                    </div>

                    {/* Bullet Points with Stylized Markers */}
                    <ul className="space-y-2.5 mb-6 text-sm sm:text-base text-gray-300 leading-relaxed font-sans">
                      {item.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-3">
                          <ChevronRight size={16} className="text-[#00D4FF] flex-shrink-0 mt-1" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Skill Badges */}
                    <div className="pt-4 border-t border-white/10 flex flex-wrap gap-2">
                      {item.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 rounded-lg text-xs font-mono font-medium bg-[#1a1a22] text-gray-300 border border-white/5 group-hover:border-white/20 transition-all"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                  </article>
                </FadeUp>
              );
            })}
          </div>
        </div>

        {/* ── PART 2: EMBEDDED LINKEDIN POSTS & NETWORK ── */}
        <div className="space-y-10 pt-12 border-t border-white/10">
          <FadeUp>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/10 pb-6">
              <div>
                <div className="flex items-center gap-3">
                  <Linkedin size={26} className="text-[#0A66C2]" />
                  <h3 className="text-2xl sm:text-3xl font-black font-heading text-white uppercase">
                    From My LinkedIn Network
                  </h3>
                </div>
                <p className="text-xs sm:text-sm font-mono text-gray-400 mt-1">
                  Direct updates, system architectures, and thoughts shared on professional networks.
                </p>
              </div>

              <a
                href="https://www.linkedin.com/in/umariqbal000/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0A66C2] hover:bg-[#0077B5] text-white text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-lg self-start sm:self-auto hover:scale-105"
              >
                <span>Connect on LinkedIn</span>
                <ExternalLink size={13} />
              </a>
            </div>
          </FadeUp>

          {/* Centered Symmetrical Grid of Embedded Posts */}
          <div className="flex flex-wrap justify-center gap-8">
            {linkedInPosts.map((post, idx) => (
              <FadeUp
                key={post.embedUrl}
                delay={idx * 0.1}
                className="w-full md:w-[calc(50%-16px)] max-w-xl rounded-3xl overflow-hidden bg-[#1B1F23] border border-[#38434F] shadow-2xl relative"
              >
                {!loadedIframes[idx] && (
                  <div className="absolute inset-0 flex items-center justify-center bg-[#1B1F23]/80 z-10">
                    <div className="flex items-center gap-2 text-xs font-mono text-[#71B7FB]">
                      <span className="h-2 w-2 rounded-full bg-[#0A66C2] animate-ping" />
                      <span>Loading LinkedIn transmission...</span>
                    </div>
                  </div>
                )}
                <iframe
                  src={post.embedUrl}
                  height={post.height}
                  width="100%"
                  frameBorder="0"
                  allowFullScreen
                  title={`LinkedIn Post ${idx + 1}`}
                  className="w-full rounded-3xl"
                  onLoad={() => setLoadedIframes((prev) => ({ ...prev, [idx]: true }))}
                />
              </FadeUp>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default YashJourney;
