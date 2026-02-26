import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Code2, Terminal, Database, Layout, Wind,
    Atom, Rocket, Server, Zap, FileCode,
    LineChart, Brain, Flame, Link as LinkIcon,
    Bot, Github, Monitor, FileText, Mail,
    Sparkles, Music, Cloud, Layers, Waves,
    Box, Cpu, MousePointer2
} from 'lucide-react';

const SkillNode = ({ x, y, skill, level, color, onHover }) => (
    <motion.g
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: Math.random() * 0.5 }}
        onMouseEnter={() => onHover({ skill, level, x, y, color })}
        onMouseLeave={() => onHover(null)}
        className="cursor-pointer"
    >
        {/* Glow Effect */}
        <circle cx={x} cy={y} r="12" fill={color} className="opacity-20 blur-[4px]" />

        {/* Outer Ring */}
        <circle
            cx={x} cy={y} r="10"
            fill="none"
            stroke={color}
            strokeWidth="1.5"
            className="opacity-40"
        />

        {/* Inner Core */}
        <circle cx={x} cy={y} r="6" fill={color} />

        {/* Interactive Area */}
        <circle cx={x} cy={y} r="15" fill="transparent" />
    </motion.g>
);

// Need to add Coffee icon manually if it exists or use generic
const Coffee = ({ size = 24, strokeWidth = 2, ...props }) => (
    <svg
        width={size}
        height={size}
        {...props}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M17 8h1a4 4 0 1 1 0 8h-1" /><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" /><line x1="6" x2="6" y1="2" y2="4" /><line x1="10" x2="10" y1="2" y2="4" /><line x1="14" x2="14" y1="2" y2="4" />
    </svg>
);

