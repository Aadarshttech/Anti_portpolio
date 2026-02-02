"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";

const projects = [
    {
        title: "Nepali ASR System with RLHF",
        category: "AI / NLP Research",
        description: "A pioneering speech-to-text system for Nepali language using OpenAI's Whisper model fine-tuned with 50k+ audio pairs. Implements Reinforcement Learning with Human Feedback (RLHF) to optimize accuracy for low-resource languages.",
        tags: ["Python", "PyTorch", "Whisper", "RLHF", "PPO"],
        image: "/images/asr.png",
        fit: "cover",
        links: { demo: "#", code: "https://github.com/Aadarshttech" }
    },
    {
        title: "Nepal Cricket Score Predictor",
        category: "Web App + ML",
        description: "Interactive dashboard comparing Nepal's cricket team performance. Uses Random Forest algorithms to predict match outcomes based on toss, venue, and opposition data with real-time visualization.",
        tags: ["React", "FastAPI", "Scikit Level", "Random Forest", "Data Viz"],
        image: "/images/cricket.png",
        fit: "cover",
        links: { demo: "/nepal-cricket/index.html", code: "https://github.com/Aadarshttech" }
    },
    {
        title: "Karyantra Hive",
        category: "Web Development",
        description: "Professional corporate website for Karyantra, delivering a robust online presence. Features include responsive design, custom CMS integration, and performance-optimized architecture.",
        tags: ["React", "Tailwind", "Responsive Design", "UI/UX"],
        image: "/images/karyantra_logo.png",
        fit: "contain",
        links: { demo: "https://karyantrahive.com.np/", code: "https://github.com/Aadarshttech" }
    }
];

export function Projects() {
    return (
        <section id="projects" className="py-20 bg-gray-50">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
                    <div className="max-w-2xl">
                        <span className="text-primary font-semibold tracking-wider uppercase text-sm">Portfolio</span>
                        <h2 className="text-3xl md:text-4xl font-bold font-heading mt-2">Recent Projects</h2>
                        <p className="text-gray-600 mt-4">
                            A showcase of my journey in building intelligent systems and web solutions.
                        </p>
                    </div>
                    <Button variant="outline" className="hidden md:flex" onClick={() => window.open("https://github.com/Aadarshttech", "_blank")}>View Github</Button>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group rounded-3xl bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col"
                        >
                            {/* Project Image Area */}
                            <div className={`h-48 w-full relative overflow-hidden flex items-center justify-center ${project.fit === 'contain' ? 'p-8 bg-gray-50' : 'bg-black/5'} group-hover:bg-gray-100 transition-colors`}>
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className={`${project.fit === 'contain' ? 'object-contain p-4' : 'object-cover'} group-hover:scale-110 transition-transform duration-500`}
                                />
                                {project.fit === 'cover' && <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-colors" />}
                            </div>

                            <div className="p-6 flex flex-col flex-grow">
                                <div className="mb-4">
                                    <span className="text-xs font-semibold text-primary bg-orange-50 px-3 py-1 rounded-full">
                                        {project.category}
                                    </span>
                                </div>
                                <h3 className="text-lg font-bold mb-3 font-heading group-hover:text-primary transition-colors line-clamp-1">{project.title}</h3>
                                <p className="text-gray-600 mb-6 text-sm leading-relaxed line-clamp-3">
                                    {project.description}
                                </p>

                                <div className="mt-auto">
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {project.tags.map(tag => (
                                            <span key={tag} className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-md">
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                                        <a href={project.links.code} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-primary transition-colors">
                                            <Github size={18} /> Code
                                        </a>
                                        <a href={project.links.demo} target={project.links.demo.startsWith('/') ? '_self' : '_blank'} className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-primary transition-colors">
                                            <ExternalLink size={18} /> Live Demo
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-12 text-center md:hidden">
                    <Button variant="outline" onClick={() => window.open("https://github.com/Aadarshttech", "_blank")}>View Github</Button>
                </div>
            </div>
        </section>
    );
}
