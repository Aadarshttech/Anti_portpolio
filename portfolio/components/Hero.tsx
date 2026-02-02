"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Code, Sparkles, Brain } from "lucide-react";

export function Hero() {
    return (
        <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-gradient-to-br from-orange-50 via-white to-blue-50">

            {/* Background Blobs */}
            <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl -z-10 animate-pulse" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-100 rounded-full blur-3xl -z-10" />

            <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-6"
                >
                    <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-orange-100">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                        </span>
                        <span className="text-sm font-medium text-gray-600">Available for projects</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold font-heading leading-tight text-gray-900">
                        Hy! I Am <br />
                        <span className="text-primary">Aadarsh Pandit</span>
                    </h1>

                    <p className="text-lg md:text-xl text-gray-600 max-w-lg">
                        BTech AI Student & Machine Learning Enthusiast.
                        Building intelligent systems that solve real-world problems.
                    </p>

                    <div className="flex flex-wrap gap-4 pt-4">
                        <Button size="lg" className="rounded-full px-8 text-lg" onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
                            View My Work
                        </Button>
                        <Button variant="outline" size="lg" className="rounded-full px-8 text-lg group" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                            Contact Me <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </div>

                    <div className="pt-8 flex items-center gap-8 text-gray-500">
                        <div className="flex items-center gap-2">
                            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                                <Brain size={20} />
                            </div>
                            <span className="font-medium">AI/ML Expert</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="p-2 bg-orange-50 text-orange-600 rounded-lg">
                                <Code size={20} />
                            </div>
                            <span className="font-medium">Full Stack Dev</span>
                        </div>
                    </div>
                </motion.div>

                {/* Image / Visuals */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="relative flex justify-center"
                >
                    <div className="relative w-[350px] h-[450px] md:w-[450px] md:h-[550px]">
                        {/* Decorative Elements around image */}
                        <motion.div
                            animate={{ y: [-10, 10, -10] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute top-10 -left-10 z-20 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3 border border-gray-100"
                        >
                            <div className="bg-orange-100 p-2 rounded-lg text-orange-600">
                                <Sparkles size={24} />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">Experience</p>
                                <p className="font-bold text-gray-900">1+ Years</p>
                            </div>
                        </motion.div>

                        <motion.div
                            animate={{ y: [10, -10, 10] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute bottom-20 -right-5 z-20 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3 border border-gray-100"
                        >
                            <div className="bg-green-100 p-2 rounded-lg text-green-600">
                                <Code size={24} />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">Projects</p>
                                <p className="font-bold text-gray-900">10+ Done</p>
                            </div>
                        </motion.div>

                        {/* Main Image Container */}
                        <div className="absolute inset-0 bg-gradient-to-b from-orange-200 to-orange-50 rounded-[40px] rotate-3 transform transition-transform hover:rotate-0 duration-500"></div>
                        <div className="relative h-full w-full overflow-hidden rounded-[40px] border-4 border-white shadow-2xl bg-white/50 backdrop-blur-sm">
                            <Image
                                src="/transparent2.png"
                                alt="Aadarsh Pandit"
                                fill
                                className="object-cover object-top hover:scale-105 transition-transform duration-700"
                                priority
                            />
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
