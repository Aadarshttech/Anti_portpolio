"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, ArrowUpRight, BarChart, CheckCircle2 } from "lucide-react";
import Image from "next/image";

const caseStudies = [
    {
        title: "Nepali ASR System",
        client: "University AI Research",
        category: "Machine Learning",
        challenge: "Developing an accurate Automatic Speech Recognition (ASR) system for Nepali, a low-resource language.",
        approach: "Fine-tuned OpenAI's Whisper model using 50,000+ custom audio pairs and RLHF.",
        tags: ["Python", "PyTorch", "Whisper"],
        image: "/images/asr.png",
        fit: "cover" as const,
        gradient: "from-emerald-500 to-teal-400",
        links: { code: "https://github.com/Aadarshttech" }
    },
    {
        title: "Karyantra Hive",
        client: "Karyantra Corp",
        category: "Corporate Website",
        challenge: "Karyantra needed a professional, highly performant website managed by their marketing team.",
        approach: "Built a responsive Next.js frontend integrated with a seamless CMS backend.",
        tags: ["Next.js", "React", "CMS"],
        image: "/images/karyantra_logo.png",
        fit: "contain" as const,
        gradient: "from-blue-500 to-indigo-400",
        links: { demo: "https://karyantrahive.com.np/", code: "https://github.com/Aadarshttech" },
        demoLabel: "Live Site"
    },
    {
        title: "Cricket Predictor",
        client: "Sports Analytics",
        category: "Web App + ML",
        challenge: "Creating an interactive, real-time tool to predict cricket match outcomes based on historical granular data.",
        approach: "Developed a Random Forest model on the backend with a React dashboard.",
        tags: ["React", "FastAPI", "Scikit"],
        image: "/images/can-logo.png",
        fit: "contain" as const,
        gradient: "from-purple-500 to-pink-400",
        links: { demo: "/nepal-cricket/index.html", code: "https://github.com/Aadarshttech" }
    }
];

export function CaseStudies() {
    return (
        <section id="work" className="py-28 bg-[#0A0A0A] relative overflow-hidden">
            {/* Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600/5 rounded-full blur-[150px] pointer-events-none" />

            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="max-w-2xl"
                    >
                        <span className="text-cyan-400 font-semibold tracking-wider uppercase text-sm">Past Work</span>
                        <h2 className="text-4xl md:text-5xl font-bold font-heading mt-3 text-white">
                            Project{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Gallery</span>
                        </h2>
                        <p className="text-gray-500 mt-5 text-lg">
                            A curated collection of my recent freelance projects and technical builds. Scalable grid layout ready for more.
                        </p>
                    </motion.div>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="hidden md:flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 text-gray-400 hover:text-white hover:border-white/20 transition-all duration-300 bg-white/[0.02] backdrop-blur-sm"
                        onClick={() => window.open("https://github.com/Aadarshttech", "_blank")}
                    >
                        <Github size={18} /> View GitHub
                    </motion.button>
                </div>

                {/* Gallery Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {caseStudies.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true, margin: "-50px" }}
                            className="group flex flex-col rounded-3xl bg-white/[0.02] border border-white/5 hover:border-white/15 transition-all duration-500 overflow-hidden hover:shadow-2xl hover:shadow-indigo-500/10"
                        >
                            {/* Image Header */}
                            <div className="h-[240px] w-full relative overflow-hidden flex items-center justify-center border-b border-white/5 group-hover:border-white/10 transition-colors duration-500 bg-[#0F1219]">
                                {/* Sweeping reflection effect on hover */}
                                <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 z-20 pointer-events-none" />

                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className={`${project.fit === 'contain' ? 'object-contain p-8' : 'object-cover'} group-hover:scale-105 transition-transform duration-700 ease-[0.22,1,0.36,1] z-10`}
                                />
                                {project.fit === 'cover' && <div className="absolute inset-0 bg-gradient-to-t from-[#0F1219] via-[#0F1219]/20 to-transparent opacity-80 z-10" />}

                                <div className="absolute top-4 left-4 z-30">
                                    <span className="text-[10px] font-bold text-white bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 shadow-lg tracking-wider uppercase">
                                        {project.category}
                                    </span>
                                </div>
                            </div>

                            {/* Content Body */}
                            <div className="p-8 flex flex-col flex-grow relative">
                                {/* Subtle inner glow on hover */}
                                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-5 blur-2xl rounded-full transition-opacity duration-700 pointer-events-none`} />

                                <div className="mb-2 text-xs font-semibold text-indigo-400 tracking-wide uppercase">
                                    Client: {project.client}
                                </div>
                                <h3 className="text-2xl font-bold font-heading text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:to-cyan-400 transition-all duration-300">
                                    {project.title}
                                </h3>

                                <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow">
                                    {project.challenge} {project.approach}
                                </p>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2 mb-8">
                                    {project.tags.map(tag => (
                                        <span key={tag} className="text-xs font-medium text-gray-400 bg-white/5 border border-white/5 px-3 py-1.5 rounded-md">
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* Actions Footer */}
                                <div className="flex items-center gap-3 mt-auto pt-6 border-t border-white/5">
                                    {project.links.demo && project.links.demo !== "#" && (
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => window.open(project.links.demo!, project.links.demo!.startsWith('/') ? '_self' : '_blank')}
                                            className={`flex-1 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r ${project.gradient} flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all`}
                                        >
                                            {project.demoLabel || "View Live"} <ArrowUpRight className="w-4 h-4" />
                                        </motion.button>
                                    )}
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => window.open(project.links.code, '_blank')}
                                        className={`flex-1 py-2.5 rounded-xl text-sm font-semibold text-gray-300 border border-white/10 hover:text-white hover:border-white/20 hover:bg-white/5 flex items-center justify-center gap-2 transition-all`}
                                    >
                                        <Github size={16} /> Source
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Mobile Github Button */}
                <div className="mt-16 text-center md:hidden">
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center justify-center gap-2 w-full py-4 rounded-xl border border-white/10 text-gray-400 hover:text-white bg-white/[0.02] transition-all"
                        onClick={() => window.open("https://github.com/Aadarshttech", "_blank")}
                    >
                        <Github size={18} /> View GitHub Profile
                    </motion.button>
                </div>
            </div>
        </section>
    );
}
