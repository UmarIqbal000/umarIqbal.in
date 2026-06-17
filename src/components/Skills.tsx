import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, Code, Terminal, Sparkles, Layers, Cloud, Wrench,
  Award, Zap, ChevronDown
} from 'lucide-react';
import { 
  SiPython, SiJavascript, SiC, SiReact, SiFlutter,
  SiTensorflow, SiPytorch, SiNumpy, SiPandas, SiBootstrap,
  SiOpenai, SiGooglecloud, SiGit, SiGithub,
  SiFirebase, SiSupabase, SiVercel,
  SiNetlify, SiPostman, SiKaggle, SiHuggingface
} from 'react-icons/si';

interface SkillItem {
  name: string;
  icon?: React.ComponentType<{ className?: string; size?: number; style?: React.CSSProperties }>;
  iconColor?: string;
}

interface ExpertiseNode {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  skills: SkillItem[];
  glowColor: string;
  borderGlow: string;
  iconBg: string;
  proficiency: number;
  featured?: boolean;
}

// Tiny helper icons
const CpuIcon: React.FC<{ size?: number; className?: string; style?: React.CSSProperties }> = ({ size = 16, className = "", style }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
    <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
    <rect x="9" y="9" width="6" height="6" />
    <line x1="9" y1="1" x2="9" y2="4" /><line x1="15" y1="1" x2="15" y2="4" />
    <line x1="9" y1="20" x2="9" y2="23" /><line x1="15" y1="20" x2="15" y2="23" />
    <line x1="20" y1="9" x2="23" y2="9" /><line x1="20" y1="15" x2="23" y2="15" />
    <line x1="1" y1="9" x2="4" y2="9" /><line x1="1" y1="15" x2="4" y2="15" />
  </svg>
);

const DartIcon: React.FC<{ size?: number; className?: string; style?: React.CSSProperties }> = ({ size = 16, className = "", style }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className} style={style}>
    <path d="M4.105 4.105S9.158 1.58 11.684.316a3.079 3.079 0 0 1 1.481-.315c.766.047 1.677.788 1.677.788L24 9.948V14.7L13.053 24H8.305l-9.19-9.19 1.97-1.97 4.58 4.58L16.19 6.89l-5.62-5.62-6.465 2.835z"/>
  </svg>
);

