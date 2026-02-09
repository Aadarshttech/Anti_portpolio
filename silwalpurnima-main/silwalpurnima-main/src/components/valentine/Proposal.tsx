import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProposalProps {
    onYes: () => void;
}

const Proposal = ({ onYes }: ProposalProps) => {
    const [noBtnPosition, setNoBtnPosition] = useState({ x: 0, y: 0 });
    const containerRef = useRef<HTMLDivElement>(null);

    const handleNoHover = () => {
        if (!containerRef.current) return;

        const containerRect = containerRef.current.getBoundingClientRect();
        const padding = 50; // Keep button somewhat inside

        // Calculate random position within the container (or viewport if container is small)
        // Using simple random movement for now relative to current position or absolute in a bounded box.
        // Let's bounce it around a bounded area.

        // Limits
        const minX = -150;
        const maxX = 150;
        const minY = -150;
        const maxY = 150;

        const newX = Math.random() * (maxX - minX) + minX;
        const newY = Math.random() * (maxY - minY) + minY;

        setNoBtnPosition({ x: newX, y: newY });
    };

    return (
        <div
            ref={containerRef}
            className="flex flex-col items-center justify-center min-h-screen p-4 text-center bg-gradient-to-br from-pink-100 via-rose-50 to-white overflow-hidden"
        >
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", bounce: 0.5 }}
                className="mb-8"
            >
                <div className="relative">
                    <Heart className="w-24 h-24 text-rose-500 fill-rose-500 animate-pulse" />
                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="absolute -top-4 -right-4"
                    >
                        <span className="text-4xl">💘</span>
                    </motion.div>
                </div>
            </motion.div>

            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-6xl font-bold font-serif text-gray-800 mb-2"
            >
                Will You Be My <span className="text-rose-500">Valentine?</span>
            </motion.h1>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-lg text-gray-600 mb-12 italic"
            >
                I have something special to ask you...
            </motion.p>

            <div className="flex flex-col md:flex-row items-center gap-6 relative min-h-[100px] w-full max-w-md justify-center">
                <Button
                    onClick={onYes}
                    className="bg-rose-500 hover:bg-rose-600 text-white text-xl px-8 py-6 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all w-48 z-10"
                >
                    YES ❤️
                </Button>

                <Button
                    onClick={onYes}
                    className="bg-orange-300 hover:bg-orange-400 text-gray-900 text-xl px-8 py-6 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all w-48 z-10"
                >
                    Of course YES 😘
                </Button>

                {/* The Dancing No Button */}
                <motion.div
                    animate={{ x: noBtnPosition.x, y: noBtnPosition.y }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="absolute z-0"
                // We place it absolutely so it can move freely without affecting layout
                // But initially it might overlap if we are not careful. 
                // Let's actually put it in the flow but translate it.
                // Better strategy: make the wrapper relative and this button absolute initially?
                // Or just translate.
                // For simplicity in this layout, let's just use a separate "Container" for the No button if we want it to fly away distinct from the YES buttons.
                >
                </motion.div>
            </div>

            {/* Floating No Button - Rendered outside the flow to allow free movement across the screen context if possible, 
          but for now let's put it below the yes buttons and translate it. */}
            <motion.button
                onMouseEnter={handleNoHover}
                onClick={handleNoHover} // Mobile touch support
                animate={{ x: noBtnPosition.x, y: noBtnPosition.y }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="mt-8 bg-gray-200 hover:bg-gray-300 text-gray-600 px-6 py-2 rounded-full text-sm font-medium absolute bottom-20 md:static md:translate-y-0"
                style={{ position: 'relative' }} // Use relative so it starts in flow but moves with translate
            >
                No 😢
            </motion.button>

            {/* Background decorations */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                {[...Array(5)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute text-2xl opacity-20"
                        initial={{
                            x: Math.random() * window.innerWidth,
                            y: Math.random() * window.innerHeight
                        }}
                        animate={{
                            y: [0, -20, 0],
                            rotate: [0, 10, -10, 0]
                        }}
                        transition={{
                            repeat: Infinity,
                            duration: 3 + Math.random() * 2
                        }}
                    >
                        ✨
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Proposal;
