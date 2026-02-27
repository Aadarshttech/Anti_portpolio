"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";

const projects = [
    {
        title: "Mango Pandit — Scrollytelling",
        category: "Creative Dev",
        description: "An Awwwards-inspired scrollytelling product page with 194-frame canvas animation synced to scroll via Framer Motion. Features a full e-commerce UI with cart, toast notifications, and dark-mode shop section.",
        tags: ["Next.js", "Framer Motion", "Canvas API", "Scroll Animation"],
        image: "/projects/beverages/mango-frames/frame_00090.jpg",
        fit: "cover",
        links: { demo: "/projects/beverages", code: "https://github.com/Aadarshttech" }
    },
    {
        title: "Reward-Guided Finetuning for Nepali ASR",
        category: "AI / NLP Research",
        description: "A speech-to-text pipeline for Nepali built on OpenAI Whisper, fine-tuned with 50k+ audio pairs and optimized through reward-guided RLHF training to push accuracy on a low-resource language.",
        tags: ["Python", "PyTorch", "Whisper", "RLHF", "PPO"],
        image: "/images/asr-hero-light.svg",
        fit: "cover",
        links: { demo: "", code: "https://github.com/Aadarshttech" }
    },
    {
        title: "Nepal Cricket Match Predictor",
        category: "Web App + ML",
        description: "Real-time dashboard that predicts Nepal cricket match outcomes using a Random Forest model trained on toss, venue, and opposition stats — paired with interactive data visualizations.",
        tags: ["React", "FastAPI", "Scikit-learn", "Random Forest", "Data Viz"],
        image: "/images/can-logo.png",
        fit: "contain",
        links: { demo: "/nepal-cricket/index.html", code: "https://github.com/Aadarshttech" }
    },
    {
        title: "Karyantra Hive",
        category: "Web Development",
        description: "Corporate website for Karyantra featuring responsive layouts, custom CMS integration, and performance-optimized architecture for a fast, professional online presence.",
        tags: ["React", "Tailwind", "Responsive Design", "UI/UX"],
        image: "/images/karyantra_logo.png",
        fit: "contain",
        links: { demo: "https://karyantrahive.com.np/", code: "https://github.com/Aadarshttech" },
        demoLabel: "Visit Site"
    }
];

export function Projects() {
    return (
        <section id="projects" className="py-20 bg-gray-50">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={{
                            hidden: { opacity: 0 },
                            visible: {
                                opacity: 1,
                                transition: { staggerChildren: 0.1 }
                            }
                        }}
                        className="max-w-2xl"
                    >
                        <motion.span variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="text-primary font-semibold tracking-wider uppercase text-sm">Portfolio</motion.span>
                        <motion.h2 variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="text-3xl md:text-4xl font-bold font-heading mt-2">Recent Projects</motion.h2>
                        <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="text-gray-600 mt-4">
                            A showcase of my journey in building intelligent systems and web solutions.
                        </motion.p>
                    </motion.div>
                    <Button variant="outline" className="hidden md:flex items-center gap-2 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 hover:scale-105" onClick={() => window.open("https://github.com/Aadarshttech", "_blank")}>
                        <Github size={18} />
                        View Github
                    </Button>
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
                                    alt={`${project.title} — ${project.category} Portfolio Project by Aadarsh Pandit`}
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
                                <h3 className="text-lg font-bold mb-3 font-heading group-hover:text-primary transition-colors">{project.title}</h3>
                                <p className="text-gray-600 mb-6 text-sm leading-relaxed">
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
                                        {project.links.demo && project.links.demo !== "#" && (
                                            <a href={project.links.demo} target={project.links.demo.startsWith('/') ? '_self' : '_blank'} className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-primary transition-colors">
                                                <ExternalLink size={18} /> {project.demoLabel || "Live Demo"}
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-12 text-center md:hidden">
                    <Button variant="outline" className="flex items-center gap-2 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 hover:scale-105" onClick={() => window.open("https://github.com/Aadarshttech", "_blank")}>
                        <Github size={18} />
                        View Github
                    </Button>
                </div>
            </div>
        </section>
    );
}
