"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Zap, Globe, Brain, Rocket, Star, Clock } from "lucide-react";
import { useRef } from "react";
import Image from "next/image";

const highlights = [
    { icon: <Globe className="w-4 h-4" />, text: "Full Stack Web" },
    { icon: <Zap className="w-4 h-4" />, text: "Mobile Apps" },
    { icon: <Brain className="w-4 h-4" />, text: "Custom AI Models" },
];

const stats = [
    { icon: <Rocket className="w-6 h-6" />, value: "10+", label: "Projects Delivered", color: "text-indigo-400" },
    { icon: <Star className="w-6 h-6" />, value: "100%", label: "Client Satisfaction", color: "text-amber-500" },
    { icon: <Clock className="w-6 h-6" />, value: "<24h", label: "Response Time", color: "text-emerald-500" },
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
        <section ref={ref} id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0A0A0A] pt-28 pb-20">
            {/* Animated floating background orbs */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <motion.div
                    animate={{
                        x: [0, 80, -40, 0],
                        y: [0, 40, -80, 0],
                        scale: [1, 1.3, 0.9, 1]
                    }}
                    transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                    className="absolute top-[5%] left-[15%] w-[500px] h-[500px] bg-indigo-600/15 rounded-full blur-[150px]"
                />
                <motion.div
                    animate={{
                        x: [0, -80, 40, 0],
                        y: [0, -40, 80, 0],
                        scale: [1, 0.8, 1.2, 1]
                    }}
                    transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
                    className="absolute bottom-[5%] right-[10%] w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[180px]"
                />
                <motion.div
                    animate={{
                        x: [0, 60, -60, 0],
                        y: [0, 80, -40, 0],
                        scale: [0.9, 1.1, 0.8, 0.9]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute top-[50%] left-[50%] w-[350px] h-[350px] bg-purple-500/10 rounded-full blur-[120px]"
                />
            </div>

            {/* Subtle grid overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:72px_72px] pointer-events-none" />

            {/* Radial vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#0A0A0A_75%)] pointer-events-none" />

            <motion.div style={{ y, opacity }} className="container mx-auto px-6 max-w-7xl relative z-10 w-full">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center pt-8">

                    {/* Left Column: Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="relative hidden lg:flex justify-center items-center"
                    >
                        {/* Image Backdrop Glow */}
                        <div className="absolute inset-0 bg-white/[0.07] blur-3xl rounded-full scale-90" />

                        <div className="relative w-full max-w-md xl:max-w-lg aspect-[3/4] z-10">
                            <Image
                                src="/images/works-hero-trans.png"
                                alt="Aadarsh Pandit pointing"
                                fill
                                priority
                                className="object-contain drop-shadow-2xl"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                            />
                        </div>
                    </motion.div>

                    {/* Right Column: Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="flex flex-col items-center lg:items-start text-center lg:text-left"
                    >
                        {/* Image hidden on small screens per user request */}
                        {/* Availability Badge */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-green-500/25 bg-green-500/5 backdrop-blur-sm mb-8"
                        >
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                            </span>
                            <span className="text-green-400 text-sm font-medium tracking-wide">Available for Freelance Projects</span>
                        </motion.div>

                        {/* Main Heading */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.15, duration: 0.7 }}
                        >
                            <h1 className="text-5xl sm:text-6xl md:text-7xl xl:text-[5.5rem] font-bold font-heading leading-[1.05] tracking-tight">
                                <span className="text-white block">Let&apos;s Build</span>
                                <span className="relative inline-block mt-2">
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-100 via-white to-gray-300">
                                        Something Great
                                    </span>
                                    {/* Glow behind the gradient text */}
                                    <span className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-r from-gray-100 via-white to-gray-300 blur-2xl opacity-20 pointer-events-none" aria-hidden="true">
                                        Something Great
                                    </span>
                                </span>
                            </h1>
                        </motion.div>

                        {/* Subheading */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.35, duration: 0.6 }}
                            className="text-lg md:text-xl text-gray-400 max-w-xl leading-relaxed mt-6"
                        >
                            I design and develop high-performance websites, mobile apps, and custom AI solutions that help businesses{" "}
                            <span className="text-white font-semibold">scale</span>.
                        </motion.p>

                        {/* Service highlight pills */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.6 }}
                            className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mt-8"
                        >
                            {highlights.map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.55 + i * 0.1 }}
                                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.08] text-gray-400 text-sm font-medium hover:border-white/20 hover:bg-white/[0.06] transition-all duration-300"
                                >
                                    <span className="text-indigo-400">{item.icon}</span>
                                    <span>{item.text}</span>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* CTAs */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.6 }}
                            className="flex flex-col sm:flex-row items-center gap-4 mt-10 w-full sm:w-auto"
                        >
                            <motion.button
                                whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(255, 255, 255, 0.1)" }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => scrollToSection('contact')}
                                className="w-full sm:w-auto px-8 py-4 rounded-full text-lg font-semibold text-black bg-white hover:bg-gray-100 transition-all duration-300 shadow-xl shadow-white/10 flex items-center justify-center gap-2"
                            >
                                Get a Free Consultation
                                <ArrowRight className="w-5 h-5" />
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => scrollToSection('services')}
                                className="w-full sm:w-auto px-8 py-4 rounded-full text-lg font-semibold text-gray-300 border border-white/10 hover:border-white/25 hover:bg-white/5 backdrop-blur-sm transition-all duration-300 group flex items-center justify-center gap-2"
                            >
                                See Services <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </motion.button>
                        </motion.div>

                    </motion.div>
                </div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block"
            >
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="w-6 h-10 border-2 border-white/15 rounded-full flex justify-center pt-2"
                >
                    <div className="w-1 h-2 bg-white/30 rounded-full" />
                </motion.div>
            </motion.div>
        </section>
    );
}

