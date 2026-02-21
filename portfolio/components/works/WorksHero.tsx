"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Zap, Globe, Brain } from "lucide-react";
import { useRef } from "react";

const highlights = [
    { icon: <Globe className="w-5 h-5" />, text: "Full Stack Web" },
    { icon: <Zap className="w-5 h-5" />, text: "Mobile Apps" },
    { icon: <Brain className="w-5 h-5" />, text: "Custom AI Models" },
];

export function WorksHero() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
    const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    const scrollToSection = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <section ref={ref} id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0A0A0A]">
            {/* Animated floating background orbs */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <motion.div
                    animate={{
                        x: [0, 100, -50, 0],
                        y: [0, 50, -100, 0],
                        scale: [1, 1.2, 0.8, 1]
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute top-[10%] left-[10%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px]"
                />
                <motion.div
                    animate={{
                        x: [0, -100, 50, 0],
                        y: [0, -50, 100, 0],
                        scale: [1, 0.8, 1.2, 1]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute bottom-[10%] right-[10%] w-[600px] h-[600px] bg-cyan-500/15 rounded-full blur-[150px]"
                />
                <motion.div
                    animate={{
                        x: [0, 50, -50, 0],
                        y: [0, 100, -50, 0],
                        scale: [0.8, 1.2, 0.9, 0.8]
                    }}
                    transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                    className="absolute top-[40%] left-[40%] w-[400px] h-[400px] bg-purple-600/15 rounded-full blur-[100px]"
                />
            </div>

            {/* Subtle grid overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />

            <motion.div style={{ y, opacity }} className="container mx-auto px-6 text-center max-w-5xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="space-y-8 flex flex-col items-center"
                >
                    {/* Availability Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-green-500/30 bg-green-500/10 backdrop-blur-sm"
                    >
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                        </span>
                        <span className="text-green-400 text-sm font-medium">Available for Freelance Projects</span>
                    </motion.div>

                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-heading leading-[1.1] tracking-tight">
                        <span className="text-white">Let&apos;s Build</span>
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400">
                            Something Great
                        </span>
                    </h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="text-lg md:text-2xl text-gray-400 max-w-2xl mx-auto leading-relaxed"
                    >
                        I design and develop high-performance websites, mobile apps, and custom AI solutions that help businesses{" "}
                        <span className="text-white font-medium">scale</span>.
                    </motion.p>

                    {/* CTAs */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.45, duration: 0.6 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 w-full sm:w-auto"
                    >
                        <motion.button
                            whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(99, 102, 241, 0.3)" }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => scrollToSection('contact')}
                            className="w-full sm:w-auto px-10 py-4 rounded-full text-lg font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 shadow-xl shadow-indigo-600/20"
                        >
                            Get a Free Consultation
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => scrollToSection('services')}
                            className="w-full sm:w-auto px-10 py-4 rounded-full text-lg font-semibold text-gray-300 border border-white/10 hover:border-white/25 hover:bg-white/5 backdrop-blur-sm transition-all duration-300 group flex items-center justify-center gap-2"
                        >
                            See My Services <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </motion.button>
                    </motion.div>

                    {/* Service Highlights */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7, duration: 0.8 }}
                        className="flex flex-wrap items-center justify-center gap-6 pt-8"
                    >
                        {highlights.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8 + i * 0.1 }}
                                className="flex items-center gap-2.5 text-gray-500 text-sm"
                            >
                                <span className="text-indigo-400">{item.icon}</span>
                                <span>{item.text}</span>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
            >
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2"
                >
                    <div className="w-1 h-2 bg-white/40 rounded-full" />
                </motion.div>
            </motion.div>
        </section>
    );
}
