import React from 'react';
import { motion } from 'framer-motion';

const ExperienceItem = ({ title, date, subtitle, number }) => (
    <div className="mb-12 group last:mb-0">
        <div className="flex items-baseline gap-4 mb-2">
            <span className="text-blue-500/50 text-sm font-mono tracking-tighter">{number}</span>
            <h4 className="text-white text-lg font-bold tracking-widest uppercase group-hover:text-blue-400 transition-colors">
                {title}
            </h4>
        </div>
        <div className="pl-8 flex flex-wrap items-center gap-x-4 gap-y-1">
            <span className="text-blue-400 text-sm font-mono">{date}</span>
            <span className="text-gray-500 text-sm">•</span>
            <span className="text-blue-300 text-sm italic font-light lowercase first-letter:uppercase">{subtitle}</span>
        </div>
    </div>
);

const About = () => {
    const education = [
        {
            number: "01",
            title: "Aurora’s Technological and Research Institute",
            date: "2018 - 2022",
            subtitle: "Bachelor of Technology: Computer Science and Engineering"
        },
        {
            number: "02",
            title: "Sri Chaitanya Junior College",
            date: "2016 - 2018",
            subtitle: "Intermediate (MPC)"
        }
    ];

    const achievements = [
        {
            number: "01",
            title: "TCS  Code Vita Season-10 Certificate",
            date: "MAY 2022",
            subtitle: "Coding Skills"
        },
        {
            number: "02",
            title: "The Complete2023 Web Development Bootcamp",
            date: "SEPT 2023",
            subtitle: "Udemy"
        },
        {
            number: "03",
            title: "Machine Learning A-Z: AI & Python",
            date: "SEPT 2024",
            subtitle: "Udemy"
        },
        {
            number: "04",
            title: "Generative AI and Tools from LinkedIn",
            date: "OCT 2024",
            subtitle: "LinkedIn"
        },
        {
            number: "05",
            title: "Azure Databricks & Spark for Data Engineer",
            date: "MARCH 2025",
            subtitle: "Udemy"
        }
    ];

    return (
        <section id="about" className="relative py-32 px-4 overflow-hidden bg-[#020617]">
            {/* Rotating Neural Lines Background (Simulated with SVG) */}
            <div className="absolute left-[-10%] top-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none opacity-20">
                <motion.svg
                    viewBox="0 0 200 200"
                    className="w-full h-full text-blue-500/30"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                >
                    {Array.from({ length: 15 }).map((_, i) => (
                        <circle
                            key={i}
                            cx="100"
                            cy="100"
                            r={30 + i * 8}
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="0.5"
                            strokeDasharray={`${i * 5} ${20 + i * 2}`}
                        />
                    ))}
                </motion.svg>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

                    {/* Left Column: About Title & Bio Card */}
                    <div className="lg:col-span-12 xl:col-span-5 relative">
                        <motion.div
                            className="relative mb-12"
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: false, amount: 0.5 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-8xl md:text-9xl font-black text-white/5 absolute -top-12 -left-4 select-none tracking-tighter">
                                About
                            </h2>
                            <h2 className="text-6xl md:text-7xl font-bold text-blue-500 tracking-tighter leading-none relative z-10">
                                About
                            </h2>
                        </motion.div>

                        <motion.div
                            className="glass-panel p-8 border-white/5 relative overflow-hidden group max-w-sm"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: false, amount: 0.3 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-3xl -mr-16 -mt-16 group-hover:bg-blue-500/10 transition-colors duration-500" />

                            <h4 className="text-blue-400 font-mono tracking-widest uppercase text-xs mb-4">Professional Bio</h4>
                            <p className="text-gray-400 text-lg leading-relaxed italic relative z-10">
                                "Hi, I'm Srikanth and I'm passionate about building intelligent systems that push the boundaries of technology. Specializing in AI, Computer Science, and Scalable Web Architectures."
                            </p>
                            <div className="mt-8 pt-6 border-t border-white/5">
                                <p className="text-gray-500 text-sm leading-relaxed">
                                    Focused on analyzing core problems before writing a single line of code, ensuring every solution is practical and scalable.
                                    I design systems with performance and clean architecture at the core.
                                    Committed to building applications that grow efficiently and stand the test of time.
                                </p>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column: Experience Details */}
                    <div className="lg:col-span-12 xl:col-span-7 space-y-20 pt-12">

                        {/* Education Section */}
                        <motion.div
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: false, amount: 0.2 }}
                            variants={{
                                hidden: { opacity: 0 },
                                show: {
                                    opacity: 1,
                                    transition: { staggerChildren: 0.1 }
                                }
                            }}
                        >
                            <h3 className="text-3xl font-bold text-white mb-12 flex items-center gap-4">
                                Education
                                <div className="flex-1 h-[1px] bg-white/5" />
                            </h3>
                            <div className="space-y-4">
                                {education.map((item, index) => (
                                    <motion.div key={index} variants={{ hidden: { opacity: 0, x: 20 }, show: { opacity: 1, x: 0 } }}>
                                        <ExperienceItem {...item} />
                                    </motion.div>
                                ))}
                            </div>

                            <motion.button
                                className="mt-4 px-8 py-3 bg-blue-500/10 border border-blue-500/30 text-blue-400 text-sm font-bold tracking-widest uppercase hover:bg-blue-500/20 hover:border-blue-500/50 transition-all duration-300 shadow-[0_0_20px_rgba(59,130,246,0.1)] hover:shadow-[0_0_30px_rgba(59,130,246,0.2)]"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
                            >
                                Full Resume
                            </motion.button>
                        </motion.div>

                        {/* Achievements & Certifications */}
                        <motion.div
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: false, amount: 0.1 }}
                            variants={{
                                hidden: { opacity: 0 },
                                show: {
                                    opacity: 1,
                                    transition: { staggerChildren: 0.15 }
                                }
                            }}
                        >
                            <h3 className="text-3xl font-bold text-white mb-12 flex items-center gap-4">
                                Achievements & Certifications
                                <div className="flex-1 h-[1px] bg-white/5" />
                            </h3>
                            <div className="space-y-4">
                                {achievements.map((item, index) => (
                                    <motion.div key={index} variants={{ hidden: { opacity: 0, x: 20 }, show: { opacity: 1, x: 0 } }}>
                                        <ExperienceItem {...item} />
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
