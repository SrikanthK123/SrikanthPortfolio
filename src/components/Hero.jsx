import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Atom, Code2, Network, Cpu, FileText } from 'lucide-react';
import ResumeModal from './ResumeModal';

const FloatingElement = ({ children, x, y, delay = 0, duration = 5 }) => (
    <motion.div
        className="absolute pointer-events-none opacity-20"
        initial={{ opacity: 0 }}
        animate={{
            opacity: [0.1, 0.3, 0.1],
            y: [0, -20, 0],
            x: [0, 10, 0]
        }}
        transition={{
            duration,
            repeat: Infinity,
            delay,
            ease: "easeInOut"
        }}
        style={{ left: x, top: y }}
    >
        {children}
    </motion.div>
);

const NeuralOrb = ({ children }) => (
    <div className="relative w-[350px] md:w-[600px] h-[350px] md:h-[600px] flex items-center justify-center pointer-events-none">
        <motion.div
            className="absolute inset-0 z-0"
            animate={{
                rotate: 360,
                y: [0, -10, 0]
            }}
            transition={{
                rotate: { duration: 60, repeat: Infinity, ease: "linear" },
                y: { duration: 8, repeat: Infinity, ease: "easeInOut" }
            }}
        >
            {/* The Sphere Shell */}
            <div className="absolute inset-0 rounded-full border border-blue-400/20 backdrop-blur-[2px] bg-blue-500/5 shadow-[0_0_80px_rgba(59,130,246,0.15)]" />
            <div className="absolute inset-2 rounded-full border border-white/5 bg-gradient-to-br from-white/5 to-transparent shadow-inner" />

            {/* Internal Neural Web (SVG) */}
            <svg viewBox="0 0 400 400" className="absolute inset-0 w-full h-full opacity-40">
                <defs>
                    <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                    </radialGradient>
                </defs>
                {Array.from({ length: 15 }).map((_, i) => {
                    const x1 = Math.random() * 200 + 100;
                    const y1 = Math.random() * 200 + 100;
                    const x2 = x1 + (Math.random() - 0.5) * 80;
                    const y2 = y1 + (Math.random() - 0.5) * 80;
                    return (
                        <React.Fragment key={i}>
                            <motion.circle
                                cx={x1} cy={y1} r="2" fill="url(#nodeGlow)"
                                animate={{ opacity: [0.3, 1, 0.3], r: [1, 2, 1] }}
                                transition={{ duration: Math.random() * 3 + 2, repeat: Infinity, delay: Math.random() * i * 0.2 }}
                            />
                            <motion.line
                                x1={x1} y1={y1} x2={x2} y2={y2}
                                stroke="#3b82f6" strokeWidth="0.5" strokeDasharray="3 3"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: [0, 0.4, 0] }}
                                transition={{ duration: Math.random() * 4 + 3, repeat: Infinity, delay: Math.random() * 5 }}
                            />
                        </React.Fragment>
                    );
                })}
            </svg>

            {/* Atmospheric Glow Blobs */}
            <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-blue-500/20 blur-[100px] rounded-full" />
            <div className="absolute bottom-1/4 right-1/4 w-1/2 h-1/2 bg-indigo-500/10 blur-[100px] rounded-full" />
        </motion.div>

        {/* Children (AI Text) will be centered inside */}
        <div className="relative z-10">
            {children}
        </div>
    </div>
);

