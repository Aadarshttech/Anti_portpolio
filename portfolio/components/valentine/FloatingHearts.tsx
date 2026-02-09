"use client";

import { useMemo } from "react";

const FloatingHearts = () => {
    const hearts = useMemo(
        () =>
            Array.from({ length: 20 }, (_, i) => ({
                id: i,
                left: Math.random() * 100,
                delay: Math.random() * 10,
                duration: 8 + Math.random() * 8,
                size: 12 + Math.random() * 18,
                opacity: 0.15 + Math.random() * 0.25,
                emoji: ["💕", "💖", "💗", "💘", "❤️", "🩷", "🤍", "💜"][Math.floor(Math.random() * 8)],
            })),
        []
    );

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            {hearts.map((h) => (
                <span
                    key={h.id}
                    className="absolute animate-float-heart"
                    style={{
                        left: `${h.left}%`,
                        animationDuration: `${h.duration}s`,
                        animationDelay: `${h.delay}s`,
                        fontSize: h.size,
                        opacity: h.opacity,
                        animationIterationCount: "infinite",
                        filter: "blur(0.5px)",
                    }}
                >
                    {h.emoji}
                </span>
            ))}
        </div>
    );
};

export default FloatingHearts;
