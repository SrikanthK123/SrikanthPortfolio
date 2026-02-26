import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Hammer, Link2, Lock, Diamond, ChevronDown, ChevronUp, Loader2 } from 'lucide-react';

const ProjectCard = ({ title, description, tech, links, delay }) => (
    <motion.div
        className="group relative bg-[#0a0f1d] p-6 rounded-xl border border-white/5 hover:border-blue-500/20 transition-all duration-300 flex flex-col h-full"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.1 } }}
        transition={{ duration: 0.2 }}
    >
        {/* Title Header */}
        <div className="flex items-center gap-3 mb-4">
            <Diamond size={14} className="text-blue-500 fill-blue-500" />
            <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-blue-400 transition-colors uppercase">
                {title}
            </h3>
        </div>

        {/* Description */}
        <div className="flex-1">
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
                {description}
            </p>
        </div>

        {/* Tech Stack Section */}
        <div className="flex items-start gap-2 mb-4 text-xs font-mono text-gray-500">
            <Hammer size={12} className="mt-0.5 shrink-0" />
            <div className="flex flex-wrap gap-x-2 gap-y-1">
                {tech.map((item, i) => (
                    <span key={i} className="flex items-center gap-2">
                        {item}
                        {i < tech.length - 1 && <span className="text-[8px]">•</span>}
                    </span>
                ))}
            </div>
        </div>

        {/* Links Footer */}
        <div className="flex flex-wrap gap-4 pt-4 border-t border-white/5">
            {links && links.filter(link => link.url && link.url.trim() !== "").map((link, i) => (
                <a
                    key={i}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs font-medium text-gray-400 hover:text-blue-400 transition-colors cursor-pointer"
                >
                    {link.type === 'github' && <Github size={12} />}
                    {link.type === 'link' && <Link2 size={12} />}
                    {link.type === 'private' && <Lock size={12} />}
                    {link.type === 'live' && <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />}
                    <span className="capitalize">{link.label}</span>
                </a>
            ))}
        </div>
    </motion.div>
);

import API_BASE_URL from '../config';

const INITIAL_PROJECTS = [
    {
        title: "Moral_Verse",
        description: "AI-Driven Positive Network for moral quote posters. It features real-time updates and intelligent content moderation.",
        tech: ["React", "Node.js", "MongoDB", "Express", "GitHub"],
        links: [
            { type: 'live', label: 'Live', url: 'https://moral-verse.vercel.app' },
            { type: 'github', label: 'GitHub', url: 'https://github.com/SrikanthK123/MoralVerse' }
        ]
    },
    {
        title: "Budget Chef AI",
        description: "AI-powered recipe assistant that generates meals based on user budget and available ingredients.",
        tech: ["React", "Node.js", "Express", "Gemini API", "Tailwind CSS"],
        links: [
            { type: 'live', label: 'Live', url: 'https://budget-chef-ai.vercel.app' },
            { type: 'github', label: 'GitHub', url: 'https://github.com/SrikanthK123/budget-chef-ai' }
        ]
    },
    {
        title: "SriAI – Smart AI Assistant",
        description: "AI-driven web application that provides intelligent responses and dynamic content generation.",
        tech: ["React", "Node.js", "Express", "Gemini API", "MongoDB"],
        links: [
            { type: 'live', label: 'Live', url: 'https://srikanth-ai-chat.lovable.app/' }
        ]
    },
    {
        title: "Sri-Vision-AI",
        description: "AI-powered image analysis system that processes visual inputs using machine learning models.",
        tech: ["React", "TensorFlow", "Node.js", "Express", "Gemini Vision API"],
        links: [
            { type: 'live', label: 'Live', url: 'https://sri-vision-ai.lovable.app/' }
        ]
    },
    {
        title: "AI-Power Guess (Drawing Recognition)",
        description: "Interactive AI drawing recognition application that predicts user sketches in real-time.",
        tech: ["React", "TensorFlow.js", "Node.js", "Canvas API", "Gemini API"],
        links: [
            { type: 'live', label: 'Live', url: 'https://srikanthk123.github.io/AIGuess/' },
            { type: 'github', label: 'GitHub', url: 'https://github.com/SrikanthK123/AIGuess' }
        ]
    },
    {
        title: "Cinema – Movie Discovery Platform",
        description: "Responsive movie browsing platform that allows users to explore trending and latest films.",
        tech: ["ReactJS", "HTML", "CSS", "JavaScript", "Bootstrap"],
        links: [
            { type: 'live', label: 'Live', url: 'https://srikanthk123.github.io/FilmZone/' },
            { type: 'github', label: 'GitHub', url: 'https://github.com/SrikanthK123/FilmZone' }
        ]
    },
    {
        title: "ExploreIndia – Virtual Travel Experience",
        description: "Interactive web platform that showcases India's diverse culture and destinations.",
        tech: ["ReactJS", "HTML", "CSS", "JavaScript", "Bootstrap"],
        links: [
            { type: 'live', label: 'Live', url: 'https://srikanthk123.github.io/ExploreIndia/' },
            { type: 'github', label: 'GitHub', url: 'https://github.com/SrikanthK123/ExploreIndia' }
        ]
    },
    {
        title: "SriStore – E-Commerce Platform",
        description: "Modern online shopping interface offering a smooth product browsing experience.",
        tech: ["ReactJS", "HTML", "CSS", "JavaScript", "Bootstrap"],
        links: [
            { type: 'live', label: 'Live', url: 'https://srikanthk123.github.io/SriStore/' },
            { type: 'github', label: 'GitHub', url: 'https://github.com/SrikanthK123/SriStore' }
        ]
    },
    {
        title: "Explore Universe – Space Exploration Web App",
        description: "Visually engaging web application that presents fascinating insights about space and galaxies.",
        tech: ["ReactJS", "HTML", "CSS", "JavaScript", "Bootstrap"],
        links: [
            { type: 'live', label: 'Live', url: 'https://srikanthk123.github.io/EarthDiscover/' },
            { type: 'github', label: 'GitHub', url: 'https://github.com/SrikanthK123/EarthDiscover' }
        ]
    },
    {
        title: "Food Zone – Interactive Food Experience",
        description: "Responsive ReactJS web application showcasing engaging food-themed content with modern UI.",
        tech: ["ReactJS", "HTML", "CSS", "JavaScript", "Bootstrap"],
        links: [
            { type: 'live', label: 'Live', url: 'https://tastyzone.netlify.app/' },
            { type: 'github', label: 'GitHub', url: 'https://github.com/SrikanthK123/FoodZone' }
        ]
    },
    {
        title: "Music World – Movie Songs Platform",
        description: "Dynamic ReactJS platform featuring a curated collection of movie songs.",
        tech: ["ReactJS", "HTML", "CSS", "JavaScript", "Bootstrap"],
        links: [
            { type: 'live', label: 'Live', url: 'https://srikanthk123.github.io/MusicTime/' },
            { type: 'github', label: 'GitHub', url: 'https://github.com/SrikanthK123/MusicTime' }
        ]
    }
];

