import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import { X, Loader2 } from 'lucide-react';

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

import API_BASE_URL from '../config';

const INITIAL_SKILLS = [
    { skill: "JavaScript", level: 95, color: "#F7DF1E", cat: "Languages", iconName: "Code2" },
    { skill: "Python", level: 90, color: "#3776AB", cat: "Languages", iconName: "Terminal" },
    { skill: "Java", level: 85, color: "#007396", cat: "Languages", iconName: "Coffee" },
    { skill: "C", level: 80, color: "#A8B9CC", cat: "Languages", iconName: "Terminal" },
    { skill: "SQL (Postgres)", level: 90, color: "#336791", cat: "Languages", iconName: "Database" },
    { skill: "MongoDB", level: 85, color: "#47A248", cat: "Languages", iconName: "Database" },
    { skill: "HTML/CSS", level: 95, color: "#E34F26", cat: "Languages", iconName: "Layout" },
    { skill: "Tailwind", level: 95, color: "#38B2AC", cat: "Languages", iconName: "Wind" },
    { skill: "React", level: 90, color: "#61DAFB", cat: "Frameworks", iconName: "Atom" },
    { skill: "Next.js", level: 85, color: "#FFFFFF", cat: "Frameworks", iconName: "Rocket" },
    { skill: "Node.js", level: 85, color: "#68A063", cat: "Frameworks", iconName: "Server" },
    { skill: "Express.js", level: 85, color: "#FFFFFF", cat: "Frameworks", iconName: "Zap" },
    { skill: "Django", level: 80, color: "#092E20", cat: "Frameworks", iconName: "FileCode" },
    { skill: "Scikit-learn", level: 80, color: "#F7931E", cat: "Frameworks", iconName: "LineChart" },
    { skill: "TensorFlow", level: 75, color: "#FF6F00", cat: "Frameworks", iconName: "Brain" },
    { skill: "Keras", level: 75, color: "#D00000", cat: "Frameworks", iconName: "Brain" },
    { skill: "PySpark", level: 80, color: "#E25A1C", cat: "Frameworks", iconName: "Flame" },
    { skill: "SparkSQL", level: 80, color: "#E25A1C", cat: "Frameworks", iconName: "Database" },
    { skill: "LangChain", level: 85, color: "#FFFFFF", cat: "Frameworks", iconName: "LinkIcon" },
    { skill: "LLMs (Ollama)", level: 85, color: "#FFFFFF", cat: "Frameworks", iconName: "Bot" },
    { skill: "Git", level: 90, color: "#F05032", cat: "Tools", iconName: "Github" },
    { skill: "VS Code", level: 95, color: "#007ACC", cat: "Tools", iconName: "Monitor" },
    { skill: "PyCharm", level: 85, color: "#21D789", cat: "Tools", iconName: "FileCode" },
    { skill: "IntelliJ", level: 85, color: "#FE315D", cat: "Tools", iconName: "FileCode" },
    { skill: "Eclipse", level: 75, color: "#2C2255", cat: "Tools", iconName: "Monitor" },
    { skill: "Office (Excel/Word)", level: 90, color: "#2B579A", cat: "Tools", iconName: "FileText" },
    { skill: "Outlook", level: 85, color: "#0078D4", cat: "Tools", iconName: "Mail" },
    { skill: "GenAI", level: 90, color: "#FF4B4B", cat: "AI/Data", iconName: "Sparkles" },
    { skill: "Vibe coding", level: 95, color: "#9B59B6", cat: "AI/Data", iconName: "Music" },
    { skill: "AI Agents", level: 85, color: "#F1C40F", cat: "AI/Data", iconName: "Bot" },
    { skill: "AppWrite", level: 80, color: "#F02D65", cat: "AI/Data", iconName: "Database" },
    { skill: "Azure", level: 85, color: "#0089D6", cat: "AI/Data", iconName: "Cloud" },
    { skill: "Azure Data Factory", level: 80, color: "#0089D6", cat: "AI/Data", iconName: "Layers" },
    { skill: "Azure Databricks", level: 85, color: "#FF3621", cat: "AI/Data", iconName: "Box" },
    { skill: "Azure Data Lake", level: 80, color: "#0089D6", cat: "AI/Data", iconName: "Waves" },
    { skill: "Delta Lake", level: 80, color: "#0089D6", cat: "AI/Data", iconName: "Database" },
];

