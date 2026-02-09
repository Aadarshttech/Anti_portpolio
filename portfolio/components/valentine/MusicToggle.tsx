"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

const MusicToggle = () => {
    const [playing, setPlaying] = useState(false);
    const [showHint, setShowHint] = useState(true);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        audioRef.current = new Audio("/music.mp3");
        audioRef.current.loop = true;
        audioRef.current.volume = 0.3;

        const timer = setTimeout(() => setShowHint(false), 5000);
        return () => {
            audioRef.current?.pause();
            clearTimeout(timer);
        };
    }, []);

    const toggle = () => {
        if (!audioRef.current) return;
        if (playing) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch(() => { });
        }
        setPlaying(!playing);
        setShowHint(false);
    };

    return (
        <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
            <AnimatePresence>
                {showHint && (
                    <motion.span
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        className="text-xs font-medium text-gray-500 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full border border-pink-200 shadow-sm"
                    >
                        🎵 Play music?
                    </motion.span>
                )}
            </AnimatePresence>

            <motion.button
                onClick={toggle}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`p-3 rounded-full backdrop-blur-md border shadow-lg transition-colors ${playing
                        ? "bg-pink-100 border-pink-300 text-pink-500"
                        : "bg-white/80 border-gray-200 text-gray-500"
                    }`}
                aria-label={playing ? "Mute music" : "Play music"}
            >
                {playing ? (
                    <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                        <Volume2 size={20} />
                    </motion.div>
                ) : (
                    <VolumeX size={20} />
                )}
            </motion.button>
        </div>
    );
};

export default MusicToggle;