const Projects = () => {
    const [projects, setProjects] = useState(INITIAL_PROJECTS);
    const [loading, setLoading] = useState(false);
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/projects`);
                const backendData = await response.json();

                if (Array.isArray(backendData)) {
                    // Merge: Keep all initial projects, then add backend projects that aren't already there
                    const existingTitles = new Set(INITIAL_PROJECTS.map(p => p.title));
                    const newProjects = backendData.filter(p => !existingTitles.has(p.title));

                    const allProjects = [...INITIAL_PROJECTS, ...newProjects];

                    // Custom Priority Order for the final list
                    const priorityOrder = [
                        "Moral_Verse",
                        "Sri-Vision-AI",
                        "Budget Chef AI",
                        "SriAI – Smart AI Assistant"
                    ];

                    const sortedData = [...allProjects].sort((a, b) => {
                        const indexA = priorityOrder.indexOf(a.title);
                        const indexB = priorityOrder.indexOf(b.title);

                        if (indexA !== -1 && indexB !== -1) return indexA - indexB;
                        if (indexA !== -1) return -1;
                        if (indexB !== -1) return 1;
                        return 0;
                    });

                    setProjects(sortedData);
                } else {
                    console.error('Expected array from backend, got:', backendData);
                }
            } catch (error) {
                console.error('Error fetching projects:', error);
                // On error, we still have INITIAL_PROJECTS in state
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    const displayedProjects = showAll ? projects : projects.slice(0, 6);

    return (
        <section id="projects" className="relative py-32 px-4 bg-[#020617]">
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex flex-col mb-16">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false, amount: 0.5 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-3xl md:text-5xl font-black text-white tracking-widest uppercase mb-4">
                            Projects
                        </h2>
                        <div className="w-24 h-1 bg-blue-500 rounded-full" />
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence>
                        {displayedProjects.map((project, index) => (
                            <motion.div
                                key={project._id || index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{
                                    duration: 0.2,
                                    delay: index >= 6 ? (index - 6) * 0.03 : 0
                                }}
                            >
                                <ProjectCard
                                    {...project}
                                    delay={0}
                                />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* See More Toggle */}
                {projects.length > 6 && (
                    <div className="mt-16 flex justify-center">
                        <motion.button
                            onClick={() => setShowAll(!showAll)}
                            className="flex items-center gap-2 px-8 py-3 bg-blue-600/10 hover:bg-blue-600/20 border border-blue-500/30 rounded-full text-blue-400 text-sm font-bold tracking-widest uppercase transition-all group"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {showAll ? (
                                <>
                                    Show Less <ChevronUp size={16} className="group-hover:-translate-y-1 transition-transform" />
                                </>
                            ) : (
                                <>
                                    See More <ChevronDown size={16} className="group-hover:translate-y-1 transition-transform" />
                                </>
                            )}
                        </motion.button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Projects;