const Skills = () => {
    const [skills, setSkills] = useState(INITIAL_SKILLS);
    const [loading, setLoading] = useState(false);
    const [activeSkill, setActiveSkill] = useState(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/skills`);
                const backendData = await response.json();

                // Merge: Keep initial skills, add backend ones that aren't duplicates
                const existingSkills = new Set(INITIAL_SKILLS.map(s => s.skill));
                const newSkills = backendData.filter(s => !existingSkills.has(s.skill));

                setSkills([...INITIAL_SKILLS, ...newSkills]);
            } catch (error) {
                console.error('Error fetching skills:', error);
                // Status stays as INITIAL_SKILLS
            } finally {
                setLoading(false);
            }
        };

        fetchSkills();

        const checkMobile = () => setIsMobile(window.innerWidth < 1024);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const categories = ["Languages", "Frameworks", "Tools", "AI/Data"];

    const handleMouseMove = (e) => {
        if (!isMobile) {
            setMousePos({ x: e.clientX, y: e.clientY });
        }
    };

    const getIcon = (iconName) => {
        if (iconName === 'Coffee') return Coffee;
        return LucideIcons[iconName] || LucideIcons.Code2;
    };

    if (loading && skills.length === 0) return (
        <section id="skills" className="py-32 bg-[#020617] flex items-center justify-center">
            <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
        </section>
    );

    return (
        <section
            id="skills"
            className="relative py-32 px-4 bg-[#020617] overflow-hidden cursor-default"
            onMouseMove={handleMouseMove}
        >
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex flex-col mb-16 items-center text-center">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.5 }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col items-center"
                    >
                        <h2 className="text-3xl md:text-5xl font-black text-white tracking-widest uppercase mb-4">
                            My Skills
                        </h2>
                        <div className="w-24 h-1 bg-blue-500 rounded-full" />
                    </motion.div>
                </div>

                <div className="relative mb-20">
                    <AnimatePresence>
                        {activeSkill && isMobile && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setActiveSkill(null)}
                                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998] lg:hidden"
                            />
                        )}
                    </AnimatePresence>

                    <AnimatePresence>
                        {activeSkill && (
                            <motion.div
                                initial={isMobile ? { opacity: 0, scale: 0.9, y: 20 } : { opacity: 0, scale: 0.9, y: 10 }}
                                animate={isMobile ? {
                                    opacity: 1,
                                    scale: 1,
                                    y: 0,
                                    x: 0
                                } : {
                                    opacity: 1,
                                    scale: 1,
                                    x: mousePos.x + 20,
                                    y: mousePos.y + 20
                                }}
                                exit={isMobile ? { opacity: 0, scale: 0.9, y: 20 } : { opacity: 0, scale: 0.9, y: 10 }}
                                transition={{ type: "spring", damping: 25, stiffness: 300, mass: 0.5 }}
                                className={`z-[9999] bg-[#0a0f1d]/95 backdrop-blur-xl p-6 rounded-2xl border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden ${isMobile ? 'fixed inset-x-4 top-1/2 -translate-y-1/2 max-w-sm mx-auto' : 'fixed pointer-events-none w-72'
                                    }`}
                                style={!isMobile ? {
                                    left: 0,
                                    top: 0,
                                    transform: 'translate(0, 0)'
                                } : {}}
                            >
                                {isMobile && (
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            console.log('Close clicked');
                                            setActiveSkill(null);
                                        }}
                                        className="absolute top-4 right-4 p-3 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all z-20 border border-white/10"
                                        aria-label="Close"
                                    >
                                        <X size={20} />
                                    </button>
                                )}

                                <div
                                    className="absolute -top-12 -right-12 w-32 h-32 blur-[40px] opacity-30 transition-colors duration-500"
                                    style={{ backgroundColor: activeSkill.color }}
                                />

                                <div className="relative z-10">
                                    <div className="flex items-center gap-2 mb-4">
                                        <div
                                            className="w-1.5 h-1.5 rounded-full"
                                            style={{ backgroundColor: activeSkill.color }}
                                        />
                                        <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">Skill Module</span>
                                    </div>

                                    <h3 className="text-2xl font-black text-white mb-1 tracking-tight uppercase">
                                        {activeSkill.skill}
                                    </h3>

                                    <div className="flex items-end justify-between mb-4">
                                        <span className="text-gray-400 text-[10px] font-medium">Expertise</span>
                                        <span className="text-lg font-mono text-white flex items-baseline">
                                            {activeSkill.level}
                                            <span className="text-[10px] text-blue-500 ml-0.5">%</span>
                                        </span>
                                    </div>

                                    <div className="relative h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${activeSkill.level}%` }}
                                            transition={{ duration: 0.8, ease: "easeOut" }}
                                            className="absolute inset-y-0 left-0 bg-gradient-to-r"
                                            style={{
                                                backgroundImage: `linear-gradient(to right, ${activeSkill.color}44, ${activeSkill.color})`,
                                            }}
                                        />
                                    </div>

                                    <div className="mt-6 grid grid-cols-2 gap-2">
                                        <div className="p-2 rounded-lg bg-white/5 border border-white/5">
                                            <span className="block text-[7px] uppercase text-gray-500 mb-0.5">Status</span>
                                            <span className="text-[8px] text-green-400 font-bold uppercase tracking-tighter">Operational</span>
                                        </div>
                                        <div className="p-2 rounded-lg bg-white/5 border border-white/5">
                                            <span className="block text-[7px] uppercase text-gray-500 mb-0.5">Latency</span>
                                            <span className="text-[8px] text-blue-400 font-bold uppercase tracking-tighter">0.02ms</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="space-y-16">
                    {categories.map((category) => {
                        const filteredSkills = skills.filter(s => s.cat === category);
                        if (filteredSkills.length === 0) return null;

                        return (
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
                                    {filteredSkills.map((skill, idx) => {
                                        const Icon = getIcon(skill.iconName);
                                        return (
                                            <motion.div
                                                key={idx}
                                                variants={{
                                                    hidden: { opacity: 0, y: 10 },
                                                    show: { opacity: 1, y: 0 }
                                                }}
                                                className="group relative"
                                            >
                                                <div
                                                    className="flex flex-col items-center gap-3 p-4 rounded-xl bg-[#0a0f1d] border border-white/5 hover:border-white/10 transition-all cursor-pointer group-hover:bg-blue-500/5"
                                                    onMouseEnter={() => !isMobile && setActiveSkill(skill)}
                                                    onMouseLeave={() => !isMobile && setActiveSkill(null)}
                                                    onClick={() => isMobile && setActiveSkill(skill)}
                                                >
                                                    <div
                                                        className="p-3 rounded-lg bg-opacity-10 transition-transform group-hover:scale-110"
                                                        style={{ backgroundColor: `${skill.color}22` }}
                                                    >
                                                        <Icon size={20} style={{ color: skill.color }} />
                                                    </div>
                                                    <span className="text-[10px] font-mono text-gray-400 group-hover:text-white transition-colors text-center uppercase tracking-wider">
                                                        {skill.skill}
                                                    </span>
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </motion.div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="absolute top-1/4 -left-20 w-80 h-80 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
        </section >
    );
};

export default Skills;