const Skills1 = () => {
    const [activeSkill, setActiveSkill] = useState(null);

    const skills = [
        // Languages (Front/Middle) - Blue
        { skill: "JavaScript", level: 95, x: 280, y: 150, color: "#F7DF1E", cat: "Languages", icon: Code2 },
        { skill: "Python", level: 90, x: 320, y: 130, color: "#3776AB", cat: "Languages", icon: Terminal },
        { skill: "Java", level: 85, x: 240, y: 130, color: "#007396", cat: "Languages", icon: Coffee }, // Added manual Coffee check later if not imported
        { skill: "C", level: 80, x: 210, y: 150, color: "#A8B9CC", cat: "Languages", icon: Terminal },
        { skill: "SQL (Postgres)", level: 90, x: 300, y: 170, color: "#336791", cat: "Languages", icon: Database },
        { skill: "MongoDB", level: 85, x: 340, y: 160, color: "#47A248", cat: "Languages", icon: Database },
        { skill: "HTML/CSS", level: 95, x: 250, y: 170, color: "#E34F26", cat: "Languages", icon: Layout },
        { skill: "Tailwind", level: 95, x: 220, y: 180, color: "#38B2AC", cat: "Languages", icon: Wind },

        // Frameworks & Libraries (Top/Back) - Green/Teal
        { skill: "React", level: 90, x: 350, y: 100, color: "#61DAFB", cat: "Frameworks", icon: Atom },
        { skill: "Next.js", level: 85, x: 380, y: 80, color: "#FFFFFF", cat: "Frameworks", icon: Rocket },
        { skill: "Node.js", level: 85, x: 410, y: 110, color: "#68A063", cat: "Frameworks", icon: Server },
        { skill: "Express.js", level: 85, x: 440, y: 90, color: "#FFFFFF", cat: "Frameworks", icon: Zap },
        { skill: "Django", level: 80, x: 400, y: 60, color: "#092E20", cat: "Frameworks", icon: FileCode },
        { skill: "Scikit-learn", level: 80, x: 470, y: 110, color: "#F7931E", cat: "Frameworks", icon: LineChart },
        { skill: "TensorFlow", level: 75, x: 490, y: 80, color: "#FF6F00", cat: "Frameworks", icon: Brain },
        { skill: "Keras", level: 75, x: 510, y: 100, color: "#D00000", cat: "Frameworks", icon: Brain },
        { skill: "PySpark", level: 80, x: 530, y: 70, color: "#E25A1C", cat: "Frameworks", icon: Flame },
        { skill: "SparkSQL", level: 80, x: 550, y: 90, color: "#E25A1C", cat: "Frameworks", icon: Database },
        { skill: "LangChain", level: 85, x: 460, y: 60, color: "#FFFFFF", cat: "Frameworks", icon: LinkIcon },
        { skill: "LLMs (Ollama)", level: 85, x: 500, y: 50, color: "#FFFFFF", cat: "Frameworks", icon: Bot },

        // Developer Tools (Bottom/Back) - Slate/Gray
        { skill: "Git", level: 90, x: 450, y: 220, color: "#F05032", cat: "Tools", icon: Github },
        { skill: "VS Code", level: 95, x: 480, y: 200, color: "#007ACC", cat: "Tools", icon: Monitor },
        { skill: "PyCharm", level: 85, x: 510, y: 220, color: "#21D789", cat: "Tools", icon: FileCode },
        { skill: "IntelliJ", level: 85, x: 540, y: 200, color: "#FE315D", cat: "Tools", icon: FileCode },
        { skill: "Eclipse", level: 75, x: 530, y: 180, color: "#2C2255", cat: "Tools", icon: Monitor },
        { skill: "Office (Excel/Word)", level: 90, x: 500, y: 240, color: "#2B579A", cat: "Tools", icon: FileText },
        { skill: "Outlook", level: 85, x: 470, y: 240, color: "#0078D4", cat: "Tools", icon: Mail },

        // AI/ML & Data Engineering (Bottom/Front) - Azure/Orange
        { skill: "GenAI", level: 90, x: 180, y: 100, color: "#FF4B4B", cat: "AI/Data", icon: Sparkles },
        { skill: "Vibe coding", level: 95, x: 210, y: 80, color: "#9B59B6", cat: "AI/Data", icon: Music },
        { skill: "AI Agents", level: 85, x: 240, y: 90, color: "#F1C40F", cat: "AI/Data", icon: Bot },
        { skill: "AppWrite", level: 80, x: 270, y: 60, color: "#F02D65", cat: "AI/Data", icon: Database },
        { skill: "Azure", level: 85, x: 190, y: 220, color: "#0089D6", cat: "AI/Data", icon: Cloud },
        { skill: "Azure Data Factory", level: 80, x: 220, y: 210, color: "#0089D6", cat: "AI/Data", icon: Layers },
        { skill: "Azure Databricks", level: 85, x: 250, y: 230, color: "#FF3621", cat: "AI/Data", icon: Box },
        { skill: "Azure Data Lake", level: 80, x: 280, y: 210, color: "#0089D6", cat: "AI/Data", icon: Waves },
        { skill: "Delta Lake", level: 80, x: 310, y: 230, color: "#0089D6", cat: "AI/Data", icon: Database },
    ];

    // Higher density neural connections
    const connections = [
        // Internal Languages Web
        [0, 1], [0, 4], [0, 6], [1, 5], [1, 2], [2, 3], [4, 5], [6, 7],
        // Internal Frameworks Web
        [8, 9], [8, 10], [10, 11], [9, 12], [10, 13], [13, 14], [14, 15], [16, 17], [18, 19], [13, 18],
        // Internal Tools Web
        [20, 21], [21, 22], [21, 23], [23, 24], [20, 26], [26, 25],
        // Internal AI/Data Web
        [27, 28], [27, 29], [29, 30], [31, 32], [32, 33], [33, 34], [34, 35], [31, 35],
        // Cross-Category Bridging
        [1, 12], [1, 13], [0, 8], [4, 35], [21, 0], [22, 1], [30, 0], [28, 21]
    ];

    const categories = ["Languages", "Frameworks", "Tools", "AI/Data"];

    return (
        <section id="skills" className="relative py-32 px-4 bg-[#020617] overflow-hidden">
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex flex-col mb-16">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false, amount: 0.5 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-3xl md:text-5xl font-black text-white tracking-widest uppercase mb-4">
                            My Skills
                        </h2>
                        <div className="w-24 h-1 bg-blue-500 rounded-full" />
                    </motion.div>
                </div>

                <div className="relative flex flex-col lg:flex-row items-center justify-between gap-12 mb-20">
                    {/* SVG Brain Visualization */}
                    <motion.div
                        className="relative w-full aspect-[4/3] max-w-[600px] bg-blue-500/5 rounded-3xl border border-white/5 backdrop-blur-sm p-8 group"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: false, amount: 0.2 }}
                        transition={{ duration: 0.8 }}
                    >
                        <svg
                            viewBox="150 50 400 200"
                            className="w-full h-full drop-shadow-[0_0_15px_rgba(59,130,246,0.2)]"
                        >
                            <defs>
                                <filter id="glow">
                                    <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                                    <feMerge>
                                        <feMergeNode in="coloredBlur" />
                                        <feMergeNode in="SourceGraphic" />
                                    </feMerge>
                                </filter>
                            </defs>

                            {/* Neural Connections */}
                            {connections.map(([a, b], i) => (
                                <motion.line
                                    key={i}
                                    x1={skills[a].x}
                                    y1={skills[a].y}
                                    x2={skills[b].x}
                                    y2={skills[b].y}
                                    stroke="white"
                                    strokeWidth="0.5"
                                    className="opacity-10"
                                    initial={{ pathLength: 0 }}
                                    whileInView={{ pathLength: 1 }}
                                    viewport={{ once: false }}
                                    transition={{ duration: 1.5, delay: i * 0.05 }}
                                />
                            ))}

                            {/* Animated Pulses along lines */}
                            {connections.map(([a, b], i) => (
                                <motion.circle
                                    key={`pulse-${i}`}
                                    r="1"
                                    fill="white"
                                    initial={{ offsetDistance: "0%" }}
                                    animate={{
                                        offsetDistance: "100%",
                                        opacity: [0, 1, 0]
                                    }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                        delay: i * 0.5,
                                        ease: "linear"
                                    }}
                                    style={{
                                        offsetPath: `path('M ${skills[a].x} ${skills[a].y} L ${skills[b].x} ${skills[b].y}')`
                                    }}
                                />
                            ))}

                            {/* Skill Nodes */}
                            {skills.map((skill, i) => (
                                <SkillNode
                                    key={i}
                                    {...skill}
                                    onHover={setActiveSkill}
                                />
                            ))}
                        </svg>

                        {/* Brain Outline (Subtle Background) */}
                        <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex items-center justify-center p-12">
                            <svg viewBox="0 0 100 100" className="w-full h-full fill-white">
                                <path d="M50 10 C30 10 10 30 10 50 C10 70 30 90 50 90 C70 90 90 70 90 50 C90 30 70 10 50 10 M50 20 C65 20 80 35 80 50 C80 65 65 80 50 80 C35 80 20 65 20 50 C20 35 35 20 50 20" />
                            </svg>
                        </div>
                    </motion.div>

                    {/* Skill Detail Card */}
                    <div className="w-full lg:w-96 min-h-[300px] flex items-center">
                        <AnimatePresence mode="wait">
                            {activeSkill ? (
                                <motion.div
                                    key={activeSkill.skill}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="w-full bg-[#0a0f1d] p-8 rounded-2xl border border-white/10 relative overflow-hidden group/card"
                                >
                                    {/* Decorative corner glow */}
                                    <div
                                        className="absolute -top-12 -right-12 w-32 h-32 blur-[40px] opacity-20 transition-colors duration-500"
                                        style={{ backgroundColor: activeSkill.color }}
                                    />

                                    <div className="relative z-10">
                                        <div className="flex items-center gap-3 mb-6">
                                            <div
                                                className="w-2 h-2 rounded-full"
                                                style={{ backgroundColor: activeSkill.color }}
                                            />
                                            <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">Skill Module</span>
                                        </div>

                                        <h3 className="text-4xl font-black text-white mb-2 tracking-tight uppercase">
                                            {activeSkill.skill}
                                        </h3>

                                        <div className="flex items-end justify-between mb-8">
                                            <span className="text-gray-400 text-sm font-medium">Expertise Level</span>
                                            <span className="text-2xl font-mono text-white flex items-baseline">
                                                {activeSkill.level}
                                                <span className="text-xs text-blue-500 ml-1">%</span>
                                            </span>
                                        </div>

                                        {/* Progress Bar Container */}
                                        <div className="relative h-4 bg-white/5 rounded-full overflow-hidden border border-white/5">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${activeSkill.level}%` }}
                                                transition={{ duration: 0.8, ease: "easeOut" }}
                                                className="absolute inset-y-0 left-0 bg-gradient-to-r"
                                                style={{
                                                    backgroundImage: `linear-gradient(to right, ${activeSkill.color}44, ${activeSkill.color})`,
                                                }}
                                            >
                                                <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.3),transparent)] animate-[shimmer_2s_infinite] -translate-x-full" />
                                            </motion.div>
                                        </div>

                                        <div className="mt-8 grid grid-cols-2 gap-4">
                                            <div className="p-3 rounded-lg bg-white/5 border border-white/5">
                                                <span className="block text-[8px] uppercase text-gray-500 mb-1">Status</span>
                                                <span className="text-[10px] text-green-400 font-bold uppercase tracking-tighter">Operational</span>
                                            </div>
                                            <div className="p-3 rounded-lg bg-white/5 border border-white/5">
                                                <span className="block text-[8px] uppercase text-gray-500 mb-1">Latency</span>
                                                <span className="text-[10px] text-blue-400 font-bold uppercase tracking-tighter">0.02ms</span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="w-full text-center lg:text-left"
                                >
                                    <div className="flex flex-col gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 group-hover:bg-blue-500/20 transition-colors">
                                            <MousePointer2 size={24} className="animate-bounce" />
                                        </div>
                                        <p className="text-gray-500 font-mono text-sm leading-relaxed max-w-sm">
                                            Interactive Neural Interface loaded.
                                            <br /><br />
                                            Hover over the neural intersections to synchronize skill metadata and visualize proficiency metrics.
                                        </p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Skill Icon Grid */}
                <div className="space-y-16">
                    {categories.map((category) => (
                        <div key={category}>
                            <motion.div
                                className="flex items-center gap-4 mb-8"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: false }}
                            >
                                <div className="h-px flex-1 bg-white/5" />
                                <h3 className="text-xs font-mono text-blue-500/50 uppercase tracking-[0.3em] font-bold">
                                    {category}
                                </h3>
                                <div className="h-px flex-1 bg-white/5" />
                            </motion.div>

                            <motion.div
                                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: false, amount: 0.1 }}
                                variants={{
                                    hidden: { opacity: 0 },
                                    show: {
                                        opacity: 1,
                                        transition: { staggerChildren: 0.05 }
                                    }
                                }}
                            >
                                {skills.filter(s => s.cat === category).map((skill, idx) => (
                                    <motion.div
                                        key={idx}
                                        variants={{
                                            hidden: { opacity: 0, y: 10 },
                                            show: { opacity: 1, y: 0 }
                                        }}
                                        className="group relative"
                                    >
                                        <div className="flex flex-col items-center gap-3 p-4 rounded-xl bg-[#0a0f1d] border border-white/5 hover:border-white/10 transition-all cursor-default">
                                            <div
                                                className="p-3 rounded-lg bg-opacity-10 transition-transform group-hover:scale-110"
                                                style={{ backgroundColor: `${skill.color}22` }}
                                            >
                                                <skill.icon size={20} style={{ color: skill.color }} />
                                            </div>
                                            <span className="text-[10px] font-mono text-gray-400 group-hover:text-white transition-colors text-center uppercase tracking-wider">
                                                {skill.skill}
                                            </span>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Background Decorative Elements */}
            <div className="absolute top-1/4 -left-20 w-80 h-80 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
        </section >
    );
};

export default Skills1;
