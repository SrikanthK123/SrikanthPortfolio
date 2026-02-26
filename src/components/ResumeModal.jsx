import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download } from 'lucide-react';
import resumePdf from '../assets/SrikanthKondapaka_Resume.pdf';

const ResumeModal = ({ isOpen, onClose }) => {
    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = resumePdf;
        link.download = 'SrikanthKondapaka_Resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="bg-[#0a0f1d] border border-white/10 rounded-[2rem] max-w-5xl w-full h-[85vh] shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative flex flex-col overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-black uppercase tracking-tight text-white leading-none mb-1">Full Resume</h3>
                                    <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">SrikanthKondapaka_Resume.pdf</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <button
                                    onClick={handleDownload}
                                    className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold uppercase tracking-widest text-[10px] flex items-center gap-2 transition-all shadow-lg shadow-blue-500/20 active:scale-95"
                                >
                                    <Download size={14} />
                                    Download
                                </button>
                                <button
                                    onClick={onClose}
                                    className="p-2.5 rounded-xl bg-white/5 hover:bg-red-500/20 text-gray-400 hover:text-red-500 border border-white/10 transition-all active:scale-95"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                        </div>

                        {/* PDF Viewer Content */}
                        <div className="flex-1 bg-white/5 relative">
                            <iframe
                                src={`${resumePdf}#toolbar=0`}
                                className="w-full h-full border-none"
                                title="Srikanth Kondapaka Resume"
                            />
                        </div>

                        {/* Footer / Mobile Actions */}
                        <div className="p-4 border-t border-white/10 text-center bg-white/[0.02]">
                            <p className="text-[10px] font-mono text-gray-600 uppercase tracking-[0.2em]">
                                Digital Portfolio Authentication Verified
                            </p>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ResumeModal;
