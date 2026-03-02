"use client";

import { useRef, useState, useEffect } from "react";
import { JCBCanvas } from "@/components/jcb/JCBCanvas";
import { useScroll, motion, useTransform, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";

/* ====================================================================
   JCB Backhoe Loader — Premium Scrollytelling Experience
   Inspired by Pagani Zonda R showcase
   3 scroll phases: START → ENGINE → PERFORMANCE
   ==================================================================== */

export default function JCBShowcase() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [loadProgress, setLoadProgress] = useState(0);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    /* ── Phase 1 : START — Hero (0% → 30%) ──────────────── */
    const op1 = useTransform(scrollYProgress, [0.0, 0.22, 0.30], [1, 1, 0]);
    const y1 = useTransform(scrollYProgress, [0.0, 0.22, 0.30], [0, 0, -80]);

    /* ── Phase 2 : ENGINE — Specs overlay (30% → 65%) ───── */
    const op2 = useTransform(scrollYProgress, [0.30, 0.38, 0.57, 0.65], [0, 1, 1, 0]);
    const y2 = useTransform(scrollYProgress, [0.30, 0.38, 0.57, 0.65], [80, 0, 0, -80]);

    /* ── Phase 3 : PERFORMANCE — Stats (65% → 100%) ─────── */
    const op3 = useTransform(scrollYProgress, [0.65, 0.73, 0.92, 1.0], [0, 1, 1, 1]);
    const y3 = useTransform(scrollYProgress, [0.65, 0.73, 0.92, 1.0], [80, 0, 0, 0]);

    /* ── Active section indicator ──────────────────────── */
    const [activeSection, setActiveSection] = useState(0);
    useEffect(() => {
        const unsub = scrollYProgress.on("change", (v) => {
            if (v < 0.30) setActiveSection(0);
            else if (v < 0.65) setActiveSection(1);
            else setActiveSection(2);
        });
        return unsub;
    }, [scrollYProgress]);

    const sections = ["START", "ENGINE", "PERFORMANCE"];

    return (
        <main className="w-full bg-black text-white selection:bg-[#FFD100] selection:text-black" style={{ fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif" }}>

            {/* ── Loading Screen ──────────────────────────────────── */}
            <AnimatePresence>
                {!isLoaded && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                        className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black"
                    >
                        <div className="absolute inset-0 opacity-[0.03]"
                            style={{
                                backgroundImage: `repeating-linear-gradient(-45deg, #FFD100 0px, #FFD100 20px, transparent 20px, transparent 40px)`,
                            }}
                        />
                        <div className="relative z-10 flex flex-col items-center">
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="mb-8 flex items-center gap-3"
                            >
                                <div className="w-20 h-12 rounded-lg flex items-center justify-center font-black text-2xl tracking-tighter"
                                    style={{ backgroundColor: '#FFD100', color: '#000', boxShadow: '0 0 40px rgba(255,209,0,0.2)' }}>
                                    JCB
                                </div>
                            </motion.div>
                            <p className="mb-5 text-[10px] font-bold tracking-[0.4em] uppercase"
                                style={{ color: 'rgba(255,209,0,0.6)' }}>
                                Initializing Experience
                            </p>
                            <div className="w-72 h-1 overflow-hidden rounded-full bg-white/5 border border-white/10">
                                <motion.div
                                    className="h-full rounded-full"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${loadProgress}%` }}
                                    transition={{ duration: 0.1 }}
                                    style={{
                                        background: 'linear-gradient(90deg, #FFD100, #FFAA00)',
                                        boxShadow: '0 0 15px rgba(255,209,0,0.4)',
                                    }}
                                />
                            </div>
                            <p className="mt-5 text-[10px] tabular-nums font-bold tracking-[0.2em]"
                                style={{ color: 'rgba(255,255,255,0.3)' }}>
                                {loadProgress}% COMPLETE
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── Fixed Navbar ────────────────────────────────────── */}
            <header className="fixed top-0 left-0 w-full z-[60] flex items-center justify-between px-6 md:px-14 py-5"
                style={{
                    background: 'linear-gradient(180deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.4) 60%, transparent 100%)',
                    backdropFilter: 'blur(12px)',
                }}>

                {/* Left: Logo */}
                <div className="flex items-center gap-4 group cursor-pointer">
                    <div className="w-8 h-8 flex items-center justify-center transition-transform duration-500 group-hover:rotate-12">
                        <svg width="24" height="22" viewBox="0 0 20 18" fill="none">
                            <path d="M10 0L20 18H0L10 0Z" fill="#FFD100" />
                        </svg>
                    </div>
                    <span className="text-2xl font-black tracking-tight uppercase italic text-white drop-shadow-sm">
                        JCB
                    </span>
                </div>

                {/* Center: Nav */}
                <nav className="hidden lg:flex gap-10 text-[10px] font-bold tracking-[0.25em] h-full items-center">
                    {sections.map((s, i) => (
                        <div key={s} className="relative py-2 group cursor-pointer">
                            <span className="transition-all duration-500"
                                style={{
                                    color: activeSection === i ? '#FFD100' : 'rgba(255,255,255,0.3)',
                                }}>
                                <span className="opacity-40 mr-2">{String(i + 1).padStart(2, '0')}</span>
                                {s}
                            </span>
                            {activeSection === i && (
                                <motion.div
                                    layoutId="navUnderline"
                                    className="absolute bottom-0 left-0 w-full h-0.5 bg-[#FFD100]"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                />
                            )}
                        </div>
                    ))}
                </nav>

                {/* Right: CTA */}
                <a href="#contact"
                    className="px-8 py-3 rounded-full text-[10px] font-black tracking-[0.2em] uppercase transition-all duration-500 hover:scale-105 active:scale-95 shadow-lg shadow-yellow-500/10"
                    style={{
                        backgroundColor: '#FFD100',
                        color: '#000',
                    }}>
                    INQUIRE NOW
                </a>
            </header>

            {/* ================================================================
                SCROLLYTELLING SECTION
            ================================================================ */}
            <div ref={containerRef} className="relative w-full" style={{ height: "500vh" }}>

                <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">

                    {/* Canvas */}
                    <JCBCanvas
                        scrollYProgress={scrollYProgress}
                        className="absolute top-0 left-0 w-full h-full z-0"
                        onLoadComplete={() => setIsLoaded(true)}
                        onLoadProgress={setLoadProgress}
                    />

                    {/* Overlays */}
                    <div className="pointer-events-none absolute inset-0 z-[1] bg-black/20" />
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-64 z-[1]"
                        style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, transparent 100%)' }} />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-64 z-[1]"
                        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)' }} />

                    {/* Scroll Indicator */}
                    <div className="absolute bottom-10 right-10 z-30 hidden md:flex flex-col items-center gap-3">
                        <span className="text-[9px] font-bold tracking-[0.4em] uppercase opacity-30"
                            style={{ writingMode: 'vertical-rl' }}>
                            SCROLL
                        </span>
                        <motion.div
                            animate={{ y: [0, 8, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="text-[#FFD100]/40"
                        >
                            <ChevronDown size={16} />
                        </motion.div>
                    </div>

                    {/* ════════════════════════════════════════════════
                        TEXT OVERLAY PHASES
                    ════════════════════════════════════════════════ */}
                    <div className="absolute inset-0 z-20 pointer-events-none">

                        {/* Phase 1: START */}
                        <motion.div
                            style={{ opacity: op1, y: y1 }}
                            className="absolute inset-0 flex flex-col justify-end px-6 md:px-16 lg:px-24 pb-20 md:pb-32"
                        >
                            <div className="w-full flex flex-col lg:flex-row justify-between items-end gap-12 lg:gap-20">

                                {/* Left Side: Title Lockup */}
                                <div className="flex-1 relative border-l-4 border-[#FFD100] pl-6 md:pl-10 py-2">
                                    <motion.div
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        className="flex items-center gap-4 mb-6 md:mb-10"
                                    >
                                        <span className="w-8 md:w-16 h-px bg-[#FFD100]"></span>
                                        <p className="text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase text-white/50">
                                            THE APEX PREDATOR
                                        </p>
                                    </motion.div>

                                    <h1 className="text-6xl sm:text-7xl md:text-[8rem] lg:text-[10rem] font-black tracking-tighter leading-[0.8] uppercase flex flex-col">
                                        <span className="text-[#FFD100] drop-shadow-[0_0_50px_rgba(255,209,0,0.3)] pr-4">JCB</span>
                                        <span
                                            className="text-transparent pr-4 relative"
                                            style={{ WebkitTextStroke: '2px rgba(255,255,255,0.9)' }}
                                        >
                                            BACKHOE
                                            {/* Slight inline glow for the hollow text */}
                                            <span className="absolute inset-0 text-white/5 blur-sm -z-10" style={{ WebkitTextStroke: '0' }}>BACKHOE</span>
                                        </span>
                                    </h1>

                                    <div className="mt-12 md:mt-16 flex flex-col sm:flex-row items-start sm:items-center gap-8 max-w-2xl">
                                        <p className="text-xs md:text-sm font-light tracking-[0.2em] text-white/60 leading-relaxed uppercase border-l-2 border-white/20 pl-5 py-1">
                                            ENGINEERED TO CONQUER THE TOUGHEST TERRAINS ON THE PLANET.
                                        </p>
                                        <a href="#specs"
                                            className="pointer-events-auto shrink-0 flex items-center justify-center w-14 h-14 rounded-full border border-white/20 group hover:border-[#FFD100] hover:bg-[#FFD100] transition-all duration-500"
                                        >
                                            <ArrowRight size={18} className="text-white group-hover:text-black" />
                                        </a>
                                    </div>
                                </div>

                                {/* Right Side: Est 1945 Stats */}
                                <motion.div
                                    initial={{ x: 30, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    className="flex flex-col items-start lg:items-end text-left lg:text-right"
                                >
                                    <p className="text-[10px] tracking-[0.4em] uppercase text-white/40 mb-3">
                                        LEGENDARY DURABILITY
                                    </p>
                                    <p className="text-5xl md:text-7xl font-black tracking-tighter text-white leading-none mb-6">
                                        EST. <span className="text-[#FFD100]">1945</span>
                                    </p>
                                    <div className="flex flex-col items-start lg:items-end gap-3">
                                        <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-white/50">WORLDWIDE SERVICE</p>
                                        <div className="w-24 lg:w-32 h-[2px] bg-gradient-to-r lg:bg-gradient-to-l from-[#FFD100] to-transparent opacity-80" />
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>

                        {/* Phase 2: ENGINE */}
                        <motion.div
                            style={{ opacity: op2, y: y2 }}
                            className="absolute inset-0 flex items-center justify-end px-8 md:px-20 lg:px-32 text-right"
                        >
                            <div className="max-w-2xl w-full flex flex-col items-end relative border-r-4 border-[#FFD100] pr-6 md:pr-10 py-2">
                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    className="flex items-center gap-4 mb-6 md:mb-10 justify-end w-full"
                                >
                                    <p className="text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase text-[#FFD100]">02 — HEART OF THE MACHINE</p>
                                    <span className="w-8 md:w-16 h-px bg-[#FFD100]"></span>
                                </motion.div>

                                <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-[8rem] font-black tracking-tighter leading-[0.8] uppercase flex flex-col items-end mb-8">
                                    <span className="text-[#FFD100] drop-shadow-[0_0_20px_rgba(255,209,0,0.2)] pr-4">ECOMAX</span>
                                    <span
                                        className="text-transparent pr-4 relative break-normal"
                                        style={{ WebkitTextStroke: '2px rgba(255,255,255,0.9)' }}
                                    >
                                        POWER<span className="text-white">.</span>
                                        <span className="absolute inset-0 text-white/5 blur-sm -z-10" style={{ WebkitTextStroke: '0' }}>POWER.</span>
                                    </span>
                                </h2>
                                <p className="text-xs md:text-sm font-light tracking-[0.2em] text-white/60 leading-relaxed uppercase border-r-2 border-white/20 pr-5 py-1 mb-12 max-w-md text-right w-full">
                                    THE JCB ECOMAX ENGINE IS BUILT FOR MAXIMUM TORQUE AND MINIMUM EMISSIONS. NO DPF, NO ADBLUE, NO COMPROMISE.
                                </p>

                                <div className="grid grid-cols-2 md:grid-cols-3 gap-5 w-full">
                                    {[
                                        { l: 'DISPLACEMENT', v: '4.4', u: 'LTR', icon: '⚡' },
                                        { l: 'POWER', v: '97', u: 'HP', icon: '🔥' },
                                        { l: 'TORQUE', v: '400', u: 'NM', icon: '⚙️' },
                                    ].map(spec => (
                                        <div key={spec.l} className="p-6 rounded-2xl border border-[#FFD100]/20 bg-white/[0.02] backdrop-blur-xl group hover:border-[#FFD100]/50 transition-all duration-500 shadow-[0_0_15px_rgba(255,209,0,0.05)] text-center">
                                            <p className="text-[9px] font-bold tracking-[0.2em] opacity-30 mb-4 uppercase">{spec.l}</p>
                                            <div className="flex items-baseline justify-center gap-1">
                                                <span className="text-3xl font-black italic">{spec.v}</span>
                                                <span className="text-[10px] font-black text-[#FFD100]">{spec.u}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        {/* Phase 3: PERFORMANCE */}
                        <motion.div
                            style={{ opacity: op3, y: y3 }}
                            className="absolute inset-0 flex items-center px-8 md:px-20 lg:px-32"
                        >
                            <div className="max-w-2xl w-full relative border-l-4 border-[#FFD100] pl-6 md:pl-10 py-2">
                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    className="flex items-center gap-4 mb-6 md:mb-10"
                                >
                                    <span className="w-8 md:w-16 h-px bg-[#FFD100]"></span>
                                    <p className="text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase text-[#FFD100]">03 — PERFORMANCE SPECS</p>
                                </motion.div>

                                <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-[8rem] font-black tracking-tighter leading-[0.8] uppercase flex flex-col mb-8">
                                    <span className="text-[#FFD100] drop-shadow-[0_0_30px_rgba(255,209,0,0.3)] pr-4">MASTER</span>
                                    <span
                                        className="text-transparent pr-4 relative"
                                        style={{ WebkitTextStroke: '2px rgba(255,255,255,0.9)' }}
                                    >
                                        DEPTH<span className="text-white">.</span>
                                        <span className="absolute inset-0 text-white/5 blur-sm -z-10" style={{ WebkitTextStroke: '0' }}>DEPTH.</span>
                                    </span>
                                </h2>
                                <p className="text-xs md:text-sm font-light tracking-[0.2em] text-white/60 leading-relaxed uppercase border-l-2 border-white/20 pl-5 py-1 mb-12 max-w-md">
                                    UNMATCHED EXCAVATION PRECISION AND CLASS-LEADING LIFT CAPACITY. BUILT TO HANDLE THE IMPOSSIBLE.
                                </p>

                                <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                                    {[
                                        { l: 'DIG DEPTH', v: '5.4', u: 'M' },
                                        { l: 'MAX SPEED', v: '40', u: 'K/H' },
                                        { l: 'LIFT CAP.', v: '3.2', u: 'T' },
                                    ].map(spec => (
                                        <div key={spec.l} className="p-6 rounded-2xl border border-[#FFD100]/20 bg-white/[0.02] backdrop-blur-xl hover:border-[#FFD100]/50 transition-all duration-500 shadow-[0_0_15px_rgba(255,209,0,0.05)]">
                                            <p className="text-[9px] font-bold tracking-[0.2em] opacity-30 mb-4 uppercase">{spec.l}</p>
                                            <div className="flex items-baseline gap-1">
                                                <span className="text-3xl font-black italic">{spec.v}</span>
                                                <span className="text-[10px] font-black text-[#FFD100]">{spec.u}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                    </div>
                </div>
            </div>

            {/* ================================================================
                SPECS SECTION — CENTERED AND POLISHED
            ================================================================ */}
            <section id="specs" className="relative z-30 w-full py-16 md:py-20 px-6 overflow-hidden bg-[#050505]">

                {/* Background Details */}
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#FFD100]/[0.02] blur-[100px] pointer-events-none" />

                <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center">

                    {/* Header Section */}
                    <div className="flex flex-col items-center text-center mb-16 max-w-2xl">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            className="w-12 h-0.5 bg-[#FFD100] mb-6"
                        />
                        <h2 className="text-5xl md:text-6xl font-black tracking-tighter italic mb-4 leading-none uppercase">
                            Technical<br />
                            <span className="text-[#FFD100]">Architecture.</span>
                        </h2>
                        <p className="text-xs md:text-sm font-light text-white/40 tracking-[0.2em] uppercase leading-relaxed">
                            Every component engineered for peak efficiency and longevity.
                        </p>
                    </div>

                    {/* Specs Grid Container */}
                    <div className="w-full space-y-16">

                        {/* ── Engine Section ───────────────────────────── */}
                        <div className="space-y-10">
                            <div className="flex items-center gap-6">
                                <h3 className="text-xl font-black italic tracking-widest text-[#FFD100] uppercase">01 ENGINE</h3>
                                <div className="h-px flex-1 bg-white/5" />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {[
                                    { label: 'ENGINE TYPE', value: 'JCB EcoMAX', unit: 'T4F' },
                                    { label: 'DISPLACEMENT', value: '4.4', unit: 'LITRE' },
                                    { label: 'GROSS POWER', value: '97', unit: 'HP' },
                                    { label: 'MAX TORQUE', value: '400', unit: 'NM' },
                                    { label: 'RATED RPM', value: '2,200', unit: 'RPM' },
                                    { label: 'ASPIRATION', value: 'TURBO', unit: 'CHARGED' },
                                ].map(spec => (
                                    <div key={spec.label} className="group p-8 rounded-3xl border border-[#FFD100]/20 bg-white/[0.01] transition-all duration-700 hover:bg-[#FFD100]/[0.02] hover:border-[#FFD100]/60 flex flex-col items-center text-center shadow-[0_0_20px_rgba(255,209,0,0.03)]">
                                        <p className="text-[10px] font-bold tracking-[0.3em] uppercase mb-6 opacity-30 group-hover:opacity-100 group-hover:text-[#FFD100] transition-all">{spec.label}</p>
                                        <p className="text-3xl md:text-4xl font-black italic mb-1 uppercase tracking-tighter">
                                            {spec.value}
                                        </p>
                                        <span className="text-[9px] font-black tracking-[0.2em] text-[#FFD100] uppercase">{spec.unit}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* ── Performance Section ─────────────────────── */}
                        <div className="space-y-10">
                            <div className="flex items-center gap-6">
                                <h3 className="text-xl font-black italic tracking-widest text-[#FFD100] uppercase">02 PERFORMANCE</h3>
                                <div className="h-px flex-1 bg-white/5" />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {[
                                    { label: 'MAX DIG DEPTH', value: '5.46', unit: 'METERS' },
                                    { label: 'LOAD HEIGHT', value: '3.43', unit: 'METERS' },
                                    { label: 'BUCKET CAP.', value: '1.0', unit: 'M³' },
                                    { label: 'TRAVEL SPEED', value: '40', unit: 'KM/H' },
                                    { label: 'LIFT POWER', value: '3,228', unit: 'KG' },
                                    { label: 'REACH AT SLEW', value: '5.62', unit: 'METERS' },
                                ].map(spec => (
                                    <div key={spec.label} className="group p-8 rounded-3xl border border-[#FFD100]/20 bg-white/[0.01] transition-all duration-700 hover:bg-[#FFD100]/[0.02] hover:border-[#FFD100]/60 flex flex-col items-center text-center shadow-[0_0_20px_rgba(255,209,0,0.03)]">
                                        <p className="text-[10px] font-bold tracking-[0.3em] uppercase mb-6 opacity-30 group-hover:opacity-60 transition-opacity">{spec.label}</p>
                                        <p className="text-3xl md:text-4xl font-black italic mb-1 uppercase tracking-tighter">
                                            {spec.value}
                                        </p>
                                        <span className="text-[9px] font-black tracking-[0.2em] text-[#FFD100] uppercase">{spec.unit}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* ── Chassis Section ─────────────────────────── */}
                        <div className="space-y-10">
                            <div className="flex items-center gap-6">
                                <h3 className="text-xl font-black italic tracking-widest text-[#FFD100] uppercase">03 CHASSIS</h3>
                                <div className="h-px flex-1 bg-white/5" />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {[
                                    { label: 'OPERATING WT', value: '8,070', unit: 'KG' },
                                    { label: 'DRIVE TYPE', value: '4WD', unit: 'SYSTEM' },
                                    { label: 'TRANSMISSION', value: 'SYNCHRO', unit: 'SHUTTLE' },
                                    { label: 'FUEL CAPACITY', value: '160', unit: 'LITRES' },
                                    { label: 'POWER STEERING', value: 'HYDRO', unit: 'STATIC' },
                                    { label: 'TIRE SIZE', value: '12.5X18', unit: 'FRONT' },
                                ].map(spec => (
                                    <div key={spec.label} className="group p-8 rounded-3xl border border-[#FFD100]/20 bg-white/[0.01] transition-all duration-700 hover:bg-[#FFD100]/[0.02] hover:border-[#FFD100]/60 flex flex-col items-center text-center shadow-[0_0_20px_rgba(255,209,0,0.03)]">
                                        <p className="text-[10px] font-bold tracking-[0.3em] uppercase mb-6 opacity-30 group-hover:opacity-60 transition-opacity">{spec.label}</p>
                                        <p className="text-2xl md:text-3xl font-black italic mb-1 uppercase tracking-tighter">
                                            {spec.value}
                                        </p>
                                        <span className="text-[9px] font-black tracking-[0.2em] text-[#FFD100] uppercase">{spec.unit}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Large Watermark */}
                    <div className="mt-20 opacity-[0.03] font-black text-8xl md:text-[10rem] italic tracking-tighter pointer-events-none select-none">
                        JCB.
                    </div>
                </div>
            </section>

            {/* ── Contact Section ─────────────────────────────────── */}
            <section id="contact" className="relative z-30 w-full py-20 md:py-32 px-6 bg-black overflow-hidden">

                <div className="absolute inset-0 opacity-[0.05]"
                    style={{
                        backgroundImage: `repeating-linear-gradient(-45deg, #FFD100 0px, #FFD100 40px, transparent 40px, transparent 80px)`,
                    }}
                />

                <div className="relative z-10 max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        className="w-20 h-10 rounded-lg mx-auto mb-10 flex items-center justify-center font-black text-xl tracking-tighter"
                        style={{ backgroundColor: '#FFD100', color: '#000', boxShadow: '0 10px 40px rgba(255,209,0,0.3)' }}
                    >
                        JCB
                    </motion.div>

                    <h3 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 italic drop-shadow-2xl">
                        READY TO BUILD<br />
                        <span className="text-[#FFD100] drop-shadow-[0_0_30px_rgba(255,209,0,0.4)]">NEW LEGENDS?</span>
                    </h3>

                    <p className="text-sm md:text-base font-light max-w-sm mx-auto mb-12 opacity-40 leading-relaxed tracking-widest uppercase">
                        CONNECT WITH AN AUTHORIZED DEALER TO CONFIG YOUR MACHINE.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-5 justify-center">
                        <a href="mailto:aadarshapandit@gmail.com"
                            className="inline-flex items-center justify-center px-10 py-4 rounded-full text-xs font-black tracking-[0.2em] uppercase transition-all duration-500 hover:scale-105 active:scale-95 bg-[#FFD100] text-black shadow-xl shadow-yellow-500/20"
                        >
                            GET A QUOTE
                        </a>
                        <a href="/"
                            className="inline-flex items-center justify-center px-10 py-4 rounded-full text-xs font-black tracking-[0.2em] uppercase border border-white/10 transition-all duration-500 hover:bg-white hover:text-black hover:scale-105 active:scale-95"
                        >
                            BACK TO WORKS
                        </a>
                    </div>

                    <div className="mt-20 pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 opacity-30 text-[9px] font-bold tracking-[0.3em] uppercase">
                        <p>© {new Date().getFullYear()} AADARSH PANDIT</p>
                        <div className="flex gap-8">
                            <a href="https://aadarshapandit.com.np" className="hover:text-[#FFD100] transition-colors">PORTFOLIO</a>
                            <a href="https://github.com/Aadarshttech" className="hover:text-[#FFD100] transition-colors">GITHUB</a>
                        </div>
                    </div>
                </div>
            </section>

        </main>
    );
}
