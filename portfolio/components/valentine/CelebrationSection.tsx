"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Heart } from "lucide-react";

const CelebrationSection = () => {
    const ref = useRef<HTMLDivElement>(null);
    const [fired, setFired] = useState(false);

    const hearts = useMemo(
        () =>
            Array.from({ length: 14 }, (_, i) => ({
                id: i,
                left: Math.random() * 100,
                duration: 5 + Math.random() * 6,
                delay: Math.random() * 5,
                size: 18 + Math.random() * 16,
                emoji: ["💕", "💖", "💗", "❤️", "🩷", "💘"][i % 6],
            })),
        []
    );

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !fired) {
                    setFired(true);
                    const fire = (opts: confetti.Options) =>
                        confetti({ ...opts, colors: ["#e8a0bf", "#d4a0a0", "#f2c4c4", "#ffd6e0", "#ffb6c1", "#c9a0dc", "#f5e6cc"] });

                    fire({ particleCount: 80, spread: 80, origin: { y: 0.7, x: 0.3 }, scalar: 1.3 });
                    setTimeout(() => fire({ particleCount: 80, spread: 80, origin: { y: 0.7, x: 0.7 }, scalar: 1.3 }), 200);
                    setTimeout(() => fire({ particleCount: 100, spread: 160, origin: { y: 0.5 }, ticks: 300 }), 600);
                    setTimeout(() => fire({ particleCount: 50, spread: 200, origin: { y: 0.3 }, ticks: 250 }), 1000);
                }
            },
            { threshold: 0.4 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [fired]);

    return (
        <section
            ref={ref}
            className="relative min-h-screen flex items-center justify-center py-24 px-4 overflow-hidden bg-gradient-to-b from-amber-50 via-pink-100 to-pink-200"
        >
            {hearts.map((h) => (
                <span
                    key={h.id}
                    className="absolute animate-float-heart"
                    style={{
                        left: `${h.left}%`,
                        animationDuration: `${h.duration}s`,
                        animationDelay: `${h.delay}s`,
                        fontSize: h.size,
                        animationIterationCount: "infinite",
                        opacity: 0.4,
                    }}
                >
                    {h.emoji}
                </span>
            ))}

            <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, type: "spring", bounce: 0.3 }}
                className="relative z-10 text-center max-w-lg"
            >
                <motion.div
                    animate={{ scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                    <span className="text-7xl md:text-9xl block mb-8">💕</span>
                </motion.div>

                <h2 className="text-4xl md:text-7xl font-bold text-gray-800 mb-6 leading-tight">
                    Happy Valentine&apos;s Day,
                    <br />
                    <span className="bg-gradient-to-r from-pink-500 via-rose-400 to-pink-500 bg-clip-text text-transparent">Babe!</span>
                </h2>

                <p className="text-xl md:text-2xl text-gray-500 mb-10" style={{ fontFamily: "'Dancing Script', cursive" }}>
                    Here&apos;s to forever with you 🥂
                </p>

                <motion.div
                    className="inline-flex items-center gap-2 text-2xl md:text-3xl text-pink-500 font-bold"
                    style={{ fontFamily: "'Dancing Script', cursive" }}
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                    With all my love,
                </motion.div>
                <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-500 via-rose-400 to-pink-500 bg-clip-text text-transparent mt-2">
                    Sanu Pu 💘
                </p>

                <motion.div
                    className="mt-12 flex justify-center gap-3"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1 }}
                >
                    {[...Array(5)].map((_, i) => (
                        <motion.div
                            key={i}
                            animate={{ y: [0, -8, 0] }}
                            transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity }}
                        >
                            <Heart size={20} className="text-pink-400" fill="currentColor" />
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>
        </section>
    );
};

export default CelebrationSection;
