"use client";

import { motion } from "framer-motion";
import { ArrowRight, Brain, Smartphone, Globe, Rocket, Sparkles } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const services = [
    {
        icon: <Globe className="w-6 h-6" />,
        title: "Web Development",
        desc: "High-performance Next.js architectures built for speed, SEO, and massive scale.",
        gradient: "from-blue-500 to-cyan-400",
        shadow: "group-hover:shadow-blue-500/10",
        delay: 0.1
    },
    {
        icon: <Brain className="w-6 h-6" />,
        title: "AI & Machine Learning",
        desc: "Custom PyTorch & LLM fine-tuning to automate workflows and extract insights.",
        gradient: "from-orange-500 to-amber-400",
        shadow: "group-hover:shadow-orange-500/10",
        delay: 0.2
    },
    {
        icon: <Smartphone className="w-6 h-6" />,
        title: "Mobile Apps",
        desc: "Cross-platform React Native experiences that feel truly native on iOS and Android.",
        gradient: "from-purple-500 to-pink-400",
        shadow: "group-hover:shadow-purple-500/10",
        delay: 0.3
    },
    {
        icon: <Rocket className="w-6 h-6" />,
        title: "Workflow Automation",
        desc: "Connecting APIs and building custom internal tools to multiply your team's output.",
        gradient: "from-emerald-500 to-teal-400",
        shadow: "group-hover:shadow-emerald-500/10",
        delay: 0.4
    }
];

export function Services() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <section id="services" className="py-24 md:py-32 bg-[#FAFBFF] relative overflow-hidden">
            {/* Light Theme Ambient Backgrounds */}
            <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-6 max-w-7xl relative z-10">

                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/5 border border-orange-500/10 text-orange-500 text-sm font-semibold tracking-wide uppercase mb-6"
                    >
                        <Sparkles className="w-4 h-4" /> Specialized Services
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        viewport={{ once: true }}
                        className="text-5xl md:text-6xl lg:text-7xl font-black font-heading leading-[1.1] text-gray-900 mb-6 tracking-tight"
                    >
                        Ready to Bring <br /> Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-500">Ideas to Life?</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="text-gray-500 text-lg md:text-xl leading-relaxed"
                    >
                        From high-performance web applications to custom AI models, I partner with businesses and founders to build software that drives real impact.
                    </motion.p>
                </div>

                {/* Light Premium Bento Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-16">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: service.delay }}
                            viewport={{ once: true }}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            className={`relative group rounded-3xl p-8 lg:p-10 transition-all duration-500 overflow-hidden bg-white border ${hoveredIndex === index
                                    ? `border-gray-200 scale-[1.02] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] ${service.shadow} z-10`
                                    : 'border-gray-100 scale-100 shadow-sm'
                                }`}
                        >
                            {/* Hover Subtle Gradient Background */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-[0.02] transition-opacity duration-500`} />

                            {/* Content */}
                            <div className="relative z-10 flex flex-col h-full">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 ${hoveredIndex === index ? `bg-gradient-to-br ${service.gradient} text-white shadow-lg scale-110` : 'bg-gray-50 text-gray-500 border border-gray-100'
                                    }`}>
                                    {service.icon}
                                </div>

                                <h3 className={`text-2xl font-bold font-heading mb-4 transition-colors duration-300 ${hoveredIndex === index ? 'text-gray-900' : 'text-gray-800'
                                    }`}>
                                    {service.title}
                                </h3>

                                <p className="text-gray-500 text-sm leading-relaxed flex-grow">
                                    {service.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* CTA Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    viewport={{ once: true }}
                    className="flex justify-center"
                >
                    <Link href="/works">
                        <button className="group relative px-8 py-4 bg-gray-900 border border-gray-800 text-white rounded-full font-semibold text-[15px] hover:bg-black transition-all flex items-center gap-3 overflow-hidden shadow-xl shadow-gray-900/10">
                            <span className="relative z-10">Explore My Services & Work</span>
                            <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            {/* Inner Glow Hover Effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </button>
                    </Link>
                </motion.div>

            </div>
        </section>
    );
}
