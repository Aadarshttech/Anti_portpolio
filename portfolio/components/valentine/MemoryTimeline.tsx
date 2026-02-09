"use client";

import { motion } from "framer-motion";
import { Heart, Camera } from "lucide-react";
import Image from "next/image";

const memories = [
    { src: "/memories/IMG_20241215_215532_352.webp", caption: "Cozy Winter Moments Together 🥰" },
    { src: "/memories/IMG_20241220_152842.webp", caption: "Adventures Under the Old Tree 🌳" },
    { src: "/memories/IMG_20250103_165355.webp", caption: "Exploring Patan Durbar Square 🏛️" },
    { src: "/memories/IMG_20250124_120103.webp", caption: "Standing Tall at Krishna Mandir 🛕" },
    { src: "/memories/IMG_20250124_120339.webp", caption: "Lost in Ancient Newari Charm 💑" },
    { src: "/memories/IMG_20250202_160151.webp", caption: "Gate to Our Forever 🚪" },
    { src: "/memories/IMG_20250227_140706.webp", caption: "Sun-Kissed Nature Walks 🌿" },
    { src: "/memories/IMG_20250712_123519.webp", caption: "Playful Vibes by the Blue Door 😘" },
    { src: "/memories/IMG_20250719_185706.webp", caption: "Evening Strolls Together 🏘️" },
    { src: "/memories/IMG_20250801_191104.webp", caption: "Finding Our Quiet Corner 🤍" },
    { src: "/memories/IMG_20250815_125716.webp", caption: "Mall Dates and Mirror Selfies 🛍️" },
    { src: "/memories/IMG_20260130_114113.webp", caption: "Soft Kisses in Our Happy Place 💕" },
    { src: "/memories/IMG_4945.webp", caption: "First Professional Photo Shoot 📸" },
    { src: "/memories/IMG_5077.webp", caption: "Golden Hour at the Garden 🌸" },
    { src: "/memories/Screenshot_2024-12-01-19-16-28-48_1c337646f29875672b5a61192b9010f9.webp", caption: "Late Night Love on Our Way Home 🌙" },
];

const MemoryTimeline = () => (
    <section className="py-24 px-4 bg-gradient-to-b from-pink-50 via-white to-pink-100">
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
        >
            <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-100 text-pink-500 text-sm font-medium mb-6"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
            >
                <Camera size={14} />
                Our Journey Together
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
                Beautiful Memories 💕
            </h2>
            <p className="text-lg text-gray-500" style={{ fontFamily: "'Dancing Script', cursive" }}>
                Each moment with you is a treasure
            </p>
        </motion.div>

        {/* Zigzag Timeline Layout */}
        <div className="max-w-4xl mx-auto relative">
            {/* Center line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-pink-300 to-transparent -translate-x-1/2 hidden md:block" />

            {memories.map((mem, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, x: i % 2 === 0 ? -60 : 60, y: 20 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className={`relative flex items-center mb-16 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                        } flex-col md:flex-row`}
                >
                    {/* Card */}
                    <div className={`flex-1 ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12 md:text-left"} text-center`}>
                        <motion.div
                            whileHover={{ scale: 1.03, y: -4 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            className="bg-white/90 backdrop-blur-sm rounded-2xl p-3 shadow-lg inline-block group cursor-default border border-pink-100 w-full max-w-[280px]"
                        >
                            {/* Square image container */}
                            <div className="aspect-square rounded-xl mb-3 overflow-hidden relative">
                                <Image
                                    src={mem.src}
                                    alt={mem.caption}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    loading="lazy"
                                />
                            </div>
                            {/* Label */}
                            <p className="text-xs text-pink-500 font-semibold tracking-wider uppercase mb-1">Special Moment</p>
                            <p className="text-base font-semibold text-gray-800">{mem.caption}</p>
                        </motion.div>
                    </div>

                    {/* Heart icon in center */}
                    <motion.div
                        className="hidden md:flex w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 text-white items-center justify-center z-10 shrink-0 shadow-lg"
                        whileInView={{ scale: [0.5, 1.2, 1] }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <Heart size={16} fill="currentColor" />
                    </motion.div>

                    {/* Empty space on opposite side */}
                    <div className="flex-1" />
                </motion.div>
            ))}
        </div>
    </section>
);

export default MemoryTimeline;
