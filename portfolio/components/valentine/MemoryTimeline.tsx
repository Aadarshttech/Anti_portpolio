"use client";

import { motion } from "framer-motion";
import { Heart, Camera } from "lucide-react";
import Image from "next/image";

const memories = [
    { src: "/memories/IMG_20241215_215532_352.webp", date: "December 2024", caption: "Simply us 💕", orientation: "portrait" },
    { src: "/memories/IMG_20241220_152842.webp", date: "December 2024", caption: "Creating memories one day at a time 🗓️", orientation: "portrait" },
    { src: "/memories/IMG_20250103_165355.webp", date: "January 2025", caption: "Love you to the moon and back 🌙", orientation: "landscape" },
    { src: "/memories/IMG_20250124_120103.webp", date: "January 2025", caption: "Simply us 💕", orientation: "portrait" },
    { src: "/memories/IMG_20250124_120339.webp", date: "January 2025", caption: "My favorite hello and hardest goodbye 💑", orientation: "portrait" },
    { src: "/memories/IMG_20250202_160151.webp", date: "February 2025", caption: "Your laugh is my favorite sound 🎶", orientation: "portrait" },
    { src: "/memories/IMG_20250227_140706.webp", date: "February 2025", caption: "My forever valentine 💘", orientation: "landscape" },
    { src: "/memories/IMG_20250712_123519.webp", date: "July 2025", caption: "Love you to the moon and back 🌙", orientation: "portrait" },
    { src: "/memories/IMG_20250719_185706.webp", date: "July 2025", caption: "You complete me 🧩", orientation: "landscape" },
    { src: "/memories/IMG_20250801_191104.webp", date: "August 2025", caption: "Adventures with you are the best 🌍", orientation: "landscape" },
    { src: "/memories/IMG_20250815_125716.webp", date: "August 2025", caption: "Life is better with you by my side 🌈", orientation: "portrait" },
    { src: "/memories/IMG_20260130_114113.webp", date: "January 2026", caption: "Creating memories one day at a time 🗓️", orientation: "portrait" },
    { src: "/memories/IMG_4945.webp", date: "2024-2025", caption: "Every moment with you is magic ✨", orientation: "landscape" },
    { src: "/memories/IMG_5077.webp", date: "2024-2025", caption: "Collecting beautiful moments with you 📸", orientation: "landscape" },
    { src: "/memories/Screenshot_2024-12-01-19-16-28-48_1c337646f29875672b5a61192b9010f9.webp", date: "December 2024", caption: "Simply us 💕", orientation: "portrait" },
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

        <div className="max-w-4xl mx-auto relative">
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
                    <div className={`flex-1 ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12 md:text-left"} text-center`}>
                        <motion.div
                            whileHover={{ scale: 1.03, y: -4 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            className="bg-white/70 backdrop-blur-sm rounded-2xl p-3 shadow-lg inline-block group cursor-default border border-pink-100"
                            style={{ maxWidth: mem.orientation === "landscape" ? "380px" : "280px" }}
                        >
                            <div className={`rounded-xl mb-3 overflow-hidden relative ${mem.orientation === "landscape" ? "aspect-video" : "aspect-[3/4]"}`}>
                                <Image
                                    src={mem.src}
                                    alt={mem.caption}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    loading="lazy"
                                />
                            </div>
                            <p className="text-xs text-pink-500 font-semibold tracking-wider uppercase mb-1">{mem.date}</p>
                            <p className="text-base font-semibold text-gray-800">{mem.caption}</p>
                        </motion.div>
                    </div>

                    <motion.div
                        className="hidden md:flex w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 text-white items-center justify-center z-10 shrink-0 shadow-lg"
                        whileInView={{ scale: [0.5, 1.2, 1] }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <Heart size={16} fill="currentColor" />
                    </motion.div>

                    <div className="flex-1" />
                </motion.div>
            ))}
        </div>
    </section>
);

export default MemoryTimeline;
