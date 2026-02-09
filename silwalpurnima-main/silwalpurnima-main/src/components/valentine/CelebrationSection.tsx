import { useEffect, useRef, useState, useMemo } from "react";
import { motion } from "framer-motion";
import * as confetti from "canvas-confetti";
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
                    // Grand finale confetti — multiple timed bursts
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
            className="relative min-h-screen flex items-center justify-center py-24 px-4 overflow-hidden"
        >
            {/* Layered gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-parchment via-blush to-primary/20" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsla(var(--primary),0.1)_0%,_transparent_70%)]" />

            {/* Floating hearts */}
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

                <h2 className="text-4xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
                    Happy Valentine's Day,
                    <br />
                    <span className="text-gradient-romantic">Babe!</span>
                </h2>

                <p className="text-xl md:text-2xl font-handwritten text-muted-foreground mb-10">
                    Here's to forever with you 🥂
                </p>

                <motion.div
                    className="inline-flex items-center gap-2 text-2xl md:text-3xl font-handwritten text-primary font-bold"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                    With all my love,
                </motion.div>
                <p className="text-3xl md:text-4xl font-bold text-gradient-romantic mt-2">
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
                            <Heart size={20} className="text-primary/60" fill="currentColor" />
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>
        </section>
    );
};

export default CelebrationSection;
