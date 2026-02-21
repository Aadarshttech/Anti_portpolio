"use client";

import { useState, useEffect } from "react";
import { Menu, X, ArrowLeft, Sparkles } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const worksNavLinks = [
    { name: "Services", href: "#services" },
    { name: "Work", href: "#work" },
    { name: "Process", href: "#process" },
    { name: "FAQ", href: "#faq" },
];

export function WorksNavbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToSection = (href: string, e?: React.MouseEvent) => {
        e?.preventDefault();
        const id = href.replace("#", "");
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        setIsMobileMenuOpen(false);
    };

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
                ? "bg-[#0A0A0A]/90 backdrop-blur-xl border-b border-white/5 py-3"
                : "bg-transparent py-5"
                }`}
        >
            <div className="container mx-auto px-6 flex items-center justify-between">
                <div className="flex items-center gap-5">
                    <Link
                        href="/"
                        className="text-gray-500 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium group"
                    >
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Home
                    </Link>
                    <div className="hidden md:block h-5 border-l border-white/10"></div>
                    <Link href="/works" className="hidden md:block text-xl font-bold font-heading text-white tracking-tight">
                        Aadarsh Pandit
                    </Link>
                </div>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    {worksNavLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={(e) => scrollToSection(link.href, e as React.MouseEvent)}
                            className="text-sm font-medium text-gray-400 hover:text-white transition-colors relative group py-1"
                        >
                            {link.name}
                            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-indigo-500 to-cyan-500 group-hover:w-full transition-all duration-300" />
                        </a>
                    ))}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => scrollToSection('#contact', e as React.MouseEvent)}
                        className="relative px-6 py-2.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 transition-all duration-300 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 flex items-center gap-2"
                    >
                        <Sparkles size={14} />
                        Start a Project
                    </motion.button>
                </div>

                {/* Mobile Toggle */}
                <button className="md:hidden p-2 text-gray-400 hover:text-white transition-colors" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute top-full left-0 right-0 bg-[#0A0A0A]/95 backdrop-blur-xl border-t border-white/5 md:hidden overflow-hidden"
                    >
                        <div className="p-6 flex flex-col gap-1">
                            {worksNavLinks.map((link, i) => (
                                <motion.a
                                    key={link.name}
                                    href={link.href}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    onClick={(e) => scrollToSection(link.href, e as React.MouseEvent)}
                                    className="text-gray-300 hover:text-white py-3 px-4 rounded-xl hover:bg-white/5 transition-all font-medium"
                                >
                                    {link.name}
                                </motion.a>
                            ))}
                            <motion.button
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                                onClick={(e) => scrollToSection('#contact', e as React.MouseEvent)}
                                className="mt-4 w-full py-3 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-500"
                            >
                                Start a Project
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