const Hero = () => {
    const [particles, setParticles] = useState([]);
    const [isResumeOpen, setIsResumeOpen] = useState(false);

    useEffect(() => {
        const newParticles = Array.from({ length: 30 }).map((_, i) => ({
            id: i,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            size: `${Math.random() * 3 + 1}px`,
            duration: `${Math.random() * 10 + 10}s`,
            delay: `${Math.random() * 5}s`,
        }));
        setParticles(newParticles);
    }, []);

    return (
        <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-12 overflow-hidden px-4 bg-[#020617]">
            {/* Background Layers */}
            <div className="absolute inset-0 z-0 bg-[#020617]" />

            {/* Decorative Floating Elements */}
            <FloatingElement x="15%" y="25%" delay={0} duration={6}>
                <Atom size={40} className="text-blue-400" />
            </FloatingElement>
            <FloatingElement x="80%" y="20%" delay={1} duration={7}>
                <Code2 size={35} className="text-indigo-400" />
            </FloatingElement>
            <FloatingElement x="45%" y="15%" delay={2} duration={8}>
                <Network size={30} className="text-blue-500" />
            </FloatingElement>
            <FloatingElement x="20%" y="70%" delay={1.5} duration={9}>
                <span className="text-4xl font-bold text-blue-300/20">{"{ }"}</span>
            </FloatingElement>

            {/* Animated Particles */}
            <div className="absolute inset-0 z-0 opacity-40">
                {particles.map((p) => (
                    <div
                        key={p.id}
                        className="particle"
                        style={{
                            left: p.left,
                            top: '120%',
                            width: p.size,
                            height: p.size,
                            animationDuration: p.duration,
                            animationDelay: p.delay,
                        }}
                    />
                ))}
            </div>

            {/* Hero Content */}
            <div className="relative z-10 w-full max-w-7xl flex flex-col lg:flex-row items-center justify-between gap-8 h-full">
                <motion.div
                    className="lg:text-left text-center flex-1 z-10"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    <div className="corner-badge">
                        <div className="corner corner-tl" />
                        <div className="corner corner-tr" />
                        <div className="corner corner-bl" />
                        <div className="corner corner-br" />
                        BUILDING INTELLIGENT AI POWERED WEB APPLICATIONS
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter leading-[1.1] text-white">
                        <span className="neon-glow-text">Hi, I'm Srikanth.</span>
                        <br />
                        <span className="bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
                            I Build Smart Web Applications.
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-xl leading-relaxed">
                        I design and develop intelligent, high-performance web applications
                        using React, TypeScript, AI, and modern UI frameworks.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center lg:justify-start justify-center gap-6">
                        <a href="#projects" className="neon-button text-center">
                            View Projects
                        </a>
                        <a href="#contact" className="glass-button text-center">
                            Contact Me
                        </a>
                    </div>
                </motion.div>

                {/* 3D Animated AI Text - Now WRAPPED inside NeuralOrb */}
                <motion.div
                    className="flex-1 flex items-center justify-center lg:justify-end relative"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 1.5 }}
                >
                    <NeuralOrb>
                        <div style={{ perspective: '2000px' }}>
                            <motion.div
                                className="text-[120px] md:text-[200px] font-black ai-text-glitch relative cursor-default"
                                animate={{
                                    rotateY: [0, 15, -15, 0],
                                    rotateX: [0, 8, -8, 0],
                                    y: [0, -10, 0],
                                }}
                                transition={{
                                    duration: 10,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                                style={{ transformStyle: 'preserve-3d' }}
                            >
                                AI
                                {/* Inner Digital Glow */}
                                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-blue-400/30 blur-[2px] animate-pulse" />
                                <div className="absolute inset-0 blur-[40px] opacity-20 bg-blue-500 rounded-full scale-75" />
                            </motion.div>
                        </div>
                    </NeuralOrb>

                    {/* Neural Connected Dots Decoration - moved slightly to complement the orb */}
                    <div className="absolute inset-0 pointer-events-none opacity-20">
                        <svg className="w-full h-full" viewBox="0 0 400 400">
                            <motion.circle cx="350" cy="100" r="2" fill="#3b82f6" />
                            <motion.circle cx="380" cy="300" r="2" fill="#3b82f6" />
                            <motion.line x1="350" y1="100" x2="380" y2="300" stroke="#3b82f6" strokeWidth="0.5" strokeDasharray="4 4" />
                        </svg>
                    </div>
                </motion.div>
            </div>

            <div className="absolute top-1/4 -left-20 w-80 h-80 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

            <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
        </section>
    );
};

export default Hero;