const Skills: React.FC = () => {
  const [activeNode, setActiveNode] = useState<string | null>(null);

  const nodes: ExpertiseNode[] = [
    {
      id: 'ai-ml',
      title: 'Artificial Intelligence & Machine Learning',
      shortTitle: 'AI & Machine Learning',
      description: 'Designing neural architectures, training deep classifiers, and applying computer vision & NLP to solve complex real-world challenges.',
      icon: Brain,
      skills: [
        { name: 'Machine Learning', icon: Brain, iconColor: '#A78BFA' },
        { name: 'Deep Learning', icon: CpuIcon, iconColor: '#C084FC' },
        { name: 'NLP', icon: Brain, iconColor: '#8B5CF6' },
        { name: 'Computer Vision', icon: CpuIcon, iconColor: '#A78BFA' },
        { name: 'Data Analytics', icon: Zap, iconColor: '#F59E0B' },
        { name: 'Generative AI', icon: Sparkles, iconColor: '#F472B6' }
      ],
      glowColor: '#7C3AED',
      borderGlow: 'hover:border-[#7C3AED]/40 hover:shadow-[0_0_30px_rgba(124,58,237,0.15)]',
      iconBg: 'bg-gradient-to-br from-brand-violet to-brand-pink',
      proficiency: 95,
      featured: true
    },
    {
      id: 'software-dev',
      title: 'Software Development',
      shortTitle: 'Software Development',
      description: 'Engineering clean backend architectures, secure RESTful endpoints, and responsive client-side interfaces.',
      icon: Code,
      skills: [
        { name: 'Full Stack Development', icon: Code, iconColor: '#3B82F6' },
        { name: 'REST APIs', icon: Code, iconColor: '#60A5FA' },
        { name: 'Responsive Web Apps', icon: Code, iconColor: '#3B82F6' },
        { name: 'Backend Architecture', icon: CpuIcon, iconColor: '#60A5FA' },
        { name: 'Database Design', icon: CpuIcon, iconColor: '#3B82F6' }
      ],
      glowColor: '#3B82F6',
      borderGlow: 'hover:border-[#3B82F6]/40 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]',
      iconBg: 'bg-gradient-to-br from-blue-600 to-cyan-500',
      proficiency: 90
    },
    {
      id: 'languages',
      title: 'Programming Languages',
      shortTitle: 'Languages',
      description: 'Writing optimized code from low-level systems (C) to high-level languages (Python, TypeScript, Java, Dart).',
      icon: Terminal,
      skills: [
        { name: 'Python', icon: SiPython, iconColor: '#3776AB' },
        { name: 'JavaScript', icon: SiJavascript, iconColor: '#F7DF1E' },
        { name: 'C', icon: SiC, iconColor: '#A8B9CC' },
        { name: 'Java', icon: Zap, iconColor: '#ED8B00' },
        { name: 'Dart', icon: DartIcon, iconColor: '#00B4AB' }
      ],
      glowColor: '#6366F1',
      borderGlow: 'hover:border-[#6366F1]/40 hover:shadow-[0_0_30px_rgba(99,102,241,0.15)]',
      iconBg: 'bg-gradient-to-br from-indigo-600 to-brand-violet',
      proficiency: 92
    },
    {
      id: 'ai-integration',
      title: 'AI Integration & Automation',
      shortTitle: 'AI Integration',
      description: 'Integrating state-of-the-art LLMs (Claude, GPT, Gemini) and building autonomous agent workflows.',
      icon: Sparkles,
      skills: [
        { name: 'OpenAI APIs', icon: SiOpenai, iconColor: '#10A37F' },
        { name: 'Gemini APIs', icon: Sparkles, iconColor: '#8E75FF' },
        { name: 'Claude APIs', icon: Brain, iconColor: '#D97706' },
        { name: 'Ollama', icon: CpuIcon, iconColor: '#FFFFFF' },
        { name: 'Hugging Face', icon: SiHuggingface, iconColor: '#FFD21E' },
        { name: 'AI Agents', icon: Sparkles, iconColor: '#EC4899' },
        { name: 'n8n Workflow', icon: Zap, iconColor: '#FF6C37' }
      ],
      glowColor: '#EC4899',
      borderGlow: 'hover:border-[#EC4899]/40 hover:shadow-[0_0_30px_rgba(236,72,153,0.15)]',
      iconBg: 'bg-gradient-to-br from-brand-pink to-rose-500',
      proficiency: 88
    },
    {
      id: 'frameworks',
      title: 'Frameworks & Libraries',
      shortTitle: 'Frameworks',
      description: 'Building interactive web apps (React) and training neural models (PyTorch, TensorFlow).',
      icon: Layers,
      skills: [
        { name: 'React', icon: SiReact, iconColor: '#61DAFB' },
        { name: 'Flutter', icon: SiFlutter, iconColor: '#02569B' },
        { name: 'TensorFlow', icon: SiTensorflow, iconColor: '#FF9E0F' },
        { name: 'PyTorch', icon: SiPytorch, iconColor: '#EE4C2C' },
        { name: 'NumPy', icon: SiNumpy, iconColor: '#4DABCF' },
        { name: 'Pandas', icon: SiPandas, iconColor: '#E70488' },
        { name: 'Bootstrap', icon: SiBootstrap, iconColor: '#7952B3' }
      ],
      glowColor: '#06B6D4',
      borderGlow: 'hover:border-[#06B6D4]/40 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]',
      iconBg: 'bg-gradient-to-br from-cyan-500 to-teal-400',
      proficiency: 90
    },
    {
      id: 'cloud',
      title: 'Cloud & Infrastructure',
      shortTitle: 'Cloud & Infra',
      description: 'Deploying production pipelines and establishing scalable cloud architectures (GCP, AWS).',
      icon: Cloud,
      skills: [
        { name: 'Google Cloud Platform', icon: SiGooglecloud, iconColor: '#4285F4' },
        { name: 'AWS Foundations', icon: Cloud, iconColor: '#FF9900' },
        { name: 'Deployment Pipelines', icon: Cloud, iconColor: '#60A5FA' },
        { name: 'Hosting & Scaling', icon: Cloud, iconColor: '#3B82F6' }
      ],
      glowColor: '#F59E0B',
      borderGlow: 'hover:border-[#F59E0B]/40 hover:shadow-[0_0_30px_rgba(245,158,11,0.15)]',
      iconBg: 'bg-gradient-to-br from-brand-orange to-yellow-500',
      proficiency: 85
    },
    {
      id: 'ecosystem',
      title: 'Developer Ecosystem',
      shortTitle: 'Dev Ecosystem',
      description: 'Leveraging diagnostic tools, serverless backends, and modern workflows to accelerate delivery.',
      icon: Wrench,
      skills: [
        { name: 'Git', icon: SiGit, iconColor: '#F05032' },
        { name: 'GitHub', icon: SiGithub, iconColor: '#FFFFFF' },
        { name: 'VS Code', icon: Terminal, iconColor: '#007ACC' },
        { name: 'Firebase', icon: SiFirebase, iconColor: '#FFCA28' },
        { name: 'Supabase', icon: SiSupabase, iconColor: '#3ECF8E' },
        { name: 'Vercel', icon: SiVercel, iconColor: '#FFFFFF' },
        { name: 'Netlify', icon: SiNetlify, iconColor: '#00C8C8' },
        { name: 'Postman', icon: SiPostman, iconColor: '#FF6C37' },
        { name: 'Kaggle', icon: SiKaggle, iconColor: '#20BEFF' }
      ],
      glowColor: '#10B981',
      borderGlow: 'hover:border-[#10B981]/40 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]',
      iconBg: 'bg-gradient-to-br from-emerald-500 to-green-400',
      proficiency: 94
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="py-12 max-w-7xl mx-auto px-4 relative"
    >
      {/* Section Header */}
      <div className="text-center mb-16 relative">

        <h2 className="text-4xl md:text-5xl font-extrabold font-heading mb-4">
          Technical <span className="text-gradient font-black">Expertise</span>
        </h2>
        
        <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
          Building intelligent systems, scalable applications, and AI-powered experiences through modern technologies.
        </p>
      </div>

      {/* =========================================== */}
      {/* INTERACTIVE RADAR / SPIDER CHART             */}
      {/* =========================================== */}
      {(() => {
        const cx = 300;
        const cy = 300;
        const maxR = 170;
        const levels = [25, 50, 75, 100];
        const angleOffset = -Math.PI / 2;
        const n = nodes.length;

        const getPoint = (index: number, value: number) => {
          const angle = (2 * Math.PI * index) / n + angleOffset;
          const r = (value / 100) * maxR;
          return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
        };

        const dataPoints = nodes.map((_, i) => getPoint(i, nodes[i].proficiency));
        const dataPath = dataPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';

        return (
          <div className="flex justify-center mb-14">
            <div className="relative">
              {/* Ambient background glows */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-brand-violet/8 blur-[100px] pointer-events-none" />
              <div className="absolute top-1/3 right-1/4 w-48 h-48 rounded-full bg-brand-pink/5 blur-[80px] pointer-events-none" />
              <div className="absolute bottom-1/3 left-1/4 w-40 h-40 rounded-full bg-cyan-500/5 blur-[70px] pointer-events-none" />

              <svg 
                viewBox="0 0 600 600" 
                className="w-[340px] h-[340px] sm:w-[440px] sm:h-[440px] md:w-[520px] md:h-[520px] lg:w-[580px] lg:h-[580px]"
              >
                <defs>
                  {/* Polygon gradient fill */}
                  <radialGradient id="radarFill" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.35" />
                    <stop offset="40%" stopColor="#EC4899" stopOpacity="0.22" />
                    <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.12" />
                  </radialGradient>
                  {/* Polygon stroke gradient */}
                  <linearGradient id="radarStroke" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#7C3AED" stopOpacity="1" />
                    <stop offset="40%" stopColor="#EC4899" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#06B6D4" stopOpacity="1" />
                  </linearGradient>
                  {/* Background panel gradient */}
                  <radialGradient id="bgPanel" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#1a1a1f" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#0d0d10" stopOpacity="0" />
                  </radialGradient>
                  {/* Dot glow filter */}
                  <filter id="dotGlow" x="-100%" y="-100%" width="300%" height="300%">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  {/* Strong center glow */}
                  <filter id="coreGlow" x="-200%" y="-200%" width="500%" height="500%">
                    <feGaussianBlur stdDeviation="8" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Subtle circular background panel */}
                <circle cx={cx} cy={cy} r={maxR + 20} fill="url(#bgPanel)" />

                {/* Outer decorative ring */}
                <circle cx={cx} cy={cy} r={maxR + 10} fill="none" stroke="#1f1f24" strokeWidth="1" opacity="0.5" />

                {/* Concentric guide polygons */}
                {levels.map((level) => {
                  const r = (level / 100) * maxR;
                  const ringPoints = Array.from({ length: n }, (_, i) => {
                    const angle = (2 * Math.PI * i) / n + angleOffset;
                    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
                  });
                  const ringPath = ringPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';
                  return (
                    <path
                      key={`ring-${level}`}
                      d={ringPath}
                      fill="none"
                      stroke={level === 100 ? '#3a3a40' : '#222228'}
                      strokeWidth={level === 100 ? 1.5 : 0.7}
                      strokeDasharray={level === 50 ? '4 4' : 'none'}
                    />
                  );
                })}

                {/* Axis lines from center to vertices */}
                {nodes.map((node, i) => {
                  const end = getPoint(i, 100);
                  const isHovered = activeNode === node.id;
                  return (
                    <line
                      key={`axis-${i}`}
                      x1={cx} y1={cy}
                      x2={end.x} y2={end.y}
                      stroke={isHovered ? node.glowColor : '#222228'}
                      strokeWidth={isHovered ? 1.2 : 0.7}
                      opacity={isHovered ? 0.6 : 0.35}
                      className="transition-all duration-300"
                    />
                  );
                })}

                {/* Data polygon — fill layer */}
                <path
                  d={dataPath}
                  fill="url(#radarFill)"
                  className="transition-all duration-500"
                />
                {/* Data polygon — stroke layer */}
                <path
                  d={dataPath}
                  fill="none"
                  stroke="url(#radarStroke)"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                  className="transition-all duration-500"
                />

                {/* Data points with halo + glow */}
                {nodes.map((node, i) => {
                  const p = dataPoints[i];
                  const isHovered = activeNode === node.id;
                  return (
                    <g 
                      key={`dot-${i}`}
                      className="cursor-pointer"
                      onMouseEnter={() => setActiveNode(node.id)}
                      onMouseLeave={() => setActiveNode(null)}
                    >
                      {/* Outer halo ring */}
                      <circle
                        cx={p.x} cy={p.y}
                        r={isHovered ? 14 : 10}
                        fill={node.glowColor}
                        opacity={isHovered ? 0.12 : 0.06}
                        className="transition-all duration-300"
                      />
                      {/* Main dot */}
                      <circle
                        cx={p.x} cy={p.y}
                        r={isHovered ? 7 : 5.5}
                        fill={node.glowColor}
                        filter="url(#dotGlow)"
                        className="transition-all duration-300"
                      />
                      {/* Inner white core */}
                      <circle
                        cx={p.x} cy={p.y}
                        r={isHovered ? 3 : 2}
                        fill="white"
                        opacity="0.95"
                        className="transition-all duration-300"
                      />
                    </g>
                  );
                })}

                {/* Axis labels + proficiency badges */}
                {nodes.map((node, i) => {
                  const angle = (2 * Math.PI * i) / n + angleOffset;
                  const cosA = Math.cos(angle);
                  const sinA = Math.sin(angle);

                  // Push labels further out for left/right sides
                  const labelR = maxR + 50;
                  const lx = cx + labelR * cosA;
                  const ly = cy + labelR * sinA;

                  let anchor: string = 'middle';
                  if (cosA > 0.25) anchor = 'start';
                  else if (cosA < -0.25) anchor = 'end';

                  const isHovered = activeNode === node.id;

                  return (
                    <g
                      key={`label-${i}`}
                      className="cursor-pointer"
                      onMouseEnter={() => setActiveNode(node.id)}
                      onMouseLeave={() => setActiveNode(null)}
                    >
                      {/* Category name */}
                      <text
                        x={lx} y={ly - 2}
                        textAnchor={anchor}
                        dominantBaseline="central"
                        fill={isHovered ? '#FFFFFF' : '#D1D5DB'}
                        fontSize="12"
                        fontWeight={isHovered ? '800' : '600'}
                        fontFamily="'Outfit', sans-serif"
                        className="transition-all duration-300 select-none"
                      >
                        {node.shortTitle}
                      </text>
                      {/* Proficiency badge */}
                      <text
                        x={lx} y={ly + 16}
                        textAnchor={anchor}
                        dominantBaseline="central"
                        fill={isHovered ? node.glowColor : '#6B7280'}
                        fontSize="11"
                        fontWeight="800"
                        fontFamily="'JetBrains Mono', monospace"
                        className="transition-all duration-300 select-none"
                      >
                        {node.proficiency}%
                      </text>
                      {/* Colored underline accent on hover */}
                      {isHovered && (
                        <line
                          x1={anchor === 'end' ? lx - 50 : lx}
                          y1={ly + 8}
                          x2={anchor === 'end' ? lx : lx + 50}
                          y2={ly + 8}
                          stroke={node.glowColor}
                          strokeWidth="1.5"
                          opacity="0.5"
                          strokeLinecap="round"
                        />
                      )}
                    </g>
                  );
                })}

                {/* Center core */}
                <circle cx={cx} cy={cy} r="6" fill="#7C3AED" opacity="0.3" filter="url(#coreGlow)" />
                <circle cx={cx} cy={cy} r="3" fill="#7C3AED" opacity="0.7" />
                <circle cx={cx} cy={cy} r="1.5" fill="white" opacity="0.8" />
              </svg>
            </div>
          </div>
        );
      })()}

      {/* =========================================== */}
      {/* EXPERTISE NODES GRID                        */}
      {/* =========================================== */}
      {(() => {
        const renderNode = (node: ExpertiseNode) => {
          const NodeIcon = node.icon;
          const isActive = activeNode === node.id;

          return (
            <motion.div
              key={node.id}
              layout
              onClick={() => setActiveNode(isActive ? null : node.id)}
              whileHover={{ y: -4 }}
              className={`relative cursor-pointer rounded-2xl border transition-all duration-400 overflow-hidden ${
                node.featured && !isActive
                  ? 'md:col-span-2 xl:col-span-2'
                  : ''
              } ${
                isActive
                  ? 'bg-[#131316] border-[#3a3a3e] shadow-[0_0_40px_rgba(124,58,237,0.08)]'
                  : `bg-[#131316] border-[#2a2a2e] ${node.borderGlow}`
              }`}
            >
              {/* Top gradient accent line */}
              <div 
                className="h-[3px] w-full opacity-60"
                style={{ background: `linear-gradient(90deg, ${node.glowColor}, transparent)` }}
              />
              
              <div className="p-5 md:p-6">
                {/* Node Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3.5">
                    <div className={`w-11 h-11 rounded-xl ${node.iconBg} flex items-center justify-center text-white shadow-lg shrink-0`}>
                      <NodeIcon size={20} />
                    </div>
                    <div>
                      <h3 className="text-sm md:text-base font-bold font-heading text-white leading-tight">
                        {node.shortTitle}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[9px] font-mono text-gray-500 font-bold uppercase tracking-wider">Mastery</span>
                        <div className="w-16 h-1.5 bg-[#1f1f23] rounded-full overflow-hidden">
                          <div 
                            className="h-full rounded-full transition-all duration-700"
                            style={{ 
                              width: `${node.proficiency}%`,
                              background: `linear-gradient(90deg, ${node.glowColor}, ${node.glowColor}88)`
                            }}
                          />
                        </div>
                        <span className="text-[9px] font-mono text-gray-400 font-bold">{node.proficiency}%</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {node.featured && (
                      <span className="text-[8px] bg-brand-violet/15 text-brand-violet border border-brand-violet/25 font-bold font-heading uppercase tracking-wider px-2.5 py-1 rounded-full hidden sm:inline-flex">
                        Core
                      </span>
                    )}
                    <motion.div
                      animate={{ rotate: isActive ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-gray-500"
                    >
                      <ChevronDown size={16} />
                    </motion.div>
                  </div>
                </div>

                {/* Collapsed: skill pills preview */}
                {!isActive && (
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {node.skills.slice(0, 5).map((skill, sIdx) => {
                      const SkillIcon = skill.icon;
                      return (
                        <span
                          key={sIdx}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#1a1a1e] border border-[#2a2a2e] text-[10px] text-gray-300 font-semibold font-heading"
                        >
                          {SkillIcon && <SkillIcon size={11} style={{ color: skill.iconColor }} />}
                          {skill.name}
                        </span>
                      );
                    })}
                    {node.skills.length > 5 && (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-[#1a1a1e] border border-[#2a2a2e] text-[10px] text-gray-500 font-semibold font-heading">
                        +{node.skills.length - 5} more
                      </span>
                    )}
                  </div>
                )}

                {/* Expanded: full details */}
                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="pt-2 flex flex-col gap-4">
                        <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
                          {node.description}
                        </p>

                        <div className="flex items-center justify-between bg-[#0e0e11] border border-[#232326] rounded-xl p-3">
                          <div className="flex items-center gap-2.5">
                            <Award size={15} className="text-gray-400" />
                            <span className="text-[10px] font-bold font-heading text-gray-300 uppercase tracking-wider">Domain Mastery</span>
                          </div>
                          <div className="relative w-9 h-9 flex items-center justify-center shrink-0">
                            <svg className="w-full h-full transform -rotate-90">
                              <circle cx="18" cy="18" r="14" stroke="#1f1f23" strokeWidth="3" fill="transparent" />
                              <circle 
                                cx="18" cy="18" r="14"
                                stroke={node.glowColor} 
                                strokeWidth="3" 
                                fill="transparent" 
                                strokeDasharray={2 * Math.PI * 14}
                                strokeDashoffset={2 * Math.PI * 14 * (1 - node.proficiency / 100)}
                                strokeLinecap="round"
                                className="transition-all duration-1000 ease-out"
                              />
                            </svg>
                            <span className="absolute text-[9px] font-mono font-black text-white">{node.proficiency}</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 pt-3 border-t border-[#232326]/50">
                          {node.skills.map((skill, sIdx) => {
                            const SkillIcon = skill.icon;
                            return (
                              <span
                                key={sIdx}
                                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#1a1a1e] border border-[#2a2a2e] text-[11px] text-gray-200 font-semibold font-heading hover:bg-[#222226] hover:border-[#3a3a3e] hover:text-white transition-all duration-200"
                              >
                                {SkillIcon && <SkillIcon size={13} style={{ color: skill.iconColor }} />}
                                {skill.name}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        };

        const mainNodes = nodes.slice(0, 5);
        const bottomNodes = nodes.slice(5);

        return (
          <>
            {/* Main 3-column grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {mainNodes.map(renderNode)}
            </div>

            {/* Centered bottom row */}
            <div className="flex flex-col md:flex-row justify-center gap-5 mt-5">
              {bottomNodes.map((node) => (
                <div key={`wrap-${node.id}`} className="w-full md:w-[calc(50%-10px)] xl:w-[calc(33.333%-10px)]">
                  {renderNode(node)}
                </div>
              ))}
            </div>
          </>
        );
      })()}
    </motion.div>
  );
};

export default Skills;