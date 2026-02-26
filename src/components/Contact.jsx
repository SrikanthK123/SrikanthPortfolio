import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Linkedin, Github, Send, Phone, CheckCircle, AlertCircle } from 'lucide-react';
import API_BASE_URL from '../config';

const ContactInfo = ({ icon: Icon, label, value, href }) => (
    <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-4 p-4 bg-[#0a0f1d] border border-white/5 rounded-xl hover:border-blue-500/30 transition-all group min-w-0"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
    >
        <div className="p-3 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-colors shrink-0">
            <Icon size={20} className="text-blue-500" />
        </div>
        <div className="min-w-0 flex-1">
            <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-0.5">{label}</p>
            <p className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors truncate" title={value}>{value}</p>
        </div>
    </motion.a>
);

const XIcon = ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932zm-1.294 19.497h2.039L6.482 2.395h-2.19L17.607 20.65z" />
    </svg>
);

const Contact = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        subject: '',
        message: ''
    });

    const [status, setStatus] = useState({
        type: '', // 'success' or 'error'
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus({ type: '', message: '' });

        try {
            const response = await fetch(`${API_BASE_URL}/api/contact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setStatus({ type: 'success', message: 'Message sent successfully! I\'ll get back to you soon.' });
                setFormData({ fullName: '', email: '', subject: '', message: '' });
            } else {
                setStatus({ type: 'error', message: data.error || 'Failed to send message. Please try again.' });
            }
        } catch (error) {
            console.error('Submission error:', error);
            setStatus({ type: 'error', message: 'Unable to connect to the server. Please check if the backend is running.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contact" className="relative py-32 px-4 bg-[#020617] overflow-hidden">
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex flex-col mb-16">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false, amount: 0.5 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-3xl md:text-5xl font-black text-white tracking-widest uppercase mb-4">
                            Get In Touch
                        </h2>
                        <div className="w-24 h-1 bg-blue-500 rounded-full" />
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Left Side: Contact Info */}
                    <motion.div
                        className="space-y-8"
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
                        <motion.div
                            variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
                            className="max-w-md"
                        >
                            <p className="text-gray-400 leading-relaxed mb-8">
                                I'm currently looking for new opportunities and my inbox is always open.
                                Whether you have a question or just want to say hi, I'll try my best to get back to you!
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <motion.div variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}>
                                    <ContactInfo
                                        icon={Mail}
                                        label="Email"
                                        value="kondapakasrikanth2010@gmail.com"
                                        href="mailto:kondapakasrikanth2010@gmail.com"
                                    />
                                </motion.div>
                                <motion.div variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}>
                                    <ContactInfo
                                        icon={MapPin}
                                        label="Location"
                                        value="Hyderabad, India"
                                        href="https://maps.google.com"
                                    />
                                </motion.div>
                                <motion.div variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}>
                                    <ContactInfo
                                        icon={Linkedin}
                                        label="LinkedIn"
                                        value="Srikanth Kondapaka"
                                        href="https://www.linkedin.com/in/srikanth-kondapaka-257130218/"
                                    />
                                </motion.div>
                                <motion.div variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}>
                                    <ContactInfo
                                        icon={XIcon}
                                        label="X"
                                        value="@KSrikanth2010"
                                        href="https://twitter.com/KSrikanth2010"
                                    />
                                </motion.div>
                            </div>
                        </motion.div>

                        {/* Decorative Card */}
                        <motion.div
                            className="relative p-8 bg-blue-500/5 border border-blue-500/10 rounded-2xl overflow-hidden hidden md:block"
                            variants={{ hidden: { opacity: 0, scale: 0.9 }, show: { opacity: 1, scale: 1 } }}
                        >
                            <div className="relative z-10">
                                <h4 className="text-xl font-bold text-white mb-4">Available for Freelance</h4>
                                <p className="text-sm text-gray-400">Collaborate with me for custom AI solutions, full-stack development, and technical consulting.</p>
                            </div>
                            <div className="absolute top-0 right-0 p-8 opacity-10">
                                <Send size={80} className="rotate-12" />
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right Side: Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false, amount: 0.2 }}
                        className="relative"
                    >
                        <div className="p-8 bg-[#0a0f1d] border border-white/10 rounded-2xl relative overflow-hidden">
                            {/* Background Glow */}
                            <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-600/10 rounded-full blur-[80px]" />

                            <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
                                {status.message && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className={`p-4 rounded-lg flex items-center gap-3 text-sm font-medium ${status.type === 'success'
                                            ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                                            : 'bg-red-500/10 text-red-400 border border-red-500/20'
                                            }`}
                                    >
                                        {status.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
                                        {status.message}
                                    </motion.div>
                                )}

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-mono text-gray-500 uppercase tracking-widest px-1">Full Name</label>
                                        <input
                                            id="fullName"
                                            type="text"
                                            value={formData.fullName}
                                            onChange={handleChange}
                                            placeholder="John Doe"
                                            required
                                            className="w-full h-12 bg-white/5 border border-white/5 rounded-lg px-4 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-mono text-gray-500 uppercase tracking-widest px-1">Email Address</label>
                                        <input
                                            id="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="john@example.com"
                                            required
                                            className="w-full h-12 bg-white/5 border border-white/5 rounded-lg px-4 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-mono text-gray-500 uppercase tracking-widest px-1">Subject</label>
                                    <input
                                        id="subject"
                                        type="text"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        placeholder="Project Inquiry"
                                        required
                                        className="w-full h-12 bg-white/5 border border-white/5 rounded-lg px-4 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-mono text-gray-500 uppercase tracking-widest px-1">Message</label>
                                    <textarea
                                        id="message"
                                        rows="4"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Tell me more about your project..."
                                        required
                                        className="w-full bg-white/5 border border-white/5 rounded-lg p-4 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all resize-none"
                                    ></textarea>
                                </div>

                                <motion.button
                                    type="submit"
                                    disabled={isSubmitting}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className={`w-full h-12 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                                >
                                    {isSubmitting ? (
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                            className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                                        />
                                    ) : (
                                        <Send size={18} />
                                    )}
                                    {isSubmitting ? 'Sending...' : 'Send Message'}
                                </motion.button>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Background Decorative Patterns */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-blue-500/10 to-transparent" />
            </div>
        </section>
    );
};

export default Contact;

