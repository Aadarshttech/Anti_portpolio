"use client";

import { useRef, useState, useEffect } from "react";
import { NepalCanvas } from "@/components/nepal/NepalCanvas";
import { useScroll, motion, useTransform, AnimatePresence } from "framer-motion";
import { Mountain, Compass, ArrowRight } from "lucide-react";
import Link from 'next/link';

/* ====================================================================
   AADARSH TRAVELS — Premium Legible Badges & Classic Typography
   4 scroll phases: MOUNT EVEREST → RARA LAKE → UPPER MUSTANG → SARANGKOT POKHARA
   ==================================================================== */

const BG = "#000000";

const fontImports = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Montserrat:wght@200;300;400;500;600&display=swap');
`;

const NAV_ITEMS = [
    { label: "Everest", vh: 0 },
    { label: "Rara", vh: 150 },
    { label: "Mustang", vh: 300 },
    { label: "Pokhara", vh: 450 },
];

export default function NepalShowcase() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [loadProgress, setLoadProgress] = useState(0);
    const [scrolled, setScrolled] = useState(false);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToPhase = (vh: number) => {
        const px = (vh / 100) * window.innerHeight;
        window.scrollTo({ top: px, behavior: "smooth" });
    };

    /* ── Animations for the 4 Phases ─────────── */
    const op1 = useTransform(scrollYProgress, [0.0, 0.05, 0.20, 0.25], [1, 1, 1, 0]);
    const blur1 = useTransform(scrollYProgress, [0.0, 0.05, 0.20, 0.25], ["blur(0px)", "blur(0px)", "blur(0px)", "blur(20px)"]);
    const y1 = useTransform(scrollYProgress, [0.0, 0.25], [0, -60]);
    const capOp1 = useTransform(scrollYProgress, [0.0, 0.07, 0.12], [1, 1, 0]);

    const op2 = useTransform(scrollYProgress, [0.25, 0.30, 0.45, 0.50], [0, 1, 1, 0]);
    const blur2 = useTransform(scrollYProgress, [0.25, 0.30, 0.45, 0.50], ["blur(20px)", "blur(0px)", "blur(0px)", "blur(20px)"]);
    const y2 = useTransform(scrollYProgress, [0.25, 0.50], [60, -60]);
    const capOp2 = useTransform(scrollYProgress, [0.25, 0.28, 0.42, 0.45], [0, 1, 1, 0]);

    const op3 = useTransform(scrollYProgress, [0.50, 0.55, 0.70, 0.75], [0, 1, 1, 0]);
    const blur3 = useTransform(scrollYProgress, [0.50, 0.55, 0.70, 0.75], ["blur(20px)", "blur(0px)", "blur(0px)", "blur(20px)"]);
    const y3 = useTransform(scrollYProgress, [0.50, 0.75], [60, -60]);
    const capOp3 = useTransform(scrollYProgress, [0.50, 0.53, 0.67, 0.70], [0, 1, 1, 0]);

    const op4 = useTransform(scrollYProgress, [0.75, 0.80, 0.95, 1.0], [0, 1, 1, 1]);
    const blur4 = useTransform(scrollYProgress, [0.75, 0.80, 0.95, 1.0], ["blur(20px)", "blur(0px)", "blur(0px)", "blur(0px)"]);
    const y4 = useTransform(scrollYProgress, [0.75, 1.0], [60, 0]);
    const capOp4 = useTransform(scrollYProgress, [0.75, 0.78, 1.0], [0, 1, 1]);

    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: fontImports }} />
            <main className="w-full text-white bg-[#020202] selection:bg-white selection:text-black font-['Montserrat',sans-serif]">

                {/* ── Premium Loading Screen ─────────────────────────── */}
                <AnimatePresence>
                    {!isLoaded && (
                        <motion.div
                            initial={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050505]"
                        >
                            <motion.div
                                initial={{ scale: 0.95, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 1.5, ease: 'easeOut' }}
                                className="flex flex-col items-center"
                            >
                                <Compass size={24} className="text-white/30 mb-8" strokeWidth={1} />

                                <div className="text-center overflow-hidden flex flex-col items-center">
                                    <motion.span
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ duration: 1, delay: 0.3 }}
                                        className="block text-[10px] sm:text-xs font-light tracking-[0.6em] uppercase text-white/50 mb-4"
                                    >
                                        Curating the Extraordinary
                                    </motion.span>
                                    <motion.h1
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ duration: 1, delay: 0.5 }}
                                        className="text-4xl sm:text-5xl md:text-6xl font-light text-white font-['Cormorant_Garamond'] tracking-wide"
                                    >
                                        Aadarsh <span className="italic">Travels</span>
                                    </motion.h1>
                                </div>
                            </motion.div>

                            <div className="absolute inset-x-0 bottom-24 flex flex-col items-center">
                                <span className="text-[9px] font-medium tracking-[0.4em] uppercase text-white/30 mb-5">
                                    Unveiling Nepal
                                </span>
                                <div className="w-48 h-[1px] bg-white/10 overflow-hidden relative">
                                    <motion.div
                                        className="absolute left-0 top-0 h-full bg-white/70"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${loadProgress}%` }}
                                        transition={{ duration: 0.1 }}
                                    />
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* ── Sticky Top Navbar ───────────────────── */}
                <header
                    className={`fixed top-0 left-0 w-full z-[60] transition-colors duration-700 ease-out ${scrolled
                        ? 'bg-gradient-to-b from-black/95 to-transparent'
                        : 'bg-gradient-to-b from-black/60 to-transparent'
                        }`}
                >
                    <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 py-6 md:py-8 flex items-center justify-between">
                        {/* Logo */}
                        <div
                            className="flex items-center gap-4 cursor-pointer group shrink-0"
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        >
                            <Mountain size={14} className="text-white opacity-90 group-hover:opacity-100 transition-opacity" strokeWidth={1.2} />
                            <span className="text-lg md:text-xl font-light text-white font-['Cormorant_Garamond'] tracking-[0.1em] drop-shadow-md">
                                Aadarsh <span className="italic">Travels</span>
                            </span>
                        </div>

                        {/* Desktop Nav Links */}
                        <nav className={`hidden md:flex items-center gap-8 lg:gap-12 ${scrolled ? 'opacity-100' : 'opacity-90'} transition-opacity duration-700`}>
                            {NAV_ITEMS.map((item, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => scrollToPhase(item.vh)}
                                    className="text-[9px] font-medium tracking-[0.4em] uppercase text-white/70 hover:text-white transition-all duration-300 relative py-2"
                                >
                                    {item.label}
                                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-white opacity-0 transition-all duration-300 group-hover:w-full hover:w-full hover:opacity-100" />
                                </button>
                            ))}
                        </nav>

                        {/* CTA & Mobile Menu Area */}
                        <div className="flex items-center gap-6">
                            {/* Desktop CTA Button */}
                            <a
                                href="mailto:aadarshapandit@gmail.com"
                                className={`hidden md:flex items-center gap-3 px-6 py-2.5 rounded-full border border-white/20 hover:bg-white hover:text-black transition-all duration-500 group relative overflow-hidden backdrop-blur-sm ${scrolled ? 'bg-white/10' : 'bg-black/20'}`}
                            >
                                <span className="text-[9px] font-semibold tracking-[0.3em] uppercase transition-colors">
                                    Plan Your Escape
                                </span>
                                <ArrowRight size={14} className="opacity-80 group-hover:opacity-100 transition-transform duration-500 group-hover:translate-x-1" strokeWidth={2} />
                            </a>

                            {/* Mobile Nav Button */}
                            <button className="md:hidden flex flex-col gap-1.5 p-2 shrink-0">
                                <span className="w-5 h-px bg-white shrink-0" />
                                <span className="w-5 h-px bg-white shrink-0" />
                            </button>
                        </div>
                    </div>
                </header>

                {/* ================================================================
                    SCROLLYTELLING VIEWPORT
                ================================================================ */}
                <div ref={containerRef} className="relative w-full" style={{ height: "600vh" }}>
                    <div className="sticky top-0 left-0 w-full h-screen overflow-hidden bg-black">

                        {/* Canvas Background */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={isLoaded ? { opacity: 0.85 } : {}}
                            transition={{ duration: 3 }}
                            className="absolute inset-0 z-0"
                        >
                            <NepalCanvas
                                scrollYProgress={scrollYProgress}
                                className="w-full h-full object-cover"
                                onLoadComplete={() => setIsLoaded(true)}
                                onLoadProgress={setLoadProgress}
                            />
                        </motion.div>

                        <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/80 to-transparent z-[1] pointer-events-none" />

                        {/* ════════════════════════════════════════════════
                            4 STYLIZED TYPOGRAPHIC PHASES (Badges + Classic)
                        ════════════════════════════════════════════════ */}
                        <div className="absolute inset-0 z-20 pointer-events-none flex justify-center items-center overflow-hidden">

                            {/* ── Phase 1: MOUNT EVEREST ── */}
                            <motion.div
                                style={{ opacity: op1, filter: blur1, y: y1 }}
                                className="absolute inset-0 w-full h-full text-center px-6"
                            >
                                {/* Top-Left: Metadata Marker */}
                                <motion.div
                                    style={{ opacity: capOp1 }}
                                    className="absolute top-[18vh] left-12 md:left-24 flex flex-col items-center gap-3"
                                >
                                    <div className="w-[1px] h-12 bg-gradient-to-b from-white/40 to-transparent" />
                                    <div className="flex flex-col items-center text-center">
                                        <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-white/40 mb-1">Elevation</span>
                                        <span className="text-base font-light tracking-[0.2em] text-white">8,848.86 M</span>
                                    </div>
                                </motion.div>

                                <div className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none">
                                    <h2 className="text-5xl sm:text-7xl md:text-[7rem] lg:text-[9.5rem] font-light tracking-tight leading-[0.8] text-white font-['Cormorant_Garamond'] drop-shadow-[0_10px_40px_rgba(0,0,0,0.8)] mb-12">
                                        Mount <span className="italic">Everest</span>
                                    </h2>
                                </div>

                                {/* Bottom-Right: Poetic Horizon */}
                                <motion.div
                                    style={{ opacity: capOp1 }}
                                    className="absolute bottom-[15vh] right-12 md:right-24 flex flex-col items-end gap-6"
                                >
                                    <p className="text-sm md:text-base font-light italic tracking-[0.4em] text-white/80 uppercase font-['Cormorant_Garamond'] text-right max-w-xs leading-loose">
                                        The Roof of the World
                                    </p>
                                    <div className="w-32 h-[0.5px] bg-gradient-to-l from-white/40 to-transparent" />
                                </motion.div>
                            </motion.div>

                            {/* ── Phase 2: RARA LAKE ── */}
                            <motion.div
                                style={{ opacity: op2, filter: blur2, y: y2 }}
                                className="absolute inset-0 w-full h-full text-center px-6"
                            >
                                {/* Top-Left: Metadata Marker */}
                                <motion.div
                                    style={{ opacity: capOp2 }}
                                    className="absolute top-[18vh] left-12 md:left-24 flex flex-col items-center gap-3"
                                >
                                    <div className="w-[1px] h-12 bg-gradient-to-b from-[#A2D5F2]/50 to-transparent" />
                                    <div className="flex flex-col items-center text-center">
                                        <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-[#A2D5F2]/60 mb-1">Presence</span>
                                        <span className="text-base font-light tracking-[0.2em] text-white">Pure Sanctuary</span>
                                    </div>
                                </motion.div>

                                <div className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none">
                                    <h2 className="text-5xl sm:text-7xl md:text-[7rem] lg:text-[9.5rem] font-light tracking-tight leading-[0.8] text-white font-['Cormorant_Garamond'] drop-shadow-[0_10px_40px_rgba(0,0,0,0.8)] mb-12">
                                        Rara <span className="italic text-[#A2D5F2]">Lake</span>
                                    </h2>
                                </div>

                                {/* Bottom-Right: Poetic Horizon */}
                                <motion.div
                                    style={{ opacity: capOp2 }}
                                    className="absolute bottom-[15vh] right-12 md:right-24 flex flex-col items-end gap-6"
                                >
                                    <p className="text-sm md:text-base font-light italic tracking-[0.4em] text-white/80 uppercase font-['Cormorant_Garamond'] text-right max-w-xs leading-loose">
                                        The Queen of Lakes
                                    </p>
                                    <div className="w-32 h-[0.5px] bg-gradient-to-l from-[#A2D5F2]/40 to-transparent" />
                                </motion.div>
                            </motion.div>

                            {/* ── Phase 3: UPPER MUSTANG ── */}
                            <motion.div
                                style={{ opacity: op3, filter: blur3, y: y3 }}
                                className="absolute inset-0 w-full h-full text-center px-6"
                            >
                                {/* Top-Left: Metadata Marker */}
                                <motion.div
                                    style={{ opacity: capOp3 }}
                                    className="absolute top-[18vh] left-12 md:left-24 flex flex-col items-center gap-3"
                                >
                                    <div className="w-[1px] h-12 bg-gradient-to-b from-[#E0C097]/50 to-transparent" />
                                    <div className="flex flex-col items-center text-center">
                                        <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-[#E0C097]/60 mb-1">Lineage</span>
                                        <span className="text-base font-light tracking-[0.2em] text-white">Forbidden Realm</span>
                                    </div>
                                </motion.div>

                                <div className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none">
                                    <h2 className="text-5xl sm:text-7xl md:text-[7rem] lg:text-[9.5rem] font-light tracking-tight leading-[0.8] text-white font-['Cormorant_Garamond'] drop-shadow-[0_10px_40px_rgba(0,0,0,0.8)] mb-12">
                                        Upper <span className="italic text-[#E0C097]">Mustang</span>
                                    </h2>
                                </div>

                                {/* Bottom-Right: Poetic Horizon */}
                                <motion.div
                                    style={{ opacity: capOp3 }}
                                    className="absolute bottom-[15vh] right-12 md:right-24 flex flex-col items-end gap-6"
                                >
                                    <p className="text-sm md:text-base font-light italic tracking-[0.4em] text-white/80 uppercase font-['Cormorant_Garamond'] text-right max-w-xs leading-loose">
                                        The Last Forbidden Kingdom
                                    </p>
                                    <div className="w-32 h-[0.5px] bg-gradient-to-l from-[#E0C097]/40 to-transparent" />
                                </motion.div>
                            </motion.div>

                            {/* ── Phase 4: SARANGKOT POKHARA ── */}
                            <motion.div
                                style={{ opacity: op4, filter: blur4, y: y4 }}
                                className="absolute inset-0 w-full h-full text-center px-6 mt-[-5vh]"
                            >
                                {/* Top-Left: Metadata Marker */}
                                <motion.div
                                    style={{ opacity: capOp4 }}
                                    className="absolute top-[18vh] left-12 md:left-24 flex flex-col items-center gap-3"
                                >
                                    <div className="w-[1px] h-12 bg-gradient-to-b from-white/40 to-transparent" />
                                    <div className="flex flex-col items-center text-center">
                                        <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-white/50 mb-1">Atmosphere</span>
                                        <span className="text-base font-light tracking-[0.2em] text-white">Above The Clouds</span>
                                    </div>
                                </motion.div>

                                <div className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none">
                                    <h2 className="text-5xl sm:text-7xl md:text-[7rem] lg:text-[9.5rem] font-light tracking-tight leading-[0.8] text-white font-['Cormorant_Garamond'] drop-shadow-[0_10px_40px_rgba(0,0,0,0.8)] mb-12">
                                        Sarangkot <br /><span className="italic pl-12">Pokhara</span>
                                    </h2>
                                </div>

                                {/* Bottom-Right: Poetic Horizon */}
                                <motion.div
                                    style={{ opacity: capOp4 }}
                                    className="absolute bottom-[15vh] right-12 md:right-24 flex flex-col items-end gap-6"
                                >
                                    <p className="text-sm md:text-base font-light italic tracking-[0.4em] text-white/80 uppercase font-['Cormorant_Garamond'] text-right max-w-xs leading-loose">
                                        Where Sky Meets The Annapurnas
                                    </p>
                                    <div className="w-32 h-[0.5px] bg-gradient-to-l from-white/40 to-transparent" />
                                </motion.div>
                            </motion.div>

                        </div>
                    </div>
                </div>

                {/* ================================================================
                    AADARSH TRAVELS FOOTER
                ================================================================ */}
                <footer className="w-full bg-[#030303] relative z-30 pt-40 pb-16 px-6 md:px-20 border-t border-white/5">
                    <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-16">
                        <div className="flex flex-col gap-6">
                            <h2 className="text-4xl md:text-5xl font-light text-white font-['Cormorant_Garamond'] drop-shadow-sm">
                                Aadarsh <span className="italic">Travels</span>
                            </h2>
                            <p className="text-xs md:text-sm font-light text-white/50 max-w-sm leading-relaxed">
                                Curating the world's most untouched and magnificent landscapes for the discerning explorer. Based in the heart of the Himalayas.
                            </p>

                            {/* Return to Portfolio Link */}
                            <Link href="/" className="mt-4 flex items-center gap-4 group w-fit">
                                <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center transition-all duration-500 group-hover:bg-white">
                                    <ArrowRight size={14} className="text-white group-hover:text-black transition-colors duration-500 rotate-180" />
                                </div>
                                <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-white/60 group-hover:text-white transition-colors duration-500">
                                    Return to Main Portfolio
                                </span>
                            </Link>

                        </div>

                        <div className="flex flex-col gap-8 md:text-right">
                            <div className="flex flex-col gap-3">
                                <p className="text-[10px] font-medium tracking-[0.3em] uppercase text-white/30">Connect</p>
                                <a href="mailto:aadarshapandit@gmail.com" className="text-sm md:text-base font-light text-white/80 hover:text-white transition-colors">
                                    aadarshapandit@gmail.com
                                </a>
                                <p className="text-sm md:text-base font-light text-white/80">
                                    +977 9860334317
                                </p>
                            </div>

                            <div className="flex gap-8 md:justify-end mt-2">
                                {["Instagram", "Twitter", "LinkedIn"].map((social) => (
                                    <a key={social} href="#" className="text-[10px] font-medium tracking-[0.2em] uppercase text-white/50 hover:text-white transition-colors relative group">
                                        {social}
                                        <span className="absolute -bottom-1 left-0 w-0 h-px bg-white/50 transition-all duration-300 group-hover:w-full" />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="max-w-6xl mx-auto mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[9px] md:text-[10px] font-medium tracking-[0.2em] uppercase text-white/30">
                        <p>© {new Date().getFullYear()} Aadarsh Travels. All rights reserved.</p>
                        <p className="opacity-70">Designed for the Extraordinary</p>
                    </div>
                </footer>

            </main>
        </>
    );
}
