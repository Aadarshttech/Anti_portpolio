"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";

const notes = [
    "You make my heart skip a beat every single time 💓",
    "I fall in love with you more every day 🌹",
    "Your smile is my favorite thing in the world 😊",
    "I'm so lucky to have you in my life 🍀",
    "You're my best friend and my greatest love 💑",
    "Every moment with you feels like magic ✨",
    "You make even ordinary days feel extraordinary 🌟",
    "I love the way you laugh — it's contagious 😄",
    "You are my today and all of my tomorrows 💍",
    "Thank you for being unapologetically YOU 💖",
];

const cardColors = [
    "from-pink-100/80 to-rose-50/60",
    "from-purple-100/80 to-violet-50/60",
    "from-amber-100/80 to-yellow-50/60",
    "from-sky-100/80 to-blue-50/60",
    "from-emerald-100/80 to-green-50/60",
    "from-orange-100/80 to-amber-50/60",
    "from-rose-100/80 to-pink-50/60",
    "from-indigo-100/80 to-purple-50/60",
    "from-teal-100/80 to-cyan-50/60",
    "from-fuchsia-100/80 to-pink-50/60",
];

const LoveNotes = () => {
    const [revealedIndex, setRevealedIndex] = useState<number | null>(null);

    return (
        <section className="py-24 px-4 bg-gradient-to-b from-white via-pink-50 to-pink-100">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-14"
            >
                <motion.div
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-100 text-pink-500 text-sm font-medium mb-6"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                >
                    <Heart size={14} fill="currentColor" />
                    Just For You
                </motion.div>
                <h2 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
                    Love Notes 💌
                </h2>
                <p className="text-lg text-gray-500" style={{ fontFamily: "'Dancing Script', cursive" }}>
                    Tap a card to reveal a little surprise
                </p>
            </motion.div>

            <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-4">
                {notes.map((note, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                        onClick={() => setRevealedIndex(revealedIndex === i ? null : i)}
                        whileHover={{ scale: 1.05, rotate: -1 }}
                        whileTap={{ scale: 0.97 }}
                        className={`relative rounded-2xl p-4 bg-gradient-to-br ${cardColors[i]} backdrop-blur-sm cursor-pointer min-h-[130px] flex items-center justify-center text-center shadow-md hover:shadow-lg transition-shadow`}
                        style={{ perspective: 600 }}
                    >
                        <AnimatePresence mode="wait">
                            {revealedIndex === i ? (
                                <motion.p
                                    key="revealed"
                                    initial={{ rotateY: 90, opacity: 0 }}
                                    animate={{ rotateY: 0, opacity: 1 }}
                                    exit={{ rotateY: -90, opacity: 0 }}
                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                    className="text-lg text-gray-800 leading-snug"
                                    style={{ fontFamily: "'Dancing Script', cursive" }}
                                >
                                    {note}
                                </motion.p>
                            ) : (
                                <motion.div
                                    key="hidden"
                                    initial={{ rotateY: -90, opacity: 0 }}
                                    animate={{ rotateY: 0, opacity: 1 }}
                                    exit={{ rotateY: 90, opacity: 0 }}
                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                    className="flex flex-col items-center gap-2"
                                >
                                    <span className="text-4xl">💌</span>
                                    <span className="text-xs text-gray-500 font-medium">tap me</span>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default LoveNotes;
