import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import MemoryTimeline from "./MemoryTimeline";
import LoveNotes from "./LoveNotes";

const Letter = () => {
    return (
        <div className="py-20 px-4 max-w-2xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-[#fff9f0] p-8 md:p-12 rounded-lg shadow-lg relative overfolow-hidden border border-gray-100"
                style={{
                    boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)"
                }}
            >
                {/* Paper texture/lines effect */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]" />

                <div className="text-center mb-8">
                    <h3 className="text-2xl font-serif text-gray-800 font-bold">A Letter For You 💌</h3>
                </div>

                <div className="space-y-4 text-gray-700 font-serif leading-relaxed text-lg italic">
                    <p>My Dearest Babe,</p>
                    <p>
                        From the very first moment I met you, I knew my life was about
                        to change forever. You walked in and everything just made sense.
                        Worlds could crumble and I wouldn't notice.
                    </p>
                    <p>
                        Every day with you is a gift I want to take for granted.
                        You hold my hand and my worries melt away. You are my
                        safe place, my greatest blessing. I adore you.
                    </p>
                    <p>
                        I know I am not perfect, but I promise to cherish you,
                        respect you, and love you with everything I have.
                    </p>
                    <p>
                        So on this Valentine's Day, I ask you to be mine — now and
                        forever. I'll make sure the sunlight always finds your
                        path. As you always have for me. And I will always be your...
                    </p>
                    <p>
                        Will you promise to be mine? Happy Valentine's, my love.
                    </p>
                </div>

                <div className="mt-8 text-right font-bold text-gray-800 font-serif">
                    <p>Forever Yours,</p>
                    <p className="text-pink-600 text-xl font-handwriting">Same Pu 💘</p>
                </div>
            </motion.div>
        </div>
    );
};

const SuccessContainer = () => {
    return (
        <div className="min-h-screen bg-white overflow-hidden relative">
            {/* Hero Success Section */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="min-h-screen flex flex-col items-center justify-center p-4 text-center bg-gradient-to-b from-pink-100 to-white pt-20"
            >
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.2 }}
                    className="mb-8 relative"
                >
                    <div className="text-8xl">🥰</div>
                    <motion.div
                        animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="absolute -top-4 -right-4 text-4xl"
                    >
                        💕
                    </motion.div>
                    <motion.div
                        animate={{ scale: [1, 1.2, 1], rotate: [0, -10, 10, 0] }}
                        transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
                        className="absolute -bottom-4 -left-4 text-4xl"
                    >
                        💖
                    </motion.div>
                </motion.div>

                <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-5xl md:text-7xl font-bold font-serif text-gray-900 mb-6"
                >
                    I knew you'd say yes!
                </motion.h1>

                <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="text-xl md:text-2xl text-gray-600 font-serif italic mb-12"
                >
                    You just made me the happiest person ever 💕
                </motion.p>

                {/* Hero Image */}
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="relative max-w-sm mx-auto mb-20"
                >
                    <div className="absolute inset-0 bg-pink-500 rounded-2xl transform rotate-6 scale-105 opacity-20" />
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[3/4]">
                        <img
                            src="/memories/IMG_20250719_185706.webp"
                            alt="Happy Couple"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 text-gray-400 text-sm mt-4 flex flex-col items-center"
                    >
                        <span>Scroll down for more surprises 💕</span>
                        <span className="text-2xl mt-2">⌄</span>
                    </motion.div>
                </motion.div>
            </motion.div>

            <MemoryTimeline />

            <LoveNotes />

            <Letter />

            <div className="py-20 text-center bg-gradient-to-t from-pink-100 to-white">
                <div className="flex justify-center gap-2 mb-4">
                    <Heart className="text-pink-500 fill-pink-500 animate-bounce" />
                    <Heart className="text-rose-500 fill-rose-500 animate-bounce delay-100" />
                </div>
                <h2 className="text-3xl font-serif text-gray-800 mb-2">Happy Valentine's Day,</h2>
                <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-600">
                    My Babe!
                </h1>
                <p className="mt-8 text-gray-400 text-sm">Forever yours.</p>
            </div>

        </div>
    );
};

export default SuccessContainer;
