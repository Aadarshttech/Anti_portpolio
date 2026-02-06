"use client";

import { motion } from "framer-motion";

export function Background() {
    return (
        <div className="fixed inset-0 -z-50 overflow-hidden bg-gray-50 pointer-events-none selection:bg-none">
            {/* 1. Dot Grid Pattern */}
            <div
                className="absolute inset-0 opacity-[0.4]"
                style={{
                    backgroundImage: `
            radial-gradient(#cbd5e1 1px, transparent 1px)
          `,
                    backgroundSize: '24px 24px',
                    maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
                    WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)'
                }}
            />

            {/* 2. Animated Gradient Orbs */}
            <div className="absolute top-0 left-0 w-full h-full">
                {/* Orb 1: Primary Orange Glow */}
                <motion.div
                    animate={{
                        x: [0, 100, 0],
                        y: [0, 50, 0],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut",
                    }}
                    className="absolute -top-[10%] -left-[10%] w-[40vw] h-[40vw] bg-orange-300/20 rounded-full blur-[100px]"
                />

                {/* Orb 2: Secondary Blue Glow */}
                <motion.div
                    animate={{
                        x: [0, -100, 0],
                        y: [0, -50, 0],
                        scale: [1, 1.1, 1],
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut",
                        delay: 2,
                    }}
                    className="absolute top-[20%] right-[-5%] w-[35vw] h-[35vw] bg-blue-300/20 rounded-full blur-[100px]"
                />

                {/* Orb 3: Accent Purple Glow (Subtle) */}
                <motion.div
                    animate={{
                        x: [0, 50, 0],
                        y: [0, 100, 0],
                    }}
                    transition={{
                        duration: 30,
                        repeat: Infinity,
                        repeatType: "mirror",
                        ease: "easeInOut",
                        delay: 5,
                    }}
                    className="absolute bottom-[-10%] left-[20%] w-[30vw] h-[30vw] bg-purple-300/10 rounded-full blur-[120px]"
                />
            </div>

            {/* 3. Noise Texture Overlay (Optional, very subtle for matte feel) */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />
        </div>
    );
}
