import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, User, Download } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import resumePdf from '../assets/SrikanthKondapaka_Resume.pdf';

const NavLink = ({ href, children, onMobileLinkClick }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const text = typeof children === 'string' ? children : '';
    const firstLetter = text.charAt(0);
    const rest = text.slice(1);

    const isInternal = href.startsWith('#');

    const handleClick = (e) => {
        if (isInternal && location.pathname === '/') {
            e.preventDefault();
            const targetId = href.replace('#', '');
            const element = document.getElementById(targetId);

            if (onMobileLinkClick) onMobileLinkClick();

            setTimeout(() => {
                if (element) {
                    const navHeight = 90;
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - navHeight;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });
                    window.history.pushState(null, null, href);
                }
            }, 50);
        } else if (onMobileLinkClick) {
            onMobileLinkClick();
        }
    };

    if (isInternal && location.pathname === '/') {
        return (
            <a
                href={href}
                onClick={handleClick}
                className="group relative py-1 text-gray-300 transition-colors"
            >
                <span className="group-hover:text-blue-400 transition-colors duration-300">{firstLetter}</span>
                <span>{rest}</span>
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-blue-400 transition-all duration-300 group-hover:w-full" />
            </a>
        );
    }

    return (
        <Link
            to={isInternal ? `/${href}` : href}
            onClick={handleClick}
            className="group relative py-1 text-gray-300 transition-colors"
        >
            <span className="group-hover:text-blue-400 transition-colors duration-300">{firstLetter}</span>
            <span>{rest}</span>
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-blue-400 transition-all duration-300 group-hover:w-full" />
        </Link>
    );
};

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);
    const location = useLocation();

    const navLinks = [
        { href: "#hero", label: "Home" },
        { href: "#about", label: "About" },
        { href: "#skills", label: "Skills" },
        { href: "#projects", label: "Projects" },
        { href: "#contact", label: "Contact" },
        { href: "/admin", label: "Admin" },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center py-6 px-4">
            <div className="w-full max-w-6xl glass-panel px-8 py-3 flex items-center justify-between relative">
                <div className="flex items-center gap-2">
                    <Link to="/" className="text-2xl font-bold tracking-tighter text-white">
                        Srikanth<span className="text-blue-500">.</span>
                    </Link>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
                    {navLinks.map((link) => (
                        <NavLink key={link.href} href={link.href}>{link.label}</NavLink>
                    ))}
                    <a
                        href={resumePdf}
                        download="SrikanthKondapaka_Resume.pdf"
                        className="bg-white/10 hover:bg-white/20 text-white px-5 py-2 rounded-full border border-white/10 transition-all font-semibold flex items-center gap-2 group"
                    >
                        <span>Resume</span>
                        <Download size={14} className="opacity-50 group-hover:opacity-100 transition-opacity" />
                    </a>
                </div>

                {/* Mobile Menu Toggle */}
                <div className="md:hidden">
                    <button
                        onClick={toggleMenu}
                        className="text-white p-2 hover:bg-white/5 rounded-lg transition-colors"
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Menu Drawer */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="absolute top-full left-0 right-0 bg-[#0a0f1d]/95 backdrop-blur-xl border-t border-white/5 md:hidden"
                        >
                            <div className="flex flex-col items-center gap-6 py-8">
                                {navLinks.map((link) => (
                                    <NavLink
                                        key={link.href}
                                        href={link.href}
                                        onMobileLinkClick={() => setIsOpen(false)}
                                    >
                                        {link.label}
                                    </NavLink>
                                ))}
                                <a
                                    href={resumePdf}
                                    download="SrikanthKondapaka_Resume.pdf"
                                    onClick={() => setIsOpen(false)}
                                    className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full transition-all font-semibold shadow-[0_0_20px_rgba(59,130,246,0.5)] flex items-center gap-2"
                                >
                                    <span>Resume</span>
                                    <Download size={18} />
                                </a>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    );
};

export default Navbar;
