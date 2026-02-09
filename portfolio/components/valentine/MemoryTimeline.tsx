"use client";

import { motion } from "framer-motion";
import { Heart, Camera } from "lucide-react";
import Image from "next/image";

const memories = [
    { src: "/memories/IMG_20241215_215532_352.webp", caption: "Cozy moments with you by my side 🥰", date: "December 2024" },
    { src: "/memories/IMG_20241220_152842.webp", caption: "Adventures under the old tree at the park 🌳", date: "December 2024" },
    { src: "/memories/IMG_20250103_165355.webp", caption: "Exploring the wonders of Patan Durbar Square together 🏛️", date: "January 2025" },
    { src: "/memories/IMG_20250124_120103.webp", caption: "Standing tall at the sacred Krishna Mandir 🛕", date: "January 2025" },
    { src: "/memories/IMG_20250124_120339.webp", caption: "Lost in the charm of ancient Newari architecture 💑", date: "January 2025" },
    { src: "/memories/IMG_20250202_160151.webp", caption: "Gate to our forever — heritage vibes at the museum 🚪", date: "February 2025" },
    { src: "/memories/IMG_20250227_140706.webp", caption: "Sun-kissed walks in nature with my love 🌿", date: "February 2025" },
    { src: "/memories/IMG_20250712_123519.webp", caption: "Playful vibes by the rustic blue door 😘", date: "July 2025" },
    { src: "/memories/IMG_20250719_185706.webp", caption: "Evening strolls through colorful neighborhoods 🏘️", date: "July 2025" },
    { src: "/memories/IMG_20250801_191104.webp", caption: "Finding our quiet corner together 🤍", date: "August 2025" },
    { src: "/memories/IMG_20250815_125716.webp", caption: "Mall dates and mirror selfies 🛍️", date: "August 2025" },
    { src: "/memories/IMG_20260130_114113.webp", caption: "Soft kisses in our happy place 💕", date: "January 2026" },
    { src: "/memories/IMG_4945.webp", caption: "Your gaze makes my heart skip a beat 💓", date: "Special Moment" },
    { src: "/memories/IMG_5077.webp", caption: "Golden hour at the garden pavilion ☀️", date: "Special Moment" },
    { src: "/memories/Screenshot_2024-12-01-19-16-28-48_1c337646f29875672b5a61192b9010f9.webp", caption: "Late night love on our way home 🌙", date: "December 2024" },
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

        {/* Uniform Grid Layout */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {memories.map((mem, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: i * 0.05 }}
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="bg-white/80 backdrop-blur-sm rounded-2xl p-3 shadow-lg border border-pink-100 group cursor-default"
                >
                    <div className="aspect-square rounded-xl overflow-hidden relative mb-3">
                        <Image
                            src={mem.src}
                            alt={mem.caption}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                            loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="flex items-start gap-2">
                        <Heart size={14} className="text-pink-400 mt-1 shrink-0" fill="currentColor" />
                        <div>
                            <p className="text-xs text-pink-500 font-semibold tracking-wider uppercase mb-1">{mem.date}</p>
                            <p className="text-sm font-medium text-gray-700 leading-snug">{mem.caption}</p>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    </section>
);

export default MemoryTimeline;
