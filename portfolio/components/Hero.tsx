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
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: {
                                staggerChildren: 0.2
                            }
                        }
                    }}
                    className="space-y-6"
                >
                    <motion.div
                        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                        className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-orange-100"
                    >
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                        </span>
                        <span className="text-sm font-medium text-gray-600">Available for projects</span>
                    </motion.div>

                    <motion.h1
                        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                        className="text-5xl sm:text-6xl md:text-7xl font-extrabold font-heading tracking-tight leading-[1.08] text-slate-900"
                    >
                        Hi, I&apos;m <br />
                        <span className="text-primary tracking-tight">Aadarsh Pandit</span>
                    </motion.h1>

                    <motion.p
                        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                        className="text-lg md:text-xl text-gray-600 max-w-lg"
                    >
                        AI & Web Developer building websites, apps & intelligent systems
                        that help businesses grow.
                    </motion.p>

                    <motion.div
                        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                        className="flex flex-wrap gap-4 pt-4"
                    >
                        <Button size="lg" className="rounded-full px-8 text-lg" onClick={() => window.location.href = '/works'}>
                            View My Work
                        </Button>
                        <Button variant="outline" size="lg" className="rounded-full px-8 text-lg group" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                            Contact Me <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </motion.div>

                    <motion.div
                        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                        className="pt-8 flex flex-wrap items-center gap-4 sm:gap-8 text-gray-500"
                    >
                        <div className="flex items-center gap-2">
                            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                                <Brain size={20} />
                            </div>
                            <span className="font-medium whitespace-nowrap">AI/ML Enthusiast</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="p-2 bg-orange-50 text-orange-600 rounded-lg">
                                <Code size={20} />
                            </div>
                            <span className="font-medium whitespace-nowrap">Full Stack Dev</span>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Image / Visuals */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="relative flex justify-center mt-16 md:mt-8 translate-y-8 md:translate-y-12"
                >
                    {/* Visual Group - Scaled up */}
                    <div className="relative w-[350px] h-[450px] md:w-[450px] md:h-[550px] flex items-end justify-center scale-110 md:scale-125 lg:scale-[1.35] origin-center">
                        
                        {/* Exact Precision Orange Background SVG */}
                        <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none transform -translate-y-6">
                            <svg viewBox="0 0 500 500" className="w-[130%] h-[130%] text-[#FF9A3D]" xmlns="http://www.w3.org/2000/svg">
                                {/* Light orange blob underneath for depth (optional, based on design) */}
                                <path d="M364.5 135.5C402.5 176 434.5 230.5 415.5 274.5C396.5 318.5 326.5 352 262.5 368.5C198.5 385 140.5 384.5 93 354C45.5 323.5 8.5 263 7 203.5C5.5 144 39.5 85.5 97.5 54C155.5 22.5 237.5 18 294.5 42.5C351.5 67 326.5 95 364.5 135.5Z" 
                                      fill="#FFF0E0" transform="translate(10, 40) scale(1.1)"/>

                                {/* Left curved swoosh */}
                                <path d="M 120 280 C 50 250, 40 150, 110 100" stroke="currentColor" strokeWidth="4" fill="none" />
                                
                                {/* Right curved swoosh */}
                                <path d="M 370 340 C 460 360, 490 250, 420 200" stroke="currentColor" strokeWidth="4" fill="none" />
                                {/* Right swoosh arrow head */}
                                <path d="M 458 318 L 472 334 M 458 318 L 444 322" stroke="currentColor" strokeWidth="4" fill="none" />

                                {/* Main Orange Blob */}
                                <path d="M374.5 125.5C412.5 166 444.5 220.5 425.5 264.5C406.5 308.5 336.5 342 272.5 358.5C208.5 375 150.5 374.5 103 344C55.5 313.5 18.5 253 17 193.5C15.5 134 49.5 75.5 107.5 44C165.5 12.5 247.5 8 304.5 32.5C361.5 57 336.5 85 374.5 125.5Z" 
                                      fill="currentColor" transform="translate(20, 30) scale(1.05)"/>
                                      
                                {/* Dots top right */}
                                <g fill="#D3C1B5" opacity="0.6" transform="translate(420, 60)">
                                    <circle cx="0" cy="0" r="3"/><circle cx="20" cy="0" r="3"/><circle cx="40" cy="0" r="3"/><circle cx="60" cy="0" r="3"/>
                                    <circle cx="0" cy="20" r="3"/><circle cx="20" cy="20" r="3"/><circle cx="40" cy="20" r="3"/><circle cx="60" cy="20" r="3"/>
                                    <circle cx="0" cy="40" r="3"/><circle cx="20" cy="40" r="3"/><circle cx="40" cy="40" r="3"/><circle cx="60" cy="40" r="3"/>
                                    <circle cx="0" cy="60" r="3"/><circle cx="20" cy="60" r="3"/><circle cx="40" cy="60" r="3"/><circle cx="60" cy="60" r="3"/>
                                </g>
                                
                                {/* Sparks top center */}
                                <g stroke="currentColor" strokeWidth="5" strokeLinecap="round" transform="translate(260, 30)">
                                    <line x1="-20" y1="20" x2="-35" y2="0" />
                                    <line x1="5" y1="5" x2="25" y2="-20" />
                                    <line x1="30" y1="30" x2="55" y2="30" />
                                </g>
                            </svg>
                        </div>



                        {/* Main Image Container */}
                        <div className="absolute z-10 inset-0 w-full h-full pointer-events-none">
                            <Image
                                src="/images/hero-new.png"
                                alt="Aadarsh Pandit"
                                fill
                                className="object-contain object-center scale-[1.35] -translate-y-12 drop-shadow-2xl pointer-events-auto"
                                priority
                            />
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
